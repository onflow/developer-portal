import { CheckRunEvent, Repository } from "@octokit/webhooks-types"
import logger from "../../utils/logging.server"
import { getCollectionsForRepo } from "../doc-collections/get-collections-for-repo"
import { DocCollection } from "../doc-collections/types"
import { fetchChangedFilesForCheckRun } from "../github/fetch-changed-files-for-check-run"
import { fetchTree } from "../github/fetch-tree"
import {
  FileValidationResult,
  validateCollection,
} from "./validate-collection.server"

export type ValidateChangesForCheckRunResult = Array<{
  collection: DocCollection
  files: FileValidationResult[]
}>

export const validateChangesForCheckRun = async (
  repo: Repository,
  checkRun: CheckRunEvent["check_run"]
): Promise<ValidateChangesForCheckRunResult> => {
  // Find all doc collections that use the current repo as a source.
  const repoCollections = getCollectionsForRepo({
    owner: repo.owner.login,
    name: repo.name,
  })

  logger.debug(
    `Found ${repoCollections.length} matching doc collections for the repo "${
      repo.full_name
    }": ${repoCollections.map(([key]) => key).join(", ")}`
  )

  if (repoCollections.length === 0) {
    return []
  }

  const changedFiles = (await fetchChangedFilesForCheckRun(repo, checkRun)).map(
    (f) => f.filename
  )

  // We only care about collections in which we've changed files within
  // it's `rootPath`, so filter out any collections that are in the same
  // repo but in a collection that hasn't been touched.
  const changedCollections = repoCollections.filter(([a, collection]) =>
    changedFiles.some((file) =>
      file.toLowerCase().startsWith(collection.source.rootPath.toLowerCase())
    )
  )

  const {
    data: { tree },
  } = await fetchTree({
    owner: repo.owner.login,
    repo: repo.name,
    sha: checkRun.head_sha,
    recursive: true,
  })

  const filesByCollectionMap = tree.reduce((prev, current) => {
    const collectionTuple = changedCollections.find(([, { source }]) =>
      current.path?.toLowerCase().startsWith(source.rootPath.toLowerCase())
    )

    if (!collectionTuple) {
      // The file doesn't belong to a collection that has been changed, so
      // ignore it.
      return prev
    }

    const [collectionBasePath, collection] = collectionTuple

    prev[collectionBasePath] = prev[collectionBasePath] || {
      collection,
      files: [] as string[],
    }
    prev[collectionBasePath]!.files.push(current.path!)

    return prev
  }, {} as Record<string, { collection: DocCollection; files: string[] }>)

  const filesByCollection = Object.values(filesByCollectionMap).filter(
    ({ files }) => files.length > 0
  )

  const results = await Promise.all(
    filesByCollection.map(({ collection, files }) =>
      validateCollection({
        collection,
        files,
        filesRemoved: [],
        filesToValidate: changedFiles,
        repo,
        sha: checkRun.head_sha,
      })
    )
  )

  return results.map((files, index) => ({
    collection: filesByCollection[index]!.collection,
    files,
  }))
}
