import { RemixBrowser } from "@remix-run/react"
import { hydrate } from "react-dom"

declare global {
  interface Window {
    GLOBALS: Record<string, string | undefined>
  }
}

hydrate(<RemixBrowser />, document)
