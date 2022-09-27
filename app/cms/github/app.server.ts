import { inspect } from "util"
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

logger.info(
  `app.server.ts executing with GITHUB_APP_ID ${GITHUB_APP_ID} (${typeof GITHUB_APP_ID})`
)

if (!missingKeys.length) {
  const appInstance = new App({
    appId: GITHUB_APP_ID!,
    privateKey: GITHUB_APP_PRIVATE_KEY!,
    webhooks: {
      secret: GITHUB_APP_WEBHOOK_SECRET!,
    },
    Octokit,
  })

  logger.info("Octokit App created:\r\n", inspect(appInstance))

  logger.info("Octokit installations:\r\n")
  appInstance.eachInstallation((i) => {
    logger.info(
      `Installation ${i.installation.id}:\r\n`,
      inspect(i.installation)
    )
  })
  logger.info("-----\r\n")

  appInstance.octokit.hook.before("request", (...args) => {
    logger.info("before request:\r\b", inspect(args))
  })
  appInstance.octokit.hook.after("request", (...args) => {
    logger.info("after request:\r\n", inspect(args))
  })

  // This allows us to export app but still get detailed typing on appInstance
  // without having to explicitly define it above (we can just use type `App`)
  app = appInstance

  appInstance.webhooks.onError((event) => {
    logger.error("Webhook error", event)
  })

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
