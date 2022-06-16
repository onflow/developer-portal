import { useLoaderData } from "@remix-run/react"
import { LoaderFunction } from "@remix-run/server-runtime"
import { fetchOpenFlips } from "~/cms/utils/fetch-flips"
import { CommunityMembersProps } from "~/ui/design-system/src/lib/Components/CommunityMembers"
import { Default as DefaultCommunityMembers } from "~/ui/design-system/src/lib/Components/CommunityMembers/CommunityMembers.stories"
import { ForumCellProps } from "~/ui/design-system/src/lib/Components/ForumCell"
import { Default as DefaultForumCell } from "~/ui/design-system/src/lib/Components/ForumCell/ForumCell.stories"
import { UpcomingEventsProps } from "~/ui/design-system/src/lib/Components/UpcomingEvents"
import { Default as DefaultUpcomingEvents } from "~/ui/design-system/src/lib/Components/UpcomingEvents/UpcomingEvents.stories"
import CommunityPage, {
  CommunityPageProps,
} from "~/ui/design-system/src/lib/Pages/CommunityPage"
import { articles, contentNavigationItems, projects, tools } from "./data"

type DynamicCommunityPageProps = Pick<
  CommunityPageProps,
  "flips" | "communityMembers" | "concepts" | "upcomingEvents" | "forumTopics"
>

export const loader: LoaderFunction = async () => {
  const flips = await fetchOpenFlips()
  const upcomingEvents = DefaultUpcomingEvents?.args as UpcomingEventsProps
  const forumTopics = [
    DefaultForumCell?.args,
    DefaultForumCell?.args,
    DefaultForumCell?.args,
    DefaultForumCell?.args,
  ] as ForumCellProps[]
  const communityMembers =
    DefaultCommunityMembers?.args as CommunityMembersProps
  const data: DynamicCommunityPageProps = {
    flips,
    communityMembers,
    upcomingEvents,
    forumTopics,
  }
  return data
}

export default function Page() {
  const { flips, communityMembers, upcomingEvents, forumTopics } =
    useLoaderData<DynamicCommunityPageProps>()

  return (
    <CommunityPage
      flips={flips}
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
