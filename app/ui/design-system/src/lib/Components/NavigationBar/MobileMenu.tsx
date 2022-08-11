import { useState } from "react"
import { MenuContent } from "./MenuContent"
import { MobileMenuBackButton } from "./MobileMenuBackButton"
import { MobileMenuTopLevel } from "./MobileMenuTopLevel"
import { DropdownMenu, DropdownMenuItem, LinkMenuItem, MenuItem } from "./types"

export type MobileMenuProps = {
  menuItems: MenuItem[]
}

export function MobileMenu({ menuItems }: MobileMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState<[number, number]>([-1, -1])
  const selectedMenuItem = menuItems[selectedIndex[0]] as
    | MenuItem
    | DropdownMenu
    | undefined

  if (selectedMenuItem && "tabs" in selectedMenuItem) {
    return (
      <ul className="w-full divide-y divide-primary-gray-100 dark:divide-primary-gray-400">
        <li>
          <MobileMenuBackButton
            onClick={() => setSelectedIndex([-1, -1])}
            className="text-lg text-gray-400 dark:text-gray-100"
          >
            {selectedMenuItem.tabs[selectedIndex[1]]?.title}
          </MobileMenuBackButton>
        </li>
        <li>
          <MenuContent
            className="px-4"
            cards={selectedMenuItem.tabs[selectedIndex[1]]?.cards}
            sections={selectedMenuItem.tabs[selectedIndex[1]]!.sections}
          />
        </li>
      </ul>
    )
  }

  if (selectedMenuItem && "cards" in selectedMenuItem) {
    return (
      <ul className="w-full divide-y divide-primary-gray-100 dark:divide-primary-gray-400">
        <li>
          <MobileMenuBackButton
            onClick={() => setSelectedIndex([-1, -1])}
            className="text-lg text-gray-400 dark:text-gray-100"
          >
            {selectedMenuItem.title}
          </MobileMenuBackButton>
        </li>
        <li>
          <MenuContent
            className="px-4"
            cards={selectedMenuItem.cards}
            sections={selectedMenuItem.sections}
          />
        </li>
      </ul>
    )
  }

  return (
    <MobileMenuTopLevel
      menuItems={menuItems}
      onItemSelected={setSelectedIndex}
    />
  )
}
