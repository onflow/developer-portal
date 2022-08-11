import { ReactComponent as EcosystemIcon } from "~/ui/design-system/images/content/ecosystem"
import { ReactComponent as SDKIcon } from "~/ui/design-system/images/content/sdk"
import { ReactComponent as UseCaseIcon } from "~/ui/design-system/images/content/use-cases"
import {
  LinkCard2ColumnProps,
  LinkCard3ColumnItems,
} from "~/ui/design-system/src"
import { ContentNavigationListProps } from "~/ui/design-system/src/lib/Components/ContentNavigationList"
import PlaygroundIcon from "../../ui/design-system/images/misc/playground-default.png"
import FCLIcon from "../../ui/design-system/images/tools/tool-fcl.svg"

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
      title: "Flow Quickstart",
      description:
        "Build a front-end and run your first transactions on the Flow blockchain within minutes.",
      href: "/tools/fcl-js/tutorials/flow-app-quickstart/",
      icon: FCLIcon,
    },
    {
      title: "Learn Smart Contracts",
      description:
        "A series of tutorials that explain how to build your first smart contracts with our programming language, Cadence.",
      icon: PlaygroundIcon,
      links: [
        {
          href: "/cadence/tutorial/02-hello-world/",
          title: "Hello, World!",
        },
        {
          href: "/cadence/tutorial/05-non-fungible-tokens-1/",
          title: "NFTs",
        },
        {
          href: "/cadence/tutorial/07-marketplace-setup/",
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
        href: "/tools/fcl-js/tutorials/flow-app-quickstart/",
        tags: ["javascript"],
      },
      {
        title: "Get started on the playground",
        href: "/cadence/tutorial/02-hello-world/",
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
        href: "/flow/dapp-development/flow-dapp-anatomy/",
        tags: ["overview"],
      },
      {
        title: "Flow key concepts",
        href: "/learn/concepts/accounts-and-keys/",
        tags: ["accounts", "signing"],
      },
      {
        title: "Deploy your project",
        href: "tools/flow-cli/deploy-project-contracts/",
        tags: ["cli", "tutorial"],
      },
      {
        title: "View more learning resources",
        href: "/learn",
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
        title: "Resource oriented programming",
        href: "/cadence#intuiting-ownership-with-resources",
        tags: ["overview"],
      },
      {
        title: "Cadence cookbook",
        href: "https://open-cadence.onflow.org/",
        tags: ["samples", "playground"],
      },
      {
        title: "View all Cadence content",
        href: "/cadence/",
      },
    ],
  },
]

const contentNavigationListItems: ContentNavigationListProps = {
  header: "Explore More Content",
  contentNavigationItems: [
    {
      title: "Learn",
      text: "All the resources you need to learn and build.",
      link: "/learn",
      icon: "learn",
    },
    {
      title: "Tools",
      text: "Curated list of developer tools, services, SDKs.",
      link: "/tools",
      icon: "tools",
    },
    {
      title: "Community",
      text: "Learn more about Flow's ecosystem and get involved.",
      link: "/community",
      icon: "community",
    },
  ],
}

export {
  homepageThreeColumnData,
  homepageStartProjectData,
  contentNavigationListItems,
}
