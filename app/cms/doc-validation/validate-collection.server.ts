import { Repository } from "@octokit/webhooks-types"
import { ensure, ensure as ensureError } from "errorish"
import { compileMdx } from "../compile.mdx.server"
import { fetchRemoteManifest } from "../doc-collections/fetch-remote-manifest"
import { DocCollection } from "../doc-collections/types"
import { downloadFile } from "../github/download-file"
import { filterFileNameHasMarkdownExtension } from "../github/filter-file-name-has-markdown-extension"
import { UrlItem } from "../rehype-plugins/extractUrls"
import {
  isValidatedUrlFailure,
  isValidatedUrlWarning,
  ValidatedUrl,
  validateUrl,
} from "./validate-url"
import { normalizeRelativeUrl } from "./validate-url-internal"

export type InvalidLinkItem = UrlItem & { hint?: string }

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
      urls: ValidatedUrl[]
    }

export type ValidateCollectionOptions = {
  /**
   * The DocCollection to validate.
   */
  collection: DocCollection

  /**
   * All the files that exist within the collection, specified as
   * their complete path within the repo (in other words, these paths include
   * the `rootPath` of the collection's `source`.
   */
  files: string[]

  /* *
   *  An array of files that have been removed from the collection. This is used
   *  to validate that redirects have been put in place for any removed files.
   *  These are specified as their complete path within the repo (in the same
   *  way `files` is specified).
   */
  filesRemoved?: string[]

  /**
   * The github repo to validate against (this _may_ be different from the
   * collection's `source` when validating a different fork, but in most cases
   * these will be the same repo)
   */
  repo: Repository

  /**
   * The SHA of the branch to validate against within the `repo`.
   */
  sha: string
}

export const validateCollection = async ({
  collection,
  files,
  filesRemoved,
  repo,
  sha,
}: ValidateCollectionOptions): Promise<FileValidationResult[]> => {
  const { rootPath } = collection.source

  // All files should be within the rootPath of the collection
  const collectionFiles = files.filter((file) =>
    file.toLowerCase().startsWith(rootPath.toLowerCase())
  )

  const removedFiles = filesRemoved
    ?.filter((file) => file.toLowerCase().startsWith(rootPath.toLowerCase()))
    // Make sure no removed files actually exist in the `files` collection still
    .filter((path) => files.includes(path))

  let removedResults = [] as FileValidationResult[]

  if (removedFiles?.length) {
    try {
      const remoteManifest = await fetchRemoteManifest({
        owner: repo.owner.login,
        name: repo.name,
        branch: sha,
        rootPath,
      })

      const normalizedRedirects = Object.values(
        remoteManifest.redirects || {}
      ).map((redirectFrom) => normalizeRelativeUrl(redirectFrom))

      removedResults = removedFiles.map<FileValidationResult>((file) => {
        const url = normalizeRelativeUrl(file.substring(rootPath.length))
        const hasRedirect = normalizedRedirects.includes(url)

        // TODO: return something that makes sense here and that we can
        // then use in `getValidationSummaryForCheckRun` to generate some
        // meaningful information for the user.
        return {
          file,
          status: hasRedirect ? "ok" : "failure",
          urls: [],
          // error: "",
        }
      })
    } catch (error) {
      // TODO: populate removedResults in a way that we can inform the user
      // that no remote manifest was found (or it was unreadable)
    }
  }

  const markdownFiles = collectionFiles.filter((filename) =>
    filterFileNameHasMarkdownExtension({ filename })
  )

  // Converts the list of files into their relative URLs (relative to
  // the source's `rootParth`). Markdown files will have their extensions
  // stripped, other files are still valid as assets as long as their
  // extension is included (i.e. images, binaries, etc)
  const validRelativeFileUrls = collectionFiles.map((file) =>
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

        const { urls } = compileResult.value

        const validatedUrlsSettled = await Promise.allSettled(
          urls.map((url) =>
            validateUrl(url, {
              rootRelativePath,
              validRelativeFileUrls,
              collection,
            })
          )
        )

        const validatedUrls = validatedUrlsSettled.map<ValidatedUrl>(
          (validateResult, validatedUrlIndex) =>
            validateResult.status === "fulfilled"
              ? validateResult.value
              : {
                  // The validation itself threw an unexpected error.
                  ...urls[validatedUrlIndex]!,
                  type: "unknown",
                  result: "unknown",
                  hint: `Could not validate: ${
                    ensure(validateResult.reason).message
                  }`,
                }
        )

        let status: FileValidationStatusComplete = "ok"

        if (validatedUrls.filter(isValidatedUrlFailure).length > 0) {
          status = "failure"
        } else if (validatedUrls.filter(isValidatedUrlWarning).length > 0) {
          status = "warning"
        }

        return {
          file,
          status,
          urls: validatedUrls,
        }
      }
    )
  )

  return results
    .map((result, index) =>
      result.status === "fulfilled"
        ? result.value
        : ({
            error: result.reason,
            file: markdownFiles[index]!,
            status: "validation-error",
          } as FileValidationResult)
    )
    .concat(removedResults)
}
