import type { EntryContext } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import { renderToString } from "react-dom/server"
import { getRequiredGlobalEnvVar } from "./cms/helpers"
import * as Sentry from "@sentry/node"
import "@sentry/tracing"

Sentry.init({
  ...(process.env.SENTRY_DSN && { dsn: process.env.SENTRY_DSN }),
  tracesSampleRate: 0.3,
  environment: getRequiredGlobalEnvVar("SENTRY_ENV", "development"),
})

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

  // Temporary Sentry setup until Remix SDK is created
  if (responseStatusCode === 500) {
    console.log(`Notifying Sentry of 500 response`)
    Sentry.captureException(remixContext.appState.error)
  }

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
