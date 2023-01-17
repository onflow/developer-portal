import { NavLink, Link } from "@remix-run/react"
import clsx from "clsx"
import {
  InternalSidebarDropdownMenu,
  InternaSidebarDropdownMenuGroup,
} from "../InternalSidebarDropdownMenu"
import { useResolvedSidebarUrl } from "./useResolvedSidebarUrl"
import { titleFromHref } from "../../utils/titleFromHref"
import { isLinkExternal } from "../../utils/isLinkExternal"
import ExternalLinkIcon from "../InternalContentLink/ExternalLinkIcon"
import AppLink from "../AppLink"

export interface SidebarItemBase {
  items?: SidebarItemList
}
export interface SidebarHeadingItem extends SidebarItemBase {
  title: string
}

export interface SidebarLinkItem extends SidebarItemBase {
  title?: string
  href: string
}

export type SidebarItem = SidebarHeadingItem | SidebarLinkItem
export type SidebarItemList = Array<SidebarItem>

export function isSidebarLinkItem(item: SidebarItem): item is SidebarLinkItem {
  return "href" in item
}

export type InternalSidebarProps = {
  items: SidebarItemList
  menu?: InternaSidebarDropdownMenuGroup[]
}

const InternalSidebarLinkItem = ({ item }: { item: SidebarLinkItem }) => {
  const isExternal = isLinkExternal(item.href)
  const resolvedHref = useResolvedSidebarUrl(item.href)

  if (isExternal) {
    return (
      <AppLink
        to={resolvedHref}
        className="flex truncate py-1 hover:text-primary-blue dark:hover:text-blue-hover-dark"
      >
        {item.title} <ExternalLinkIcon className="pl-1" stroke="white" />
      </AppLink>
    )
  }
  return (
    <NavLink
      to={resolvedHref}
      end
      prefetch="intent"
      className={({ isActive }) =>
        clsx(
          "mb-1 block rounded-md py-1.5 text-primary-gray-400 hover:opacity-75 dark:text-gray-200",
          {
            "font-semibold text-primary-blue dark:text-blue-hover-dark":
              isActive,
          }
        )
      }
    >
      {item.title || titleFromHref(item.href)}
    </NavLink>
  )
}

const InternalSidebarItem = ({ item }: { item: SidebarItem }) => (
  <>
    {isSidebarLinkItem(item) ? (
      <InternalSidebarLinkItem item={item} />
    ) : (
      <div className="mb-4 text-xs uppercase text-gray-500 dark:text-gray-200">
        {item.title}
      </div>
    )}
    {item.items?.map((subItem, index) => (
      <div key={index}>
        <InternalSidebarItem item={subItem} />
      </div>
    ))}
  </>
)

export function InternalSidebar({ items, menu }: InternalSidebarProps) {
  return (
    <div>
      {menu && <InternalSidebarDropdownMenu groups={menu} />}
      {items.map((item, index) => (
        <div
          key={index}
          className="border-b-1 mb-2 border-b border-b-gray-300 py-4 last:border-b-0 dark:border-b-gray-700"
        >
          <InternalSidebarItem item={item} />
        </div>
      ))}
    </div>
  )
}
