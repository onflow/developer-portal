export function getSocialMetas({
  url,
  title = "Welcome to the Flow developer docs",
  description = "Your resource for everything you'll need to build in Flow",
  origin,
  image,
  keywords = "",
}: {
  origin: string
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
}) {
  return {
    title,
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
