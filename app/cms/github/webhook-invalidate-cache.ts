import { EmitterWebhookEvent } from "@octokit/webhooks"
import logger from "../../utils/logging.server"
import { pushEventCacheKeysToInvalidate } from "../github-webhook.server"
import { recordRefreshEventInMixpanel } from "~/utils/mixpanel.server"
import { del } from "../redis.server"

export const invalidateCacheOnPush = (event: EmitterWebhookEvent<"push">) => {
  const { cacheKeysToInvalidate } = pushEventCacheKeysToInvalidate(
    event.payload
  )
  const keyCount = cacheKeysToInvalidate.size

  const { sender, ref, repository, commits } = event.payload

  const allChangedFiles = commits.flatMap((commit) => [
    ...commit.added,
    ...commit.removed,
    ...commit.modified,
  ])

  recordRefreshEventInMixpanel({
    user: sender.login,
    ref,
    repo: {
      name: repository.name,
      owner: repository.owner.login,
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
