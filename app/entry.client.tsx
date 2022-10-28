import { RemixBrowser } from "@remix-run/react"
import { hydrate } from "react-dom"
import { onCLS, onFID, onLCP } from "web-vitals"
import { reportWebVitals } from "./utils/gtags.client"

// TODO: Figure out why this is necessary only for these 3 images.
// Possibly related to: https://github.com/remix-run/remix/issues/3414
//
require("./ui/design-system/images/tools/tool-emulator.svg")
require("./ui/design-system/images/tools/tool-cli.svg")
require("./ui/design-system/images/tools/tool-testing.svg")
require("./ui/design-system/images/tools/tool-vscode.svg")

hydrate(<RemixBrowser />, document)

onCLS(reportWebVitals)
onFID(reportWebVitals)
onLCP(reportWebVitals)
