import React from "react"

export type MenuItemBase = {
  title: string
  divider?: boolean
}

export type Link = {
  title: string
  href: string
}

export type SubSection = Link & {
  icon?: React.ReactChild
}

export type Section = {
  icon?: React.ReactChild
  title: string
  subSections: SubSection[]
  links?: Link[]
}

export type Card = Link & {
  ctaText: string
  description: string
  imageAlt?: string
  imageHref: string
}

export type Menu = {
  cards?: Card[]
  sections: Section[]
}

export type Tab = Menu & {
  title: string
  description: string
}

export type TabbedMenu = {
  tabs: Array<Tab>
}

export type DropdownMenu = TabbedMenu | Menu

export type DropdownMenuItem = MenuItemBase & DropdownMenu

export type LinkMenuItem = MenuItemBase & Link

export type MenuItem = LinkMenuItem | DropdownMenuItem

export function isLinkMenuItem(menuItem?: MenuItem): menuItem is LinkMenuItem {
  return menuItem !== undefined && "href" in menuItem
}

export function isDropdownMenuItem(
  menuItem?: MenuItem
): menuItem is DropdownMenuItem {
  return (
    menuItem !== undefined && ("tabs" in menuItem || "sections" in menuItem)
  )
}
