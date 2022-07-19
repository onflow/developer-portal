import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchDiscordAnnouncements } from "~/cms/utils/fetch-discord"
import { fetchNetworkStatus } from "~/cms/utils/fetch-network-status"
import { getMetaTitle } from "~/root"
import NetworkPage, {
  NetworkPageProps,
} from "~/ui/design-system/src/lib/Pages/NetworkPage"
import { temporarilyRedirectToComingSoon } from "~/utils/features"
import { featuredArticle } from "~/cms/route-presets/network/data"

type DynamicNetworkPageProps = Pick<
  NetworkPageProps,
  "networkStatuses" | "announcementCards" | "discordNetworkCards"
>

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Network status"),
})

export const loader: LoaderFunction = async () => {
  temporarilyRedirectToComingSoon()

  const networkStatuses = await fetchNetworkStatus()
  const { announcementCards, discordNetworkCards } =
    await fetchDiscordAnnouncements()
  const data = { networkStatuses, announcementCards, discordNetworkCards }
  return data
}

export default function Page() {
  const { networkStatuses, announcementCards, discordNetworkCards } =
    useLoaderData<DynamicNetworkPageProps>()

  return (
    <NetworkPage
      networkStatuses={networkStatuses}
      announcementCards={announcementCards}
      discordNetworkCards={discordNetworkCards}
      featuredArticle={featuredArticle}
    />
  )
}
