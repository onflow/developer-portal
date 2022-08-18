import Ajv from "ajv"
import { posix } from "node:path"
import invariant from "tiny-invariant"
import { cachified, downloadFileByPath, redisCache } from "~/cms"
import manifestSchema from "~/constants/doc-collection-manifest-schema.json"
import { InternalLandingHeaderProps } from "~/ui/design-system/src/lib/Components/InternalLandingHeader"
import { SidebarItemList } from "~/ui/design-system/src/lib/Components/InternalSidebar"
import { findMostSpecificPath } from "../cms/utils/find-most-specific-path"
import { stripSlahes } from "../cms/utils/strip-slashes"
import {
  DocCollectionManifest,
  docCollections,
  DocCollectionSource,
} from "./doc-collections.server"
import {
  JSON_MANIFEST_FILENAME,
  manifestCacheKey,
} from "./doc-collection-manifest"

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

  const docCollection = docCollections[collectionPath]!

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

/**
 * similar to a DocCollectionManifest but for a specific doc, i.e. the sidebar
 * will only be the relevant sidebar, not all the sidebars
 */
export type DocManifest = {
  displayName: string
  header: InternalLandingHeaderProps | undefined
  sidebar: SidebarItemList | undefined
  sidebarRootPath: string | undefined
  redirect: string | undefined

  /**
   * any errors with the remote repos flow-doc.json, including not found, json
   * syntax errors, schema validation errors, etc
   */
  remoteRepoError: string | undefined
}

export async function findDocManifest(
  path: string,
  options?: {
    request?: Request
  }
): Promise<DocManifest | undefined> {
  const docCollection = findDocCollection(path)
  if (!docCollection) return

  const { collectionRootPath, contentPath } = docCollection

  const collectionPath = findMostSpecificPath(path, collectionPaths)

  if (!collectionPath) {
    return
  }

  const fetchRemoteManifest = async (): Promise<DocCollectionManifest> => {
    const buffer = await downloadFileByPath(
      docCollection.source,
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
    key: manifestCacheKey(docCollection.source),
    getFreshValue: async (): Promise<
      [DocCollectionManifest | null] | [null, string]
    > => {
      try {
        const result = await fetchRemoteManifest()
        return [result]
      } catch (er: any) {
        const isGithub404 = er.status === 404
        if (isGithub404) {
          return [null]
        }
        let message =
          er.message ||
          (er.status != null && `failed with status ${er.status}`) ||
          "unknown"

        return [null, message]
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

    sidebar:
      sidebarPath !== undefined ? manifest.sidebars![sidebarPath] : undefined,

    sidebarRootPath,
    redirect: resolvePath(redirectPath),
    remoteRepoError: error && !isGithub404 ? error : undefined,
  }
}
