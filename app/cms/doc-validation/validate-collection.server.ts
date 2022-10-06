import { Repository } from "@octokit/webhooks-types"
import { ensure, ensure as ensureError } from "errorish"
import { compileMdx } from "../compile.mdx.server"
import { DocCollection } from "../doc-collections/types"
import { downloadFile } from "../github/download-file"
import { MARKDOWN_EXTENSION_FILTER } from "../github/filter-file-name-has-markdown-extension"
import { LinkItem } from "../rehype-plugins/extractLinks"
import {
  isValidatedLinkFailure,
  isValidatedLinkWarning,
  ValidatedLink,
  validateLink,
} from "./validate-link"
import { normalizeRelativeUrl } from "./validate-link-internal"

export type InvalidLinkItem = LinkItem & { hint?: string }

export type FileValidationStatus =
  /** Failed to download file from github */
  | "download-error"
  /** Compilation step failed */
  | "compile-error"
  /** The validation itself failed to run */
  | "validation-error"
  /** Failed validation */
  | "failure"
  /** Passed validation with warnings */
  | "warning"
  /** Passed validation */
  | "ok"

export type FileValidationStatusError = Extract<
  FileValidationStatus,
  "download-error" | "compile-error" | "validation-error"
>
export type FileValidationStatusComplete = Extract<
  FileValidationStatus,
  "failure" | "warning" | "ok"
>

export type FileValidationResult =
  | {
      file: string
      status: FileValidationStatusError
      error: Error
    }
  | {
      file: string
      status: FileValidationStatusComplete
      links: ValidatedLink[]
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
  const validRelativeFileUrls = markdownFiles.map((file) =>
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

  const results = await Promise.allSettled(
    compiled.map<Promise<FileValidationResult>>(
      async (compileResult, index) => {
        const file = markdownFiles[index]!

        if (compileResult.status === "rejected") {
          return {
            file,
            status: "compile-error",
            error: ensureError(compileResult.reason),
          }
        }

        if (compileResult.value instanceof Error) {
          return {
            file,
            status: "download-error",
            error: compileResult.value,
          }
        }

        const rootRelativePath = file.substring(rootPath.length)

        const { links } = compileResult.value
        // const batches = links.

        const validatedLinksSettled = await Promise.allSettled(
          links.map((link) =>
            validateLink(link, {
              rootRelativePath,
              validRelativeFileUrls,
              collection,
            })
          )
        )

        const validatedLinks = validatedLinksSettled.map<ValidatedLink>(
          (validateResult, validatedLinksIndex) =>
            validateResult.status === "fulfilled"
              ? validateResult.value
              : {
                  // The validation itself threw an unexpected error.
                  ...links[validatedLinksIndex]!,
                  type: "unknown",
                  result: "unknown",
                  hint: `Could not validate: ${
                    ensure(validateResult.reason).message
                  }`,
                }
        )

        let status: FileValidationStatusComplete = "ok"

        if (validatedLinks.filter(isValidatedLinkFailure).length > 0) {
          status = "failure"
        } else if (validatedLinks.filter(isValidatedLinkWarning).length > 0) {
          status = "warning"
        }

        return {
          file,
          status,
          links: validatedLinks,
        }
      }
    )
  )

  return results.map((result, index) =>
    result.status === "fulfilled"
      ? result.value
      : {
          error: result.reason,
          file: markdownFiles[index]!,
          status: "validation-error",
        }
  )
}
