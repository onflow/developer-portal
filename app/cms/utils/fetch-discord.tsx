import { AnnouncementCardProps } from "~/ui/design-system/src/lib/Components/AnnouncementCard"
import { NetworkDiscordCardProps } from "~/ui/design-system/src/lib/Components/NetworkDiscordCard"
import DiscordIcon from "../../../../images/social/discord-light.svg"
import { Client, TextChannel } from "discord.js"
import { DISCORD_BOT_TOKEN, DISCORD_URL } from "./constants"

type MessageInfo = {
  content: string
  createdAt: Date
  url: string
  username?: string
}

export const fetchDiscordAnnouncements = async () => {
  const client = new Client({ intents: [] })
  await client.login(DISCORD_BOT_TOKEN)

  const getChannel = (channel: string): TextChannel => {
    return client.channels.cache.find(
      (c) =>
        c.isText() &&
        (c as TextChannel).name.toLowerCase() === channel.toLowerCase()
    ) as TextChannel
  }

  let channel = getChannel("announcements")

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
      timestamp: createdAt,
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
      timestamp: createdAt,
      messageLink: url,
    } as NetworkDiscordCardProps)

  const getLatestMessagesAsProps = (
    channel: TextChannel,
    limitSize: number,
    convertToProps: Function
  ) => {
    return channel.messages
      .fetch({ limit: limitSize })
      .then((messages) =>
        messages.map((m) => {
          const messageInfo = {
            content: m.content,
            createdAt: m.createdAt,
            url: m.url,
            username: m.author.username,
          } as MessageInfo

          return convertToProps(messageInfo)
        })
      )
      .catch(console.error)
  }

  const getAnnouncementCardProps: AnnouncementCardProps[] | void =
    await getLatestMessagesAsProps(channel, 3, convertToAnnouncementCardProps)

  const getDiscordCardProps: NetworkDiscordCardProps[] | void =
    await getLatestMessagesAsProps(channel, 3, convertToDiscordCardProps)
}
