import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import {
  GettingStartedPage,
  GettingStartedPageProps,
} from "~/ui/design-system/src/lib/Pages/GettingStartedPage"
import {
  Icon1,
  Icon2,
  Icon3,
  Default as DefaultGettingStartedProps,
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
  buttonText: "Go to course",
  buttonUrl: "https://github.com/emerald-dao/0-hello-world",
  callout: "Emerald Academy",
  description:
    "Emerald Academy guides you from zero to hero on all things Flow it's smart contract language - Cadence.",
  title: "Getting Started",
}

const linkCard2ColumnItems: LinkCard2ColumnProps = {
  buttonText: "View Concepts",
  buttonUrl: "#changeme",
  description:
    "Building on Flow is easy. Start building now with lorem ipsum et sigitus loranum prospitarius.",
  title: "Core Concepts",
  items: [
    {
      title: "Cadence",
      description:
        "A package used to interact with user wallets and the Flow blockchain.",
      href: "https://www.onflow.org",
      icon: svgToDataUri(<CadenceIcon />),
    },
    {
      title: "Flow Client Library",
      description:
        "A package used to interact with user wallets and the Flow blockchain.",
      href: "#create-non-fungible-token",
      icon: svgToDataUri(<FCLIcon />),
    },
  ],
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
          title: "Hello, World! on Flow",
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
          tags: ["explorer"],
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
          tags: ["roadmap", "beginner"],
        },
      ],
    },
    {
      title: "Build",
      description: "Smart contracts description.",
      icon: <Icon3 />,
      links: [
        {
          title: "Name of a Smart Contract tutorial",
          href: "#tutorial1",
          tags: ["tutorial"],
        },
        {
          title: "Name of a tutorial",
          href: "#tutorial2",
          tags: ["tag1", "tag2", "tag3", "tag4"],
        },
        {
          title: "View all SDK's",
          href: "#sdks",
        },
      ],
    },
  ],
}

type DynamicGettingStartedPageProps = Pick<
  GettingStartedPageProps,
  | "sdkCardItems"
  | "recentToolItems"
  | "contentNavigationItems"
  | "recentArticleItems"
>

export const loader: LoaderFunction = async () => {
  const sdkCardItems = DefaultGettingStartedProps.args?.sdkCardItems as [
    SDKCardProps,
    SDKCardProps,
    SDKCardProps,
    SDKCardProps,
    SDKCardProps,
    SDKCardProps
  ]
  const recentToolItems = DefaultGettingStartedProps.args?.recentToolItems as [
    ToolCardProps,
    ToolCardProps,
    ToolCardProps
  ]
  const contentNavigationItems = DefaultGettingStartedProps.args
    ?.contentNavigationItems as [
    ContentNavigationProps,
    ContentNavigationProps,
    ContentNavigationProps
  ]
  const recentArticleItems = DefaultGettingStartedProps.args
    ?.recentArticleItems as FeaturedArticleCardProps
  const data: DynamicGettingStartedPageProps = {
    sdkCardItems,
    recentToolItems,
    contentNavigationItems,
    recentArticleItems,
  }
  return data
}

export default function Page() {
  const {
    sdkCardItems,
    recentToolItems,
    contentNavigationItems,
    recentArticleItems,
  } = useLoaderData<DynamicGettingStartedPageProps>()

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
