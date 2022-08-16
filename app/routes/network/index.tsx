import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
// import { fetchDiscordAnnouncements } from "~/cms/utils/fetch-discord"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { getMetaTitle } from "~/root"
import NetworkPage, {
  NetworkPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkPage"

import { featuredArticle } from "./data"

type DynamicNetworkPageProps = Pick<NetworkPageProps, "networkStatuses">

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Network status"),
})

export const loader: LoaderFunction = async () => {
  const networkStatuses = await fetchNetworkStatus()
  // const { announcementCards, discordNetworkCards } =
  //   await fetchDiscordAnnouncements()
  const data = { networkStatuses }
  return data
}

export default function Page() {
  const { networkStatuses } = useLoaderData<DynamicNetworkPageProps>()

  return (
    <NetworkPage
      networkStatuses={networkStatuses}
      // announcementCards={announcementCards}
      // discordNetworkCards={[]}
      featuredArticle={featuredArticle}
    />
  )
}
