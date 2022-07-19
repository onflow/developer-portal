import { getRequiredServerEnvVar } from "~/cms/helpers"

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
  let paths = [""]
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
