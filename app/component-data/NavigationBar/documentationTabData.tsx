import ConceptsIcon from "~/ui/design-system/images/nav/concepts"
import FundamentalsIcon from "~/ui/design-system/images/nav/fundamentals"
import LearnIcon from "~/ui/design-system/images/nav/learn"
import LocalIcon from "~/ui/design-system/images/nav/local"
import SDKIcon from "~/ui/design-system/images/nav/sdk"
import TestnetIcon from "~/ui/design-system/images/nav/testnet"
import ToolsIcon from "~/ui/design-system/images/nav/tools"
import UsecasesIcon from "~/ui/design-system/images/nav/use-cases"

import { Section } from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import { emeraldDaoCard, kittyItemsCard, playgroundCard } from "./navCardsData"

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
      title: "HTTP",
      href: `/http-api`,
    },
    {
      title: "Javascript",
      href: "/fcl-js",
    },
    {
      title: "Go",
      href: "/tools/flow-go-sdk",
    },
    {
      title: "JVM",
      href: "https://github.com/onflow/flow-jvm-sdk",
    },
    {
      title: "Swift",
      href: "https://github.com/Outblock/flow-swift",
    },
  ],
  icon: <SDKIcon height="1.5em" width="1.5em" />,
}

export const toolsSection: Section = {
  links: [
    {
      title: "View all tools",
      href: "/tools",
    },
  ],
  title: "Tools",
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
      title: "Local Dev Wallet",
      href: "https://github.com/onflow/fcl-dev-wallet",
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
      title: "Local development quickstart",
      href: "https://github.com/emerald-dao/0-hello-world",
    },
  ],
  title: "Local Development",
  subSections: [
    {
      title: "Use the Flow Emulator",
      href: "/tools/flow-cli/start-emulator/",
    },
    {
      title: "Configuring your local network",
      href: "/tools/flow-cli/configuration/",
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
      href: "/fcl-js/tutorials/flow-app-quickstart",
    },
  ],
  title: "Testnet & Mainnet",
  subSections: [
    {
      title: "Testnet Account Creation & Faucet",
      href: "https://testnet-faucet.onflow.org/",
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
      title: "Mainnet Explorer",
      href: "https://flowscan.org/",
    },
    {
      title: "Wallets on Flow",
      href: "/flow/flow-token/available-wallets/",
    },
  ],
  icon: <TestnetIcon height="1.5em" width="1.5em" />,
}

// Developing Dapps
const dappDevelomentSection: Section = {
  links: [
    {
      title: "View our dapp development guide",
      href: "/flow/dapp-development/",
    },
  ],
  title: "Developing Dapps",
  subSections: [
    {
      title: "Testnet quickstart",
      href: "/fcl-js/tutorials/flow-app-quickstart",
    },
    {
      title: "NFT Storefront & Marketplace Example",
      href: "/learn/kitty-items/",
    },
    {
      title: "Cadence Playground Tutorials",
      href: "/cadence/tutorial/02-hello-world/",
    },
    {
      title: "Web3 Learning Roadmap",
      href: "https://web3-learning-roadmap.vercel.app/",
    },
    {
      title: "Community resource list",
      href: "https://github.com/ph0ph0/Get-The-Flow-Down",
    },
    {
      title: "Developer quickstart",
      href: "https://flow-partner-dev-hub.vercel.app/",
    },
  ],
  icon: <UsecasesIcon height="1.5em" width="1.5em" />,
}

const flowConceptsSection: Section = {
  links: [
    {
      title: "View technical papers",
      href: "https://www.onflow.org/technical-paper",
    },
  ],
  title: "Flow Fundamentals & Standards",
  subSections: [
    {
      title: "Flow Key Concepts",
      href: "/flow/concepts",
    },
    {
      title: "Fungible Token Standard",
      href: "flow/core-contracts/fungible-token",
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
      title: "Go to Cadence tutorials",
      href: "/cadence/tutorial/02-hello-world/",
    },
  ],
  title: "Cadence Fundamentals",
  subSections: [
    {
      title: "Introduction & Overview",
      href: "/cadence/",
    },
    {
      title: "Language Reference",
      href: "/cadence/language/",
    },
    {
      title: "Design Patterns",
      href: "/cadence/design-patterns/",
    },
    {
      title: "Cadence Account, Keys, & Signatures",
      href: "/concepts/accounts-and-keys/",
    },
    {
      title: "Solidity to Cadence",
      href: "/cadence/msg-sender/",
    },
  ],
  icon: <ConceptsIcon height="1.5em" width="1.5em" />,
}

const cadenceResourceSection: Section = {
  links: [
    {
      title: "View technical papers",
      href: "https://www.onflow.org/technical-paper",
    },
  ],
  title: "Cadence Resources",
  subSections: [
    {
      title: "Cadence cookbook",
      href: "https://open-cadence.onflow.org/",
    },
    {
      title: "Core contracts",
      href: "/flow/core-contracts/",
    },
    {
      title: "Cadence tutorials",
      href: "/cadence/tutorial/02-hello-world/",
    },
    {
      title: "Zero to hero Cadence course",
      href: "https://github.com/emerald-dao/beginner-cadence-course",
    },
    {
      title: "Gold Star Contracts",
      href: "https://github.com/muttoni/gold-star-contracts",
    },
  ],
  icon: <LearnIcon height="1.5em" width="1.5em" />,
}

const buildTabData = {
  title: "Build",
  description: "Start developing dapps on Flow.",
  cards: [kittyItemsCard, playgroundCard],
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
  cards: [emeraldDaoCard, kittyItemsCard],
  sections: [dappDevelomentSection, flowConceptsSection],
}

const cadenceTabData = {
  title: "Cadence",
  description: "Flow's smart contract programming language.",
  cards: [playgroundCard, emeraldDaoCard],
  sections: [cadenceConceptsSection, cadenceResourceSection],
}

export { buildTabData, setupTabData, learnTabData, cadenceTabData }
