import { octokit } from "./octokit.server"
import { cachified } from "../cache.server"
import { redisCache } from "../redis.server"

export type FetchDirectoryContentOptions = {
  owner: string
  repo: string
  ref: string
  path: string
}

/**
 * Fetches the content of a directory within a Github repo.
 */
export const fetchDirectoryContent = async ({
  owner,
  repo,
  ref,
  path,
}: FetchDirectoryContentOptions) => {
  return await cachified({
    cache: redisCache,
    // one day + a fuzz factor of up to 1 hour so that when we do
    // a refresh it doesn't always refresh every single entry.
    maxAge: 1000 * 60 * 60 * 24 + Math.random() * 1000 * 60,
    forceFresh: process.env.FORCE_REFRESH === "true",
    key: `github-dir-list:${owner}:${repo}:${ref}:${path}`,
    getFreshValue: async () => {
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        ref,
        path,
      })

      return Array.isArray(data) ? data : []
    },
  })
}
