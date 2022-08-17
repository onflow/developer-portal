import { PushEvent, WebhookEvent } from "@octokit/webhooks-types"
import type { ActionFunction } from "@remix-run/node" // or cloudflare/deno
import { json } from "@remix-run/node" // or cloudflare/deno
import crypto from "crypto"
import { del } from "~/cms"
import { pushEventCacheKeysToInvalidate } from "~/cms/github-webhook.server"

/**
 * @see https://remix.run/docs/en/v1/guides/resource-routes#webhooks
 */
export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405)
  }
  const event: WebhookEvent = await request.json()

  // optionally set a secret to ensure this request comes from github
  // this must be set in github as a webhook secret as well
  const secret = process.env.GITHUB_APP_WEBHOOK_SECRET
  if (secret) {
    const signature = request.headers.get("X-Hub-Signature-256")
    const generatedSignature = `sha256=${crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(event))
      .digest("hex")}`

    if (signature !== generatedSignature) {
      return json({ message: "Signature mismatch" }, 401)
    }
  }

  if (!isPush(event, request)) {
    console.log("Github webhook: skipping non-push event")
    return json({ success: true }, 200)
  }

  // fire and forget
  const { cacheKeysToInvalidate } = pushEventCacheKeysToInvalidate(event)
  const keyCount = cacheKeysToInvalidate.size
  if (keyCount > 0) {
    console.log(`Github webhook: clearing cache keys ${keyCount}`)
    for (let key of cacheKeysToInvalidate) {
      del(key)
    }
  } else {
    console.log(`Github webhook: no keys to clear`)
  }

  return json({ success: true }, 200)
}

function isPush(data: WebhookEvent, request: Request): data is PushEvent {
  return request.headers.get("X-GitHub-Event") === "push"
}
