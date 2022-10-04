import { EmitterWebhookEvent } from "@octokit/webhooks"
import { ensure } from "errorish"
import logger from "../../utils/logging.server"
import { Octokit } from "../github/octokit.server"
import { getAnnotations } from "./get-annotations.server"
import { getValidationSummaryForCheckRun } from "./get-validation-summary-for-check-run.server"
import { validateChangesForCheckRun } from "./validate-for-check-run"

const CHECK_RUN_NAME = "Developer Portal Content Check"

export const contentCheckOnCheckSuite = async ({
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

export const contentCheckOnCheckRun = async ({
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
    logger.info(
      `Running check run #${payload.check_run.id} (${payload.check_run.name})`
    )
    await octokit.checks.update({
      owner: payload.repository.owner.login,
      repo: payload.repository.name,
      check_run_id: payload.check_run.id,
      status: "in_progress",
      started_at: new Date().toISOString(),
    })

    let output:
      | { summary: string; title: string; annotations?: Array<any> }
      | undefined
    let conclusion = "neutral"

    try {
      const result = await validateChangesForCheckRun(
        payload.repository,
        payload.check_run
      )
      const summary = getValidationSummaryForCheckRun(result)
      output = {
        title: summary.title,
        summary: summary.summary,
        // Github supports a max of 50 annotations.
        annotations: getAnnotations(result).slice(0, 49),
      }
    } catch (error) {
      logger.error("Validating check run failed", error)
      const { message } = ensure(error)
      output = {
        title: "Unable to validate links",
        summary: `Validting links failed: ${message}`,
      }
    } finally {
      await octokit.checks.update({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        check_run_id: payload.check_run.id,
        status: "completed",
        completed_at: new Date().toISOString(),
        conclusion,
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
