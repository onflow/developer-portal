import { EmitterWebhookEvent } from "@octokit/webhooks"
import logger from "../../utils/logging.server"
import {
  pushEventCacheKeysToInvalidate,
  getDocumentPathsForPR,
} from "../github-webhook.server"
import { recordRefreshEventInMixpanel } from "~/utils/mixpanel.server"
import { del } from "../redis.server"

export const invalidateCacheOnPush = (event: EmitterWebhookEvent<"push">) => {
  const { sender, ref, repository } = event.payload

  const { cacheKeysToInvalidate } = pushEventCacheKeysToInvalidate(
    event.payload
  )
  const keyCount = cacheKeysToInvalidate.size

  if (keyCount > 0) {
    const { updatedDocuments } = getDocumentPathsForPR(event.payload)

    recordRefreshEventInMixpanel({
      user: sender.login,
      ref,
      repo: {
        name: repository.name,
        owner: repository.owner.login,
      },
      updatedDocuments: Array.from(updatedDocuments),
    })

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
