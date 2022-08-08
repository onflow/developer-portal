/**
 * Finds the most specific path from a list of paths in which all segments
 * match the `pathToMatch`. If no path matches, returns `undefined`.
 *
 * For example, give the paths: [`"a", "a/b", "a/b/c", "a/b/c/d"]
 *   - "a/b/c/d/e/f/g" would match "a/b/c/d"
 *   - "a/b/c/x/y/z" would match "a/b/c"
 *   - "a/xxx/yyy" would match "a"
 */
export const findMostSpecificPath = (
  pathToMatch: string,
  paths: string[]
): string | undefined => {
  if (paths.includes(pathToMatch)) {
    return pathToMatch
  }

  const segments = pathToMatch.split("/")

  if (segments.length > 1) {
    // Remove the last segment and recursively check again.
    return findMostSpecificPath(segments.slice(0, -1).join("/"), paths)
  }

  if (paths.includes("")) {
    return ""
  }

  return undefined
}
