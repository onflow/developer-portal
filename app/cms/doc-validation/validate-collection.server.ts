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
import { stripSlahes } from "../utils/strip-slashes"

const PLACEHOLDER_ORIGIN = "https://example.com"

const normalizeRelativeUrl = (path: string) =>
  stripSlahes(stripMarkdownExtension(path.toLowerCase()))

export type InvalidLinkItem = LinkItem & { hint?: string }

type TestableLinkItem = LinkItem & { normalized: string; isValid: boolean }

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
      invalidLinks: InvalidLinkItem[]
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
      // Ignore hash links for now - we'll add support for these later.
      .filter(({ href }) => !href.startsWith("#"))
      .map<TestableLinkItem>((link) => {
        // This ensures we strip out any query strings or hashes (we can
        // verify hashes another time)
        const { pathname } = new URL(link.href, PLACEHOLDER_ORIGIN)

        // resolve the path relative to the file's root path, but excluding
        // the source's root path (which we cannot "break out" of)
        const resolved = posix.resolve("/", rootRelativePath, pathname)
        const normalized = normalizeRelativeUrl(resolved)

        return {
          ...link,
          normalized,
          isValid: relativeFileUrls.includes(normalizeRelativeUrl(resolved)),
        }
      })
      .filter((link) => !link.isValid)
      .map<InvalidLinkItem>((link) => ({
        href: link.href,
        position: link.position,
        hint: getInvalidLinkHint(link, {
          localFileUrls: relativeFileUrls,
          collection,
        }),
      }))

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

type GetInvalidLinkHintOptions = {
  localFileUrls: string[]
  collection: DocCollection
}

/**
 * Tries to make an educated guess about what the user was trying to link to and/or offer some additional guidance about how to correct the link.
 */
function getInvalidLinkHint(
  { href }: TestableLinkItem,
  { localFileUrls, collection }: GetInvalidLinkHintOptions
): string | undefined {
  const possibleUrl = localFileUrls.find((url) => href.includes(url))
  if (possibleUrl) {
    return `Did you mean \`${possibleUrl}\`?`
  }

  if (href.startsWith("/")) {
    const { rootPath } = collection.source
    const strippedHref = stripSlahes(href)
    return `This looks like an absolute path. If you are linking to a relative file in the same doc collection (within \`${rootPath}\`) then you should use a relative path (Maybe you meant \`${strippedHref}\`?). If you're referencing a link external to this doc collection (outside of \`${rootPath}\`) you should use an absolute URL (Maybe you meant \`https://developers.flow.com/${strippedHref}\`?)`
  }

  return undefined
}