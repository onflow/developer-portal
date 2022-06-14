import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchOpenFlips } from "~/cms/utils/fetch-flips"
import { ReactComponent as EcosystemIcon } from "~/ui/design-system/images/content/ecosystem"
import KittyItemsImg from "~/ui/design-system/images/content/kitty-items@3x.png"
import { ReactComponent as SDKIcon } from "~/ui/design-system/images/content/sdk"
import { ReactComponent as UseCaseIcon } from "~/ui/design-system/images/content/use-cases"
import {
  LinkCard2ColumnProps,
  LinkCard3ColumnItems,
} from "~/ui/design-system/src"
import { HomePage, HomePageProps } from "~/ui/design-system/src/"
import { ToolCardProps } from "~/ui/design-system/src/lib/Components/ToolCard"
import { Default as DefaultToolAndConcepts } from "~/ui/design-system/src/lib/Components/ToolsAndConcepts/ToolsAndConcepts.stories"
import { UpcomingEventsProps } from "~/ui/design-system/src/lib/Components/UpcomingEvents"
import { Default as DefaultUpcomingEvents } from "~/ui/design-system/src/lib/Components/UpcomingEvents/UpcomingEvents.stories"

export const startProjectItems: LinkCard2ColumnProps = {
  buttonText: "Get started",
  buttonUrl: "#changeme",
  description:
    "Building on Flow is easy. Start building now with lorem ipsum et sigitus loranum prospitarius.",
  title: "Start Your Project",
  tags: ["Tutorial"],
  items: [
    {
      title: "Crypto Dappy Course",
      description:
        "A package used to interact with user wallets and the Flow blockchain.",
      href: "#",
      icon: KittyItemsImg,
    },
    {
      title: "Create an NFT",
      description:
        "A series of tutorials that explain how to build your first NFT (Non-Fungible Token)",
      icon: KittyItemsImg,
      links: [
        { href: "#", title: "Dictionaries" },
        { href: "#", title: "Path Finder for NFTs" },
      ],
    },
  ],
}

export const threeColumnItems: LinkCard3ColumnItems = [
  {
    title: "Quickstart",
    description:
      "A package used to interact with user wallets and the Flow blockchain.",
    icon: <UseCaseIcon />,
    links: [
      {
        title: "Quickstart tutorial",
        href: "#tutorial1",
        tags: ["tutorial"],
      },
      {
        title: "Name of a tutorial",
        href: "#tutorial2",
        tags: ["tutorial"],
      },
      {
        title: "Name of another tutorial",
        href: "#tutorial3",
        tags: ["tutorial"],
      },
    ],
  },
  {
    title: "Guides & Tutorials",
    description:
      "An up to 3-line blurb here describing the section lorem ipsum dolor sit amet proin.",
    icon: <EcosystemIcon />,
    links: [
      {
        title: "Guide 1",
        href: "#tutorial1",
        tags: ["tutorial"],
      },
      {
        title: "Guide 2",
        href: "#tutorial2",
      },
      {
        title: "An external link",
        href: "https://www.onflow.org",
        tags: ["tutorial", "external"],
      },
    ],
  },
  {
    title: "Smart Contracts",
    description: "Smart contracts description.",
    icon: <SDKIcon />,
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
]

type DynamicHomePageProps = Pick<
  HomePageProps,
  "flips" | "tools" | "concepts" | "upcomingEvents"
>

export const loader: LoaderFunction = async () => {
  const flips = await fetchOpenFlips()
  const tools = DefaultToolAndConcepts?.args?.tools as ToolCardProps[]
  const concepts = DefaultToolAndConcepts.args?.concepts as ToolCardProps[]
  const upcomingEvents = DefaultUpcomingEvents?.args as UpcomingEventsProps
  const data: DynamicHomePageProps = { flips, tools, concepts, upcomingEvents }
  return data
}

export default function Index() {
  const { flips, tools, concepts, upcomingEvents } =
    useLoaderData<DynamicHomePageProps>()

  return (
    <HomePage
      startProjectItems={startProjectItems}
      flips={flips}
      tools={tools}
      concepts={concepts}
      threeColumnItems={threeColumnItems}
      upcomingEvents={upcomingEvents}
    />
  )
}
