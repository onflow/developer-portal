import type { ActionFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { getMdxPage } from "~/cms/utils/mdx"
// import { getRequiredServerEnvVar } from "~/utils/cms/helpers";
import * as Sentry from "@sentry/node"
import { redisCache } from "~/cms/redis.server"
import { findDocCollection } from "~/cms/collections.server"
import { recordRefreshEventInMixpanel } from "~/utils/mixpanel.server"

export interface Contribution {
  contributor: string
  commitCount: number
}

export type Body = {
  keys: Array<string>
  commitSha?: string
  repo: string
  contentPaths: string
  contributions: Contribution[]
}

export const commitShaKey = `meta:last-refresh-commit-sha`

export const action: ActionFunction = async ({ request }) => {
  // Everything in this function is fire and forget, so we don't need to await
  // anything.

  const body = (await request.json()) as Body
  const repoCommitShaKey = `${commitShaKey}:${body.repo}`

  console.log("Got refresh request:", body, repoCommitShaKey)
  // if (
  //   request.headers.get("auth") !==
  //   getRequiredServerEnvVar("REFRESH_CACHE_SECRET")
  // ) {
  //   return redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  // }

  function setShaInRedis() {
    if (body.commitSha) {
      void redisCache.set(repoCommitShaKey, {
        sha: body.commitSha,
        date: new Date(),
      })
    }
  }

  if ("keys" in body && Array.isArray(body.keys)) {
    for (const key of body.keys) {
      void redisCache.del(key)
    }

    setShaInRedis()

    return json({
      message: "Deleting redis cache keys",
      keys: body.keys,
      commitSha: body.commitSha,
    })
  }

  if ("contentPaths" in body && Array.isArray(body.contentPaths)) {
    console.log("Refreshing content...")

    const refreshingContentPaths: [string?] = []
    const paths: string[] = body.contentPaths[0].split(" ")
    for (const contentPath of paths) {
      if (typeof contentPath !== "string") {
        return json(
          {
            message: `Invalid contentPath: "${contentPath}"`,
            status: "invalidContentPath",
          },
          { status: 400 }
        )
      }

      refreshingContentPaths.push(contentPath)
      console.log(`Refreshing ${contentPath}...`)

      const contentSpec = findDocCollection(body.repo)

      if (!contentSpec) {
        return json(
          {
            message: "Unknown repo",
            status: "noRepo",
          },
          { status: 404 }
        )
      }

      try {
        void getMdxPage(
          {
            source: contentSpec.source,
            path: contentPath,
          },
          { forceFresh: true }
        )
      } catch (e) {
        Sentry.captureException(e)
      }
    }

    setShaInRedis()
    recordRefreshEventInMixpanel(body)
    Sentry.captureMessage(JSON.stringify(body))
    return json({
      message: "Refreshing cache for content paths",
      repo: body.repo,
      contentPaths: refreshingContentPaths,
      commitSha: body.commitSha,
    })
  }
  return json({ message: "no action taken" }, { status: 200 })
}

export const loader = () => redirect("/", { status: 404 })

export default function MarkRead() {
  return <div>Oops... You should not see this.</div>
}
