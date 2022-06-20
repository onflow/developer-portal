import EcosystemIcon from "~/ui/design-system/images/content/ecosystem"
import { Section } from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import {
  playgroundCard,
  emeraldDaoCard,
  learnCard,
  kittyItemsCard,
} from "./navCardsData"

// Build Tab
export const sdkSection: Section = {
  links: [
    {
      title: "View all SDKs",
      href: "https://docs.onflow.org/sdks/",
    },
  ],
  title: "SDKs",
  subSections: [
    {
      title: "HTTP",
      href: "https://docs.onflow.org/http-api/",
    },
    {
      title: "Javascript",
      href: "https://github.com/onflow/fcl-js",
    },
    {
      title: "Go",
      href: "https://github.com/onflow/flow-go-sdk",
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
  icon: <EcosystemIcon height="1em" width="1em" />,
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
      href: "https://docs.onflow.org/flow-cli/",
    },
    {
      title: "Emulator",
      href: "https://docs.onflow.org/emulator/",
    },
    {
      title: "Local Dev Wallet",
      href: "https://github.com/onflow/fcl-dev-wallet",
    },
    {
      title: "JS-Testing",
      href: "https://docs.onflow.org/flow-js-testing/",
    },
    {
      title: "Event Indexer",
      href: "https://github.com/rayvin-flow/flow-scanner",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
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
      href: "https://docs.onflow.org/flow-cli/start-emulator/",
    },
    {
      title: "Configuring your local network",
      href: "https://docs.onflow.org/flow-cli/configuration/",
    },
    {
      title: "Cadence VS Code Extension",
      href: "https://docs.onflow.org/vscode-extension/",
    },
    {
      title: "Flowser: GUI for your local network",
      href: "https://docs.flowser.dev/",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

const liveNetworksSection: Section = {
  links: [
    {
      title: "Javascript testnet quickstart",
      href: "https://docs.onflow.org/fcl/tutorials/flow-app-quickstart/",
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

// Developing Dapps
const dappDevelomentSection: Section = {
  links: [
    {
      title: "View our dapp development guide",
      href: "https://docs.onflow.org/dapp-development/",
    },
  ],
  title: "Developing Dapps",
  subSections: [
    {
      title: "Testnet quickstart",
      href: "https://docs.onflow.org/fcl/tutorials/flow-app-quickstart/",
    },
    {
      title: "NFT Storefront & Marketplace Example",
      href: "https://docs.onflow.org/kitty-items/",
    },
    {
      title: "Cadence Playground Tutorials",
      href: "https://docs.onflow.org/cadence/tutorial/02-hello-world/",
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
  icon: <EcosystemIcon height="1em" width="1em" />,
}

const flowConceptsSection: Section = {
  links: [
    {
      title: "View technical papers",
      href: "https://docs.onflow.org/fcl/tutorials/flow-app-quickstart/",
    },
  ],
  title: "Flow Fundamentals & Standards",
  subSections: [
    {
      title: "Flow Key Concepts",
      href: "https://docs.onflow.org/concepts/",
    },
    {
      title: "Fungible Token Standard",
      href: "https://docs.onflow.org/core-contracts/fungible-token/",
    },
    {
      title: "Non Fungible Token Standard",
      href: "https://docs.onflow.org/core-contracts/non-fungible-token/",
    },
    {
      title: "Non Fungible Token Metadata Standard",
      href: "https://docs.onflow.org/core-contracts/nft-metadata/",
    },
    {
      title: "NFT Storefront Standard",
      href: "https://github.com/onflow/nft-storefront",
    },
    {
      title: "Flow Dapp Architecture Overview",
      href: "https://flowscan.org/",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

// Cadence Section

const cadenceConceptsSection: Section = {
  links: [
    {
      title: "Go to Cadence tutorials",
      href: "https://docs.onflow.org/cadence/tutorial/02-hello-world/",
    },
  ],
  title: "Cadence Fundamentals",
  subSections: [
    {
      title: "Introduction & Overview",
      href: "https://docs.onflow.org/cadence/",
    },
    {
      title: "Language Reference",
      href: "https://docs.onflow.org/cadence/language/",
    },
    {
      title: "Design Patterns",
      href: "https://docs.onflow.org/cadence/design-patterns/",
    },
    {
      title: "Cadence Account, Keys, & Signatures",
      href: "https://docs.onflow.org/concepts/accounts-and-keys/",
    },
    {
      title: "Solidity to Cadence",
      href: "https://docs.onflow.org/cadence/msg-sender/",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

const cadenceResourceSection: Section = {
  links: [
    {
      title: "View technical papers",
      href: "https://docs.onflow.org/fcl/tutorials/flow-app-quickstart/",
    },
  ],
  title: "Cadence Resources",
  subSections: [
    {
      title: "Cadence cookbook",
      href: "https://docs.onflow.org/concepts/",
    },
    {
      title: "Core contracts",
      href: "https://testnet-faucet.onflow.org/",
    },
    {
      title: "Cadence tutorials",
      href: "https://docs.onflow.org/dapp-development/mainnet-account-setup",
    },
    {
      title: "Zero to Hero",
      href: "https://testnet.flowscan.org/",
    },
    {
      title: "Flow Dapp Architecture Overview",
      href: "https://flowscan.org/",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

const buildTabData = {
  title: "Build",
  description: "Start developing dapps on Flow.",
  cards: [kittyItemsCard, playgroundCard, learnCard],
  sections: [sdkSection, toolsSection],
}

const setupTabData = {
  title: "Setup",
  description: "Connect to our networks or get started locally.",
  cards: [playgroundCard, learnCard],
  sections: [localSection, liveNetworksSection],
}

const learnTabData = {
  title: "Learn",
  description: "Understand how Flow works.",
  cards: [emeraldDaoCard, learnCard, kittyItemsCard],
  sections: [dappDevelomentSection, flowConceptsSection],
}

const cadenceTabData = {
  title: "Cadence",
  description: "Flow's smart contract programming language.",
  cards: [playgroundCard, emeraldDaoCard],
  sections: [cadenceConceptsSection, cadenceResourceSection],
}

export { buildTabData, setupTabData, learnTabData, cadenceTabData }