import { ORIGIN } from "../utils/env.server"

export const loader = () => {
  const sitemapUrl = new URL(`/sitemap.xml`, ORIGIN)
  const robotsTxt = `# Algolia-Crawler-Verif: 98E1096D4FD67E70

User-agent: *
Sitemap: ${sitemapUrl}
Disallow: /_meta
Disallow: /action
`

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      encoding: "UTF-8",
    },
  })
}
