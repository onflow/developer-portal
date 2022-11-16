import NetworkIcon from "~/ui/design-system/images/nav/network"
import NodeIcon from "~/ui/design-system/images/nav/node"
import TokenIcon from "~/ui/design-system/images/nav/token"
import NetworkStatusIcon from "~/ui/design-system/images/nav/sdk"
import { Section } from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import { networkStatusCard, sporkProcessCard } from "./navCardsData"
import NetworkStatus from "../../routes/poll-network"

export const networkStatus: Section = {
  links: [
    {
      title: "View all status information",
      href: "https://status.onflow.org/",
    },
  ],
  title: "Network Status",
  icon: <NetworkStatusIcon height="1.5em" width="1.5em" />,
  subSectionComponent: NetworkStatus,
}

export const nodeOperation: Section = {
  links: [
    {
      title: "View all node information",
      href: "/nodes",
    },
  ],
  title: "Node Operation & Staking",
  subSections: [
    {
      title: "Operating a Flow Node",
      href: "/nodes/node-operation/",
    },
    {
      title: "Staking Flow Nodes",
      href: "/nodes/staking/",
    },
    {
      title: "Epochs & Reward Schedules",
      href: "/nodes/flow-port/",
    },
    {
      title: "Flow Port: Staking Guide",
      href: "/nodes/flow-port/",
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
      title: "Supported Exchanges",
      href: "https://flow.com/#buyflow",
    },
    {
      title: "Guide to buying Flow",
      href: "https://flovatar.com/get-started#flow",
    },
  ],
  icon: <TokenIcon height="1.5em" width="1.5em" />,
}

export const governanceSection: Section = {
  links: [
    {
      title: "View all network info",
      href: "/network",
    },
  ],
  title: "Network Information",
  subSections: [
    {
      title: "Upcoming Sporks",
      href: "/network/flow-mainnet",
    },
    {
      title: "Past Sporks",
      href: "/network/flow-mainnet",
    },
    {
      title: "Testnet Explorer",
      href: "https://testnet.flowscan.org/",
    },
    {
      title: "Sandboxnet Explorer",
      href: "https://sandboxnet.flowscan.org/",
    },
    {
      title: "Mainnet Explorer",
      href: "https://flowscan.org/",
    },
    {
      title: "Flow Sustainability Report",
      href: "https://flow.com/sustainability",
    },
  ],
  icon: <NetworkIcon height="1.5em" width="1.5em" />,
}

const NetworkSections = [networkStatus, nodeOperation, governanceSection]

const NetworkCards = [networkStatusCard, sporkProcessCard]

export { NetworkSections, NetworkCards }
