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
import { ReactComponent as FclGradientIcon } from "../../../../images/tools/tool-fcl-gradient"
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

// TODO: We shouldn't have to manually relink when switchingtools
export const getSwitchLink = (name: SwitchContentName) => {
  if (isSecondRoute(name)) {
    return `/${FIRST_ROUTE_MAP[name]}/${name}`
  }
  return `/${name}`
}
export const switchContents: Record<
  SwitchContentName,
  SwitchContentProps | undefined
> = {
  emulator: {
    name: "Emulator",
    icon: EmulatorIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: EmulatorGradientIcon,
    link: getSwitchLink("emulator"),
  },
  "vscode-extension": {
    name: "VS Code Extension",
    icon: VsCodeIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: VsCodeGradientIcon,
    link: getSwitchLink("vscode-extension"),
  },
  "flow-cli": {
    name: "CLI",
    icon: CliIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CliGradientIcon,
    link: getSwitchLink("flow-cli"),
  },
  "flow-js-testing": {
    name: "Testing Library",
    icon: TestingIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: TestingGradientIcon,
    link: getSwitchLink("flow-js-testing"),
  },
  "fcl-js": {
    name: "Flow Client Library",
    icon: FclIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: FclGradientIcon,
    link: getSwitchLink("fcl-js"),
  },
  cadence: {
    name: "Cadence",
    icon: CadenceIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CadenceGradientIcon,
    link: getSwitchLink("cadence"),
  },
  language: {
    name: "Cadence",
    icon: CadenceIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CadenceGradientIcon,
    link: getSwitchLink("language"),
  },
  tutorial: {
    name: "Cadence",
    icon: CadenceIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CadenceGradientIcon,
    link: getSwitchLink("tutorial"),
  },
  "flow-go-sdk": {
    name: "Go SDK",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: getSwitchLink("flow-go-sdk"),
  },
  "http-api": {
    name: "HTTP API",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: getSwitchLink("http-api"),
  },
  tools: {
    name: "All tools",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: getSwitchLink("tools"),
  },
  "kitty-items": {
    name: "Kitty Items",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: getSwitchLink("kitty-items"),
  },
  concepts: {
    name: "Concepts & Guides",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: getSwitchLink("concepts"),
  },
  learn: {
    name: "All content",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: getSwitchLink("learn"),
  },
  "node-operation": {
    name: "Operation",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: getSwitchLink("node-operation"),
  },
  staking: {
    name: "Staking",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: getSwitchLink("staking"),
  },
  "flow-port": {
    name: "Flow Port",
    icon: PortIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: PortIcionGradient,
    link: getSwitchLink("flow-port"),
  },
  nodes: {
    name: "All nodes",
    icon: DefaultIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: DefaultIcon,
    link: getSwitchLink("nodes"),
  },
  flow: undefined,
  community: undefined,
  "dapp-development": undefined,
  "core-contracts": undefined,
  "flow-token": undefined,
  fusd: undefined,
  faq: undefined,
  "nft-marketplace": undefined,
  bounties: undefined,
}
