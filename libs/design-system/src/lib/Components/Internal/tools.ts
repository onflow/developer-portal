import { ReactComponent as CadenceGradientIcon } from '../../../../images/tools/tool-cadence-gradient.svg';
import { ReactComponent as CadenceLandingIcon } from '../../../../images/tools/tool-cadence-landing.svg';
import { ReactComponent as CadenceIcon } from '../../../../images/tools/tool-cadence.svg';
import { ReactComponent as CliGradientIcon } from '../../../../images/tools/tool-cli-gradient.svg';
import { ReactComponent as CliIcon } from '../../../../images/tools/tool-cli.svg';
import { ReactComponent as EmulatorGradientIcon } from '../../../../images/tools/tool-emulator-gradient.svg';
import { ReactComponent as EmulatorIcon } from '../../../../images/tools/tool-emulator.svg';
import { ReactComponent as FclGradientIcon } from '../../../../images/tools/tool-fcl-gradient.svg';
import { ReactComponent as FclIcon } from '../../../../images/tools/tool-fcl.svg';
import { ReactComponent as PortGradientIcon } from '../../../../images/tools/tool-port-gradient.svg';
import { ReactComponent as PortIcon } from '../../../../images/tools/tool-port.svg';
import { ReactComponent as TestingGradientIcon } from '../../../../images/tools/tool-testing-gradient.svg';
import { ReactComponent as TestingIcon } from '../../../../images/tools/tool-testing.svg';
import { ReactComponent as VsCodeGradientIcon } from '../../../../images/tools/tool-vscode-gradient.svg';
import { ReactComponent as VsCodeIcon } from '../../../../images/tools/tool-vscode.svg';

// TODO: iconLanding icons are placeholders until we have the assets

export type ToolName =
  | 'emulator'
  | 'vscode'
  | 'port'
  | 'cli'
  | 'testing'
  | 'fcl'
  | 'cadence';

export type Tool = {
  name: string;
  icon: React.FunctionComponent;
  iconLanding: React.FunctionComponent;
  gradientIcon: React.FunctionComponent;
};

export const TOOLS: Record<ToolName, Tool> = {
  emulator: {
    name: 'Emulator',
    icon: EmulatorIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: EmulatorGradientIcon,
  },
  vscode: {
    name: 'VS Code Extension',
    icon: VsCodeIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: VsCodeGradientIcon,
  },
  port: {
    name: 'Port',
    icon: PortIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: PortGradientIcon,
  },
  cli: {
    name: 'CLI',
    icon: CliIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CliGradientIcon,
  },
  testing: {
    name: 'Testing Library',
    icon: TestingIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: TestingGradientIcon,
  },
  fcl: {
    name: 'Flow Client Library',
    icon: FclIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: FclGradientIcon,
  },
  cadence: {
    name: 'Cadence',
    icon: CadenceIcon,
    iconLanding: CadenceLandingIcon,
    gradientIcon: CadenceGradientIcon,
  },
};
