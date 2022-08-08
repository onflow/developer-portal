import { useMemo } from "react"

export type UseInternalBreadcrumbsOptions = {
  /**
   * The currently active item taken from the sidebar configuration object.
   */
  activeItem?: {
    title: string
    href: string
  }

  /**
   * THe name to display in the breadcrumbs for the current collection
   */
  collectionDisplayName: string

  /**
   * The root path for the current collection
   */
  collectionRootPath: string
}

/**
 * Returns a list of breadcrumbs to display based on the current `activeItem`
 * and doc collection.
 */
export const useInternalBreadcrumbs = ({
  activeItem,
  collectionDisplayName,
  collectionRootPath,
}: UseInternalBreadcrumbsOptions) =>
  useMemo(() => {
    const breadcrumbs = [
      { href: "/", title: "Home" },
      { href: collectionRootPath, title: collectionDisplayName },
    ]

    if (activeItem) {
      breadcrumbs.push(activeItem)
    }

    return breadcrumbs
  }, [activeItem, collectionDisplayName, collectionRootPath])
