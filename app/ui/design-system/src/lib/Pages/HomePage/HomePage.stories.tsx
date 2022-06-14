import { Meta, Story } from "@storybook/react"
import HomePage, { HomePageProps } from "."
import { LinkCard2ColumnProps } from "../../.."
import KittyItemsImg from "../../../../images/content/kitty-items@3x.png"
import { Default as DefaultFlips } from "../../Components/Flips/Flips.stories"
import { Default as DefaultLinkCard3Column } from "../../Components/LinkCard3Column/LinkCard3Column.stories"
import { Default as DefaultToolsAndConcepts } from "../../Components/ToolsAndConcepts/ToolsAndConcepts.stories"
import { Default as DefaultUpcomingEvents } from "../../Components/UpcomingEvents/UpcomingEvents.stories"

const startProjectItems: LinkCard2ColumnProps = {
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

export default {
  component: HomePage,
  title: "Pages/HomePage",
} as Meta

const Template: Story<HomePageProps> = (args) => <HomePage {...args} />

const args: HomePageProps = {
  startProjectItems,
  flips: DefaultFlips.args.flips,
  tools: DefaultToolsAndConcepts.args.tools,
  concepts: DefaultToolsAndConcepts.args.concepts,
  threeColumnItems: DefaultLinkCard3Column.args.items,
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
