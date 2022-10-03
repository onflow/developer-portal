import { Repository } from "@octokit/webhooks-types"
import { ensure as ensureError } from "errorish"
import { posix } from "node:path"
import { isLinkExternal } from "~/ui/design-system/src/lib/utils/isLinkExternal"
import { stripMarkdownExtension } from "~/ui/design-system/src/lib/utils/stripMarkdownExtension"
import { compileMdx } from "../compile.mdx.server"
import { DocCollection } from "../doc-collections/types"
import { downloadFile } from "../github/download-file"
import { MARKDOWN_EXTENSION_FILTER } from "../github/filter-file-name-has-markdown-extension"
import { LinkItem } from "../rehype-plugins/extractLinks"
import { stripTrailingSlashes } from "../utils/strip-slashes"

const PLACEHOLDER_ORIGIN = "https://example.com"

const normalizeRelativeUrl = (path: string) =>
  stripTrailingSlashes(stripMarkdownExtension(path.toLowerCase()))

export type FileValidationResult =
  | {
      file: string
      status: "download-error"
      error: Error
    }
  | {
      file: string
      status: "compile-error"
      error: Error
    }
  | {
      file: string
      status: "link-error"
      invalidLinks: LinkItem[]
    }
  | {
      file: string
      status: "ok"
    }

export const validateCollection = async (
  collection: DocCollection,
  files: string[],
  repo: Repository,
  sha: string
): Promise<FileValidationResult[]> => {
  const { rootPath } = collection.source

  // All files should be within the rootPath of the collection
  const collectionFiles = files.filter((file) =>
    file.toLowerCase().startsWith(rootPath.toLowerCase())
  )

  const markdownFiles = collectionFiles.filter((file) =>
    MARKDOWN_EXTENSION_FILTER.test(file)
  )

  // Converts the list of markdown files into their relative URLs (relative to
  // the source's `rootParth`)
  const relativeFileUrls = markdownFiles.map((file) =>
    normalizeRelativeUrl(file.substring(rootPath.length))
  )

  const downloaded = await Promise.allSettled(
    markdownFiles.map((path) =>
      downloadFile({
        owner: repo.owner.login,
        repo: repo.name,
        path,
        ref: sha,
      })
    )
  )

  const compiled = await Promise.allSettled(
    downloaded.map<ReturnType<typeof compileMdx> | Error>((result, index) =>
      result.status === "fulfilled"
        ? compileMdx(
            {
              path: markdownFiles[index]!,
              textContent: result.value.toString(),
            },
            []
          )
        : ensureError(result.reason)
    )
  )

  return compiled.map((result, index) => {
    const file = markdownFiles[index]!

    if (result.status === "rejected") {
      return {
        file,
        status: "compile-error",
        error: ensureError(result.reason),
      }
    }

    if (result.value instanceof Error) {
      return {
        file,
        status: "download-error",
        error: result.value,
      }
    }

    const filePath = markdownFiles[index]!
    const rootRelativePath = filePath.substring(rootPath.length)

    const { links } = result.value

    const invalidLinks = links
      .filter(({ href }) => !isLinkExternal(href))
      .filter(({ href }) => !href.toLowerCase().startsWith("mailto:"))
      .filter(({ href }) => {
        // This ensures we strip out any query strings or hashes (we can
        // verify hashes another time)
        const { pathname } = new URL(href, PLACEHOLDER_ORIGIN)

        // resolve the path relative to the file's root path, but excluding
        // the source's root path (which we cannot "break out" of)
        const resolved = posix.resolve("/", rootRelativePath, pathname)

        return !relativeFileUrls.includes(resolved)
      }) as LinkItem[]

    if (invalidLinks.length > 0) {
      return {
        file,
        status: "link-error",
        invalidLinks,
      }
    }

    return {
      file,
      status: "ok",
    }
  })
}
