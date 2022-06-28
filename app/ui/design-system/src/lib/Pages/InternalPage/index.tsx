import {
  InternalLandingHeader,
  InternalLandingHeaderProps,
} from "../../Components/InternalLandingHeader"
import {
  InternalSidebar,
  InternalSidebarConfig,
  InternalSidebarContainer,
  InternalSidebarSectionItem,
} from "../../Components/InternalSidebar"
import { flattenSidebarSectionItems } from "../../Components/InternalSidebar/flattenSidebarSectionItems"
import { findSidebarSectionItem } from "../../Components/InternalSidebar/findSidebarSectionItem"
import {
  InternalSidebarMenu,
  InternalSidebarMenuProps,
} from "../../Components/InternalSidebarMenu"
import { InternalSubnav } from "../../Components/InternalSubnav"
import { LowerPageNav } from "../../Components/LowerPageNav"
import {
  useInternalBreadcrumbs,
  UseInternalBreadcrumbsOptions,
} from "./useInternalBreadcrumbs"

export type InternalPageProps = React.PropsWithChildren<{
  header?: InternalLandingHeaderProps
  internalSidebarMenu: InternalSidebarMenuProps

  /**
   * The path of the currently active item. This should be a path
   * relative to the repo (excluding the repo name), matching the item's href
   * as it is defined in the sidebar configuration object.
   */
  activePath: string

  /**
   * The configuration object that describes the page hierarchy.
   */
  sidebarConfig?: InternalSidebarConfig
}> &
  Omit<UseInternalBreadcrumbsOptions, "activeItem">

export function InternalPage({
  activePath,
  children,
  contentDisplayName,
  contentPath,
  header,
  rootUrl = "/",
  sidebarConfig,
  internalSidebarMenu,
}: InternalPageProps) {
  const activeItem = findSidebarSectionItem(sidebarConfig, activePath)
  const breadcrumbs = useInternalBreadcrumbs({
    activeItem,
    contentDisplayName,
    contentPath,
    rootUrl,
  })

  let prevItem: InternalSidebarSectionItem | undefined
  let nextItem: InternalSidebarSectionItem | undefined

  if (sidebarConfig && activeItem) {
    const allItems = flattenSidebarSectionItems(sidebarConfig)
    const activeItemIndex = allItems.indexOf(activeItem)
    prevItem = allItems[activeItemIndex - 1]
    nextItem = activeItemIndex >= 0 ? allItems[activeItemIndex + 1] : undefined
  }

  return (
    <div className="flex flex-col">
      <InternalSubnav items={breadcrumbs} className="sticky top-0 z-20" />
      {header && <InternalLandingHeader {...header} />}
      <div className="flex flex-1 flex-row">
        {sidebarConfig && (
          <div className="flex flex-col">
            <InternalSidebarContainer>
              <InternalSidebarMenu {...internalSidebarMenu} />
              <InternalSidebar config={sidebarConfig} />
            </InternalSidebarContainer>
          </div>
        )}
        <div className="flex flex-1 flex-col">
          <div className="pb-6">{children}</div>
          <LowerPageNav
            prev={
              prevItem && {
                href: `${rootUrl}${contentPath}/${prevItem.href}`,
                name: prevItem.label,
              }
            }
            next={
              nextItem && {
                href: `${rootUrl}${contentPath}/${nextItem.href}`,
                name: nextItem.label,
              }
            }
          />
        </div>
      </div>
    </div>
  )
}
