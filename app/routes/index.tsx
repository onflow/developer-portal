import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchFlips } from "~/cms/utils/fetch-flips"
import { HomePage, HomePageProps } from "~/ui/design-system/src/"
import { ToolCardProps } from "~/ui/design-system/src/lib/Components/ToolCard"
import { UpcomingEventsProps } from "~/ui/design-system/src/lib/Components/UpcomingEvents"
import { Default as DefaultUpcomingEvents } from "~/ui/design-system/src/lib/Components/UpcomingEvents/UpcomingEvents.stories"
import {
  homepageThreeColumnData,
  homepageStartProjectData,
} from "../component-data/Homepage"
import {
  httpSDK,
  goSDK,
  fclSDK,
  eventIndexingTool,
  flowserTool,
  overflowTool,
} from "../component-data/Tools"

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
    eventIndexingTool,
    flowserTool,
    overflowTool,
  ] as ToolCardProps[]
  const upcomingEvents = DefaultUpcomingEvents?.args as UpcomingEventsProps
  const data: DynamicHomePageProps = { flips, tools, upcomingEvents }
  return data
}

export default function Index() {
  const { flips, tools, upcomingEvents } = useLoaderData<DynamicHomePageProps>()

  return (
    <HomePage
      startProjectItems={homepageStartProjectData}
      flips={flips}
      tools={tools}
      threeColumnItems={homepageThreeColumnData}
      upcomingEvents={upcomingEvents}
    />
  )
}
