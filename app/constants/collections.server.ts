import { fileTypeFromBuffer } from "file-type"
import { posix } from "node:path"
import invariant from "tiny-invariant"
import { Manifest } from "vite"
import { cachified, downloadFileByPath, redisCache } from "~/cms"
import { InternalLandingHeaderProps } from "~/ui/design-system/src/lib/Components/InternalLandingHeader"
import {
  SidebarItem,
  SidebarItemList,
} from "~/ui/design-system/src/lib/Components/InternalSidebar"
import { findMostSpecificPath } from "../cms/utils/find-most-specific-path"
import { stripSlahes } from "../cms/utils/strip-slashes"
import {
  DocCollectionManifest,
  docCollections,
  DocCollectionSource,
} from "./doc-collections"
import Ajv from "ajv"
import manifestSchema from "~/constants/doc-collection-manifest-schema.json"

const JSON_MANIFEST_FILENAME = "flow.json"

export const collectionPaths = Object.keys(docCollections)

export type DocCollectionInfo = {
  source: DocCollectionSource
  collectionRootPath: string
  contentPath: string
  staticManifest: DocCollectionManifest
}

// TODO clean this up a bit! i.e. reduce duplicated code

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
}

export async function findDocManifest(
  path: string
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
      throw new Error(`invalid `)
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
    key: `manifest:${docCollection.source.owner}:${docCollection.source.name}`,
    getFreshValue: async (): Promise<
      [DocCollectionManifest] | [null, Error]
    > => {
      try {
        const result = await fetchRemoteManifest()
        return [result]
      } catch (er) {
        invariant(er instanceof Error, `expected Error instance`)
        return [null, er]
      }
    },
    maxAge: 1000 * 60 * 60 * 24 * 30,
  })

  if (error) {
    const isGithub404 = (error as any).status === 404
    if (!isGithub404) {
      console.info(
        `Remote repository has invalid manifest`,
        `${docCollection.source.owner}/${docCollection.source.name}`,
        error.message ?? `status: ${(error as any).status}`
      )
    }
  }

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
  }
}
