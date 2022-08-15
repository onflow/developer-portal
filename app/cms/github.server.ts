/// <reference types="node" />

import { throttling } from "@octokit/plugin-throttling"
import { Octokit as createOctokit } from "@octokit/rest"
import { posix } from "node:path"
import { DocCollectionSource } from "../constants/doc-collections"
import logger from "../utils/logging.server"
import { InvalidPathError } from "./errors/invalid-path-error"
import { NotFoundError } from "./errors/not-found-error"
import { UnknownEncoding } from "./errors/unknown-encoding"
import { Repo } from "./types"

// Ignore github.com commiter https://github.com/web-flow
const WEB_FLOW_GITHUB_ACCOUNT_ID = 19864447

/**
 * Acceptable markdown file extensions in the order of preference.
 */
const MARKDOWN_EXTENSIONS = ["md", "mdx"]

const Octokit = createOctokit.plugin(throttling)

type ThrottleOptions = {
  method: string
  url: string
  request: { retryCount: number }
}

export const octokit = new Octokit({
  auth: process.env["BOT_GITHUB_TOKEN"],
  log: logger,
  throttle: {
    onRateLimit: (retryAfter: number, options: ThrottleOptions) => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}. Retrying after ${retryAfter} seconds.`
      )

      return true
    },
    onAbuseLimit: (retryAfter: number, options: ThrottleOptions) => {
      // does not retry, only logs a warning
      octokit.log.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      )
    },
  },
})

/**
 * An item returned from the directory listing of a Github repo
 */
export type GitHubItem = Awaited<ReturnType<typeof getDirectoryContent>>[number]

export type AttributionData = {
  lastCommit: {
    sha?: string
    committerDate?: string
    htmlUrl?: string
    author: {
      login?: string
      gravatar_url?: string
      html_url?: string
    }
  }
  otherContributorsCount: number
}

/**
 * A GitHub file with text content that has been populated.
 */
export type GitHubTextFile = GitHubItem & {
  type: "file"

  /**
   * The *encoded* content of the file. Do not assume this is readable
   * plain text - it may require decoding based on the`encoding` property.
   */
  content?: string

  /**
   * The *decoded* text content of the file.
   */
  textContent: string

  /**
   * The path of the file relative to the `source.rootPath`.
   */
  relativePath: string

  attributionData?: AttributionData
}

/**
 * Finds an entry from an array of `GitHubItem`s based on the
 * entry type and name (case-insensitive).
 */
const findGitHubItem = (
  entries: GitHubItem[],
  type: "file" | "dir",
  name: string
) =>
  entries.find(
    (e) => e.type === type && e.name.toLowerCase() === name.toLowerCase()
  )

/**
 * Finds a markdown file matching the given name from a list of `GitHubItem`s
 */
const findMarkdownFile = (
  entries: Awaited<ReturnType<typeof getDirectoryContent>>,
  name: string
) => {
  for (const ext of MARKDOWN_EXTENSIONS) {
    const match = findGitHubItem(entries, "file", `${name}.${ext}`)

    if (match) {
      return match
    }
  }
}

/**
 * Gets a GitHubItem from a repo passed on the given (relative) path.
 *
 * @param source The source that includes where to fetch the file from and
 *   how to interpret the path.
 * @param path A path relative to `source.rootPath`.
 *
 * @throws {@link NotFoundError}
 * Thrown if no file matching the given `path` was found at the `source`
 *
 * @remarks
 *
 * Using the given path, we look for a markdown file matching one of the
 * following patterns (in this order, ignoring case) and returning the
 * first result found:
 *   1. `<source.rootPath>/<path>.md`
 *   2. `<source.rootPath>/<path>.mdx`
 *   3. `<source.rootPath>/<path>/index.md`
 *   4. `<source.rootPath>/<path>/index.mdx`
 *
 * For example if `source.rootPath` is "docs/" and `path` is
 * "workshops/React-Fundamentals", we would look for the following files:
 *    1. `docs/workshops/react-fundamentals.md`
 *    2. `docs/workshops/react-fundamentals.mdx`
 *    3. `docs/workshops/react-fundamentals/index.md`
 *    4. `docs/workshops/react-fundamentals/index.mdx`
 *
 * @returns A promise that resolves to a GitHubItem that matches the given path.
 */
const getMarkdownFile = async (source: DocCollectionSource, path: string) => {
  // Make sure the root path is interpreted as absolute.
  const contentRootPath = posix.resolve("/", source.rootPath)

  const { dir, base } = posix.parse(path.toLowerCase())

  const absoluteDir = posix.resolve(contentRootPath, dir)

  if (!absoluteDir.startsWith(contentRootPath)) {
    // Ensure that any content requested is within the `contentRootPath`.
    // This prevents a request from "breakling out" of the rootPath by using
    // relative paths like: "../../../"
    throw new InvalidPathError(
      path,
      `Path was not within source: ${contentRootPath}`
    )
  }

  const directoryEntries = await getDirectoryContent(source, absoluteDir)

  const fileMatch = findMarkdownFile(directoryEntries, base || "index")

  if (fileMatch) {
    return fileMatch
  }

  if (!base) {
    // If there was no filename provided then the request was for the root
    // TODO: finish this comment.
    throw new NotFoundError(path)
  }

  // Next we see if there is a directory that matches the name
  const directoryMatch = findGitHubItem(directoryEntries, "dir", base)

  if (directoryMatch?.type === "dir") {
    // A directory was found, see if it contains an index file
    const subDirectoryEntries = await getDirectoryContent(
      source,
      directoryMatch.path
    )
    return findMarkdownFile(subDirectoryEntries, "index")
  }
}

/**
 * Downloads the markdown content and supporting files from a source at the
 * the given (relative) path.
 *
 * @see {@link getMarkdownFile} for details on how `path` is interpreted.
 */
export const downloadMarkdown = async (
  source: DocCollectionSource,
  path: string
) => {
  console.log(
    `Downloading ${source.owner}/${source.name}/${source.branch}/${source.rootPath}/${path}`
  )

  const match = await getMarkdownFile(source, path)

  if (!match) {
    throw new NotFoundError(path)
  }

  const content = await downloadFileBySha(source, match.sha)
  const attributionData = await getAttributionData(source, match.path)
  const relativePath = posix.relative(
    posix.resolve("/", source.rootPath),
    posix.resolve("/", match.path)
  )

  return {
    /**
     * The primary Markdown file to render.
     */
    file: {
      ...match,
      textContent: content.toString(),
      relativePath,
      attributionData,
    } as GitHubTextFile,

    // We don't currently download any supporting files, but if we need to
    // in the futre they should be included here. This would allow using
    // .mdx files that import related files.

    /**
     * Any supporting files needed to bundle the `file` (i.e. external files
     * that may be imported by the main `file`.
     */
    files: [] as GitHubTextFile[],
  }
}

/**
 * Downloads a file from a Github repo by it's SHA hash.
 * @param repo the repo to download from
 * @param sha the hash of the file
 * @returns a promise that resolves to a Buffer containing the contents of the file
 */
async function downloadFileBySha(repo: Repo, sha: string) {
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
    {
      owner: repo.owner,
      repo: repo.name,
      file_sha: sha,
    }
  )
  if (!Buffer.isEncoding(data.encoding)) {
    throw new UnknownEncoding(data.url, data.encoding)
  }

  return Buffer.from(data.content, data.encoding)
}

function getCommits(repo: Repo, path: string, perPage?: number) {
  return octokit.rest.repos.listCommits({
    owner: repo.owner,
    repo: repo.name,
    path,
    per_page: perPage,
  })
}

async function getAttributionData(repo: Repo, path: string) {
  const { data: commits } = await getCommits(repo, path, 1)
  if (typeof commits === "undefined") return undefined
  const lastCommit = commits[0]
  const lastCommitAuthor = commits[0]?.author
  let otherContributorsCount = 0

  // Show additional contributor count when commiter is not the same as the author
  if (
    ![WEB_FLOW_GITHUB_ACCOUNT_ID, lastCommit?.author?.id].includes(
      lastCommit?.committer?.id
    )
  )
    otherContributorsCount += 1

  // Count any additional authors based on git message (https://docs.github.com/en/pull-requests/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors)
  const coAuthorCount = (
    lastCommit?.commit.message.match(/Co-authored-by/gi) || []
  ).length
  otherContributorsCount += coAuthorCount

  const attributionData: AttributionData = {
    lastCommit: {
      sha: lastCommit?.sha,
      committerDate: lastCommit?.commit?.committer?.date,
      htmlUrl: lastCommit?.html_url,
      author: {
        login: lastCommitAuthor?.login,
        gravatar_url: lastCommitAuthor?.avatar_url,
        html_url: lastCommitAuthor?.html_url,
      },
    },
    otherContributorsCount: otherContributorsCount,
  }

  return attributionData
}

/**
 * Downloads a file from a Github source by a path that is relative to the
 * `source.rootPath`
 */
export async function downloadFileByPath(
  source: DocCollectionSource,
  path: string
) {
  const resolvedPath = posix.join(source.rootPath, path)

  const { data } = await octokit.repos.getContent({
    owner: source.owner,
    repo: source.name,
    ref: source.branch,
    path: resolvedPath,
  })

  if (Array.isArray(data)) {
    throw new NotFoundError(
      resolvedPath,
      `Path was a directory, but expected a file: ${resolvedPath}`
    )
  }

  if (!("encoding" in data)) {
    throw new NotFoundError(
      resolvedPath,
      `Content (of type ${data.type}, at URL ${data.url}), does not specify an encoding: ${resolvedPath}`
    )
  }

  if (!Buffer.isEncoding(data.encoding)) {
    throw new UnknownEncoding(data.url, data.encoding)
  }

  return Buffer.from(data.content, data.encoding)
}

/**
 * Fetches the content of a directory within a Github repo.
 */
const getDirectoryContent = async (repo: Repo, path: string) => {
  const { data } = await octokit.repos.getContent({
    owner: repo.owner,
    repo: repo.name,
    path,
    headers: { branch: repo.branch },
  })

  // If the result wasn't an array, then the path was not a directory.
  return Array.isArray(data) ? data : []
}
