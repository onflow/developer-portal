import {
  FirstRoute,
  FIRST_ROUTE_MAP,
  isSecondRoute,
  SecondRoute,
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
import { ReactComponent as PortIcon } from "../../../../images/tools/tool-port"
import { ReactComponent as PortIcionGradient } from "../../../../images/tools/tool-port-gradient"
import { ReactComponent as TestingIcon } from "../../../../images/tools/tool-testing"
import { ReactComponent as TestingGradientIcon } from "../../../../images/tools/tool-testing-gradient"
import { ReactComponent as VsCodeIcon } from "../../../../images/tools/tool-vscode"
import { ReactComponent as VsCodeGradientIcon } from "../../../../images/tools/tool-vscode-gradient"

export type SwitchContentName = FirstRoute | SecondRoute | "http-api"

export type SwitchContentProps = {
  name: string
  icon: React.FunctionComponent
  iconLanding: React.FunctionComponent
  gradientIcon: React.FunctionComponent
  link: string
}

export const switchContents: Partial<
  Record<SwitchContentName, SwitchContentProps | undefined>
> = {
  emulator: {
    name: "Emulator",
    icon: EmulatorIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: EmulatorGradientIcon,
    link: "emulator",
  },
  "vscode-extension": {
    name: "VS Code Extension",
    icon: VsCodeIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: VsCodeGradientIcon,
    link: "vscode-extension",
  },
  "flow-cli": {
    name: "CLI",
    icon: CliIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CliGradientIcon,
    link: "flow-cli",
  },
  "flow-js-testing": {
    name: "Testing Library",
    icon: TestingIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: TestingGradientIcon,
    link: "flow-js-testing",
  },
  "fcl-js": {
    name: "Flow Client Library",
    icon: FclIcon,
    iconLanding: FclIcon,
    gradientIcon: FclIcon,
    link: "fcl-js",
  },
  cadence: {
    name: "Cadence",
    icon: CadenceIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CadenceGradientIcon,
    link: "cadence",
  },
  language: {
    name: "Cadence",
    icon: CadenceIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CadenceGradientIcon,
    link: "cadence/language",
  },
  tutorial: {
    name: "Cadence",
    icon: CadenceIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CadenceGradientIcon,
    link: "cadence/tutorial",
  },
  "flow-go-sdk": {
    name: "Go SDK",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: "flow-go-sdk",
  },
  "http-api": {
    name: "HTTP API",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: "http-api",
  },
  tools: {
    name: "All tools",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: "tools",
  },
  "kitty-items": {
    name: "Kitty Items",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: "learn/kitty-items",
  },
  concepts: {
    name: "Concepts & Guides",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: "flow/concepts",
  },
  learn: {
    name: "All content",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: "learn",
  },
  "node-operation": {
    name: "Operation",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: "nodes/node-operation",
  },
  staking: {
    name: "Staking",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: "nodes/staking",
  },
  "flow-port": {
    name: "Flow Port",
    icon: PortIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: PortIcionGradient,
    link: "nodes/flow-port",
  },
  nodes: {
    name: "All nodes",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: "nodes",
  },
}
