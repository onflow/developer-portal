import { Octokit } from "../github/octokit.server"
import { EmitterWebhookEvent } from "@octokit/webhooks"
import logger from "../../utils/logging.server"
import { getPreviewLinks } from "./get-preview-links.server"
import { ensure } from "errorish"
import { getPreviewLinksSummary } from "./get-preview-links-summary.server"

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
    `Creating ${payload.action} check run "${CHECK_RUN_NAME}" for check suite ${payload.check_suite.id}`
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
  if (payload.check_run.name !== CHECK_RUN_NAME) {
    logger.trace(
      `Ignoring unknown Github webhook "check_run": ${payload.check_run.name}`
    )
    return
  }

  if (String(payload.check_run.app.id) !== process.env.GITHUB_APP_ID) {
    logger.trace('Ignoring Github webhook "check_run" for unknown app.')
    return
  }

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

    let output: { summary: string; title: string } | undefined

    try {
      const links = await getPreviewLinks(payload.repository, payload.check_run)
      output = getPreviewLinksSummary(links)
    } catch (error) {
      logger.error("Generating preview links failed", error)
      const { message } = ensure(error)
      output = {
        title: "Unable to generate preview links",
        summary: `Generating preview links failed: ${message}`,
      }
    } finally {
      await octokit.checks.update({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        check_run_id: payload.check_run.id,
        status: "completed",
        completed_at: new Date().toISOString(),
        conclusion: "neutral",
        output,
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
