import path from "path";
import * as React from "react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { getMdxPage } from "~/utils/mdx";
// import { getRequiredServerEnvVar } from "~/utils/cms/helpers";
import { redisCache } from "~/utils/cms/redis.server";

type Body =
  // | { keys: Array<string>; commitSha?: string }
  { repo: string; contentPaths: Array<string>; commitSha?: string };

export const commitShaKey = `meta:last-refresh-commit-sha`;

export const action: ActionFunction = async ({ request }) => {
  // Everything in this function is fire and forget, so we don't need to await
  // anything.

  const body = (await request.json()) as Body;
  const repoCommitShaKey = `${commitShaKey}:${body.repo}`;

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
      });
    }
  }

  // if ("keys" in body && Array.isArray(body.keys)) {
  //   for (const key of body.keys) {
  //     void redisCache.del(key);
  //   }

  //   setShaInRedis();

  //   return json({
  //     message: "Deleting redis cache keys",
  //     keys: body.keys,
  //     commitSha: body.commitSha,
  //   });
  // }

  if ("contentPaths" in body && Array.isArray(body.contentPaths)) {
    console.log("Refreshing content...");
    const refreshingContentPaths: [string?] = [];
    for (const contentPath of body.contentPaths) {
      if (typeof contentPath !== "string") continue;
      const [contentDir, dirOrFilename] = contentPath.split("/");
      if (!contentDir || !dirOrFilename) continue;

      const slug = path.parse(dirOrFilename).name;

      refreshingContentPaths.push(contentPath);
      console.log(`Refreshing ${contentPath}...`);

      void getMdxPage(
        { repo: body.repo, fileOrDirPath: slug },
        { forceFresh: true }
      );
    }

    setShaInRedis();

    return json({
      message: "Refreshing cache for content paths",
      repo: body.repo,
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
