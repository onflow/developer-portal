import { json, LinkDescriptor } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { DynamicLinksFunction } from "remix-utils"
import { fetchFlips } from "~/cms/utils/fetch-flips"
import { allEvents } from "~/data/events"
import { HomePage, HomePageProps } from "~/ui/design-system/src/"
import { ToolCardProps } from "~/ui/design-system/src/lib/Components/ToolCard"
import { refreshTools } from "../cms/tools.server"
import { externalLinks } from "../data/external-links"
import {
  contentNavigationListItems,
  editPageUrl,
  homepageStartProjectData,
  homepageThreeColumnData,
} from "../data/pages/home"
import {
  eventIndexingTool,
  fclSDK,
  flowserTool,
  goSDK,
  httpSDK,
  overflowTool,
} from "../data/tools"
import { getCanonicalLinkDescriptor } from "../utils/seo.server"

export type LoaderData = Omit<HomePageProps, "threeColumnItems"> & {
  links: LinkDescriptor[]
}

export const loader = async () => {
  const tools = [
    httpSDK,
    goSDK,
    fclSDK,
    eventIndexingTool,
    flowserTool,
    overflowTool,
  ] as ToolCardProps[]

  const [flips] = await Promise.all([
    await fetchFlips(),
    await refreshTools(...tools),
  ])

  return json<LoaderData>({
    discordUrl: externalLinks.discord,
    discourseUrl: externalLinks.discourse,
    twitterUrl: externalLinks.twitter,
    contentNavigationListItems,
    startProjectItems: homepageStartProjectData,
    flips: {
      ...flips,
      githubUrl: externalLinks.github,
    },
    githubUrl: externalLinks.github,
    links: [getCanonicalLinkDescriptor("/")],
    tools,
    upcomingEvents: allEvents,
    editPageUrl,
  })
}

export const handle: {
  dynamicLinks: DynamicLinksFunction<LoaderData>
} = { dynamicLinks: ({ data }) => data.links }

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <HomePage
      contentNavigationListItems={data.contentNavigationListItems}
      discordUrl={externalLinks.discord}
      discourseUrl={externalLinks.discourse}
      editPageUrl={data.editPageUrl}
      flips={data.flips}
      githubUrl={externalLinks.github}
      startProjectItems={data.startProjectItems}
      threeColumnItems={homepageThreeColumnData}
      tools={data.tools}
      twitterUrl={externalLinks.twitter}
      upcomingEvents={data.upcomingEvents}
    />
  )
}
