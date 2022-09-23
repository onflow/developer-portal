import { throttling } from "@octokit/plugin-throttling"
import { Octokit as OctokitBase } from "@octokit/rest"
import logger from "../../utils/logging.server"

type ThrottleOptions = {
  method: string
  url: string
  request: { retryCount: number }
}

export const Octokit = OctokitBase.plugin(throttling).defaults({
  log: logger,
  throttle: {
    onRateLimit: (retryAfter: number, options: ThrottleOptions) => {
      logger.warn(
        `Request quota exhausted for request ${options.method} ${options.url}. Retrying after ${retryAfter} seconds.`
      )

      return true
    },
    onAbuseLimit: (retryAfter: number, options: ThrottleOptions) => {
      // does not retry, only logs a warning
      logger.warn(`Abuse detected for request ${options.method} ${options.url}`)
    },
  },
})

export const octokit = new Octokit({
  auth: process.env.BOT_GITHUB_TOKEN,
  log: logger,
  throttle: {
    onRateLimit: (retryAfter: number, options: ThrottleOptions) => {
      logger.warn(
        `Request quota exhausted for request ${options.method} ${options.url}. Retrying after ${retryAfter} seconds.`
      )

      return true
    },
    onAbuseLimit: (retryAfter: number, options: ThrottleOptions) => {
      // does not retry, only logs a warning
      logger.warn(`Abuse detected for request ${options.method} ${options.url}`)
    },
  },
})
