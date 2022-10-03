import { CheckRunEvent, Repository } from "@octokit/webhooks-types"
import { posix } from "node:path"
import { stripMarkdownExtension } from "~/ui/design-system/src/lib/utils/stripMarkdownExtension"
import { ORIGIN } from "../../utils/env.server"
import logger from "../../utils/logging.server"
import { getCollectionsForRepo } from "../doc-collections/get-collections-for-repo"
import { DocCollection } from "../doc-collections/types"
import { fetchChangedFilesForCheckRun } from "../github/fetch-changed-files-for-check-run"
import { filterFileDiffStatusIsChanged } from "../github/filter-file-diff-status-is-changed"
import { filterFileNameHasMarkdownExtension } from "../github/filter-file-name-has-markdown-extension"

export type GetPreviewLinksResult = Array<{
  collection: DocCollection
  previews: Array<{
    filename: string
    url: URL
  }>
}>

export const getPreviewLinks = async (
  repo: Repository,
  checkRun: CheckRunEvent["check_run"]
): Promise<GetPreviewLinksResult> => {
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

  // First filter out any statuses that matter (we don't care about deleted files, for example)
  const files = changedFiles.filter(filterFileDiffStatusIsChanged)

  // We only care about markdown files.
  const markdownFiles = files.filter(filterFileNameHasMarkdownExtension)

  const preview = checkRun.check_suite.head_branch || checkRun.head_sha

  return repoCollections
    .map(([baseUrl, collection]) => {
      const rootPathLower = collection.source.rootPath.toLowerCase()
      return {
        collection,
        previews: markdownFiles
          .filter(({ filename }) =>
            filename.toLowerCase().startsWith(rootPathLower)
          )
          .map(({ filename }) => {
            const relativeFilename = filename.substring(rootPathLower.length)
            const url = new URL(
              posix.join(baseUrl!, stripMarkdownExtension(relativeFilename!)),
              ORIGIN
            )
            url.searchParams.set("preview", preview)

            return {
              filename,
              url,
            }
          }),
      }
    })
    .filter(({ previews }) => previews.length > 0)
}
