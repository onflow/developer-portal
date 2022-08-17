import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
// import { fetchDiscordAnnouncements } from "~/cms/utils/fetch-discord"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { fetchSporks } from "~/cms/utils/fetch-sporks"
import { getMetaTitle } from "~/root"
import NetworkPage, {
  NetworkPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkPage"

import { featuredArticle } from "./data"

type DynamicNetworkPageProps = Pick<
  NetworkPageProps,
  "networkStatuses" | "pastSporks"
>

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Network status"),
})

export const loader: LoaderFunction = async () => {
  const networkStatuses = await fetchNetworkStatus()
  const { pastSporks } = await fetchSporks()

  // const { announcementCards, discordNetworkCards } =
  //   await fetchDiscordAnnouncements()
  const data = { networkStatuses, pastSporks }
  return data
}

export default function Page() {
  const { networkStatuses, pastSporks } =
    useLoaderData<DynamicNetworkPageProps>()

  return (
    <NetworkPage
      networkStatuses={networkStatuses}
      // announcementCards={announcementCards}
      // discordNetworkCards={[]}
      featuredArticle={featuredArticle}
      pastSporks={pastSporks}
    />
  )
}
