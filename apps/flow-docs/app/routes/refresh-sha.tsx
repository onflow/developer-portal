import type { LoaderFunction } from "remix";
import { redisCache } from "~/cms/redis.server";
import { commitShaKey as refreshCacheCommitShaKey } from "./action/refresh";

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url);
  const repo = url.searchParams.get("repo");

  const shaInfo = await redisCache.get(`${refreshCacheCommitShaKey}:${repo}`);

  const data = JSON.stringify(shaInfo);
  return new Response(data, {
    headers: {
      "Content-Type": "application/json",
      "Content-Length": String(Buffer.byteLength(data)),
    },
  });
};
