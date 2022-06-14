import { Meta, Story } from "@storybook/react"
import HomePage, { HomePageProps } from "."
import { ReactComponent as EcosystemIcon } from "../../../../images/content/ecosystem"
import KittyItemsImg from "../../../../images/content/kitty-items@3x.png"
import { ReactComponent as SDKIcon } from "../../../../images/content/sdk"
import { ReactComponent as UseCaseIcon } from "../../../../images/content/use-cases"
import { Default as DefaultToolsAndConcepts } from "../../Components/ToolsAndConcepts/ToolsAndConcepts.stories"
import { Default as DefaultUpcomingEvents } from "../../Components/UpcomingEvents/UpcomingEvents.stories"
import DappyImg from "./dappy@3x.png"

export default {
  component: HomePage,
  title: "Pages/HomePage",
} as Meta

const Template: Story<HomePageProps> = (args) => <HomePage {...args} />
const startProjectItems = {
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
      icon: DappyImg,
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

const flips = Array(3).fill({
  numComments: 23,
  heading: "Error Subscribing to Events in Default Docs",
  tags: ["moo", "crab", "rangoon"],
  participant: {
    profileImage:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    name: "Marky Mark",
  },
  date: "23/3/22",
  forumLink: "#test",
})

const threeColumnItems = [
  {
    title: "Quickstart",
    description:
      "A package used to interact with user wallets and the Flow blockchain.",
    icon: <UseCaseIcon height="1.5em" width="1.5em" />,
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
    icon: <EcosystemIcon height="1.5em" width="1.5em" />,
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
    icon: <SDKIcon height="1.5em" width="1.5em" />,
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

const args = {
  startProjectItems,
  flips,
  tools: DefaultToolsAndConcepts.args.tools,
  concepts: DefaultToolsAndConcepts.args.concepts,
  threeColumnItems,
  upcomingEvents: DefaultUpcomingEvents.args,
}
export const Default = Template.bind({})
Default.args = args

export const dark = Template.bind({})
dark.args = args
dark.parameters = {
  backgrounds: {
    default: "dark",
  },
}

export const mobile = Template.bind({})
mobile.args = args
mobile.parameters = {
  viewport: {
    defaultViewport: "xs",
  },
}
