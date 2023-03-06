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

type SporkNetwork = "mainnet" | "sandboxnet" | "testnet"
interface ISpork {
  id: number
  name: string
  sporkTime: string
  accessNodes: string[]
  rootHeight: string
  rootParentId: string
  rootStateCommitment: string
  gitCommitHash: string
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
  const parsedResponse = (
    JSON.parse(Buffer.from(sporksResponse.content, "base64").toString()) as {
      networks: Record<SporkNetwork, Record<string, ISpork>>
    }
  ).networks

  const pastSporks = Object.entries(parsedResponse).reduce(
    (acc: Record<string, SporksCardProps[]>, [curr, currentNetwork]) => {
      const normalized: SporksCardProps[] = Object.values(currentNetwork).map(
        (currentSpork) => ({
          heading: currentSpork.name,
          timestamp: currentSpork.sporkTime,
          sporkMetadata: {
            accessNode: currentSpork.accessNodes.join(", "),
            date: currentSpork.sporkTime,
            rootHeight: currentSpork.rootHeight,
            rootParentId: currentSpork.rootParentId,
            rootStateCommit: currentSpork.rootStateCommitment,
            gitCommit: currentSpork.gitCommitHash,
          },
        })
      )

      return { ...acc, [curr]: normalized }
    },
    {}
  )

  return { pastSporks }
}
