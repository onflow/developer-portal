import { ReactComponent as EcosystemIcon } from "~/ui/design-system/images/content/ecosystem"
import { ReactComponent as SDKIcon } from "~/ui/design-system/images/content/sdk"
import { ReactComponent as UseCaseIcon } from "~/ui/design-system/images/content/use-cases"
import {
  LinkCard2ColumnProps,
  LinkCard3ColumnItems,
} from "~/ui/design-system/src"
import FlowIcon from "../../ui/design-system/images/logos/flow-icon.svg"
const homepageStartProjectData: LinkCard2ColumnProps = {
  buttonText: "Get started",
  buttonUrl: "/getting-started",
  description: `Building on Flow is easy. 
      Start building now on web3 with the power of resource-oriented programming, multi-node architecture, 
      and a host of other features and tooling to make your dapp development easy and efficient.`,
  title: "Start Your Project",
  tags: ["onflow"],
  items: [
    {
      title: "Kitty Items",
      description:
        "A full stack example NFT storefront and marketplace built with the latest standards and tooling on Flow. Get it up and running in a few minutes.",
      href: "https://docs.onflow.org/kitty-items/",
      icon: "https://kitty-items-flow-testnet-prod.herokuapp.com/images/kitty-items-logo.svg",
    },
    {
      title: "Mint NFTs on the Playground with Cadence",
      description:
        "A series of tutorials that explain how to build your first NFT (Non-Fungible Token).",
      icon: FlowIcon,
      links: [
        {
          href: "https://docs.onflow.org/cadence/tutorial/02-hello-world/",
          title: "Hello, World!",
        },
        {
          href: "https://docs.onflow.org/cadence/tutorial/04-non-fungible-tokens/",
          title: "NFTs",
        },
        {
          href: "https://docs.onflow.org/cadence/tutorial/05-marketplace-setup/",
          title: "Marketplaces",
        },
      ],
    },
  ],
}

const homepageThreeColumnData: LinkCard3ColumnItems = [
  {
    title: "Quickstarts",
    description:
      "Quick ways to get started in the environments for development.",
    icon: <UseCaseIcon height="1.5em" width="1.5em" />,
    links: [
      {
        title: "Get started locally",
        href: "https://github.com/emerald-dao/0-hello-world",
        tags: ["emulator"],
      },
      {
        title: "Get started on testnet",
        href: "https://docs.onflow.org/fcl/tutorials/flow-app-quickstart/",
        tags: ["javascript"],
      },
      {
        title: "Get started on the playground",
        href: "https://docs.onflow.org/cadence/tutorial/02-hello-world/",
        tags: ["playground"],
      },
      {
        title: "View all tools and services",
        href: "/tools",
      },
    ],
  },
  {
    title: "Guides & Tutorials",
    description: "A more in-depth look at how dapp development works.",
    icon: <EcosystemIcon height="1.5em" width="1.5em" />,
    links: [
      {
        title: "Anatomy of a Flow dapp",
        href: "https://docs.onflow.org/dapp-development/flow-dapp-anatomy/",
        tags: ["overview"],
      },
      {
        title: "Flow key concepts",
        href: "https://docs.onflow.org/concepts/accounts-and-keys/",
        tags: ["accounts", "signing"],
      },
      {
        title: "Deploy your project",
        href: "https://docs.onflow.org/flow-cli/deploy-project-contracts/",
        tags: ["cli", "tutorial"],
      },
      {
        title: "View more learning resources",
        href: "/coming-soon", // TODO: We need to expose this footer once the /learn page is production ready
      },
    ],
  },
  {
    title: "Smart Contracts",
    description:
      "Use Cadence to interact with and create smart contracts on chain.",
    icon: <SDKIcon height="1.5em" width="1.5em" />,
    links: [
      {
        title: "Why Cadence?",
        href: "https://medium.com/coinmonks/how-cadence-and-flow-will-revolutionize-smart-contract-programming-607bd05b49b",
        tags: ["blog"],
      },
      {
        title: "Introduction to Cadence",
        href: "https://docs.onflow.org/cadence/",
        tags: ["overview"],
      },
      {
        title: "Cadence cookbook",
        href: "https://open-cadence.onflow.org/",
        tags: ["samples", "playground"],
      },
      {
        title: "View all Cadence content",
        href: "https://docs.onflow.org/cadence/",
      },
    ],
  },
]

export { homepageThreeColumnData, homepageStartProjectData }
