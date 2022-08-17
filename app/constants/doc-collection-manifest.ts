import { DocCollectionSource } from "./doc-collections"

export const JSON_MANIFEST_FILENAME = "flow-docs.json"

export function manifestCacheKey(source: DocCollectionSource): string {
  return [`manifest`, source.owner, source.name, source.branch].join(":")
}
