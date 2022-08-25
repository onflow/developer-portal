import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { fetchSporks } from "~/cms/utils/fetch-sporks"
import { featuredArticle } from "~/data/pages/network"
import { getMetaTitle } from "~/utils/seo"
import NetworkDetailPage, {
  getNetworkNameFromParam,
  NetworkDetailPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkDetailPage"
import { externalLinks } from "../../data/external-links"

export const meta: MetaFunction = ({ params }) => ({
  title: getMetaTitle(
    params?.networkName
      ? getNetworkNameFromParam(params.networkName)
      : undefined
  ),
})

export type LoaderData = NetworkDetailPageProps

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  if (!params.networkName) throw new Error("Missing network name")

  const networkStatuses = await fetchNetworkStatus()
  const sporks = await fetchSporks()

  let pastSporks = []

  switch (params.networkName) {
    case "flow-testnet": {
      pastSporks = sporks.pastSporks.testnet
      break
    }
    case "flow-mainnet": {
      pastSporks = sporks.pastSporks.mainnet
      break
    }
  }

  return {
    discordUrl: externalLinks.discord,
    discourseUrl: externalLinks.discourse,
    featuredArticle,
    githubUrl: externalLinks.github,
    networkName: params.networkName,
    networkStatuses,
    pastSporks,
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
      networkStatuses={data.networkStatuses}
      pastSporks={data.pastSporks}
      twitterUrl={data.twitterUrl}
    />
  )
}
