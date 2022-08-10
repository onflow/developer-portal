import { useLocation } from "@remix-run/react"
import { useContext } from "react"
import { isSidebarLinkItem, SidebarItem, SidebarLinkItem } from "."
import { stripTrailingSlahes } from "../../utils/stripTrailingSlahes"
import { titleFromHref } from "../../utils/titleFromHref"
import { InternalSidebarUrlContext } from "./InternalSidebarUrlContext"

/**
 * Flattens a nested array of `SidebarItem`s
 */
export const flattenItems = (items?: SidebarItem[]): SidebarItem[] =>
  items?.flatMap(({ items, ...rest }) => [rest, ...flattenItems(items)]) || []

/**
 * Finds the current active sidebar item, and the previous and next items
 * relative to the active item.
 */
export const useActiveSidebarItems = (items: SidebarItem[]) => {
  const location = useLocation()
  const path = stripTrailingSlahes(location.pathname)
  const sidebarBasePath = useContext(InternalSidebarUrlContext)

  const linkItems =
    flattenItems(items).filter<SidebarLinkItem>(isSidebarLinkItem)

  const resolvedLinkItems = linkItems.map((item) => ({
    href: stripTrailingSlahes(`${sidebarBasePath}${item.href}`),
    title: item.title || titleFromHref(item.href),
  }))

  const activeIndex = resolvedLinkItems.findIndex(({ href }) => href === path)

  return {
    previous: activeIndex > 0 ? resolvedLinkItems[activeIndex - 1] : undefined,
    active: activeIndex !== -1 ? resolvedLinkItems[activeIndex] : undefined,
    next: activeIndex !== -1 ? resolvedLinkItems[activeIndex + 1] : undefined,
  }
}
