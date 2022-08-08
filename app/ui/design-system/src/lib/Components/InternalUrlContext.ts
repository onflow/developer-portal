import { createContext, useContext } from "react"
import { useResolvedUrl } from "../utils/useResolvedUrl"

/**
 * Tracks the "base URL" to use for relative links found in "internal" content.
 */
export const InternalUrlContext = createContext("/")

/**
 * Resolves any relative internal URL to use the correct base path.
 */
export const useInternalUrl = (href: string) => {
  const basePath = useContext(InternalUrlContext)
  return useResolvedUrl(href, basePath)
}

/**
 * Resolves any relative asset URL by prepending the assets path.
 */
export const useInternalAssetUrl = (href: string) => {
  const basePath = useContext(InternalUrlContext)
  return useResolvedUrl(
    href,
    `/assets${basePath.startsWith("/") ? "" : "/"}${basePath}`
  )
}
