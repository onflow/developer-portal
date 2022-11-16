import ConceptsIcon from "~/ui/design-system/images/nav/concepts"
import FundamentalsIcon from "~/ui/design-system/images/nav/fundamentals"
import LearnIcon from "~/ui/design-system/images/nav/learn"
import LocalIcon from "~/ui/design-system/images/nav/local"
import SDKIcon from "~/ui/design-system/images/nav/sdk"
import TestnetIcon from "~/ui/design-system/images/nav/testnet"
import ToolsIcon from "~/ui/design-system/images/nav/tools"
import UsecasesIcon from "~/ui/design-system/images/nav/use-cases"

import { Section } from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import {
  emeraldDaoCard,
  kittyItemsCard,
  playgroundCard,
  gettingStartedCard,
  learnCard,
  flowConceptsCard,
} from "./navCardsData"

// Build Tab
export const sdkSection: Section = {
  links: [
    {
      title: "View all SDKs",
      href: `/tools#sdks`,
    },
  ],
  title: "SDKs",
  subSections: [
    {
      title: "Javascript (FCL)",
      href: "/tools/fcl-js",
    },
    {
      title: "Go",
      href: "/tools/flow-go-sdk",
    },
    {
      title: "HTTP",
      href: `/http-api`,
    },
    {
      title: "JVM/Kotlin",
      href: "https://github.com/onflow/flow-jvm-sdk",
    },
    {
      title: "Swift",
      href: "https://github.com/Outblock/flow-swift",
    },
    {
      title: "Python",
      href: "https://github.com/janezpodhostnik/flow-py-sdk",
    },
  ],
  icon: <SDKIcon height="1.5em" width="1.5em" />,
}

export const toolsSection: Section = {
  links: [
    {
      title: "View all tools & services",
      href: "/tools",
    },
  ],
  title: "Open Source Tools",
  subSections: [
    {
      title: "CLI",
      href: "/tools/flow-cli/",
    },
    {
      title: "Emulator",
      href: "/tools/emulator/",
    },
    {
      title: "JS-Testing",
      href: "/tools/flow-js-testing",
    },
    {
      title: "Development Wallet",
      href: "https://github.com/onflow/fcl-dev-wallet",
    },
    {
      title: "Flow Wallets",
      href: "/tools#wallets",
    },
    {
      title: "Event Indexer",
      href: "https://github.com/rayvin-flow/flow-scanner",
    },
  ],
  icon: <ToolsIcon height="1.5em" width="1.5em" />,
}

// Setup Section

export const localSection: Section = {
  links: [
    {
      title: "Install the Flow CLI",
      href: "/tools/flow-cli/installation",
    },
  ],
  title: "Local Development",
  subSections: [
    {
      title: "Local Development Quickstart",
      href: "https://github.com/emerald-dao/0-hello-world",
    },
    {
      title: "Running Flow on a Local Network",
      href: "/tools/flow-cli/start-emulator/",
    },
    {
      title: "Cadence VS Code Extension",
      href: "/tools/vscode-extension/",
    },
    {
      title: "Flowser: GUI for your local network",
      href: "https://docs.flowser.dev/",
    },
  ],
  icon: <LocalIcon height="1.5em" width="1.5em" />,
}

const liveNetworksSection: Section = {
  links: [
    {
      title: "Javascript testnet quickstart",
      href: "/tools/fcl-js/tutorials/flow-app-quickstart",
    },
  ],
  title: "Testnet & Mainnet",
  subSections: [
    {
      title: "Testnet Account Creation & Faucet",
      href: "https://testnet-faucet.onflow.org/",
    },
    {
      title: "Sandboxnet Account Creation & Faucet",
      href: "https://sandboxnet-faucet.flow.com/",
    },
    {
      title: "Mainnet Account Creation",
      href: "/flow/dapp-development/mainnet-account-setup",
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
      title: "Wallets On Flow",
      href: "/flow/flow-token/available-wallets/",
    },
  ],
  icon: <TestnetIcon height="1.5em" width="1.5em" />,
}

