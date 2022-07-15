import { AnnouncementCardProps } from "~/ui/design-system/src/lib/Components/AnnouncementCard"
import { NetworkDiscordCardProps } from "~/ui/design-system/src/lib/Components/NetworkDiscordCard"
import DiscordIcon from "../../ui/design-system/images/social/discord-light.svg"
import {
  DISCORD_ANNOUNCEMENTS_CHANNEL_ID,
  DISCORD_DEV_UPDATES_CHANNEL_ID,
  DISCORD_URL,
} from "./constants"
import {
  getChannel,
  getLatestMessages,
  setupClient,
  TextChannel,
} from "../../cms/index"

export type MessageInfo = {
  content: string
  createdAt: Date
  url: string
  username?: string
}

const DEFAULT_MESSAGE_INFO: MessageInfo = {
  content:
    "Failed to connect to discord! Click on the discord link to see more",
  createdAt: new Date(),
  url: DISCORD_URL,
  username: "@flow_admin",
}

export const fetchDiscordAnnouncements = async () => {
  await setupClient()
  const announcementChannel: TextChannel = await getChannel(
    DISCORD_ANNOUNCEMENTS_CHANNEL_ID
  )
  const latestMessagesAnnouncements: MessageInfo[] | void =
    await getLatestMessages(announcementChannel, 3)

  const devUpdatesChannel: TextChannel = await getChannel(
    DISCORD_DEV_UPDATES_CHANNEL_ID
  )
  const latestMessagesDevUpdates: MessageInfo[] | void =
    await getLatestMessages(devUpdatesChannel, 3)

  const convertToAnnouncementCardProps = ({
    content,
    createdAt,
    url,
    username,
  }: MessageInfo) =>
    ({
      sourceIcon: DiscordIcon,
      sourceAltText: "",
      heading: content,
      timestamp: createdAt as Date,
      link: url,
    } as AnnouncementCardProps)

  const convertToDiscordCardProps = ({
    content,
    createdAt,
    url,
    username,
  }: MessageInfo) =>
    ({
      message: content,
      username: username,
      timestamp: createdAt as Date,
      messageLink: url,
    } as NetworkDiscordCardProps)

  const getAnnouncementCardProps = () => {
    return latestMessagesAnnouncements
      ? latestMessagesAnnouncements.map((m) =>
          convertToAnnouncementCardProps(m)
        )
      : [convertToAnnouncementCardProps(DEFAULT_MESSAGE_INFO)]
  }

  const getDiscordCardProps = () => {
    return latestMessagesDevUpdates
      ? latestMessagesDevUpdates.map((m) => convertToDiscordCardProps(m))
      : [convertToDiscordCardProps(DEFAULT_MESSAGE_INFO)]
  }

  return {
    announcementCards: getAnnouncementCardProps(),
    discordNetworkCards: getDiscordCardProps(),
  }
}
