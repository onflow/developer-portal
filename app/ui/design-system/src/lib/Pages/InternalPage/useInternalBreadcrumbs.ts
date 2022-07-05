import { capitalize } from "lodash"
import { useMemo } from "react"
import { isFlowContent } from "~/constants/repos"
import { flowContentSectionMap } from "~/constants/repos/contents-structure"
import { InternalSidebarSectionItem } from "../../Components/InternalSidebar"

export type UseInternalBreadcrumbsOptions = {
  /**
   * The currently active item taken from the sidebar configuration object.
   */
  activeItem?: InternalSidebarSectionItem

  /**
   * THe name to display in the breadcrumbs for this content section
   */
  contentDisplayName: string

  /**
   * The name of the path in the URL used to access this content section
   */
  contentPath: string

  /**
   * The site's root URL.
   */
  rootUrl?: string
}

/**
 * Returns a list of breadcrumbs to display based on the current `activeItem`
 * of the sidebar configuration (if any)
 */
export const useInternalBreadcrumbs = ({
  activeItem,
  contentDisplayName,
  contentPath,
  rootUrl = "/",
}: UseInternalBreadcrumbsOptions) =>
  useMemo(() => {
    const breadcrumbs = [{ href: rootUrl, name: "Home" }]

    var basePath = `${rootUrl}${contentPath}`

    if (isFlowContent(contentPath)) {
      const sectionName = flowContentSectionMap[contentPath]
      breadcrumbs.push({
        name: capitalize(sectionName ?? "flow"),
        href: `${rootUrl}${sectionName}`,
      })
      breadcrumbs.push({
        name: contentDisplayName,
        href: `${rootUrl}${sectionName}/${contentPath}`,
      })
      basePath = `${rootUrl}${sectionName}/${contentPath}`
    } else {
      breadcrumbs.push({ name: contentDisplayName, href: basePath })
    }

    if (activeItem) {
      breadcrumbs.push({
        name: activeItem.label,
        href: `${basePath}/${activeItem.href}`,
      })
    }

    return breadcrumbs
  }, [activeItem, contentDisplayName, contentPath, rootUrl])
