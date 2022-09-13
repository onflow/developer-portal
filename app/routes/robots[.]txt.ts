import { ORIGIN } from "../utils/env.server"

export const loader = () => {
  const sitemapUrl = new URL(`/sitemap.xml`, ORIGIN)

  let robotsTxt = `# Algolia-Crawler-Verif: 98E1096D4FD67E70

User-agent: *
Sitemap: ${sitemapUrl}
Disallow: /_meta
Disallow: /action
`

  if (process.env.NODE_ENV !== "production") {
    robotsTxt = `# Algolia-Crawler-Verif: 98E1096D4FD67E70

User-agent: Algolia Crawler
Sitemap: ${sitemapUrl}
Allow: /

User-agent: *
Disallow: /
`
  }

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      encoding: "UTF-8",
    },
  })
}
