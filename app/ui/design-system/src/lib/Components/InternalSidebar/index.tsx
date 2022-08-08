import { NavLink } from "@remix-run/react"
import clsx from "clsx"
import {
  InternalSidebarDropdownMenu,
  InternaSidebarDropdownMenuGroup,
} from "../InternalSidebarDropdownMenu"
import { useResolvedSidebarUrl } from "./useResolvedSidebarUrl"
import { titleFromHref } from "../../utils/titleFromHref"

export interface SidebarItemBase {
  items?: SidebarItem[]
}
export interface SidebarHeadingItem extends SidebarItemBase {
  title: string
}

export interface SidebarLinkItem extends SidebarItemBase {
  title?: string
  href: string
}

export type SidebarItem = SidebarHeadingItem | SidebarLinkItem

export type InternalSidebarProps = {
  items: SidebarItem[]
  menu?: InternaSidebarDropdownMenuGroup[]
}

const InternalSidebarLinkItem = ({ item }: { item: SidebarLinkItem }) => {
  const resolvedHref = useResolvedSidebarUrl(item.href)

  return (
    <NavLink
      to={resolvedHref}
      end
      prefetch="intent"
      className={({ isActive }) =>
        clsx(
          "mb-1 block rounded-md px-2 py-1.5 text-sm text-primary-gray-400 hover:opacity-75 dark:text-gray-200",
          {
            "bg-gray-200 bg-opacity-50 text-primary-blue dark:bg-gray-700 dark:text-gray-300":
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
    {"href" in item ? (
      <InternalSidebarLinkItem item={item} />
    ) : (
      <div className="mb-4 text-xs uppercase text-gray-500 dark:text-gray-200">
        {item.title}
      </div>
    )}
    {item.items?.map((subItem, index) => (
      <div className="px-4" key={index}>
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