// Developing Dapps
const dappDevelomentSection: Section = {
  links: [
    {
      title: "Learn more about Flow",
      href: "/flow",
    },
  ],
  title: "Developing Dapps",
  subSections: [
    {
      title: "Flow Playground IDE",
      href: "https://play.flow.com",
    },
    {
      title: "Testnet Quickstart",
      href: "/tools/fcl-js/tutorials/flow-app-quickstart",
    },
    {
      title: "NFT Storefront & Marketplace Example",
      href: "/learn/kitty-items",
    },
    {
      title: "Dapp Development Guide",
      href: "/flow/dapp-development",
    },
    {
      title: "Web3 Learning Roadmap",
      href: "https://web3-learning-roadmap.vercel.app",
    },
    {
      title: "Community Resource List",
      href: "https://github.com/ph0ph0/Get-The-Flow-Down",
    },
    {
      title: "Developer Onboarding Guide",
      href: "https://flow-partner-dev-hub.vercel.app",
    },
    {
      title: "Launch a Fungible Token (Guide)",
      href: "/flow/fungible-tokens",
    },
  ],
  icon: <UsecasesIcon height="1.5em" width="1.5em" />,
}

const flowConceptsSection: Section = {
  links: [
    {
      title: "View all learning resources",
      href: "/learn",
    },
  ],
  title: "Flow Fundamentals & Standards",
  subSections: [
    {
      title: "Flow Key Concepts",
      href: "/learn/concepts",
    },
    {
      title: "Fungible Token Standard",
      href: "/flow/core-contracts/fungible-token",
    },
    {
      title: "Non Fungible Token Standard",
      href: "/flow/core-contracts/non-fungible-token",
    },
    {
      title: "Non Fungible Token Metadata Standard",
      href: "/flow/core-contracts/nft-metadata",
    },
    {
      title: "NFT Storefront Standard",
      href: "https://github.com/onflow/nft-storefront",
    },
    {
      title: "Flow Dapp Architecture Overview",
      href: "/flow/dapp-development",
    },
  ],
  icon: <FundamentalsIcon height="1.5em" width="1.5em" />,
}

// Cadence Section

const cadenceConceptsSection: Section = {
  links: [
    {
      title: "View all Cadence resources",
      href: "/cadence",
    },
  ],
  title: "Cadence Fundamentals",
  subSections: [
    {
      title: "Language Reference",
      href: "/cadence/language",
    },
    {
      title: "Design Patterns",
      href: "/cadence/design-patterns",
    },
    {
      title: "Cadence Account, Keys, & Signatures",
      href: "/concepts/accounts-and-keys",
    },
    {
      title: "Solidity to Cadence",
      href: "/cadence/msg-sender",
    },
    {
      title: "Core Contracts",
      href: "/flow/core-contracts/",
    },
  ],
  icon: <ConceptsIcon height="1.5em" width="1.5em" />,
}

const cadenceResourceSection: Section = {
  links: [
    {
      title: "Go to Cadence tutorials",
      href: "/cadence/tutorial/02-hello-world",
    },
  ],
  title: "Cadence Resources",
  subSections: [
    {
      title: "Flow Playground IDE",
      href: "https://play.flow.com",
    },
    {
      title: "Cadence Cookbook",
      href: "https://open-cadence.onflow.org/",
    },
    {
      title: "Buildspace NFT Course",
      href: "https://buildspace.so/p/nfts-on-flow",
    },
    {
      title: "Zero To Hero Cadence Course",
      href: "https://github.com/emerald-dao/beginner-cadence-course",
    },
    {
      title: "Mainnet Contract Browser",
      href: "https://flow-contract-browser.vercel.app/",
    },
  ],
  icon: <LearnIcon height="1.5em" width="1.5em" />,
}

const buildTabData = {
  title: "Tools",
  description: "Start developing dapps on Flow.",
  cards: [gettingStartedCard, kittyItemsCard, playgroundCard],
  sections: [sdkSection, toolsSection],
}

const setupTabData = {
  title: "Setup",
  description: "Connect to our networks or get started locally.",
  cards: [playgroundCard],
  sections: [localSection, liveNetworksSection],
}

const learnTabData = {
  title: "Learn",
  description: "Understand how Flow works.",
  cards: [learnCard, flowConceptsCard, emeraldDaoCard],
  sections: [dappDevelomentSection, flowConceptsSection],
}

const cadenceTabData = {
  title: "Cadence",
  description: "Flow's smart contract programming language.",
  cards: [emeraldDaoCard, playgroundCard],
  sections: [cadenceResourceSection, cadenceConceptsSection],
}

export { buildTabData, setupTabData, learnTabData, cadenceTabData }
