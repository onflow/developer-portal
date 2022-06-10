import { LearnPageProps } from "."
import { TutorialCardProps } from "../../Components/TutorialCard"

const TUTORIAL_TEMPLATE: TutorialCardProps = {
  heading: "This Title Is A Two Liner",
  tags: ["Tool", "Intermediate"],
  description: "Text following the title, small  two description",
  lastUpdated: "23/3/2022",
  imageUri:
    "https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/5f6294c0c7a8cda922b1c968_Flow%2520Wide%2520Design-p-3200.png",
  link: "#todo",
}

export const data: LearnPageProps = {
  allTutorials: Array(99)
    .fill(TUTORIAL_TEMPLATE)
    .map((tutorial, index) => ({
      ...tutorial,
      heading: "Item #" + (index + 1),
      tags: ["Cadence", "FCL", "DeFi", "Setup", "Tool", "Intermediate"].slice(
        index % 6,
        (index % 6) + 2
      ),
    })),
  cadenceHref: "#todo",
  cadenceTutorials: Array(5).fill(TUTORIAL_TEMPLATE),
  nftTutorials: Array(5).fill(TUTORIAL_TEMPLATE),
  videos: {
    primary: {
      link: "https://www.youtube.com/watch?v=pRz7EzrWchs",
      title: "Long title of an article on Flow, a two liner",
      length: 1396,
    },
    secondary: [
      {
        link: "https://www.youtube.com/watch?v=DInibYmxUsc",
        title: "Long title of an article on Flow, a two liner",
        length: 190,
        tags: ["Guide"],
      },
      {
        link: "https://www.youtube.com/watch?v=uEoh9SnjqCk",
        title: "How to write a smart contract with Cadence",
        length: 190,
        tags: ["Guide"],
      },
    ],
  },
  youtubeHref: "https://www.youtube.com/c/FlowBlockchain",
}
