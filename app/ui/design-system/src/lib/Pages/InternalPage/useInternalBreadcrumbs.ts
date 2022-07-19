import { capitalCase } from "change-case"
import { useMemo } from "react"
import { displayNames } from "~/cms/schema"
import {
  FIRST_ROUTE_MAP,
  isSecondRoute,
  SecondRoute,
} from "~/constants/repos/contents-structure"
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

    if (isSecondRoute(contentPath)) {
      const firstRouteName = FIRST_ROUTE_MAP[contentPath as SecondRoute]!

      breadcrumbs.push({
        name: displayNames[firstRouteName] || capitalCase(firstRouteName),
        href: `${rootUrl}${firstRouteName}`,
      })
      breadcrumbs.push({
        name: contentDisplayName,
        href: `${rootUrl}${firstRouteName}/${contentPath}`,
      })
      basePath = `${rootUrl}${firstRouteName}/${contentPath}`
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
