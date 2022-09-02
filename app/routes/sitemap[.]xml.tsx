import { posix } from "path"
import { docCollections } from "~/data/doc-collections"
import { networks } from "../data/networks"
import { SidebarItem } from "../ui/design-system/src/lib/Components/InternalSidebar"
import { ORIGIN } from "../utils/env.server"

type Entry = { pathname: string }

function entryNode(entry: Entry, origin: string): string {
  const url = new URL(entry.pathname, origin)
  return `
    <url>
      <loc>${url}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
`
}

/**
 * Returns an array of URLs from an array of `SidebarItem` located
 * at the given path.
 */
const getSidebarUrls = (path: string, sidebar: SidebarItem[]): string[] => {
  return sidebar.flatMap((item) => {
    const urls = "href" in item ? [posix.join(path, item.href)] : []

    return item.items ? urls.concat(getSidebarUrls(path, item.items)) : urls
  })
}

// pages defined in app/routes
const STATIC_ROUTES = [
  "/",
  "/community",
  "/getting-started",
  "/http-api",
  "/learn",
  "/network",
  "/sdks",
  "/tools",
]

export const loader = () => {
  // For internal pages, obtain a list of known URLs from the sidebar
  // definitions.
  const docsUrls = Object.entries(docCollections).flatMap(
    ([rootPath, { manifest }]) => {
      if (!("sidebars" in manifest)) {
        return []
      }
      return Object.entries(manifest.sidebars).flatMap(([sidebarPath, items]) =>
        getSidebarUrls(posix.join(rootPath, sidebarPath), items)
      )
    }
  )

  const networkUrls = networks.map(({ urlPath }) => `network/${urlPath}`)

  const paths = new Set([...STATIC_ROUTES, ...networkUrls, ...docsUrls])
  const entries = [...paths].map((pathname) => ({ pathname }))

  const content = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries.map((entry) => entryNode(entry, ORIGIN)).join("")}
</urlset>
  `

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "xml-version": "1.0",
      encoding: "UTF-8",
    },
  })
}
