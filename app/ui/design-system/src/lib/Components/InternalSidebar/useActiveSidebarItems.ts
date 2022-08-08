import { useLocation } from "@remix-run/react"
import { useContext } from "react"
import { SidebarItem, SidebarLinkItem } from "."
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
  const { pathname } = useLocation()
  const sidebarBasePath = useContext(InternalSidebarUrlContext)

  const linkItems = flattenItems(items).filter(
    (item) => "href" in item
  ) as SidebarLinkItem[]

  const resolvedLinkItems = linkItems.map((item) => ({
    href: `${sidebarBasePath}${item.href}`,
    title: item.title || titleFromHref(item.href),
  }))

  const activeIndex = resolvedLinkItems.findIndex(
    ({ href }) => href === pathname
  )

  return {
    previous: activeIndex > 0 ? resolvedLinkItems[activeIndex - 1] : undefined,
    active: activeIndex !== -1 ? resolvedLinkItems[activeIndex] : undefined,
    next: activeIndex !== -1 ? resolvedLinkItems[activeIndex + 1] : undefined,
  }
}
