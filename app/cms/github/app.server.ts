import { App } from "@octokit/app"
import logger from "../../utils/logging.server"
import { Octokit } from "./octokit.server"
import { invalidateCacheOnPush } from "./webhook-invalidate-cache"
import {
  previewLinksOnCheckRun,
  previewLinksOnCheckSuite,
} from "./webhook-preview-links"

const {
  ENABLE_PREVIEWS,
  GITHUB_APP_ID,
  GITHUB_APP_PRIVATE_KEY,
  GITHUB_APP_WEBHOOK_SECRET,
} = process.env

const missingKeys = Object.entries({
  GITHUB_APP_ID,
  GITHUB_APP_PRIVATE_KEY,
  GITHUB_APP_WEBHOOK_SECRET,
})
  .filter(([_, value]) => !value)
  .map(([key]) => key)

export let app: App | undefined

if (!missingKeys.length) {
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

  if (ENABLE_PREVIEWS === "true") {
    appInstance.webhooks.on("check_suite", previewLinksOnCheckSuite)
    appInstance.webhooks.on("check_run", previewLinksOnCheckRun)
  }
} else {
  const message = `Github app not created because the following environment variables are missing: ${missingKeys.join(
    ", "
  )}`

  if (process.env.NODE_ENV === "production") {
    logger.error(message)
  } else {
    logger.warn(message)
  }
}
