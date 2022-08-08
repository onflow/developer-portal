import { posix } from "path"
import { getRequiredServerEnvVar } from "~/cms/helpers"
import { docCollections } from "~/constants/doc-collections"
import { SidebarItem } from "../ui/design-system/src/lib/Components/InternalSidebar"

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
  "/action",
  "/community",
  "/concepts",
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
  const internalUrls = Object.entries(docCollections).flatMap(
    ([rootPath, { manifest }]) => {
      if (!manifest.sidebars) {
        return []
      }
      return Object.entries(manifest.sidebars).flatMap(([sidebarPath, items]) =>
        getSidebarUrls(posix.join(rootPath, sidebarPath), items)
      )
    }
  )

  const paths = new Set([...STATIC_ROUTES, ...internalUrls])
  const entries = [...paths].map((pathname) => ({ pathname }))
  const origin: string = getRequiredServerEnvVar(
    "ORIGIN",
    `http://localhost:3000`
  )

  const content = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries.map((entry) => entryNode(entry, origin)).join("")}
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
