import EcosystemIcon from "~/ui/design-system/images/content/ecosystem"
import { Section } from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import { IntroCardProps } from "~/ui/design-system/src/lib/Components/NavigationBar/IntroCard"

// Connect Tab
export const eventsSection: Section = {
  links: [
    {
      title: "View Community",
      href: "#todo",
    },
  ],
  title: "Flow Ecosystem",
  subSections: [
    {
      title: "Flow Dapp Metrics",
      href: "https://docs.onflow.org/http-api/",
    },
    {
      title: "Emerald Dao Bootcamp",
      href: "https://github.com/onflow/fcl-js",
    },
    {
      title: "Jobs on Flow",
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
  icon: <EcosystemIcon height="1em" width="1em" />,
}

export const socialsSection: Section = {
  links: [
    {
      title: "View all tools",
      href: "#todo",
    },
  ],
  title: "Tools",
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
  icon: <EcosystemIcon height="1em" width="1em" />,
}

// Setup Section

export const playgroundCard: IntroCardProps = {
  href: "https://docs.onflow.org/cadence/tutorial/01-first-steps",
  ctaText: "Learn More",
  description:
    "No tools needed. Learn and experiment with Cadence and smart contracts on Flow in a isolated environment.",
  imageHref: "https://play.onflow.org/flow_logo_TODO.jpg",
  title: "Flow Playground",
}

export const grantsSection: Section = {
  links: [
    {
      title: "View Developer Grants",
      href: "https://github.com/emerald-dao/0-hello-world",
    },
  ],
  title: "Grants & Bounties",
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
  title: "Governance",
  subSections: [
    {
      title: "Voting",
      href: "https://testnet-faucet.onflow.org/",
    },
    {
      title: "FLIPs",
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
    {
      title: "Wallets on Flow",
      href: "https://docs.onflow.org/flow-token/available-wallets/",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

const NetworkSections = [eventsSection, socialsSection]

const NetworkCards = [playgroundCard]

export { NetworkSections, NetworkCards }
