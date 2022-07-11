import { types } from "@babel/core"
import { json } from "@remix-run/node"
import {
  firstRouteMap,
  firstRoutes,
  secondRoutes,
} from "~/constants/repos/contents-structure"
import { ReactComponent as CadenceIcon } from "../../../../images/tools/tool-cadence"
import { ReactComponent as CadenceGradientIcon } from "../../../../images/tools/tool-cadence-gradient"
import { ReactComponent as CadenceLandingIcon } from "../../../../images/tools/tool-cadence-landing"
import { ReactComponent as CliIcon } from "../../../../images/tools/tool-cli"
import { ReactComponent as CliGradientIcon } from "../../../../images/tools/tool-cli-gradient"
import { ReactComponent as DefaultIcon } from "../../../../images/tools/tool-default"
import { ReactComponent as EmulatorIcon } from "../../../../images/tools/tool-emulator"
import { ReactComponent as EmulatorGradientIcon } from "../../../../images/tools/tool-emulator-gradient"
import { ReactComponent as FclIcon } from "../../../../images/tools/tool-fcl"
import { ReactComponent as FclGradientIcon } from "../../../../images/tools/tool-fcl-gradient"
import { ReactComponent as PortIcon } from "../../../../images/tools/tool-port"
import { ReactComponent as PortIcionGradient } from "../../../../images/tools/tool-port-gradient"
import { ReactComponent as TestingIcon } from "../../../../images/tools/tool-testing"
import { ReactComponent as TestingGradientIcon } from "../../../../images/tools/tool-testing-gradient"
import { ReactComponent as VsCodeIcon } from "../../../../images/tools/tool-vscode"
import { ReactComponent as VsCodeGradientIcon } from "../../../../images/tools/tool-vscode-gradient"

// TODO: iconLanding icons are placeholders until we have the assets
// Keeping it consistent with path names
export const toolNames = [
  "emulator",
  "vscode-extension",
  "flow-cli",
  "flow-js-testing",
  "fcl-js",
  "cadence",
  "language",
  "flow-go-sdk",
  "http-api",
  "tools",
  "kitty-items",
  "concepts",
  "learn",
  "node-operation",
  "staking",
  "flow-port",
  "nodes",
] as const

export type ToolName = typeof toolNames[number]

export type Tool = {
  name: string
  icon: React.FunctionComponent
  iconLanding: React.FunctionComponent
  gradientIcon: React.FunctionComponent
}

export const TOOLS: Record<ToolName, Tool> = {
  emulator: {
    name: "Emulator",
    icon: EmulatorIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: EmulatorGradientIcon,
  },
  "vscode-extension": {
    name: "VS Code Extension",
    icon: VsCodeIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: VsCodeGradientIcon,
  },
  "flow-cli": {
    name: "CLI",
    icon: CliIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CliGradientIcon,
  },
  "flow-js-testing": {
    name: "Testing Library",
    icon: TestingIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: TestingGradientIcon,
  },
  "fcl-js": {
    name: "Flow Client Library",
    icon: FclIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: FclGradientIcon,
  },
  cadence: {
    name: "Cadence",
    icon: CadenceIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CadenceGradientIcon,
  },
  language: {
    name: "Cadence",
    icon: CadenceIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CadenceGradientIcon,
  },
  tutorial: {
    name: "Cadence",
    icon: CadenceIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CadenceGradientIcon,
  },
  "flow-go-sdk": {
    name: "Go SDK",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
  },
  "http-api": {
    name: "HTTP API",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
  },
  tools: {
    name: "All tools",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
  },
  "kitty-items": {
    name: "Kitty Items",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
  },
  concepts: {
    name: "Concepts & Guides",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
  },
  learn: {
    name: "All content",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
  },
  "node-operation": {
    name: "Operation",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
  },
  staking: {
    name: "Staking",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
  },
  "flow-port": {
    name: "Flow Port",
    icon: PortIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: PortIcionGradient,
  },
  nodes: {
    name: "All nodes",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
  },
}

// TODO: We shouldn't have to manually relink when switchingtools
export const toolSwitchLinks: Record<ToolName, string> = {
  emulator: "",
  "vscode-extension": "",
  "flow-cli": "",
  "flow-js-testing": "",
  "fcl-js": "",
  cadence: "",
  language: "",
  "flow-go-sdk": "",
  "http-api": "",
  tools: "",
  "kitty-items": "",
  concepts: "",
  learn: "",
  "node-operation": "",
  staking: "",
  "flow-port": "",
  nodes: "",
}

for (let toolName of Object.keys(TOOLS)) {
  if (firstRoutes.includes(toolName)) {
    toolSwitchLinks[toolName as ToolName] = `/${toolName}`
  } else if (secondRoutes.includes(toolName)) {
    const first = firstRouteMap[toolName]
    toolSwitchLinks[toolName as ToolName] = `/${first}/${toolName}`
  }
}
