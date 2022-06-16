import { Octokit } from "@octokit/core"
import { FlipCellProps } from "~/ui/design-system/src/lib/Components/FlipCell"
import { FlipsProps } from "~/ui/design-system/src/lib/Components/Flips"

export const fetchFlips = async () => {
  const octokit = new Octokit({
    auth: process.env.BOT_GITHUB_TOKEN,
  })

  const getOpenFlipPullRequests = async () => {
    const pullRequestResponse = await octokit
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
    const issueResponse = await octokit
      .request("GET /repos/{owner}/{repo}/issues?state=all&labels={label}", {
        owner: "onflow",
        repo: "flow",
        label: "good first issue",
      })
      .then((response) => response.data)

    return issueResponse
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

  const openFlipPullRequests = await getOpenFlipPullRequests()
  const goodPlacesToStartIssues = await getGoodPlacesToStartIssues()

  // Convert from github API output to FlipCellProp
  const openFlipCellProps: Promise<FlipCellProps>[] = openFlipPullRequests.map(
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

  const goodPlacesToStartFlipCellProps: Promise<FlipCellProps>[] =
    goodPlacesToStartIssues.map(async (pr) => ({
      numComments: await getNumComments(pr.number),
      heading: pr.title,
      tags: pr.labels
        .filter((label) => typeof label !== "string")
        .map((label) =>
          typeof label !== "string" && label.name ? label.name : ""
        ),
      participant: {
        profileImage: pr.user?.avatar_url ?? "",
        name: pr.user?.login ?? "",
      },
      date: pr.created_at,
      forumLink: pr.html_url,
    }))

  const openFlips: FlipCellProps[] = await Promise.all(openFlipCellProps)
  const goodPlacesToStartFlips: FlipCellProps[] = await Promise.all(
    goodPlacesToStartFlipCellProps
  )

  return { openFlips, goodPlacesToStartFlips } as FlipsProps
}
