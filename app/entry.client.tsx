import { RemixBrowser } from "@remix-run/react"
import { hydrate } from "react-dom"
import { onCLS, onFID, onLCP, onFCP, onINP, onTTFB } from "web-vitals"
import { reportWebVitalsToGA } from "./utils/gtags.client"
import Hotjar from "@hotjar/browser"

const hotjarVersion = 6
const hotjarsiteid = 3324806
Hotjar.init(hotjarsiteid, hotjarVersion)

// TODO: Figure out why this is necessary only for these 3 images.
// Possibly related to: https://github.com/remix-run/remix/issues/3414
//
require("./ui/design-system/images/tools/tool-emulator.svg")
require("./ui/design-system/images/tools/tool-cli.svg")
require("./ui/design-system/images/tools/tool-testing.svg")
require("./ui/design-system/images/tools/tool-vscode.svg")
require("./ui/design-system/images/tools/tool-port.svg")

hydrate(<RemixBrowser />, document)

onCLS(reportWebVitalsToGA)
onFID(reportWebVitalsToGA)
onLCP(reportWebVitalsToGA)
onFCP(reportWebVitalsToGA)
onINP(reportWebVitalsToGA)
onTTFB(reportWebVitalsToGA)
