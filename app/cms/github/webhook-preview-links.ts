import { Octokit } from "./octokit.server"
import { EmitterWebhookEvent } from "@octokit/webhooks"
import logger from "../../utils/logging.server"
import { getPreviewLinkSummary } from "../preview-links.server"
import { ensure } from "errorish"

const CHECK_RUN_NAME = "Developer Portal Preview Links"

export const previewLinksOnCheckSuite = async ({
  payload,
  octokit,
}: EmitterWebhookEvent<"check_suite"> & {
  octokit: InstanceType<typeof Octokit>
}) => {
  if (payload.action !== "requested" && payload.action !== "rerequested") {
    logger.debug(
      `Ignoring Github webhook "check_suite" action "${payload.action}"`
    )
    return
  }

  logger.info(
    `Creating ${payload.action} check run for check suite ${payload.check_suite.id}`
  )

  await octokit.checks.create({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    name: CHECK_RUN_NAME,
    head_sha: payload.check_suite.head_sha,
  })
}

export const previewLinksOnCheckRun = async ({
  payload,
  octokit,
}: EmitterWebhookEvent<"check_run"> & {
  octokit: InstanceType<typeof Octokit>
}) => {
  if (payload.action !== "created" && payload.action !== "rerequested") {
    logger.debug(
      `Ignoring Github webhook "check_run" action "${payload.action}"`
    )
    return
  }

  if (payload.action === "created") {
    logger.info(`Running check run ${payload.check_run.id}`)
    await octokit.checks.update({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      check_run_id: payload.check_run.id,
      status: "in_progress",
      started_at: new Date().toISOString(),
    })

    let summary: string = ""
    let conclusion = "neutral"

    try {
      summary = await getPreviewLinkSummary(
        payload.repository,
        payload.check_run
      )
    } catch (error) {
      logger.error("Generating preview links failed", error)
      summary = `Generating preview links failed\r\n\r\n${
        ensure(error).message
      }`
    } finally {
      await octokit.checks.update({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        check_run_id: payload.check_run.id,
        status: "completed",
        completed_at: new Date().toISOString(),
        conclusion,
        output: { summary, title: CHECK_RUN_NAME },
      })
    }
  }

  if (payload.action === "rerequested") {
    logger.info(`Creating re-requested check run ${payload.check_run.id}`)
    await octokit.checks.create({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      name: CHECK_RUN_NAME,
      head_sha: payload.check_run.head_sha,
    })
  }
}
