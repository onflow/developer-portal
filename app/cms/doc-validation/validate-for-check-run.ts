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

  const changedFiles = await fetchChangedFilesForCheckRun(repo, checkRun)

  // We only care about collections in which we've changed files within
  // it's `rootPath`, so filter out any collections that are in the same
  // repo but in a collection that hasn't been touched.
  const changedCollections = repoCollections.filter(([a, collection]) =>
    changedFiles.some(({ filename }) =>
      filename
        .toLowerCase()
        .startsWith(collection.source.rootPath.toLowerCase())
    )
  )

  const removedFiles = changedFiles
    .filter(({ status }) => status === "removed" || status === "renamed")
    .map(({ status, filename, previous_filename }) =>
      status === "removed" ? previous_filename! : filename
    )

  const {
    data: { tree },
  } = await fetchTree({
    owner: repo.owner.login,
    repo: repo.name,
    sha: checkRun.head_sha,
    recursive: true,
  })

  const currentFiles = tree
    .map(({ path }) => path)
    .filter((path) => !!path) as string[]

  const filesByCollection = changedCollections.map(([_, collection]) => {
    const rootPath = collection.source.rootPath.toLowerCase()
    return {
      collection,
      files: currentFiles.filter((path) =>
        path.toLowerCase().startsWith(rootPath)
      ),
      filesRemoved: removedFiles.filter((path) =>
        path.toLowerCase().startsWith(rootPath)
      ),
    }
  })

  const results = await Promise.all(
    filesByCollection.map(({ collection, files, filesRemoved }) =>
      validateCollection({
        collection,
        files,
        filesRemoved,
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
