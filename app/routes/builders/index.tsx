import { GettingStartedPage } from "~/ui/design-system/src/lib/Pages/GettingStartedPage"
import {
  Icon1,
  Icon2,
  Icon3,
} from "~/ui/design-system/src/lib/Pages/GettingStartedPage/GettingStartedPage.stories"
import { svgToDataUri } from "~/ui/design-system/src/lib/Components/LinkCard2Column/LinkCard2Column.stories"
import { ReactComponent as CadenceIcon } from "~/ui/design-system/images/tools/tool-cadence"
import { ReactComponent as FCLIcon } from "~/ui/design-system/images/tools/tool-fcl"
import { SDKCardProps } from "~/ui/design-system/src/lib/Components/SDKCard"
import { ToolCardProps } from "~/ui/design-system/src/lib/Components/ToolCard"
import { FeaturedArticleCardProps } from "~/ui/design-system/src/lib/Components/FeaturedArticleCard"
import { ContentNavigationProps } from "~/ui/design-system/src/lib/Components/ContentNavigation"
import { LandingHeaderProps } from "~/ui/design-system/src/lib/Components/LandingHeader"
import { LinkCard3ColumnProps } from "~/ui/design-system/src/lib/Components/LinkCard3Column"
import { LinkCard2ColumnProps } from "~/ui/design-system/src/lib/Components/LinkCard2Column"

const landingHeaderItems: LandingHeaderProps = {
  buttonText: "View Course",
  buttonUrl: "https://github.com/emerald-dao/0-hello-world",
  callout: "Emerald Academy",
  description:
    "Emerald Academy guides you from zero to hero on all things Flow it's smart contract language - Cadence.",
  title: "Getting Started",
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
] = [
  {
    title: "FCL",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "onflow",
    tags: ["documentation", "active"],
    link: "https://github.com/onflow/fcl-js",
    stars: 268,
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    lastCommit: "20/6/2022",
    lastRelease: "1",
  },
  {
    title: "Go",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "onflow",
    tags: ["documentation", "active"],
    link: "https://github.com/onflow/flow-go-sdk",
    stars: 186,
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    lastCommit: "20/6/2022",
    lastRelease: "1",
  },
  {
    title: "JVM",
    authorIcon:
      "https://onunblocked.com/_next/static/media/logo-unblocked-by-nftco.8d69dd0c.svg",
    authorName: "The NFT Company",
    tags: ["active"],
    link: "https://github.com/onflow/flow-jvm-sdk",
    stars: 52,
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    lastCommit: "22/3",
    lastRelease: "207",
  },
  {
    title: "Rust",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "mini flow",
    tags: ["Tags"],
    link: "#",
    stars: 52,
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
    lastCommit: "22/3",
    lastRelease: "207",
  },
  {
    title: "Swift",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "mini flow",
    tags: ["documentation", "active"],
    link: "#",
    stars: 52,
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
    lastCommit: "22/3",
    lastRelease: "207",
  },
  {
    title: ".NET",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "mini flow",
    tags: ["documentation", "active"],
    link: "https://github.com/tyronbrand/flow.net",
    stars: 52,
    iconSrc:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
    lastCommit: "22/3",
    lastRelease: "207",
  },
]

const recentToolItems: [ToolCardProps, ToolCardProps, ToolCardProps] = [
  {
    title: "Overflow",
    authorIcon: "https://avatars.githubusercontent.com/u/10621?v=4",
    authorName: "bjartek",
    tags: ["Go", "testing", "cadence"],
    link: "https://github.com/bjartek/overflow",
    stars: 17,
    iconSrc: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    description:
      "Test your Cadence logic with a go-based testing framework made specifically for Flow.",
  },
  {
    title: "Flow Scanner",
    authorIcon: "https://avatars.githubusercontent.com/u/93519414?s=200&v=4",
    authorName: "mini flow",
    tags: ["events", "indexing"],
    link: "#",
    stars: 9,
    iconSrc: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    description:
      "A standalone service that can monitor the Flow blockchain for one or more Cadence event types and broadcast those events to one or more consumers.",
  },
  {
    title: "Flowser",
    authorIcon: "https://docs.flowser.dev/img/logo.svg",
    authorName: "onflowser",
    tags: ["GUI", "explorer", "local"],
    link: "https://docs.flowser.dev/",
    stars: 28,
    iconSrc: "https://docs.flowser.dev/img/logo.svg",
    description: `Flowser lets you inspect the current state of any flow blockchain network (emulator, testnet, mainnet,..) and
      it also manages the Flow emulator"`,
  },
]

const recentArticleItems: FeaturedArticleCardProps[] = [
  {
    heading: "Introduction to Flow blockchain",
    tags: ["protocol", "network"],
    description: `When Dapper Labs built Crypto Kitties we learned a lot.
    Most importantly, we realized that the technology at the time was not ready for this kind of application.
    Being the visionaries we are, we set to build a better tech for what we plan to do.
    We set to build what is now Flow blockchain.`,
    link: "https://jan-bernatik.medium.com/introduction-to-flow-blockchain-7532977c8af8",
    ctaText: "View Article",
  },
  {
    heading: "Introduction to Flow blockchain",
    tags: ["protocol", "network"],
    description: `When Dapper Labs built Crypto Kitties we learned a lot.
    Most importantly, we realized that the technology at the time was not ready for this kind of application.
    Being the visionaries we are, we set to build a better tech for what we plan to do.
    We set to build what is now Flow blockchain.`,
    link: "https://jan-bernatik.medium.com/introduction-to-flow-blockchain-7532977c8af8",
    ctaText: "View Article",
  },
]

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

export default function Page() {
  return (
    <GettingStartedPage
      landingHeaderItems={landingHeaderItems}
      sdkCardItems={sdkCardItems}
      recentToolItems={recentToolItems}
      recentArticleItems={recentArticleItems}
      contentNavigationItems={contentNavigationItems}
      linkCard3ColumnItems={linkCard3ColumnItems}
      linkCard2ColumnItems={linkCard2ColumnItems}
    />
  )
}
