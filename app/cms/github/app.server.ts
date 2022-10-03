import { App } from "@octokit/app"
import { ENABLE_CONTENT_CHECKER, ENABLE_PREVIEWS } from "../../utils/env.server"
import logger from "../../utils/logging.server"
import {
  contentCheckOnCheckRun,
  contentCheckOnCheckSuite,
} from "../doc-validation/webhook-content-check.server"
import {
  previewLinksOnCheckRun,
  previewLinksOnCheckSuite,
} from "../previews/webhook-preview-links.server"
import { Octokit } from "./octokit.server"
import { invalidateCacheOnPush } from "./webhook-invalidate-cache"

const { GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY, GITHUB_APP_WEBHOOK_SECRET } =
  process.env

const missingKeys = Object.entries({
  GITHUB_APP_ID,
  GITHUB_APP_PRIVATE_KEY,
  GITHUB_APP_WEBHOOK_SECRET,
})
  .filter(([_, value]) => !value)
  .map(([key]) => key)

export let app: App | undefined

if (!missingKeys.length) {
  logger.info(`Initializing Github App with App ID: ${GITHUB_APP_ID}`)

  const appInstance = new App({
    appId: GITHUB_APP_ID!,
    privateKey: GITHUB_APP_PRIVATE_KEY!,
    webhooks: {
      secret: GITHUB_APP_WEBHOOK_SECRET!,
    },
    Octokit,
  })

  // This allows us to export app but still get detailed typing on appInstance
  // without having to explicitly define it above (we can just use type `App`)
  app = appInstance

  appInstance.webhooks.on("push", invalidateCacheOnPush)

  if (ENABLE_PREVIEWS) {
    appInstance.webhooks.on("check_suite", previewLinksOnCheckSuite)
    appInstance.webhooks.on("check_run", previewLinksOnCheckRun)
  }

  if (ENABLE_CONTENT_CHECKER) {
    appInstance.webhooks.on("check_suite", contentCheckOnCheckSuite)
    appInstance.webhooks.on("check_run", contentCheckOnCheckRun)
  }
} else {
  const message = `Github app not created because the following environment variables are missing: ${missingKeys}. Github webhooks will be ignored.`
  if (process.env.NODE_ENV === "production") {
    logger.error(message)
  } else {
    logger.warn(message)
  }
}
