import EcosystemIcon from "~/ui/design-system/images/content/ecosystem"
import NetworkIcon from "~/ui/design-system/images/nav/network"
import NodeIcon from "~/ui/design-system/images/nav/node"
import TokenIcon from "~/ui/design-system/images/nav/token"
import { Section } from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import { networkStatusCard, sporkProcessCard } from "./navCardsData"

export const nodeOperation: Section = {
  links: [
    {
      title: "View Community",
      href: "/coming-soon",
    },
  ],
  title: "Node Operation & Staking",
  subSections: [
    {
      title: "Operating a Flow Node",
      href: "https://docs.onflow.org/node-operation/",
    },
    {
      title: "Staking Walkthrough",
      href: "https://docs.onflow.org/flow-port/staking-guide/",
    },
    {
      title: "Flow Port",
      href: "https://github.com/onflow/flow-go-sdk",
    },
    {
      title: ".find Flow Domain Name Service",
      href: "https://github.com/onflow/flow-jvm-sdk",
    },
    {
      title: "FNS Flow Domain Name Service",
      href: "https://github.com/Outblock/flow-swift",
    },
  ],
  icon: <NodeIcon height="1.5em" width="1.5em" />,
}

export const flowToken: Section = {
  links: [
    {
      title: "View all tools",
      href: "#todo",
    },
  ],
  title: "Flow Token",
  subSections: [
    {
      title: "CLI",
      href: "#todo",
    },
    {
      title: "Emulator",
      href: "#todo",
    },
    {
      title: "Dev Wallet",
      href: "#todo",
    },
    {
      title: "JS-Testing",
      href: "#todo",
    },
    {
      title: "Event Indexing",
      href: "#todo",
    },
  ],
  icon: <TokenIcon height="1.5em" width="1.5em" />,
}

export const grantsSection: Section = {
  links: [
    {
      title: "View Developer Grants",
      href: "https://github.com/emerald-dao/0-hello-world",
    },
  ],
  title: "Network Information",
  subSections: [
    {
      title: "Flow Ecosystem Fund",
      href: "https://docs.onflow.org/flow-cli/start-emulator/",
    },
    {
      title: "Flow Diversity Fund",
      href: "https://docs.onflow.org/flow-cli/configuration/",
    },
    {
      title: "Flow Developer Fund",
      href: "https://docs.onflow.org/vscode-extension/",
    },
    {
      title: "Flow Security Bounties",
      href: "https://github.com/cadence-tools/cadence-for-intellij-platform",
    },
    {
      title: "FLIP Fest (past)",
      href: "https://docs.flowser.dev/",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

export const governanceSection: Section = {
  links: [
    {
      title: "Javascript Testnet Quickstart",
      href: "https://docs.onflow.org/fcl/tutorials/flow-app-quickstart/",
    },
  ],
  title: "Network Information",
  subSections: [
    {
      title: "Network Status",
      href: "https://testnet-faucet.onflow.org/",
    },
    {
      title: "Upcoming Sporks",
      href: "https://testnet-faucet.onflow.org/",
    },
    {
      title: "Past Sporks",
      href: "https://docs.onflow.org/dapp-development/mainnet-account-setup",
    },
    {
      title: "Testnet Explorer",
      href: "https://testnet.flowscan.org/",
    },
    {
      title: "Mainnet Explorer",
      href: "https://flowscan.org/",
    },
  ],
  icon: <NetworkIcon height="1.5em" width="1.5em" />,
}

const NetworkSections = [nodeOperation, flowToken, governanceSection]

const NetworkCards = [networkStatusCard, sporkProcessCard]

export { NetworkSections, NetworkCards }
