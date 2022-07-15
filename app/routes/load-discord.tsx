// This route is only for testing API functionalities. This page should not be discoverable by the navigation.
import type { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { formatDistance } from "date-fns"
import { fetchDiscordAnnouncements } from "~/cms/utils/fetch-discord"
import { AnnouncementCardProps } from "~/ui/design-system/src/lib/Components/AnnouncementCard"
import { NetworkDiscordCardProps } from "~/ui/design-system/src/lib/Components/NetworkDiscordCard"

export const loader: LoaderFunction = async () => {
  return fetchDiscordAnnouncements()
}

export default function Flips() {
  const { announcementCards, discordNetworkCards } = useLoaderData()
  return (
    <div>
      <h1>DISCORD</h1>
      Number of Announcement Cards: {announcementCards.length}
      <div className="w-full">
        {announcementCards.map((c: AnnouncementCardProps) => (
          <li id="user-content-fn-1" key={c.link}>
            Announcement: {c.link} - {c.heading} - {c.timestamp}
          </li>
        ))}
      </div>
      Number of Discord Network Cards: {discordNetworkCards.length}
      <div className="w-full">
        {discordNetworkCards.map((c: NetworkDiscordCardProps) => (
          <li id="user-content-fn-1" key={c.messageLink}>
            Network Announcement: {c.messageLink} - {c.message} - {c.username} -{" "}
            {c.timestamp}
          </li>
        ))}
      </div>
    </div>
  )
}
