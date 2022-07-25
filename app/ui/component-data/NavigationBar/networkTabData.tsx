import NetworkIcon from "~/ui/design-system/images/nav/network"
import NodeIcon from "~/ui/design-system/images/nav/node"
import TokenIcon from "~/ui/design-system/images/nav/token"
import NetworkStatusIcon from "~/ui/design-system/images/nav/sdk"
import { Section } from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import { networkStatusCard, sporkProcessCard } from "./navCardsData"

export const networkStatus: Section = {
  title: "Network Status",
  icon: <NetworkStatusIcon height="1.5em" width="1.5em" />,
}

export const nodeOperation: Section = {
  links: [
    {
      title: "Read the node operation guide",
      href: "/nodes/node-operation/",
    },
  ],
  title: "Node Operation & Staking",
  subSections: [
    {
      title: "Operating a Flow Node",
      href: "/nodes/node-operation/",
    },
    {
      title: "Staking Walkthrough",
      href: "/nodes/flow-port/staking-guide/",
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
      href: "/faq",
    },
  ],
  title: "Flow Token",
  subSections: [
    {
      title: "Token Distribution",
      href: "/flow/token-distribution",
    },
    {
      title: "Token Economics",
      href: "/flow/flow-token-economics",
    },
    {
      title: "Get FLOW",
      href: "https://flovatar.com/get-started#flow",
    },
  ],
  icon: <TokenIcon height="1.5em" width="1.5em" />,
}

export const governanceSection: Section = {
  links: [
    {
      title: "View our sustainability report",
      href: "https://flow.com/sustainability",
    },
  ],
  title: "Network Information",
  subSections: [
    {
      title: "Network Status",
      href: "https://status.onflow.org/",
    },
    {
      title: "Upcoming Sporks",
      href: "/nodes/node-operation/upcoming-sporks",
    },
    {
      title: "Past Sporks",
      href: "/nodes/node-operation/past-sporks",
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

const NetworkSections = [networkStatus, nodeOperation, governanceSection]

const NetworkCards = [networkStatusCard, sporkProcessCard]

export { NetworkSections, NetworkCards }
