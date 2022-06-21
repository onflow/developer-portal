import { LoaderFunction, redirect } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import NetworkPage, {
  NetworkPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkPage"
import { temporarilyRedirectToComingSoon } from "~/utils/features"
import { featuredArticle } from "./data"

type DynamicNetworkPageProps = Pick<NetworkPageProps, "networkStatuses">

export const loader: LoaderFunction = async () => {
  temporarilyRedirectToComingSoon()

  const networkStatuses = await fetchNetworkStatus()
  const data = { networkStatuses }
  return data
}

export default function Page() {
  const { networkStatuses } = useLoaderData<DynamicNetworkPageProps>()

  return (
    <NetworkPage
      networkStatuses={networkStatuses}
      featuredArticle={featuredArticle}
    />
  )
}
