import { PushEvent } from "@octokit/webhooks-types"
import invariant from "tiny-invariant"
import { docCollections } from "~/constants/doc-collections"
import { posix } from "node:path"
import {
  JSON_MANIFEST_FILENAME,
  manifestCacheKey,
} from "~/constants/doc-collection-manifest"

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

  return {
    docCollectionStatus: "match",
    cacheKeysToInvalidate: keysToInvalidate,
  }
}
