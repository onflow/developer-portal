import {
  HtmlMetaDescriptor,
  json,
  LinkDescriptor,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { DynamicLinksFunction } from "remix-utils"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { fetchSporks } from "~/cms/utils/fetch-sporks"
import { featuredArticle } from "~/data/pages/network"
import NetworkDetailPage, {
  NetworkDetailPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkDetailPage"
import { getCanonicalLinkDescriptor, getMetaTitle } from "~/utils/seo.server"
import { externalLinks } from "../../data/external-links"
import { networks } from "../../data/networks"

export const handle: {
  dynamicLinks: DynamicLinksFunction<LoaderData>
} = { dynamicLinks: ({ data }) => data.links }

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => data.meta

export type LoaderData = NetworkDetailPageProps & {
  links: LinkDescriptor[]
  meta: HtmlMetaDescriptor
  urlPath: string
}

export const loader = async ({ params }: LoaderArgs) => {
  const { networkName } = params

  if (!networkName) throw new Error("Missing network name")

  const network = networks.find(({ urlPath }) => urlPath === networkName)

  if (!network) throw json({ status: "noPage" }, { status: 404 })

  const networkStatuses = await fetchNetworkStatus()
  const sporks = await fetchSporks()
  const status = networkStatuses.find(({ id }) => id === network.componentId)
  const pastSporks = sporks.pastSporks[network.id] || []

  return json<LoaderData>({
    discordUrl: externalLinks.discord,
    discourseUrl: externalLinks.discourse,
    featuredArticle,
    githubUrl: externalLinks.github,
    links: [getCanonicalLinkDescriptor(`/network/${networkName}`)],
    meta: {
      title: getMetaTitle(network.title),
    },
    networkName: network.title,
    networks: networks.map(({ title, urlPath }) => ({
      name: title,
      link: `/network/${urlPath}`,
    })),
    pastSporks,
    status,
    twitterUrl: externalLinks.twitter,
    urlPath: `/network/${networkName}`,
  })
}

export default function Page() {
  const data = useLoaderData<typeof loader>()

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
