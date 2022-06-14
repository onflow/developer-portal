import { LoaderFunction } from "@remix-run/server-runtime"
import { LearnPage } from "~/ui/design-system/src/lib/Pages/LearnPage"

import { TutorialCardProps } from "~/ui/design-system/src/lib/Components/TutorialCard"

const TUTORIAL_TEMPLATE: TutorialCardProps = {
  heading: "This Title Is A Two Liner",
  tags: ["TODO", "Tool", "Intermediate"],
  description: "Text following the title, small  two description",
  lastUpdated: "23/3/2022",
  imageUri:
    "https://assets.website-files.com/5f6294c0c7a8cdf432b1c827/5f6294c0c7a8cda922b1c968_Flow%2520Wide%2520Design-p-3200.png",
  link: "https://example.com",
}
const data = {
  allTutorials: Array(99)
    .fill(TUTORIAL_TEMPLATE)
    .map((tutorial, index) => ({
      ...tutorial,
      heading: "Item #" + (index + 1),
      tags: [
        "TODO",
        "Cadence",
        "FCL",
        "DeFi",
        "Setup",
        "Tool",
        "Intermediate",
      ].slice(index % 6, (index % 6) + 2),
    })),
  cadenceHref: "https://example.com",
  cadenceTutorials: Array(5).fill(TUTORIAL_TEMPLATE),
  nftTutorials: Array(5).fill(TUTORIAL_TEMPLATE),
  videos: {
    primary: {
      link: "https://www.youtube.com/watch?v=pRz7EzrWchs",
      title: "Learn Cadence - Hello World on Flow",
      length: 1396,
    },
    secondary: [
      {
        link: "https://www.youtube.com/watch?v=DInibYmxUsc",
        title: "Fungible Token Smart Contracts on Flow",
        length: 1993,
        tags: ["Guide"],
      },
      {
        link: "https://www.youtube.com/watch?v=uEoh9SnjqCk",
        title: "How to build a basic web3 app on Flow",
        length: 1878,
        tags: ["Guide"],
      },
    ],
  },
  youtubeHref: "https://www.youtube.com/c/FlowBlockchain",
}

export const loader: LoaderFunction = async () => {
  return {}
}

export default function Page() {
  return <LearnPage {...data} />
}
