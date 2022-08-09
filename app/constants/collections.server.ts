import { posix } from "node:path"
import { findMostSpecificPath } from "../cms/utils/find-most-specific-path"
import { stripSlahes } from "../cms/utils/strip-slashes"
import { docCollections } from "./doc-collections"

export const collectionPaths = Object.keys(docCollections)

export const findCollection = (path: string) => {
  const collectionPath = findMostSpecificPath(path, collectionPaths)

  if (!collectionPath) {
    return undefined
  }

  // Resolve the root path as an absolute directory path.
  const collectionRootPath = posix.join(posix.resolve("/", collectionPath), "/")

  const resolvePath = (path?: string) =>
    typeof path === "string"
      ? posix.resolve(collectionRootPath, path)
      : undefined

  const { source, manifest } = docCollections[collectionPath]!

  // Resolve the relative path to the content, relative to the basePath, removing
  // any empty segments, as well as leading and trailing slashes.
  const contentPath = stripSlahes(path.substring(collectionPath.length))

  const sidebarPath = manifest.sidebars
    ? findMostSpecificPath(contentPath, Object.keys(manifest.sidebars))
    : undefined

  const sidebarRootPath =
    sidebarPath !== undefined
      ? posix.join(resolvePath(sidebarPath)!, "/")
      : undefined

  const redirectPath = manifest.redirects?.[contentPath]

  return {
    source,

    collectionRootPath,

    // The requested content path relative to the doc collection.
    contentPath,

    displayName: manifest.displayName,

    header: manifest.headers?.[contentPath],

    redirect: resolvePath(redirectPath),

    sidebar:
      sidebarPath !== undefined ? manifest.sidebars![sidebarPath] : undefined,

    sidebarRootPath,
  }
}
