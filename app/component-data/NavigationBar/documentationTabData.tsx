import EcosystemIcon from "~/ui/design-system/images/content/ecosystem"
import { Section } from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import { IntroCardProps } from "~/ui/design-system/src/lib/Components/NavigationBar/IntroCard"

// Build Tab
export const sdkSection: Section = {
  links: [
    {
      title: "View more SDKs",
      href: "#todo",
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
      title: "Starting the Flow Emulator",
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
      title: "Cadence Intellij Plugin",
      href: "https://github.com/cadence-tools/cadence-for-intellij-platform",
    },
    {
      title: "Flowser: GUI for your local network",
      href: "https://docs.flowser.dev/",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

export const liveNetworksSection: Section = {
  links: [
    {
      title: "Javascript Testnet Quickstart",
      href: "https://docs.onflow.org/fcl/tutorials/flow-app-quickstart/",
    },
  ],
  title: "Live Network Tools",
  subSections: [
    {
      title: "Testnet Account Creation and Funding",
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

// Learn Section
export const learnCard: IntroCardProps = {
  href: "/learn",
  ctaText: "View all",
  description:
    "We have aggregated and categorized the best content on building dapps on Flow across the ecosystem.",
  imageHref: "https://academy.ecdao.org/favicon_TODO.png",
  title: "Flow Resource Library",
}

export const emeraldDaoCard: IntroCardProps = {
  href: "https://docs.onflow.org/cadence/tutorial/01-first-steps",
  ctaText: "View Details",
  description:
    "Emerald DAO partners with Flow to produce educational material for Flow. Go from zero to a hero on Flow development with their live bootcamps.",
  imageHref: "https://academy.ecdao.org/favicon_TODO.png",
  title: "Flow Live Bootcamps",
}

export const dappDevelomentSection: Section = {
  links: [
    {
      title: "View our Dapp Development Guide",
      href: "https://docs.onflow.org/dapp-development/",
    },
  ],
  title: "Developing Dapps",
  subSections: [
    {
      title: "Testnet Account Creation and Funding",
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

export const flowConceptsSection: Section = {
  links: [
    {
      title: "View Technical Papers",
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
      href: "https://testnet-faucet.onflow.org/",
    },
    {
      title: "Non Fungible Token Standard",
      href: "https://docs.onflow.org/dapp-development/mainnet-account-setup",
    },
    {
      title: "NFT Storefront Standard",
      href: "https://testnet.flowscan.org/",
    },
    {
      title: "Flow Dapp Architecture Overview",
      href: "https://flowscan.org/",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

// Cadence Section

export const cadenceConceptsSection: Section = {
  links: [
    {
      title: "Go to Cadence Tutorials",
      href: "https://docs.onflow.org/dapp-development/",
    },
  ],
  title: "Cadence Fundamentals",
  subSections: [
    {
      title: "API Reference",
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

export const cadenceResourceSection: Section = {
  links: [
    {
      title: "View Technical Papers",
      href: "https://docs.onflow.org/fcl/tutorials/flow-app-quickstart/",
    },
  ],
  title: "Cadence Resources",
  subSections: [
    {
      title: "Flow Key Concepts",
      href: "https://docs.onflow.org/concepts/",
    },
    {
      title: "Fungible Token Standard",
      href: "https://testnet-faucet.onflow.org/",
    },
    {
      title: "Non Fungible Token Standard",
      href: "https://docs.onflow.org/dapp-development/mainnet-account-setup",
    },
    {
      title: "NFT Storefront Standard",
      href: "https://testnet.flowscan.org/",
    },
    {
      title: "Flow Dapp Architecture Overview",
      href: "https://flowscan.org/",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

const BuildTabData = {
  title: "Build",
  description: "Start developing dapps on Flow.",
  cards: [playgroundCard, learnCard],
  sections: [sdkSection, toolsSection],
}

const SetupTabData = {
  title: "Setup",
  description: "Connect to our networks or get started locally.",
  cards: [playgroundCard, learnCard],
  sections: [localSection, liveNetworksSection],
}

const LearnTabData = {
  title: "Learn",
  description: "Understand how Flow works.",
  cards: [learnCard, emeraldDaoCard],
  sections: [dappDevelomentSection, flowConceptsSection],
}

const CadenceTabData = {
  title: "Cadence",
  description: "Flow's smart contract programming language.",
  cards: [playgroundCard, emeraldDaoCard],
  sections: [cadenceConceptsSection, cadenceResourceSection],
}

export { BuildTabData, SetupTabData, LearnTabData, CadenceTabData }
