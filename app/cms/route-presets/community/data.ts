import {
  cliTool,
  emulatorTool,
  fclSDK,
  flowPortTool,
  jsTestingLibTool,
  vsCodeTool,
} from "~/component-data/Tools"
import { ContentNavigationListProps } from "~/ui/design-system/src/lib/Components/ContentNavigationList"
import { Default as DefaultFeaturedArticleSlider } from "~/ui/design-system/src/lib/Components/FeaturedArticleSlider/FeaturedArticleSlider.stories"
import { ProjectCardProps } from "~/ui/design-system/src/lib/Components/ProjectCard"
import { Default as DefaultProjectCards } from "~/ui/design-system/src/lib/Components/ProjectCards/ProjectCards.stories"
import { Article } from "~/ui/design-system/src/lib/interfaces"

export const tools = [
  flowPortTool,
  emulatorTool,
  cliTool,
  vsCodeTool,
  fclSDK,
  jsTestingLibTool,
]

export const contentNavigationListItems: ContentNavigationListProps = {
  header: "Explore More Content",
  contentNavigationItems: [
    {
      title: "Learn",
      text: "Learn more about the Flow blockchain, Cadence, and NFTs",
      link: "/learn",
      icon: "learn",
    },
    {
      title: "Tools",
      text: "Tools that can help your development experience on Flow",
      link: "/tools",
      icon: "tools",
    },
    // {
    //   title: "Concepts",
    //   text: "Important concepts about Cadence and FCL",
    //   link: "#",
    //   icon: "concepts",
    // },
  ],
}

export const projects = DefaultProjectCards?.args
  ?.projects as ProjectCardProps[]
export const articles = DefaultFeaturedArticleSlider?.args
  ?.articles as Article[]
