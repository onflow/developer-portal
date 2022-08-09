import { useMemo } from "react"
import { isLinkExternal } from "./isLinkExternal"

// This is used so we have a valid base URL (which requires and origin),
// but we strip it out anyway so the actual host name and scheme don't really
// matter
const PLACEHOLDER_ORIGIN = "https://placeholder"

/**
 * Resolves a relative URL using the given base path. If the href provided
 * is external, the original href is returned, unmodified.
 */
export const useResolvedUrl = (href: string, basePath: string) =>
  useMemo(() => {
    if (isLinkExternal(href)) {
      return href
    }

    const url = new URL(
      href,
      `${PLACEHOLDER_ORIGIN}${basePath.startsWith("/") ? "" : "/"}${basePath}`
    )
    return url.toString().substring(url.origin.length)
  }, [basePath, href])
