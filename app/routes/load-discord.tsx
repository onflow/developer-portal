// This route is only for testing API functionalities. This page should not be discoverable by the navigation.
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { fetchDiscordAnnouncements } from "~/cms/utils/fetch-discord"

export const loader = async () => {
  const data = await fetchDiscordAnnouncements()
  return json(data)
}

export default function Flips() {
  const { announcementCards, discordNetworkCards } =
    useLoaderData<typeof loader>()

  return (
    <div>
      <h1>DISCORD</h1>
      Number of Announcement Cards: {announcementCards.length}
      <div className="w-full">
        {announcementCards.map((c) => (
          <li id="user-content-fn-1" key={c.link}>
            Announcement: {c.link} - {c.heading} - {c.timestamp}
          </li>
        ))}
      </div>
      Number of Discord Network Cards: {discordNetworkCards.length}
      <div className="w-full">
        {discordNetworkCards.map((c) => (
          <li id="user-content-fn-1" key={c.messageLink}>
            Network Announcement: {c.messageLink} - {c.message} - {c.username} -{" "}
            {c.timestamp}
          </li>
        ))}
      </div>
    </div>
  )
}
