import { ContentNavigationProps } from "~/ui/design-system/src/lib/Components/ContentNavigation"
import { Default as DefaultFeaturedArticleSlider } from "~/ui/design-system/src/lib/Components/FeaturedArticleSlider/FeaturedArticleSlider.stories"
import { ProjectCardProps } from "~/ui/design-system/src/lib/Components/ProjectCard"
import { Default as DefaultProjectCards } from "~/ui/design-system/src/lib/Components/ProjectCards/ProjectCards.stories"
import { Article } from "~/ui/design-system/src/lib/interfaces"
import ToolCliIconSrc from "../../ui/design-system/images/tools/tool-cli.svg"
import ToolEmulatorIconSrc from "../../ui/design-system/images/tools/tool-emulator.svg"
import ToolFclIconSrc from "../../ui/design-system/images/tools/tool-fcl.svg"
import ToolPortIconSrc from "../../ui/design-system/images/tools/tool-port.svg"
import ToolTestingIconSrc from "../../ui/design-system/images/tools/tool-testing.svg"
import ToolVsCodeIconSrc from "../../ui/design-system/images/tools/tool-vscode.svg"

export const tools = [
  {
    title: "Flow Port",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "mini flow",
    tags: ["Tool"],
    link: "#",
    stars: 52,
    iconSrc: ToolPortIconSrc,
    description:
      "Lorem ipsum text here can go a two liner sentence or a one liner",
  },
  {
    title: "Emulator",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "mini flow",
    tags: ["Tool"],
    link: "#",
    stars: 52,
    iconSrc: ToolEmulatorIconSrc,
    description:
      "Lorem ipsum text here can go a two liner sentence or a one liner",
  },
  {
    title: "CLI",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "mini flow",
    tags: ["Tool"],
    link: "#",
    stars: 52,
    iconSrc: ToolCliIconSrc,
    description:
      "Lorem ipsum text here can go a two liner sentence or a one liner",
  },
  {
    title: "VS Code Extension",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "mini flow",
    tags: ["Tool"],
    link: "#",
    stars: 52,
    iconSrc: ToolVsCodeIconSrc,
    description:
      "Lorem ipsum text here can go a two liner sentence or a one liner",
  },
  {
    title: "Flow Client Lbrary",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "mini flow",
    tags: ["Tool"],
    link: "#",
    stars: 52,
    iconSrc: ToolFclIconSrc,
    description:
      "Lorem ipsum text here can go a two liner sentence or a one liner",
  },

  {
    title: "Testing Library",
    authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
    authorName: "mini flow",
    tags: ["Tool"],
    link: "#",
    stars: 52,
    iconSrc: ToolTestingIconSrc,
    description:
      "Lorem ipsum text here can go a two liner sentence or a one liner",
  },
]

export const contentNavigationItems: ContentNavigationProps[] = [
  {
    title: "Concepts",
    text: "Lorem ipsum dolor sit amet proin gravida lorem ipsum",
    link: "#",
    icon: "concepts",
  },
  {
    title: "Learn",
    text: "Lorem ipsum dolor sit amet proin gravida lorem ipsum",
    link: "#",
    icon: "learn",
  },
  {
    title: "Tools",
    text: "Lorem ipsum dolor sit amet proin gravida lorem ipsum",
    link: "#",
    icon: "tools",
  },
]

export const projects = DefaultProjectCards?.args
  ?.projects as ProjectCardProps[]
export const articles = DefaultFeaturedArticleSlider?.args
  ?.articles as Article[]
