import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
// import { fetchDiscordAnnouncements } from "~/cms/utils/fetch-discord"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { fetchSporks } from "~/cms/utils/fetch-sporks"
import { getMetaTitle } from "~/utils/seo"
import NetworkPage, {
  NetworkPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkPage"
import { externalLinks } from "../../data/external-links"

import { featuredArticle } from "~/data/pages/network"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Network status"),
})

export type LoaderData = NetworkPageProps

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const networkStatuses = await fetchNetworkStatus()
  const { pastSporks } = await fetchSporks()

  return {
    discordUrl: externalLinks.discord,
    discourseUrl: externalLinks.discourse,
    featuredArticle,
    githubUrl: externalLinks.github,
    networkStatuses,
    pastSporks,
    twitterUrl: externalLinks.twitter,
  }
}

export default function Page() {
  const data = useLoaderData<LoaderData>()

  return (
    <NetworkPage
      // announcementCards={announcementCards}
      // discordNetworkCards={[]}
      discordUrl={data.discordUrl}
      discourseUrl={data.discourseUrl}
      featuredArticle={data.featuredArticle}
      githubUrl={data.githubUrl}
      networkStatuses={data.networkStatuses}
      pastSporks={data.pastSporks}
      twitterUrl={data.twitterUrl}
    />
  )
}
