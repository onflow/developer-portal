import { useMemo } from "react"
import { isLinkExternal } from "./isLinkExternal"
import { stripTrailingSlahes } from "./stripTrailingSlahes"

// This is used so we have a valid base URL (which requires and origin),
// but we strip it out anyway so the actual host name and scheme don't really
// matter
const PLACEHOLDER_ORIGIN = "https://placeholder"

export interface UseResolvedUrlOptions {
  stripTrailingSlash?: boolean
}

/**
 * Resolves a relative URL using the given base path. If the href provided
 * is external, the original href is returned, unmodified.
 */
export const useResolvedUrl = (
  href: string,
  basePath: string,
  options?: UseResolvedUrlOptions
) =>
  useMemo(() => {
    if (isLinkExternal(href)) {
      return href
    }

    const url = new URL(
      href,
      `${PLACEHOLDER_ORIGIN}${basePath.startsWith("/") ? "" : "/"}${basePath}`
    )

    const resolved = url.toString().substring(url.origin.length)

    return options?.stripTrailingSlash
      ? stripTrailingSlahes(resolved)
      : resolved
  }, [basePath, href, options?.stripTrailingSlash])
