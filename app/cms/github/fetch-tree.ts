import { octokit } from "./octokit.server"

export type FetchRepoOptions = {
  owner: string
  repo: string
  sha: string
  recursive?: boolean
}

export const fetchTree = ({
  owner,
  repo,
  sha,
  recursive = true,
}: FetchRepoOptions) =>
  octokit.git.getTree({
    owner,
    repo,
    tree_sha: sha,
    recursive: recursive ? "1" : undefined,
  })
