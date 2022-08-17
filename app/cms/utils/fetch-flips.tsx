import { Octokit } from "@octokit/rest"
import { FlipCellProps } from "~/ui/design-system/src/lib/Components/FlipCell"
import { FlipsProps } from "~/ui/design-system/src/lib/Components/Flips"
import { cachified } from "../cache.server"
import { redisCache } from "../redis.server"

export interface PullRequestResponse {
  url: string
  id: number
  node_id: string
  html_url: string
  diff_url: string
  patch_url: string
  issue_url: string
  commits_url: string
  review_comments_url: string
  review_comment_url: string
  comments_url: string
  statuses_url: string
  number: number
  state: string
  locked: boolean
  title: string
  user: User | null
  body: string | null
  labels: Label[]
  milestone: any
  active_lock_reason?: string | null
  created_at: string
  updated_at: string
  closed_at: string | null
  merged_at: string | null
  merge_commit_sha: string | null
  assignee?: any | null
  assignees?: any[] | null
  requested_reviewers?: any[] | null
  requested_teams?: any[] | null
  head: any
  base: any
  _links: any
  author_association: string
  auto_merge: any
  draft?: boolean
}

export interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string | null
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export interface Label {
  id?: number
  node_id?: string
  url?: string
  name?: string
  description?: string
  color?: string
  default?: boolean
}

export interface IssueResponse {
  id: number
  node_id: string
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  number: number
  state: string
  title: string
  body: string
  user: User
  labels: Label[]
  assignee: any
  assignees: any
  milestone: any
  locked: boolean
  active_lock_reason: string
  comments: number
  pull_request: any
  closed_at: any
  created_at: string
  updated_at: string
  closed_by: any
  author_association: string
}

export const fetchFlips = async () => {
  return await cachified({
    cache: redisCache,
    maxAge: 1000 * 60 * 60 * 4,
    forceFresh: process.env.FORCE_REFRESH === "true",
    key: `flips`,
    getFreshValue: fetchFreshFlips,
  })
}

export const fetchFreshFlips = async () => {
  const octokit = new Octokit({
    auth: process.env.BOT_GITHUB_TOKEN,
  })

  const getOpenFlipPullRequests = async () => {
    const pullRequestResponse: PullRequestResponse[] = await octokit
      .request("GET /repos/{owner}/{repo}/pulls", {
        owner: "onflow",
        repo: "flow",
      })
      .then((response) => response.data)

    return pullRequestResponse.filter((pr) => {
      const labelNames = pr.labels.map((label) => label.name)
      return labelNames.includes("FLIP")
    })
  }

  const getGoodPlacesToStartIssues = async () => {
    const repositories = ["flow", "fcl-js", "kitty-items", "flow-go-sdk"]

    const issuesFromRepos = repositories.map(async (repositoryName) => {
      const issueResponse: IssueResponse[] = await octokit
        .request("GET /repos/{owner}/{repo}/issues?labels={label}", {
          owner: "onflow",
          repo: repositoryName,
          label: "good first issue",
        })
        .then((response) => response.data)
      return issueResponse
    })

    const nestedIssueResponses = await Promise.all(issuesFromRepos)
    const issueResponses = nestedIssueResponses.flat()
    return issueResponses
  }

  const getNumComments = async (
    repositoryName: string,
    fetchIssue: number
  ): Promise<number> => {
    const comments = await octokit
      .request("GET /repos/{owner}/{repo}/issues/{issueNumber}/comments", {
        owner: "onflow",
        repo: repositoryName,
        issueNumber: fetchIssue,
      })
      .then((response) => response.data)

    return comments.length
  }

  const openFlipPullRequests = await getOpenFlipPullRequests()
  const goodPlacesToStartIssues = await getGoodPlacesToStartIssues()

  // Convert from github API output to FlipCellProp
  const openFlipCellProps: Promise<FlipCellProps>[] = openFlipPullRequests.map(
    async (pr) => ({
      numComments: await getNumComments("flow", pr.number),
      heading: pr.title,
      tags: pr.labels.map((label) => label.name ?? ""),
      repository: "flow",
      participant: {
        profileImage: pr.user?.avatar_url ?? "",
        name: pr.user?.login ?? "",
      },
      date: pr.created_at,
      forumLink: pr.html_url,
    })
  )

  const getRepositoryName = (url: string) =>
    url.substring(url.lastIndexOf("/") + 1)

  const goodPlacesToStartFlipCellProps: Promise<FlipCellProps>[] =
    goodPlacesToStartIssues.map(async (issue: IssueResponse) => ({
      numComments: await getNumComments(
        getRepositoryName(issue.repository_url),
        issue.number
      ),
      heading: issue.title,
      tags: issue.labels
        .filter((label) => typeof label !== "string")
        .map((label) =>
          typeof label !== "string" && label.name ? label.name : ""
        ),
      repository: getRepositoryName(issue.repository_url),
      participant: {
        profileImage: issue.user?.avatar_url ?? "",
        name: issue.user?.login ?? "",
      },
      date: issue.created_at,
      forumLink: issue.html_url,
    }))

  const openFlips: FlipCellProps[] = await Promise.all(openFlipCellProps)
  const goodPlacesToStartFlips: FlipCellProps[] = await Promise.all(
    goodPlacesToStartFlipCellProps
  )

  return { openFlips, goodPlacesToStartFlips } as FlipsProps
}
