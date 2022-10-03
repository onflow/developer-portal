import { getPreviewLinks } from "./get-preview-links.server"

export const getPreviewLinksSummary = (
  previewLinksByCollection: Awaited<ReturnType<typeof getPreviewLinks>>
) => {
  const totalLinks = previewLinksByCollection.reduce(
    (count, { previews }) => previews.length + count,
    0
  )

  if (totalLinks === 0) {
    return {
      title: "No document changes detected",
      summary: "No developer portal document collection changes detected",
    }
  }

  const title = `${totalLinks} preview link${
    totalLinks === 1 ? "" : "s"
  } available`

  // Generate a markdown-formatted summary for each collection that has preview links
  const summaries = previewLinksByCollection
    .filter(({ previews }) => previews.length > 0)
    .map(
      ({ collection, previews }) => `
## ${collection.manifest.displayName} (${collection.source.rootPath})

${previews
  .map(({ filename, url }) => `- [${filename}](${url.href})`)
  .join("\r\n")}

`
    )

  return {
    title,
    summary: summaries.join("\r\n"),
  }
}
