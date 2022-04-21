import type { LoaderFunction } from "remix";
import { redisCache } from "~/utils/cms/redis.server";
import { commitShaKey as refreshCacheCommitShaKey } from "./action/refresh";

export const loader: LoaderFunction = async ({ request, params }) => {
  const shaInfo = await redisCache.get(
    `${refreshCacheCommitShaKey}:${params["repo"]}`
  );
  const data = JSON.stringify(shaInfo);
  return new Response(data, {
    headers: {
      "Content-Type": "application/json",
      "Content-Length": String(Buffer.byteLength(data)),
    },
  });
};
