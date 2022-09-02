import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchLatestTopics } from "~/cms/utils/fetch-discourse-api"
import { fetchFlips } from "~/cms/utils/fetch-flips"
import {
  contentNavigationListItems,
  editPageUrl,
  projects,
  secondaryNavSections,
  tools,
  upcomingEvents,
} from "~/data/pages/community"
import CommunityPage, {
  CommunityPageProps,
} from "~/ui/design-system/src/lib/Pages/CommunityPage"
import { getCanonicalLinkDescriptor, getMetaTitle } from "~/utils/seo.server"
import { refreshTools } from "../cms/tools.server"
import { externalLinks } from "../data/external-links"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Community"),
})

export type LoaderData = CommunityPageProps

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const { openFlips, goodPlacesToStartFlips } = await fetchFlips()
  const forumTopics = await fetchLatestTopics()

  await refreshTools(...tools)
  return {
    contentNavigationListItems,
    discordUrl: externalLinks.discord,
    discourseUrl: externalLinks.discourse,
    editPageUrl,
    forumTopics,
    githubUrl: externalLinks.github,
    goodPlacesToStartFlips,
    openFlips,
    projects,
    secondaryNavSections,
    tools,
    upcomingEvents,
  }
}

export const links: LinksFunction = () => [
  getCanonicalLinkDescriptor("/community"),
]

export default function Page() {
  const data = useLoaderData<LoaderData>()

  return (
    <CommunityPage
      contentNavigationListItems={data.contentNavigationListItems}
      discordUrl={data.discordUrl}
      discourseUrl={data.discourseUrl}
      editPageUrl={data.editPageUrl}
      forumTopics={data.forumTopics}
      githubUrl={data.githubUrl}
      goodPlacesToStartFlips={data.goodPlacesToStartFlips}
      openFlips={data.openFlips}
      projects={data.projects}
      secondaryNavSections={data.secondaryNavSections}
      tools={data.tools}
      upcomingEvents={data.upcomingEvents}
    />
  )
}
