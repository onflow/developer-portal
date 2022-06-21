/// <reference types="node" />

import { throttling } from "@octokit/plugin-throttling"
import { Octokit as createOctokit } from "@octokit/rest"
import nodePath from "path"
import { flowContentNames } from "~/constants/repos"

type GitHubFile = { path: string; content: string }

const Octokit = createOctokit.plugin(throttling)

const OWNER = process.env.GITHUB_REPO_OWNER || "onflow"

type ThrottleOptions = {
  method: string
  url: string
  request: { retryCount: number }
}

function debugEnv(): string {
  return JSON.stringify(process.env, null, 2)
}

const octokit = new Octokit({
  auth: process.env["BOT_GITHUB_TOKEN"],
  throttle: {
    onRateLimit: (retryAfter: number, options: ThrottleOptions) => {
      console.warn(
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

async function downloadFirstMdxFile(
  repo: string,
  list: Array<{ name: string; type: string; path: string; sha: string }>
) {
  const filesOnly = list.filter(({ type }) => type === "file")
  for (const extension of [".mdx", ".md"]) {
    const file = filesOnly.find(({ name }) => name.endsWith(extension))
    if (file) return downloadFileBySha(repo, file.sha)
  }
  return null
}

/**
 *
 * @param relativeMdxFileOrDirectory the path to the content. For example:
 * content/workshops/react-fundamentals.mdx (pass "workshops/react-fudnamentals")
 * content/workshops/react-hooks/index.mdx (pass "workshops/react-hooks")
 * @returns A promise that resolves to an Array of GitHubFiles for the necessary files
 */
async function downloadMdxFileOrDirectory(
  repo: string,
  fileOrDirPath: string
): Promise<{ entry: string; files: Array<GitHubFile> }> {
  /* If the repository is internal /flow content
   * - Map Flow Content Paths to the right repository paths
   * - Reassign repository to Flow
   */
  console.log("repo requested", repo, fileOrDirPath)
  const mdxFileOrDirectory = flowContentNames.includes(repo)
    ? `docs/content/${repo}/${fileOrDirPath}`
    : `docs/${fileOrDirPath}`
  repo = flowContentNames.includes(repo) ? "flow" : repo

  console.log(`Downloading ${repo}/${mdxFileOrDirectory}`)

  const parentDir = nodePath.dirname(mdxFileOrDirectory)
  const dirList = await downloadDirList(repo, parentDir)

  const basename = nodePath.basename(mdxFileOrDirectory)
  const mdxFileWithoutExt = nodePath.parse(mdxFileOrDirectory).name
  const potentials = dirList.filter(({ name }) => name.startsWith(basename))
  const exactMatch = potentials.find(
    ({ name }) => nodePath.parse(name).name === mdxFileWithoutExt
  )
  const dirPotential = potentials.find(({ type }) => type === "dir")

  const content = await downloadFirstMdxFile(
    repo,
    exactMatch ? [exactMatch] : potentials
  )

  let files: Array<GitHubFile> = []
  let entry = mdxFileOrDirectory
  if (content) {
    // technically you can get the blog post by adding .mdx at the end... Weird
    // but may as well handle it since that's easy...
    entry = mdxFileOrDirectory.endsWith(".mdx")
      ? mdxFileOrDirectory
      : `${mdxFileOrDirectory}.mdx`
    // /content/about.mdx => entry is about.mdx, but compileMdx needs
    // the entry to be called "/content/index.mdx" so we'll set it to that
    // because this is the entry for this path
    files = [{ path: nodePath.join(mdxFileOrDirectory, "index.mdx"), content }]
  } else if (dirPotential) {
    entry = dirPotential.path
    files = await downloadDirectory(repo, mdxFileOrDirectory)
  }
  return { entry, files }
}

/**
 *
 * @param dir the directory to download.
 * This will recursively download all content at the given path.
 * @returns An array of file paths with their content
 */
async function downloadDirectory(
  repo: string,
  dir: string
): Promise<Array<GitHubFile>> {
  const dirList = await downloadDirList(repo, dir)

  const result = await Promise.all(
    dirList.map(async ({ path: fileDir, type, sha }) => {
      switch (type) {
        case "file": {
          const content = await downloadFileBySha(repo, sha)
          return { path: fileDir, content }
        }
        case "dir": {
          return downloadDirectory(repo, fileDir)
        }
        default: {
          throw new Error(`Unexpected repo file type: ${type}`)
        }
      }
    })
  )

  return result.flat()
}

/**
 *
 * @param sha the hash for the file (retrieved via `downloadDirList`)
 * @returns a promise that resolves to a string of the contents of the file
 */
async function downloadFileBySha(repo: string, sha: string) {
  const { data } = await octokit.request(
    "GET /repos/{owner}/{repo}/git/blobs/{file_sha}",
    {
      owner: OWNER,
      repo,
      file_sha: sha,
    }
  )
  //                                lol
  const encoding = data.encoding as Parameters<typeof Buffer.from>["1"]
  return Buffer.from(data.content, encoding).toString()
}

async function downloadFile(repo: string, path: string) {
  const { data } = (await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{path}",
    {
      owner: OWNER,
      repo,
      path,
    }
  )) as { data: { content?: string; encoding?: string } }

  if (!data.content || !data.encoding) {
    throw new Error(
      `Tried to get ${path} but got back something that was unexpected. It doesn't have a content or encoding property`
    )
  }

  //lol
  const encoding = data.encoding as Parameters<typeof Buffer.from>["1"]
  return Buffer.from(data.content, encoding).toString()
}

/**
 *
 * @param path the full path to list
 * @returns a promise that resolves to a file ListItem of the files/directories in the given directory (not recursive)
 */
async function downloadDirList(repo: string, path: string) {
  const resp = await octokit.repos.getContent({
    owner: OWNER,
    repo,
    path,
  })

  const data = resp.data

  if (!Array.isArray(data)) {
    throw new Error(
      `Tried to download content from ${path}. GitHub did not return an array of files. This should never happen...`
    )
  }

  return data
}

export { downloadMdxFileOrDirectory, downloadDirList, downloadFile, debugEnv }
export type { GitHubFile }
