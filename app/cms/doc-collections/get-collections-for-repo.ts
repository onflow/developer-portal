import { docCollections } from "../../data/doc-collections"
import { DocCollection } from "./types"

const docCollectionEntries = Object.entries(
  docCollections as Record<string, DocCollection>
)

export type GetCollectionsForRepoOptions = {
  owner: string
  name: string
}

/**
 * Returns any doc collections that have the use the given repo as a source
 */
export const getCollectionsForRepo = ({
  owner,
  name,
}: GetCollectionsForRepoOptions) => {
  // Find all doc collections that use the current repo as a source.
  return docCollectionEntries.filter(
    ([_, { source }]) => source.owner === owner && source.name === name
  )
}
