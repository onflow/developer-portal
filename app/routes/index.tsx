import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchFlips } from "~/cms/utils/fetch-flips"
import { allEvents } from "~/component-data/Events"
import { HomePage, HomePageProps } from "~/ui/design-system/src/"
import { ToolCardProps } from "~/ui/design-system/src/lib/Components/ToolCard"
import {
  homepageStartProjectData,
  homepageThreeColumnData,
  contentNavigationListItems,
} from "../component-data/Homepage"
import {
  eventIndexingTool,
  fclSDK,
  flowserTool,
  goSDK,
  httpSDK,
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
  const upcomingEvents = allEvents
  const data: DynamicHomePageProps = { flips, tools, upcomingEvents }
  return data
}

export default function Index() {
  const { flips, tools, upcomingEvents } = useLoaderData<DynamicHomePageProps>()

  return (
    <HomePage
      editPageUrl="https://github.com/onflow/next-docs-v1/blob/main/app/component-data/Homepage/index.tsx"
      startProjectItems={homepageStartProjectData}
      flips={flips}
      tools={tools}
      threeColumnItems={homepageThreeColumnData}
      upcomingEvents={upcomingEvents}
      contentNavigationListItems={contentNavigationListItems}
    />
  )
}
