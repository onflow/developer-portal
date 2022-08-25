import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { fetchSporks } from "~/cms/utils/fetch-sporks"
import { featuredArticle } from "~/data/pages/network"
import { getMetaTitle } from "~/utils/seo"
import NetworkDetailPage, {
  NetworkDetailPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkDetailPage"
import { externalLinks } from "../../data/external-links"
import { networks } from "../../data/networks"
import { json } from "remix-utils"

export const meta: MetaFunction = ({ params }) => ({
  title: getMetaTitle(
    networks.find(({ urlPath }) => params.networkName === urlPath)?.title
  ),
})

export type LoaderData = NetworkDetailPageProps

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const { networkName } = params

  if (!networkName) throw new Error("Missing network name")

  const network = networks.find(({ urlPath }) => urlPath === networkName)

  if (!network) throw json({ status: "noPage" }, { status: 404 })

  const networkStatuses = await fetchNetworkStatus()
  const sporks = await fetchSporks()
  const status = networkStatuses.find(({ id }) => id === network.componentId)
  const pastSporks = sporks.pastSporks[network.id] || []

  return {
    discordUrl: externalLinks.discord,
    discourseUrl: externalLinks.discourse,
    featuredArticle,
    githubUrl: externalLinks.github,
    networkName: network.title,
    networks: networks.map(({ title, urlPath }) => ({
      name: title,
      link: `/network/${urlPath}`,
    })),
    pastSporks,
    status,
    twitterUrl: externalLinks.twitter,
  }
}

export default function Page() {
  const data = useLoaderData<LoaderData>()

  return (
    <NetworkDetailPage
      discordUrl={data.discordUrl}
      discourseUrl={data.discourseUrl}
      featuredArticle={data.featuredArticle}
      githubUrl={data.githubUrl}
      networkName={data.networkName}
      networks={data.networks}
      pastSporks={data.pastSporks}
      status={data.status}
      twitterUrl={data.twitterUrl}
    />
  )
}
