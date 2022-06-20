import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchFlips } from "~/cms/utils/fetch-flips"
import { HomePage, HomePageProps } from "~/ui/design-system/src/"
import { ToolCardProps } from "~/ui/design-system/src/lib/Components/ToolCard"
import { UpcomingEventsProps } from "~/ui/design-system/src/lib/Components/UpcomingEvents"
import { Default as DefaultUpcomingEvents } from "~/ui/design-system/src/lib/Components/UpcomingEvents/UpcomingEvents.stories"
import { TutorialCardProps } from "../ui/design-system/src/lib/Components/TutorialCard"
import {
  homepageThreeColumnData,
  homepageStartProjectData,
} from "../component-data/Homepage"
import {
  httpSDK,
  goSDK,
  fclSDK,
  flowScannerTool,
  flowserTool,
  overflowTool,
} from "../component-data/Tools"
import {
  introToFlowBlockchainArticle,
  organizingCadenceArticle,
} from "../component-data/Articles"

type DynamicHomePageProps = Pick<
  HomePageProps,
  "flips" | "tools" | "concepts" | "upcomingEvents"
>

export const loader: LoaderFunction = async () => {
  const flips = await fetchFlips()
  const tools = [
    httpSDK,
    goSDK,
    fclSDK,
    flowScannerTool,
    flowserTool,
    overflowTool,
  ] as ToolCardProps[]
  const concepts = [
    introToFlowBlockchainArticle,
    organizingCadenceArticle,
  ] as TutorialCardProps[]
  const upcomingEvents = DefaultUpcomingEvents?.args as UpcomingEventsProps
  const data: DynamicHomePageProps = { flips, tools, concepts, upcomingEvents }
  return data
}

export default function Index() {
  const { flips, tools, concepts, upcomingEvents } =
    useLoaderData<DynamicHomePageProps>()

  return (
    <HomePage
      startProjectItems={homepageStartProjectData}
      flips={flips}
      tools={tools}
      concepts={concepts}
      threeColumnItems={homepageThreeColumnData}
      upcomingEvents={upcomingEvents}
    />
  )
}
