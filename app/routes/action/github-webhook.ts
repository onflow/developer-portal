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

  logger.trace(`Github webhook "${name}" received`, body)

  if (!id) {
    return json({ message: "Missing x-github-delivery header" }, 400)
  }

  if (!name) {
    return json({ message: "Missing x-github-event header" }, 400)
  }

  if (!emitterEventNames.includes(name as EmitterWebhookEventName)) {
    return json({ message: `Unknown event name`, name }, 400)
  }

  if (!signature) {
    return json({ message: "Missing x-hub-signature-256" }, 400)
  }

  const verified = await app.webhooks.verify(body, signature)

  if (!verified) {
    return json({ message: "Signature invalid" }, 401)
  }

  // fire and forget
  app.webhooks
    .receive({
      id,
      // @ts-ignore We validate this above.
      name,
      payload: body,
    })
    .catch((error) => {
      logger.error(`Github webhook "${name}" failed`, error)
    })
    .then(() => {
      logger.info(`Github webhook "${name}" completed`)
    })

  return json({ success: true }, 200)
}
