import { EmitterWebhookEvent } from "@octokit/webhooks"
import logger from "../../utils/logging.server"
import { pushEventCacheKeysToInvalidate } from "../github-webhook.server"
import { del } from "../redis.server"

export const invalidateCacheOnPush = (event: EmitterWebhookEvent<"push">) => {
  const { cacheKeysToInvalidate } = pushEventCacheKeysToInvalidate(
    event.payload
  )
  const keyCount = cacheKeysToInvalidate.size
  if (keyCount > 0) {
    logger.info(
      `Github webhook: clearing cache keys ${[...cacheKeysToInvalidate].join(
        ", "
      )}`
    )
    for (let key of cacheKeysToInvalidate) {
      del(key)
    }
  } else {
    logger.info(`Github webhook: no keys to clear`)
  }
}
