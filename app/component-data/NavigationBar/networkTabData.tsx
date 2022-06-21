import EcosystemIcon from "~/ui/design-system/images/content/ecosystem"
import NetworkIcon from "~/ui/design-system/images/nav/network"
import NodeIcon from "~/ui/design-system/images/nav/node"
import TokenIcon from "~/ui/design-system/images/nav/token"
import { Section } from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import { networkStatusCard, sporkProcessCard } from "./navCardsData"

export const nodeOperation: Section = {
  links: [
    {
      title: "View our sustainability report",
      href: "https://flow.com/sustainability",
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
      href: "https://port.onflow.org/",
    },
  ],
  icon: <NodeIcon height="1.5em" width="1.5em" />,
}

export const flowToken: Section = {
  links: [
    {
      title: "View Flow FAQs",
      href: "https://flow.com/faq",
    },
  ],
  title: "Flow Token",
  subSections: [
    {
      title: "Token Distribution",
      href: "https://www.onflow.org/token-distribution",
    },
    {
      title: "Token Economics",
      href: "https://www.onflow.org/flow-token-economics",
    },
    {
      title: "Get FLOW",
      href: "https://flovatar.com/get-started#flow",
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
      href: "https://flow.com/ecosystemsupport",
    },
    {
      title: "Flow Developer Fund",
      href: "https://github.com/onflow/developer-grants",
    },
    {
      title: "Flow Security Bounties",
      href: "https://docs.onflow.org/bounties",
    },
    {
      title: "FLIP Fest (past)",
      href: "https://github.com/onflow/flip-fest/blob/main/winners.md",
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
      href: "https://docs.onflow.org/status/",
    },
    {
      title: "Upcoming Sporks",
      href: "https://docs.onflow.org/node-operation/upcoming-sporks/",
    },
    {
      title: "Past Sporks",
      href: "https://docs.onflow.org/node-operation/past-sporks/",
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
