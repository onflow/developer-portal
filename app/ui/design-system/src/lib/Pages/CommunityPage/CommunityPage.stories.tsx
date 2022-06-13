import { Meta, Story } from "@storybook/react"
import CommunityPage, { CommunityPageProps } from "."
import { Default as DefaultCommunityMembers } from "../../Components/CommunityMembers/CommunityMembers.stories"
import { Default as DefaultFeaturedArticles } from "../../Components/FeaturedArticleSlider/FeaturedArticleSlider.stories"
import { Default as DefaultFlips } from "../../Components/Flips/Flips.stories"
import { Default as DefaultProjects } from "../../Components/ProjectCards/ProjectCards.stories"
import { Default as DefaultUpcomingEvents } from "../../Components/UpcomingEvents/UpcomingEvents.stories"
import { Default as DefaultTools } from "../../Components/ToolsAndConcepts/ToolsAndConcepts.stories"
import { Default as DefaultContentNavigationItem } from "../../Components/ContentNavigation/ContentNavigation.stories"

export default {
  component: CommunityPage,
  title: "Pages/CommunityPage",
} as Meta
const Template: Story<CommunityPageProps> = (args) => (
  <CommunityPage {...args} />
)
export const Default = Template.bind({})
Default.args = {
  upcomingEvents: DefaultUpcomingEvents.args,
  flips: DefaultFlips.args.flips,
  communityMembers: DefaultCommunityMembers.args,
  projects: DefaultProjects.args.projects,
  articles: DefaultFeaturedArticles.args.articles,
  tools: DefaultTools.args.tools,
  contentNavigationItems: [
    { ...DefaultContentNavigationItem, title: "Bug bounty", icon: "bug" },
    { ...DefaultContentNavigationItem, title: "Contribute", icon: "community" },
    { ...DefaultContentNavigationItem, title: "Get funding", icon: "funding" },
  ],
}

export const dark = Template.bind({})
dark.args = Default.args
dark.parameters = {
  backgrounds: {
    default: "dark",
  },
}

export const mobile = Template.bind({})
mobile.args = Default.args
mobile.parameters = {
  viewport: {
    defaultViewport: "xs",
  },
}
