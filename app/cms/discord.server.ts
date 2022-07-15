import { Client, Message, TextChannel } from "discord.js"
import invariant from "tiny-invariant"
import { MessageInfo } from "./utils/fetch-discord"

const DISCORD_BOT_TOKEN = process.env.BOT_DISCORD_TOKEN

invariant(DISCORD_BOT_TOKEN, "DISCORD_BOT_TOKEN is required")

export const client = new Client()

export async function setupClient() {
  client.on("ready", async () => {
    console.log("Discord client ready to go!")
  })

  await client.login(DISCORD_BOT_TOKEN)
}

export const getChannel = async (channelId: string): Promise<TextChannel> => {
  const channel = (await client.channels.fetch(channelId)) as TextChannel
  return channel
}

export const searchAndReplaceEmojis = (cleanContent: string) => {
  const EMOJI_REGEX = /<:.*?(?=:):[0-9]*>/gm // For removing custom emojis
  return cleanContent.replaceAll(EMOJI_REGEX, "")
}

export const getCleanContent = (m: Message) => {
  let cleanContent = m.cleanContent
  if (!cleanContent || cleanContent === "") {
    // Check embeds for bot content
    if (m.embeds) {
      cleanContent = m.embeds[0]!.title!
    }
  }

  // Resolve emojis
  return searchAndReplaceEmojis(cleanContent)
}

export const getLatestMessages = (channel: TextChannel, limitSize: number) => {
  return channel.messages
    .fetch({ limit: limitSize })
    .then((messages) =>
      messages.map(
        (m) =>
          ({
            content: getCleanContent(m),
            createdAt: m.createdAt,
            url: m.url,
            username: m.author.username,
          } as MessageInfo)
      )
    )
    .catch(console.error)
}

export type { TextChannel }
