import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData, useParams } from "@remix-run/react"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { fetchSporks } from "~/cms/utils/fetch-sporks"
import { getMetaTitle } from "~/root"
import NetworkDetailPage, {
  getNetworkNameFromParam,
  NetworkDetailPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkDetailPage"
import { featuredArticle } from "./data"

type DynamicNetworkDetailPageProps = Pick<
  NetworkDetailPageProps,
  "networkStatuses" | "pastSporks"
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
  const { pastSporks } = await fetchSporks()

  const data = { networkStatuses, pastSporks }
  return data
}

export default function Page() {
  const {
    networkStatuses,
    // @ts-ignore
    pastSporks: { mainnet, testnet },
  } = useLoaderData<DynamicNetworkDetailPageProps>()
  const params = useParams()

  if (!params.networkName) throw new Error("Missing network name")

  const networkName = params.networkName
  let sporks = []
  if (networkName === "flow-testnet") {
    sporks = testnet
  } else if (networkName === "flow-mainnet") {
    sporks = mainnet
  }

  return (
    <NetworkDetailPage
      networkStatuses={networkStatuses}
      featuredArticle={featuredArticle}
      networkName={networkName}
      pastSporks={sporks}
    />
  )
}
