import { cachified } from "../cache.server"
import { redisCache } from "../redis.server"
import { SporksCardProps } from "~/ui/design-system/src/lib/Components/SporksCard"
import { octokit } from "~/cms/github/octokit.server"

export const fetchSporks = async () => {
  return await cachified({
    cache: redisCache,
    maxAge: 1000 * 60 * 60 * 4,
    forceFresh: process.env.FORCE_REFRESH === "true",
    key: `sporks`,
    getFreshValue: fetchFreshSporks,
  })
}

export const fetchFreshSporks = async () => {
  const getSporks = async () => {
    const sporks: any = await octokit
      .request("GET /repos/{owner}/{repo}/contents/{path}", {
        owner: "onflow",
        repo: "flow",
        path: "sporks.json",
      })
      .then((response) => response.data)

    return sporks
  }

  const sporksResponse = await getSporks()
  const parsedResponse = JSON.parse(
    Buffer.from(sporksResponse.content, "base64").toString()
  ).networks

  const pastSporks = Object.keys(parsedResponse).reduce(
    (acc: any, curr: any) => {
      const normalized: SporksCardProps[] = Object.keys(
        parsedResponse[curr]
      ).map((spork) => ({
        heading: parsedResponse[curr][spork].name,
        timestamp: parsedResponse[curr][spork].sporkTime,
        sporkMetadata: {
          accessNode: parsedResponse[curr][spork].accessNodes.join(", "),
          date: parsedResponse[curr][spork].sporkTime,
          rootHeight: parsedResponse[curr][spork].rootHeight,
          rootParentId: parsedResponse[curr][spork].rootParentId,
          rootStateCommit: parsedResponse[curr][spork].rootStateCommitment,
          gitCommit: parsedResponse[curr][spork].gitCommitHash,
        },
      }))

      acc[curr] = normalized

      return acc
    },
    {}
  )

  return { pastSporks }
}
