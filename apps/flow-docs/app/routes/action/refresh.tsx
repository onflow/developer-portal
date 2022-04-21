import * as React from "react";
import { json, redirect } from "remix";
import type { ActionFunction } from "remix";
import { getRequiredServerEnvVar } from "~/utils/cms/helpers";
import { redisCache } from "~/utils/cms/redis.server";

type Body =
  | { keys: Array<string>; commitSha?: string }
  | { contentPaths: Array<string>; commitSha?: string };

export const commitShaKey = "meta:last-refresh-commit-sha";

export const action: ActionFunction = async ({ request }) => {
  // Everything in this function is fire and forget, so we don't need to await
  // anything.

  if (
    request.headers.get("auth") !==
    getRequiredServerEnvVar("REFRESH_CACHE_SECRET")
  ) {
    return redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }

  const body = (await request.json()) as Body;

  function setShaInRedis() {
    if (body.commitSha) {
      void redisCache.set(commitShaKey, {
        sha: body.commitSha,
        date: new Date(),
      });
    }
  }

  if ("keys" in body && Array.isArray(body.keys)) {
    for (const key of body.keys) {
      void redisCache.del(key);
    }
    setShaInRedis();

    return json({
      message: "Deleting redis cache keys",
      keys: body.keys,
      commitSha: body.commitSha,
    });
  }
  if ("contentPaths" in body && Array.isArray(body.contentPaths)) {
    const refreshingContentPaths = [];
    for (const contentPath of body.contentPaths) {
      // ----------------------------------------------------------------------
      // TODO
      // Fetch new content from the repo and update the cache.
      // ----------------------------------------------------------------------
    }

    setShaInRedis();
    return json({
      message: "Refreshing cache for content paths",
      contentPaths: refreshingContentPaths,
      commitSha: body.commitSha,
    });
  }
  return json({ message: "no action taken" }, { status: 400 });
};

export const loader = () => redirect("/", { status: 404 });

export default function MarkRead() {
  return <div>Oops... You should not see this.</div>;
}
