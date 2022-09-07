import {
  HtmlMetaDescriptor,
  LinkDescriptor,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { DynamicLinksFunction } from "remix-utils"
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

export const handle: {
  dynamicLinks: DynamicLinksFunction<LoaderData>
} = { dynamicLinks: ({ data }) => data.links }

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => data.meta

export type LoaderData = CommunityPageProps & {
  links: LinkDescriptor[]
  meta: HtmlMetaDescriptor
}

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
    links: [getCanonicalLinkDescriptor("/community")],
    meta: {
      title: getMetaTitle("Community"),
    },
    openFlips,
    projects,
    secondaryNavSections,
    tools,
    upcomingEvents,
  }
}

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
