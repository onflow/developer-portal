import { App } from "@octokit/app"
import logger from "../../utils/logging.server"
import { Octokit } from "./octokit.server"
import { invalidateCacheOnPush } from "./webhook-invalidate-cache"
import {
  previewLinksOnCheckRun,
  previewLinksOnCheckSuite,
} from "./webhook-preview-links"

function safeCycles() {
  const seen: any[] = []
  return function (key: any, val: any) {
    if (!val || typeof val !== "object") {
      return val
    }
    // Watch out for Window host objects that are trickier to handle.
    if (val instanceof Window || seen.indexOf(val) !== -1) {
      return "[Circular]"
    }
    seen.push(val)
    return val
  }
}

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

  console.log(
    "Octokit App created:\r\n",
    JSON.stringify(appInstance, safeCycles(), 2)
  )

  console.log("Octokit installations:\r\n")
  appInstance.eachInstallation((i) => {
    console.log(
      `Installation ${i.installation.id}:\r\n`,
      JSON.stringify(i.installation, safeCycles(), 2)
    )
  })
  console.log("-----\r\n")

  appInstance.octokit.hook.before("request", (...args) => {
    console.log("before request:\r\b", JSON.stringify(args, safeCycles(), 2))
  })
  appInstance.octokit.hook.after("request", (...args) => {
    console.log("after request:\r\n", JSON.stringify(args, safeCycles(), 2))
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
