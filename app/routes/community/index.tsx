import { MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { LoaderFunction } from "@remix-run/server-runtime"
import { fetchLatestTopics } from "~/cms/utils/fetch-discourse-api"
import { fetchFlips } from "~/cms/utils/fetch-flips"
import { getMetaTitle } from "~/root"
import { CommunityMembersProps } from "~/ui/design-system/src/lib/Components/CommunityMembers"
import { Default as DefaultCommunityMembers } from "~/ui/design-system/src/lib/Components/CommunityMembers/CommunityMembers.stories"
import { UpcomingEventsProps } from "~/ui/design-system/src/lib/Components/UpcomingEvents"
import { Default as DefaultUpcomingEvents } from "~/ui/design-system/src/lib/Components/UpcomingEvents/UpcomingEvents.stories"
import CommunityPage, {
  CommunityPageProps,
} from "~/ui/design-system/src/lib/Pages/CommunityPage"
import { temporarilyRedirectToComingSoon } from "~/utils/features"
import { articles, contentNavigationItems, projects, tools } from "./data"

type DynamicCommunityPageProps = Pick<
  CommunityPageProps,
  | "openFlips"
  | "goodPlacesToStartFlips"
  | "communityMembers"
  | "concepts"
  | "upcomingEvents"
  | "forumTopics"
>

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Community"),
})

export const loader: LoaderFunction = async () => {
  temporarilyRedirectToComingSoon()
  const { openFlips, goodPlacesToStartFlips } = await fetchFlips()
  const upcomingEvents = DefaultUpcomingEvents?.args as UpcomingEventsProps
  const forumTopics = await fetchLatestTopics()
  const communityMembers =
    DefaultCommunityMembers?.args as CommunityMembersProps
  const data: DynamicCommunityPageProps = {
    openFlips,
    goodPlacesToStartFlips,
    communityMembers,
    upcomingEvents,
    forumTopics,
  }
  return data
}

export default function Page() {
  const {
    openFlips,
    goodPlacesToStartFlips,
    communityMembers,
    upcomingEvents,
    forumTopics,
  } = useLoaderData<DynamicCommunityPageProps>()

  return (
    <CommunityPage
      openFlips={openFlips}
      goodPlacesToStartFlips={goodPlacesToStartFlips}
      communityMembers={communityMembers}
      projects={projects}
      upcomingEvents={upcomingEvents}
      articles={articles}
      tools={tools}
      contentNavigationItems={contentNavigationItems}
      forumTopics={forumTopics}
    />
  )
}
