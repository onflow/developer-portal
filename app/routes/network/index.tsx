import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
// import { fetchDiscordAnnouncements } from "~/cms/utils/fetch-discord"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { fetchSporks } from "~/cms/utils/fetch-sporks"
import { featuredArticle } from "~/data/pages/network"
import NetworkPage, {
  NetworkPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkPage"
import { getMetaTitle } from "~/utils/seo"
import { externalLinks } from "../../data/external-links"
import { networks } from "../../data/networks"

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
    twitterUrl: externalLinks.twitter,
    networks: networks.map(({ componentId, id, title, urlPath }) => ({
      lastSporkDate: pastSporks[id]?.[0]?.timestamp as string | undefined,
      name: title,
      link: `/network/${urlPath}`,
      status: networkStatuses.find((status) => status.id === componentId)
        ?.status,
    })),
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
      networks={data.networks}
      twitterUrl={data.twitterUrl}
    />
  )
}
