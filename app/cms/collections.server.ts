import Ajv from "ajv"
import { ensure as ensureError } from "errorish"
import { RequestError } from "@octokit/request-error"
import { posix } from "node:path"
import invariant from "tiny-invariant"
import { cachified, redisCache } from "~/cms"
import manifestSchema from "~/data/doc-collection-manifest-schema.json"
import { InternalLandingHeaderProps } from "~/ui/design-system/src/lib/Components/InternalLandingHeader"
import { SidebarItemList } from "~/ui/design-system/src/lib/Components/InternalSidebar"
import { docCollections } from "../data/doc-collections"
import {
  DocCollection,
  DocCollectionManifest,
  DocCollectionSource,
} from "./doc-collections/types"
import { JSON_MANIFEST_FILENAME } from "./doc-collections/constants"
import { findMostSpecificPath } from "./utils/find-most-specific-path"
import { stripSlahes } from "./utils/strip-slashes"
import { getManifestCacheKey } from "./doc-collections/get-manifest-cache-key"
import { downloadFileFromSource } from "./doc-collections/download-file-from-source"

export const collectionPaths = Object.keys(docCollections)

export type DocCollectionInfo = {
  source: DocCollectionSource
  collectionRootPath: string
  contentPath: string
  staticManifest: DocCollectionManifest
}

export const findDocCollection = (
  path: string
): DocCollectionInfo | undefined => {
  const collectionPath = findMostSpecificPath(path, collectionPaths)

  if (!collectionPath) {
    return
  }

  // Resolve the root path as an absolute directory path.
  const collectionRootPath = posix.join(posix.resolve("/", collectionPath), "/")

  const docCollection = docCollections[
    collectionPath as keyof typeof docCollections
  ]! as DocCollection

  // Resolve the relative path to the content, relative to the basePath, removing
  // any empty segments, as well as leading and trailing slashes.
  const contentPath = stripSlahes(path.substring(collectionPath.length))

  return {
    source: docCollection.source,

    collectionRootPath,

    // The requested content path relative to the doc collection.
    contentPath,

    staticManifest: docCollection.manifest,
  }
}

export type RemoteRepoErrorType = "FileNotFound" | "RefNotFound" | "Unknown"

export type RemoteRepoError = {
  type: RemoteRepoErrorType
  message: string
}
/**
 * similar to a DocCollectionManifest but for a specific doc, i.e. the sidebar
 * will only be the relevant sidebar, not all the sidebars
 */
export type DocManifest = {
  displayName: string
  header: InternalLandingHeaderProps | undefined
  redirect: string | undefined

  /**
   * any errors with the remote repos flow-doc.json, including not found, json
   * syntax errors, schema validation errors, etc
   */
  remoteRepoError: RemoteRepoError | undefined
  sidebar: SidebarItemList | undefined
  sidebarRootPath: string | undefined
  source: DocCollectionSource
}

export type FindDocManifestOptions = {
  forceFresh?: boolean
  ref?: string
  request?: Request
}

export async function findDocManifest(
  path: string,
  options?: FindDocManifestOptions
): Promise<DocManifest | undefined> {
  const docCollection = findDocCollection(path)
  if (!docCollection) return

  const { collectionRootPath, contentPath, source } = docCollection

  const collectionPath = findMostSpecificPath(path, collectionPaths)

  if (!collectionPath) {
    return
  }

  const fetchRemoteManifest = async (): Promise<DocCollectionManifest> => {
    const buffer = await downloadFileFromSource(
      {
        ...source,
        branch: options?.ref || source.branch,
      },
      JSON_MANIFEST_FILENAME
    )

    const text = buffer.toString()

    let data: unknown
    try {
      data = JSON.parse(text)
    } catch (er) {
      throw new Error(`Invalid json`)
    }

    const ajv = new Ajv()
    const validate = ajv.compile(manifestSchema)
    const isValid = validate(data)

    if (!isValid) {
      const { errors } = validate
      if (errors && errors.length > 0) {
        const [firstError] = errors
        invariant(firstError)
        const dataPath = firstError.schemaPath || `root`
        const message = firstError.message || `(unknown)`
        throw new Error(`Validation error: ${dataPath} ${message}`)
      }
      throw new Error(`Validation error: no context from ajv about this error`)
    }

    return data as DocCollectionManifest
  }

  const [remoteManifest, error] = await cachified({
    cache: redisCache,
    key: getManifestCacheKey({
      ...docCollection.source,
      branch: options?.ref || docCollection.source.branch,
    }),
    forceFresh: options?.forceFresh === true,
    getFreshValue: async (): Promise<
      [DocCollectionManifest | null] | [null, RemoteRepoError]
    > => {
      try {
        const result = await fetchRemoteManifest()
        return [result]
      } catch (caughtError: unknown) {
        const error = ensureError(caughtError)

        if (error instanceof RequestError && error.status === 404) {
          return [
            null,
            {
              type: error.message.startsWith("No commit found for the ref")
                ? "RefNotFound"
                : "FileNotFound",
              message: error.message,
            },
          ]
        }

        return [
          null,
          {
            type: "Unknown",
            message: error.message,
          },
        ]
      }
    },
    maxAge: 1000 * 60 * 60 * 24 * 30,
    request: options?.request,
  })

  const manifest = remoteManifest ?? docCollection.staticManifest

  const sidebarPath = manifest.sidebars
    ? findMostSpecificPath(contentPath, Object.keys(manifest.sidebars))
    : undefined

  const resolvePath = (path?: string) =>
    typeof path === "string"
      ? posix.resolve(collectionRootPath, path)
      : undefined

  const sidebarRootPath =
    sidebarPath !== undefined
      ? posix.join(resolvePath(sidebarPath)!, "/")
      : undefined

  const redirectPath = manifest.redirects?.[contentPath]

  return {
    displayName: manifest.displayName,
    header: manifest.headers?.[contentPath],
    redirect: resolvePath(redirectPath),
    remoteRepoError: error ?? undefined,
    sidebar:
      sidebarPath !== undefined ? manifest.sidebars![sidebarPath] : undefined,
    sidebarRootPath,
    source,
  }
}
