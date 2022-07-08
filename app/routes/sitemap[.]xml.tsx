import invariant from "tiny-invariant"
import { getRequiredServerEnvVar } from "~/cms/helpers"
import { schemas } from "~/constants/repos"
import {
  firstRouteMap,
  firstRoutes,
  flowInnerContents,
  repoNames,
  secondRoutes,
} from "~/constants/repos/contents-structure"
import { isNotNull } from "~/utils/filters"

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

type Entry = { pathname: string }

export const loader = () => {
  // pages defined in app/routes
  const staticRoutes = [
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

  const internalIndexPaths = Object.entries(schemas)
    .flatMap(([key, schema]) => {
      return (
        schema?.sidebar.sections.flatMap((section) =>
          section.items.flatMap((item) => {
            console.log(`sitemap section key, item: ${key}, ${item.href}`)
            if (firstRoutes.includes(key)) {
              return `${key}/${item.href}`
            }

            if (secondRoutes.includes(key)) {
              let firstRoute = firstRouteMap[key]
              invariant(firstRoute, `expected section for ${key}`)
              if (repoNames.includes(key)) {
                return `${firstRoute}/${key}/${item.href}`
              }
              return `${firstRoute}/${item.href}`
            }

            // TODO: handle other sidebar items

            return null
          })
        ) ?? []
      )
    })
    .filter(isNotNull)

  let paths = [...staticRoutes, ...internalIndexPaths]
  // remove duplicates
  paths = [...new Set(paths)]

  let entries: Array<Entry> = paths.map((p) => ({ pathname: p }))

  let origin: string = getRequiredServerEnvVar(
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
