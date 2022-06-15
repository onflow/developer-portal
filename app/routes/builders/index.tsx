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

const linkCard2ColumnItems: LinkCard2ColumnProps = {
  buttonText: "View Concepts",
  buttonUrl: "#changeme",
  description:
    "Building on Flow is easy. Start building now with lorem ipsum et sigitus loranum prospitarius.",
  title: "Core Concepts",
  tags: ["Tag", "Lorem", "Ipsum"],
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
      title: "Quick Start",
      description:
        "An up to 3-line blurb here describing the section lorem ipsum dolor sit amet proin.",
      icon: <Icon1 />,
      links: [
        {
          title: "Name of a tutorial",
          href: "#tutorial1",
          tags: ["tutorial"],
        },
        {
          title: "Name of a tutorial",
          href: "#tutorial2",
          tags: ["tutorial"],
        },
        {
          title: "Name of a tutorial",
          href: "#tutorial3",
          tags: ["tutorial"],
        },
      ],
    },
    {
      title: "Guides",
      description:
        "An up to 3-line blurb here describing the section lorem ipsum dolor sit amet proin.",
      icon: <Icon2 />,
      links: [
        {
          title: "Name of a tutorial",
          href: "#tutorial1",
          tags: ["tutorial"],
        },
        {
          title: "Name of a tutorial",
          href: "#tutorial1",
          tags: ["tutorial"],
        },
        {
          title: "Name of a tutorial",
          href: "#tutorial1",
          tags: ["tutorial"],
        },
      ],
    },
    {
      title: "Smart Contracts",
      description:
        "An up to 3-line blurb here describing the section lorem ipsum dolor sit amet proin.",
      icon: <Icon3 />,
      links: [
        {
          title: "Name of a tutorial",
          href: "#tutorial1",
          tags: ["tutorial"],
        },
        {
          title: "Name of a tutorial",
          href: "#tutorial1",
          tags: ["tutorial"],
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
  | "landingHeaderItems"
  | "sdkCardItems"
  | "recentToolItems"
  | "contentNavigationItems"
  | "recentArticleItems"
>

export const loader: LoaderFunction = async () => {
  const landingHeaderItems = DefaultGettingStartedProps.args
    ?.landingHeaderItems as LandingHeaderProps
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
    landingHeaderItems,
    sdkCardItems,
    recentToolItems,
    contentNavigationItems,
    recentArticleItems,
  }
  return data
}

export default function Page() {
  const {
    landingHeaderItems,
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
