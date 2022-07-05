import { useMemo } from "react"
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
    const breadcrumbs = [
      { href: rootUrl, name: "Home" },
      { name: contentDisplayName, href: `${rootUrl}${contentPath}` },
    ]

    if (activeItem) {
      breadcrumbs.push({
        name: activeItem.label,
        href: `${rootUrl}${contentPath}/${activeItem.href}`,
      })
    }

    return breadcrumbs
  }, [activeItem, contentDisplayName, contentPath, rootUrl])
