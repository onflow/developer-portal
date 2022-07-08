import { LoaderFunction } from "@remix-run/node"
import { getRequiredServerEnvVar } from "~/cms/helpers"

export const loader: LoaderFunction = () => {
  let origin: string = getRequiredServerEnvVar(
    "ORIGIN",
    `http://localhost:3000`
  )

  const sitemapUrl = new URL(`/sitemap.xml`, origin)

  const robotsTxt = `# Algolia-Crawler-Verif: 98E1096D4FD67E70

User-agent: *
Allow: /
Sitemap: ${sitemapUrl}
`

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      encoding: "UTF-8",
    },
  })
}
