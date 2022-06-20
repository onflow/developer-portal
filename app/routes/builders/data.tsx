import {
  Icon1,
  Icon2,
  Icon3,
} from "~/ui/design-system/src/lib/Pages/GettingStartedPage/GettingStartedPage.stories"
import { svgToDataUri } from "~/ui/design-system/src/lib/Components/LinkCard2Column/LinkCard2Column.stories"
import { ReactComponent as CadenceIcon } from "~/ui/design-system/images/tools/tool-cadence"
import { ReactComponent as FCLIcon } from "~/ui/design-system/images/tools/tool-fcl"
import { SDKCardProps } from "~/ui/design-system/src/lib/Components/SDKCard"
import { ContentNavigationProps } from "~/ui/design-system/src/lib/Components/ContentNavigation"
import { LandingHeaderProps } from "~/ui/design-system/src/lib/Components/LandingHeader"
import { LinkCard3ColumnProps } from "~/ui/design-system/src/lib/Components/LinkCard3Column"
import { LinkCard2ColumnProps } from "~/ui/design-system/src/lib/Components/LinkCard2Column"
import {
  goSDK,
  fclSDK,
  jvmSDK,
  swiftSDK,
  httpSDK,
  dotNetSDK,
  overflowTool,
  flowserTool,
  flowScannerTool,
} from "../../component-data/Tools"
import { introToFlowBlockchainArticle } from "../../component-data/Articles"
import { FeaturedArticleCardProps } from "~/ui/design-system/src/lib/Components/FeaturedArticleCard"
import { ToolCardProps } from "~/ui/design-system/src/lib/Components/ToolCard"

const landingHeaderItems: LandingHeaderProps = {
  buttonText: "View Course",
  buttonUrl: "https://github.com/emerald-dao/0-hello-world",
  callout: "Emerald Academy",
  description:
    "Emerald Academy guides you from zero to hero on all things Flow it's smart contract language - Cadence.",
  title: "Getting Started",
  imageSrc: "https://academy.ecdao.org/thumb-beginner-cadence.png",
}

const linkCard3ColumnItems: LinkCard3ColumnProps = {
  items: [
    {
      title: "Try",
      description:
        "A package used to interact with user wallets and the Flow blockchain.",
      icon: <Icon1 />,
      links: [
        {
          title: "Hello, World on Flow!",
          href: "https://docs.onflow.org/cadence/tutorial/02-hello-world/",
          tags: ["tutorial", "cadence", "playground"],
        },
        {
          title: "Javascript Quickstart",
          href: "https://docs.onflow.org/fcl/tutorials/flow-app-quickstart/",
          tags: ["tutorial", "beginner"],
        },
        {
          title: "NFT Storefront & Marketplace",
          href: "https://docs.onflow.org/kitty-items/",
          tags: ["example", "intermediate"],
        },
        {
          title: "Cadence Cookbook",
          href: "https://open-cadence.onflow.org/",
          tags: ["sample", "playground"],
        },
        {
          title: "Flow Block Explorer",
          href: "https://flowscan.org/",
        },
      ],
    },
    {
      title: "Learn",
      description:
        "An up to 3-line blurb here describing the section lorem ipsum dolor sit amet proin.",
      icon: <Icon2 />,
      links: [
        {
          title: "Flow Architecture",
          href: "https://www.onflow.org/technical-paper",
          tags: ["protocol", "security"],
        },
        {
          title: "Dapp Architecture on Flow",
          href: "#tutorial1",
          tags: ["guide", "overview"],
        },
        {
          title: "Solidity to Cadence",
          href: "#tutorial2",
          tags: ["guide", "beginner"],
        },
        {
          title: "Youtube Tutorials",
          href: "https://www.youtube.com/playlist?list=PLvcQxi9WyGdGUx-a4rCsLWn_WKlA9YAXP",
          tags: ["tutorial", "beginner", "video"],
        },
        {
          title: "Learn Web3",
          href: "https://web3-learning-roadmap.vercel.app/",
        },
      ],
    },
    {
      title: "Build",
      description: "Smart contracts description.",
      icon: <Icon3 />,
      links: [
        {
          title: "Get the Flow CLI",
          href: "https://docs.onflow.org/flow-cli/install/",
          tags: ["install"],
        },
        {
          title: "VS Code Extension",
          href: "https://docs.onflow.org/vscode-extension/",
          tags: ["ide", "cadence"],
        },
        {
          title: "Testnet Account Creation",
          href: "https://flow-faucet.vercel.app/",
          tags: ["faucet", "create", "fund"],
        },
        {
          title: "Dapp Development on Flow",
          href: "#todo",
          tags: ["guide", "overview"],
        },
        {
          title: "View all Tools",
          href: "/tools",
        },
      ],
    },
  ],
}

const linkCard2ColumnItems: LinkCard2ColumnProps = {
  buttonText: "View Concepts",
  buttonUrl: "/concepts",
  description:
    "Building on Flow is easy. Start building now with lorem ipsum et sigitus loranum prospitarius.",
  title: "Core Concepts",
  items: [
    {
      title: "Cadence",
      description:
        "Cadence is a resource-oriented programming language that introduces new features to smart contract programming.",
      href: "https://docs.onflow.org/cadence/",
      icon: svgToDataUri(<CadenceIcon />),
    },
    {
      title: "Flow Client Library",
      description:
        "The Flow Client Library (FCL) JS is a package used to interact with user wallets and the Flow blockchain.",
      href: "https://docs.onflow.org/fcl/",
      icon: svgToDataUri(<FCLIcon />),
    },
  ],
}

const sdkCardItems: [
  SDKCardProps,
  SDKCardProps,
  SDKCardProps,
  SDKCardProps,
  SDKCardProps,
  SDKCardProps
] = [goSDK, fclSDK, jvmSDK, swiftSDK, httpSDK, dotNetSDK]

const contentNavigationItems: [
  ContentNavigationProps,
  ContentNavigationProps,
  ContentNavigationProps
] = [
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
    title: "Concepts",
    text: "Understand how Flow and dapps on Flow work.",
    link: "/concepts",
    icon: "concepts",
  },
]

const recentArticleItems: [
  FeaturedArticleCardProps,
  FeaturedArticleCardProps,
  FeaturedArticleCardProps
] = [
  introToFlowBlockchainArticle,
  introToFlowBlockchainArticle,
  introToFlowBlockchainArticle,
]
const recentToolItems: [ToolCardProps, ToolCardProps, ToolCardProps] = [
  overflowTool,
  flowserTool,
  flowScannerTool,
]

export {
  contentNavigationItems,
  recentArticleItems,
  recentToolItems,
  sdkCardItems,
  linkCard2ColumnItems,
  linkCard3ColumnItems,
  landingHeaderItems,
}
