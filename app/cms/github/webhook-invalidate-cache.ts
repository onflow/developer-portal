import { EmitterWebhookEvent } from "@octokit/webhooks"
import logger from "../../utils/logging.server"
import { pushEventCacheKeysToInvalidate } from "../github-webhook.server"
import { recordRefreshEventInMixpanel } from "~/utils/mixpanel.server"
import { del } from "../redis.server"
import { commitShaKey } from "~/routes/action/refresh"

export const invalidateCacheOnPush = (event: EmitterWebhookEvent<"push">) => {
  const { cacheKeysToInvalidate } = pushEventCacheKeysToInvalidate(
    event.payload
  )
  const keyCount = cacheKeysToInvalidate.size

  const { pusher, ref, repository } = event.payload

  const allChangedFiles = event.payload.commits.flatMap((commit) => [
    ...commit.added,
    ...commit.removed,
    ...commit.modified,
  ])

  recordRefreshEventInMixpanel({
    pusher: pusher.username!,
    ref,
    repo: {
      name: repository.name,
    },
    updatedFiles: allChangedFiles,
  })

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
