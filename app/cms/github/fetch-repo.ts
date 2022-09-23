import { octokit } from "./octokit.server"
import { cachified } from "../cache.server"
import { redisCache } from "../redis.server"

export type FetchRepoOptions = {
  owner: string
  repo: string
}

export const fetchRepo = async ({ owner, repo }: FetchRepoOptions) => {
  return await cachified({
    cache: redisCache,
    // one day + a fuzz factor of up to 1 hour so that when we do
    // a refresh it doesn't always refresh every single entry.
    maxAge: 1000 * 60 * 60 * 24 + Math.random() * 1000 * 60,
    forceFresh: process.env.FORCE_REFRESH === "true",
    key: `repos:${owner}:${repo}`,
    getFreshValue: () =>
      octokit.rest.repos.get({
        owner,
        repo,
      }),
  })
}
