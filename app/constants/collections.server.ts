import { posix } from "node:path"
import { InternalLandingHeaderProps } from "~/ui/design-system/src/lib/Components/InternalLandingHeader"
import { SidebarItem } from "~/ui/design-system/src/lib/Components/InternalSidebar"
import { findMostSpecificPath } from "../cms/utils/find-most-specific-path"
import { stripSlahes } from "../cms/utils/strip-slashes"
import { docCollections, DocCollectionSource } from "./doc-collections"

export const collectionPaths = Object.keys(docCollections)

export type DocCollectionInfo = {
  source: DocCollectionSource
  collectionRootPath: string
  contentPath: string
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

  const { source } = docCollections[collectionPath]!

  // Resolve the relative path to the content, relative to the basePath, removing
  // any empty segments, as well as leading and trailing slashes.
  const contentPath = stripSlahes(path.substring(collectionPath.length))

  return {
    source,

    collectionRootPath,

    // The requested content path relative to the doc collection.
    contentPath,
  }
}

export type DocCollectionManifest = {
  displayName: string
  header: InternalLandingHeaderProps | undefined
  sidebar: SidebarItem[] | undefined
  sidebarRootPath: string | undefined
  redirect: string | undefined
}

export async function findDocCollectionManifest(
  path: string
): Promise<DocCollectionManifest | undefined> {
  const collectionPath = findMostSpecificPath(path, collectionPaths)

  if (!collectionPath) {
    return
  }

  // Resolve the root path as an absolute directory path.
  const collectionRootPath = posix.join(posix.resolve("/", collectionPath), "/")

  // Resolve the relative path to the content, relative to the basePath, removing
  // any empty segments, as well as leading and trailing slashes.
  const contentPath = stripSlahes(path.substring(collectionPath.length))

  const resolvePath = (path?: string) =>
    typeof path === "string"
      ? posix.resolve(collectionRootPath, path)
      : undefined
  const { manifest } = docCollections[collectionPath]!

  const sidebarPath = manifest.sidebars
    ? findMostSpecificPath(contentPath, Object.keys(manifest.sidebars))
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
