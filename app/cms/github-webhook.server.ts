import { PushEvent } from "@octokit/webhooks-types"
import invariant from "tiny-invariant"
import { docCollections } from "~/constants/doc-collections.server"
import { posix, parse } from "node:path"
import {
  JSON_MANIFEST_FILENAME,
  manifestCacheKey,
} from "~/constants/doc-collection-manifest"
import { getCompiledKey, getDownloadKey } from "./cache-keys.server"

type ProcessResult = {
  docCollectionStatus: "match" | "not-found"
  cacheKeysToInvalidate: Set<string>
}

export function pushEventCacheKeysToInvalidate(
  event: PushEvent
): ProcessResult {
  const repoOwner = event.repository.owner.login
  const repoName = event.repository.name
  const branch = event.ref.replace(/^refs\/heads\//, "")
  invariant(branch.length > 0, `expected a branch`)

  const docCollection = Object.values(docCollections).find((docCollection) => {
    return (
      docCollection.source.owner === repoOwner &&
      docCollection.source.name === repoName &&
      docCollection.source.branch === branch
    )
  })

  if (!docCollection) {
    return {
      docCollectionStatus: "not-found",
      cacheKeysToInvalidate: new Set(),
    }
  }

  const allChangedFiles = event.commits.flatMap((commit) => [
    ...commit.added,
    ...commit.removed,
    ...commit.modified,
  ])

  const keysToInvalidate: Set<string> = new Set()

  const manifestPath = posix.join(
    docCollection.source.rootPath,
    JSON_MANIFEST_FILENAME
  )

  if (allChangedFiles.includes(manifestPath)) {
    keysToInvalidate.add(manifestCacheKey(docCollection.source))
  }

  let documentPaths = allChangedFiles.filter((path) => {
    let isDocumentPath = path.startsWith(docCollection.source.rootPath)
    let isDocument = path.endsWith(".md") || path.endsWith(".mdx")
    return isDocumentPath && isDocument
  })

  for (let path of documentPaths) {
    let isIndex = path.endsWith("index.md") || path.endsWith("index.mdx")
    let urlPath = path.slice(docCollection.source.rootPath.length)
    urlPath = urlPath.replace(/\.[^/.]+$/, "")

    let compiledKey = getCompiledKey(docCollection.source, urlPath)
    let downloadKey = getDownloadKey(docCollection.source, urlPath)

    keysToInvalidate.add(compiledKey)
    keysToInvalidate.add(downloadKey)

    if (isIndex) {
      let rootPath = urlPath.replace(/\/?index/, "")
      let rootCompiledKey = getCompiledKey(docCollection.source, rootPath)
      let rootDownloadKey = getDownloadKey(docCollection.source, rootPath)

      keysToInvalidate.add(rootCompiledKey)
      keysToInvalidate.add(rootDownloadKey)
    }
  }

  return {
    docCollectionStatus: "match",
    cacheKeysToInvalidate: keysToInvalidate,
  }
}
