import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useParams } from "@remix-run/react"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { getMetaTitle } from "~/root"
import NetworkDetailPage, {
  getNetworkNameFromParam,
  NetworkDetailPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkDetailPage"
import { featuredArticle } from "./data"

type DynamicNetworkDetailPageProps = Pick<
  NetworkDetailPageProps,
  "networkStatuses"
>

export const meta: MetaFunction = ({ params }) => ({
  title: getMetaTitle(
    params?.networkName
      ? getNetworkNameFromParam(params.networkName)
      : undefined
  ),
})

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
