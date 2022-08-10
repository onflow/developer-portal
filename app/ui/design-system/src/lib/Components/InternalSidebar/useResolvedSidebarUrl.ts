import { useContext } from "react"
import { useResolvedUrl } from "../../utils/useResolvedUrl"
import { InternalSidebarUrlContext } from "./InternalSidebarUrlContext"

export const useResolvedSidebarUrl = (href: string) => {
  const basePath = useContext(InternalSidebarUrlContext)
  return useResolvedUrl(href, basePath, { stripTrailingSlash: true })
}
