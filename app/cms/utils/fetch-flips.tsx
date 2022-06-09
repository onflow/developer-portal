// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { FlipCellProps } from "../../../libs/design-system/src/lib/Components/FlipCell"
import { Octokit } from "@octokit/core"

export const fetchFlips = async () => {
  const octokit = new Octokit({
    auth: process.env.BOT_GITHUB_TOKEN,
  })

  const getPullRequests = async (fetchLabel: string) => {
    // Fetch PRs from onflow/flow repo
    const pullRequestResponse = await octokit
      .request("GET /repos/{owner}/{repo}/pulls", {
        owner: "onflow",
        repo: "flow",
      })
      .then((response) => response.data)

    // Filter only PRs with 'Flip' labels
    return pullRequestResponse.filter((pr) => {
      const labelNames = pr.labels.map((label) => label.name)
      return labelNames.includes(fetchLabel)
    })
  }

  const getNumComments = async (fetchIssue: number): Promise<number> => {
    const comments = await octokit
      .request("GET /repos/{owner}/{repo}/issues/{issueNumber}/comments", {
        owner: "onflow",
        repo: "flow",
        issueNumber: fetchIssue,
      })
      .then((response) => response.data)

    return comments.length
  }

  const flipPullRequests = await getPullRequests("FLIP")

  // Convert from github API output to FlipCellProp
  const flipCellProps: Promise<FlipCellProps>[] = flipPullRequests.map(
    async (pr) => ({
      numComments: await getNumComments(pr.number),
      heading: pr.title,
      tags: pr.labels.map((label) => label.name ?? ""),
      participant: {
        profileImage: pr.user?.avatar_url ?? "",
        name: pr.user?.login ?? "",
      },
      date: pr.created_at,
      forumLink: pr.html_url,
    })
  )

  const data: FlipCellProps[] = await Promise.all(flipCellProps)

  return data
}
