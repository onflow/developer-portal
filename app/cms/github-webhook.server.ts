import { Commit, PushEvent } from "@octokit/webhooks-types"
import { posix } from "node:path"
import invariant from "tiny-invariant"
import { getManifestCacheKey } from "~/cms/doc-collections/get-manifest-cache-key"
import { docCollections } from "~/data/doc-collections"
import {
  directoryListKey,
  documentCompiledKey,
  documentDownloadKey,
} from "./doc-collections/cache-keys.server"
import { JSON_MANIFEST_FILENAME } from "./doc-collections/constants"
import { stripSlahes } from "./utils/strip-slashes"

type ProcessResult = {
  docCollectionStatus: "match" | "not-found"
  cacheKeysToInvalidate: Set<string>
}

export type PathsResult = {
  updatedDocuments: Set<string>
}

function getMatchingDocCollectionsForPushEvent(event: PushEvent) {
  const repoOwner = event.repository.owner.login
  const repoName = event.repository.name
  const branch = event.ref.replace(/^refs\/heads\//, "")
  invariant(branch.length > 0, `expected a branch`)

  const matchingDocCollections = Object.values(docCollections).filter(
    (docCollection) => {
      return (
        docCollection.source.owner === repoOwner &&
        docCollection.source.name === repoName &&
        docCollection.source.branch === branch
      )
    }
  )

  return matchingDocCollections
}

function getManifestPathForDocCollection(docCollection: any): string {
  return posix.join(docCollection.source.rootPath, JSON_MANIFEST_FILENAME)
}

function getChangedFilesFromCommits(commits: Commit[]): string[] {
  return commits.flatMap((commit) => [
    ...commit.added,
    ...commit.removed,
    ...commit.modified,
  ])
}

function getPathsOfDocumentsFromChanges(
  docCollection: any,
  allChangedFiles: string[]
): string[] {
  return allChangedFiles.filter((path) => {
    let isDocumentPath = path.startsWith(docCollection.source.rootPath)
    let isDocument = path.endsWith(".md") || path.endsWith(".mdx")
    return isDocumentPath && isDocument
  })
}

export function getDocumentPathsForPR(event: PushEvent): PathsResult {
  const updatedDocuments = new Set<string>()
  const matchingDocCollections = getMatchingDocCollectionsForPushEvent(event)

  // Return the empty Set if PR does not change docs in a repo we know about.
  if (matchingDocCollections.length === 0) {
    return {
      updatedDocuments,
    }
  }

  for (let docCollection of matchingDocCollections) {
    const allChangedFiles = getChangedFilesFromCommits(event.commits)

    const documentPaths = getPathsOfDocumentsFromChanges(
      docCollection,
      allChangedFiles
    )

    if (documentPaths.length === 0) {
      continue
    }

    for (let path of documentPaths) {
      updatedDocuments.add(path)
    }
  }

  return {
    updatedDocuments,
  }
}

export function pushEventCacheKeysToInvalidate(
  event: PushEvent
): ProcessResult {
  const matchingDocCollections = getMatchingDocCollectionsForPushEvent(event)

  if (matchingDocCollections.length === 0) {
    return {
      docCollectionStatus: "not-found",
      cacheKeysToInvalidate: new Set(),
    }
  }

  const keysToInvalidate: Set<string> = new Set()

  for (let docCollection of matchingDocCollections) {
    const allChangedFiles = getChangedFilesFromCommits(event.commits)
    const manifestPath = getManifestPathForDocCollection(docCollection)

    if (allChangedFiles.includes(manifestPath)) {
      keysToInvalidate.add(getManifestCacheKey(docCollection.source))
    }

    let documentPaths = getPathsOfDocumentsFromChanges(
      docCollection,
      allChangedFiles
    )

    for (let path of documentPaths) {
      keysToInvalidate.add(
        directoryListKey({
          owner: docCollection.source.owner,
          repo: docCollection.source.name,
          ref: docCollection.source.branch,
          path: posix.resolve("/", stripSlahes(docCollection.source.rootPath)),
        })
      )

      keysToInvalidate.add(
        directoryListKey({
          owner: docCollection.source.owner,
          repo: docCollection.source.name,
          ref: docCollection.source.branch,
          path: posix.resolve("/", posix.dirname(path)),
        })
      )

      let isIndex = path.endsWith("index.md") || path.endsWith("index.mdx")
      let urlPath = path.slice(docCollection.source.rootPath.length)

      urlPath = urlPath.replace(/\.[^/.]+$/, "")

      let compiledKey = documentCompiledKey(docCollection.source, urlPath)
      let downloadKey = documentDownloadKey(docCollection.source, urlPath)

      keysToInvalidate.add(compiledKey)
      keysToInvalidate.add(downloadKey)

      if (isIndex) {
        let rootPath = urlPath.replace(/\/?index/, "")
        let rootCompiledKey = documentCompiledKey(
          docCollection.source,
          rootPath
        )
        let rootDownloadKey = documentDownloadKey(
          docCollection.source,
          rootPath
        )

        keysToInvalidate.add(rootCompiledKey)
        keysToInvalidate.add(rootDownloadKey)
      }
    }
  }

  return {
    docCollectionStatus: "match",
    cacheKeysToInvalidate: keysToInvalidate,
  }
}
