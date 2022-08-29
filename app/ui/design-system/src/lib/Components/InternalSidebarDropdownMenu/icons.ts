import { ReactComponent as CadenceIcon } from "../../../../images/tools/tool-cadence"
import { ReactComponent as CadenceGradientIcon } from "../../../../images/tools/tool-cadence-gradient"
import { ReactComponent as CliIcon } from "../../../../images/tools/tool-cli"
import { ReactComponent as CliGradientIcon } from "../../../../images/tools/tool-cli-gradient"
import { ReactComponent as DefaultIcon } from "../../../../images/tools/tool-default-override"
import { ReactComponent as EmulatorIcon } from "../../../../images/tools/tool-emulator"
import { ReactComponent as EmulatorGradientIcon } from "../../../../images/tools/tool-emulator-gradient"
import { ReactComponent as FclIcon } from "../../../../images/tools/tool-fcl"
import { ReactComponent as PortIcon } from "../../../../images/tools/tool-port"
import { ReactComponent as PortIcionGradient } from "../../../../images/tools/tool-port-gradient"
import { ReactComponent as TestingIcon } from "../../../../images/tools/tool-testing"
import { ReactComponent as TestingGradientIcon } from "../../../../images/tools/tool-testing-gradient"
import { ReactComponent as VsCodeIcon } from "../../../../images/tools/tool-vscode"
import { ReactComponent as VsCodeGradientIcon } from "../../../../images/tools/tool-vscode-gradient"

export interface InternaSidebarDropdownMenuIcon {
  primary: React.FunctionComponent
  gradient: React.FunctionComponent
}

export const SIDEBAR_DROPDOWN_ICONS = {
  default: {
    primary: DefaultIcon,
    gradient: DefaultIcon,
  } as InternaSidebarDropdownMenuIcon,

  cadence: {
    primary: CadenceIcon,
    gradient: CadenceGradientIcon,
  } as InternaSidebarDropdownMenuIcon,
  emulator: {
    primary: EmulatorIcon,
    gradient: EmulatorGradientIcon,
  } as InternaSidebarDropdownMenuIcon,
  "fcl-js": {
    primary: FclIcon,
    gradient: FclIcon,
  } as InternaSidebarDropdownMenuIcon,
  "flow-js-testing": {
    primary: TestingIcon,
    gradient: TestingGradientIcon,
  } as InternaSidebarDropdownMenuIcon,
  "flow-cli": {
    primary: CliIcon,
    gradient: CliGradientIcon,
  } as InternaSidebarDropdownMenuIcon,
  "flow-port": {
    primary: PortIcon,
    gradient: PortIcionGradient,
  } as InternaSidebarDropdownMenuIcon,
  "vscode-extension": {
    primary: VsCodeIcon,
    gradient: VsCodeGradientIcon,
  } as InternaSidebarDropdownMenuIcon,
} as const

export type InternaSidebarDropdownMenuIconType =
  keyof typeof SIDEBAR_DROPDOWN_ICONS
