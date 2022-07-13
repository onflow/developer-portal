import invariant from "tiny-invariant"
import { octokit } from "./github.server"

export async function getRepoVersions(
  owner: string,
  repo: string
): Promise<Array<string> | null> {
  const file = await octokit.repos.getContent({
    owner: owner,
    repo: repo,
    path: `versions.json`,
  })

  invariant(!Array.isArray(file.data), `did not expect array`)
  invariant("encoding" in file.data)
  invariant(file.data.encoding === "base64", `expected base64`)

  const content = Buffer.from(file.data.content, file.data.encoding).toString()
  const data = JSON.parse(content)

  return data
}
