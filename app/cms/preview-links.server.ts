import { CheckRunEvent, Repository } from "@octokit/webhooks-types"
import { posix } from "node:path"
import { stripExtension } from "~/ui/design-system/src/lib/utils/stripExtension"
import { docCollections } from "../data/doc-collections"
import { ORIGIN } from "../utils/env.server"
import logger from "../utils/logging.server"
import { octokit } from "./github/octokit.server"

/**
 * The statuses we consider when deciding which files to look at from a diff
 */
const FILE_STATUS_FILTER = ["added", "modified", "renamed", "copied", "changed"]

/**
 * A regex to filter files we consider based on their extension.
 */
const EXTENSION_FILTER = /(.mdx?)/

export const getPreviewLinkSummary = async (
  repo: Repository,
  checkRun: CheckRunEvent["check_run"]
) => {
  // Find all doc collections that use the current repo as a source.
  const matchingCollections = Object.entries(docCollections).filter(
    ([_, { source }]) =>
      source.owner === repo.owner.login && source.name === repo.name
  )

  logger.debug(
    `Found ${
      matchingCollections.length
    } matching doc collections for the repo "${
      repo.full_name
    }": ${matchingCollections.map(([key]) => key).join(", ")}`
  )

  if (matchingCollections.length === 0) {
    return `No doc collections found matching repo "${repo.full_name}"`
  }

  let files: Awaited<ReturnType<typeof octokit.pulls.listFiles>>["data"] = []

  if (checkRun.pull_requests.length > 0) {
    // Prefer to use a pull request if available.
    const pullRequest = checkRun.pull_requests[0]!
    logger.debug(`Fetching files based on pull request ${pullRequest.number}`)
    const { data } = await octokit.pulls.listFiles({
      owner: repo.owner.login,
      repo: repo.name,
      pull_number: pullRequest.number,
    })
    files = data
  } else {
    // Fallback to comparing this branch with the branch specified in the source
    // of the first matching doc collection. If we have multiple matches the
    // base branch _could_ theoretically vary (however unlikely). But we need to
    // pick _something to compare it to, and this is as good as any other base.
    const base = matchingCollections[0]![1].source.branch
    logger.debug(
      `No pull request found, fetching files based on diff of ${base}...${checkRun.head_sha}`
    )
    const diff = await octokit.request(
      "GET /repos/{owner}/{repo}/compare/{basehead}",
      {
        owner: repo.owner.login,
        repo: repo.name,
        basehead: `${base}...${checkRun.head_sha}`,
      }
    )
    files = diff.data.files || []
  }

  // First filter out any statuses that matter (we don't care about deleted files, for example)
  const changed = files.filter((f) => FILE_STATUS_FILTER.includes(f.status))

  // We only care about markdown files.
  const markdownFiles = changed.filter((f) => EXTENSION_FILTER.test(f.filename))

  // Match the remaining files to the collection they belong to, which we need
  // to be able to generate the correct URL from it's base path.
  const collectionFiles = markdownFiles
    .map(({ filename }) => {
      const filenameLower = filename.toLowerCase()
      const collection = matchingCollections.find(([_, { source }]) =>
        filenameLower.startsWith(source.rootPath)
      )
      return {
        filename,
        relativeFilename:
          collection &&
          filename.substring(collection[1].source.rootPath.length),
        baseUrl: collection?.[0],
        collection: collection?.[1],
      }
    })
    .filter(({ collection }) => !!collection)

  logger.debug(
    `Total files: ${files.length}; Changed/added: ${changed.length}; Markdown: ${markdownFiles.length}; Matched: ${collectionFiles.length}`
  )

  if (collectionFiles.length === 0) {
    return "No matching files found"
  }

  // Finally, generate the underlying URLs.
  const urls = collectionFiles.map(
    ({ baseUrl, filename, relativeFilename }) => ({
      filename,
      url: new URL(
        posix.join(baseUrl!, stripExtension(relativeFilename!)),
        ORIGIN
      ).href,
    })
  )

  // The preview param can be any ref, but we prefer to use a branch name if it's
  // available. If not, fallback to the SHA.
  const preview = checkRun.check_suite.head_branch || checkRun.head_sha

  return urls
    .map(({ filename, url }) => `- [${filename}](${url}?preview=${preview})`)
    .join("\r\n")
}
