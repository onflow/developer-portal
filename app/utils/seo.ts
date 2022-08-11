import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from "~/constants"

export function getSocialMetas({
  url,
  title = DEFAULT_SITE_TITLE,
  description = DEFAULT_SITE_DESCRIPTION,
  image = "https://flow-og-image.vercel.app/**Explore the Flow Developer Portal**.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fstorage.googleapis.com%2Fflow-resources%2Fdocumentation-assets%2Fflow-docs.png&widths=auto&heights=350",
  keywords = "",
}: {
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
}) {
  return {
    title: getMetaTitle(title),
    description,
    keywords,
    image,
    "og:url": url,
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "twitter:card": image ? "summary_large_image" : "summary",
    "twitter:creator": "@flow_blockchain",
    "twitter:site": "@flow_blockchain",
    "twitter:title": title,
    "twitter:image": image,
    "twitter:description": description,
    "twitter:alt": title,
  }
}

export const getMetaTitle = (title?: string) =>
  [title, "Flow Developer Portal"].filter(Boolean).join(" | ")
