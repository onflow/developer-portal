import { inspect } from "util"
import { emitterEventNames, EmitterWebhookEventName } from "@octokit/webhooks"
import { ActionArgs, json } from "@remix-run/node" // or cloudflare/deno
import { app } from "../../cms/github/app.server"
import logger from "../../utils/logging.server"

/**
 * @see https://remix.run/docs/en/v1/guides/resource-routes#webhooks
 */
export const action = async ({ request }: ActionArgs) => {
  if (!app) {
    logger.warn("Github webhook received, but github App is not configured")
    return json({ message: "Webhooks not allowed for this server" }, 400)
  }

  if (request.method !== "POST") {
    logger.debug(
      `Github webhook received with unexpected method "${request.method}"`
    )
    return json({ message: "Method not allowed" }, 405)
  }

  let body: any

  try {
    body = await request.json()
  } catch (error) {
    logger.warn(`Github webhook recevied with non-JSON body`, error)
    return json({ message: "Invalid request body" }, 400)
  }

  const id = request.headers.get("x-github-delivery")
  const name = request.headers.get("x-github-event")
  const signature = request.headers.get("x-hub-signature-256")

  if (!id) {
    logger.debug("Github webhook missing x-github-delivery header")
    return json({ message: "Missing x-github-delivery header" }, 400)
  }

  if (!name) {
    logger.debug("Github webhook missing x-github-event header")
    return json({ message: "Missing x-github-event header" }, 400)
  }

  if (!emitterEventNames.includes(name as EmitterWebhookEventName)) {
    logger.debug(
      `Github webhook received with unknown x-github-event value: ${name}`
    )
    return json({ message: `Unknown event name`, name }, 400)
  }

  if (!signature) {
    logger.debug(
      `Github webhook received with Missing x-hub-signature-256 header: ${name}`
    )
    return json({ message: "Missing x-hub-signature-256 header" }, 400)
  }

  const verified = await app.webhooks.verify(body, signature)

  if (!verified) {
    logger.debug(`Github webhook "${name}" not verified - signature invalid`, {
      body,
      signature,
    })
    return json({ message: "Signature invalid" }, 401)
  }

  logger.trace(`Processing verified Github webhook "${name}"`, {
    body,
    id,
    signature,
  })

  // fire and forget
  app.webhooks
    .receive({
      id,
      // @ts-ignore We validate this above.
      name,
      payload: body,
    })
    .then(() => {
      logger.info(`Github webhook "${name}" completed`)
    })
    .catch((error) => {
      logger.error(
        `Github webhook "${name}" failed`,
        inspect(error, {
          showHidden: true,
          depth: null,
          colors: true,
          getters: true,
        })
      )
    })

  return json({ success: true }, 200)
}
