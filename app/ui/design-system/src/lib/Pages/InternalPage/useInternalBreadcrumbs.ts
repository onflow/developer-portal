import { useMemo } from "react"
import { InternalSidebarConfig } from "../../Components/InternalSidebar"

export type UseInternalBreadcrumbsOptions = {
  /**
   * The path of the currently active item. This should be a path
   * relative to the repo (excluding the repo name), matching the item's href
   * as it is defined in the sidebar configuration object.
   */
  activePath: string

  /**
   * The name of the related github repo
   */
  repo: string

  /**
   * The site's root URL.
   */
  rootUrl?: string

  /**
   * The configuration object that describes the page hierarchy.
   */
  sidebarConfig?: InternalSidebarConfig
}

const findItem = (sidebarConfig: InternalSidebarConfig, activePath: string) => {
  for (const section of sidebarConfig.sections) {
    for (const item of section.items) {
      if (item.href === activePath) {
        return item
      }
    }
  }
}

/**
 * Returns a list of breadcrumbs based on the `activePath`
 */
export const useInternalBreadcrumbs = ({
  activePath,
  sidebarConfig,
  repo,
  rootUrl = "/",
}: UseInternalBreadcrumbsOptions) =>
  useMemo(() => {
    const item = sidebarConfig && findItem(sidebarConfig, activePath)

    const breadcrumbs = [
      { href: rootUrl, name: "Home" },

      // TODO: How do we get a "displayable" name?
      { name: repo, href: `${rootUrl}/${repo}` },
    ]

    if (item) {
      breadcrumbs.push({ name: item.label, href: `/${repo}/${item.href}` })
    }

    return breadcrumbs
  }, [activePath, sidebarConfig, rootUrl, repo])
