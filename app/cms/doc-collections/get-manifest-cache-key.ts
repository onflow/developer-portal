import { DocCollectionSource } from "./types"

/**
 * Returns the key to use for caching a doc collection's manifest.
 */
export function getManifestCacheKey(source: DocCollectionSource): string {
  return [`manifest`, source.owner, source.name, source.branch].join(":")
}
