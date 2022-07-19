import { SITE_DESCRIPTION, SITE_TITLE } from "~/cms/constants"

export function getSocialMetas({
  url,
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  image = "",
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
    "twitter:description": description,
    "twitter:image": image,
    "twitter:alt": title,
  }
}

export const getMetaTitle = (title?: string) =>
  [title, "Flow Developer Portal"].filter(Boolean).join(" | ")
