import type { EntryContext } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import * as Sentry from "@sentry/node"
import { renderToString } from "react-dom/server"
import { getRequiredGlobalEnvVar } from "./cms/helpers"

Sentry.init({
  dsn: getRequiredGlobalEnvVar("SENTRY_DSN"),
  tracesSampleRate: 0.3,
  environment: getRequiredGlobalEnvVar("NODE_ENV"),
})

/* Uncomment this block for testing Sentry connection
const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99);
*/

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  )

  responseHeaders.set("Content-Type", "text/html")

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
