import { octokit } from "./octokit.server"
import { cachified } from "../cache.server"
import { redisCache } from "../redis.server"
import { FetchRepoOptions } from "./fetch-repo"

export type FetchBranchOptions = FetchRepoOptions & {
  branch: string
}

export const fetchBranch = async ({
  owner,
  repo,
  branch,
}: FetchBranchOptions) => {
  return await cachified({
    cache: redisCache,
    // one day + a fuzz factor of up to 1 hour so that when we do
    // a refresh it doesn't always refresh every single entry.
    maxAge: 1000 * 60 * 60 * 24 + Math.random() * 1000 * 60,
    forceFresh: process.env.FORCE_REFRESH === "true",
    key: `branches:${owner}:${repo}:${branch}`,
    getFreshValue: () =>
      octokit.rest.repos.getBranch({
        branch,
        owner,
        repo,
      }),
  })
}
