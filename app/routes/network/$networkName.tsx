import { LoaderFunction } from "@remix-run/node"
import { useParams, useLoaderData } from "@remix-run/react"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import NetworkDetailPage, {
  NetworkDetailPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkDetailPage"
import { featuredArticle } from "./data"

type DynamicNetworkDetailPageProps = Pick<
  NetworkDetailPageProps,
  "networkStatuses"
>

export const loader: LoaderFunction = async () => {
  const networkStatuses = await fetchNetworkStatus()
  const data = { networkStatuses }
  return data
}

export default function Page() {
  const { networkStatuses } = useLoaderData<DynamicNetworkDetailPageProps>()
  const params = useParams()
  const networkName = params.networkName as string

  return (
    <NetworkDetailPage
      networkStatuses={networkStatuses}
      featuredArticle={featuredArticle}
      networkName={networkName}
    />
  )
}
