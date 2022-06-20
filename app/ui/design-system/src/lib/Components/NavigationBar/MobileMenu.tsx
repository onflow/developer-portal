import { useState } from "react"
import { MenuContent } from "./MenuContent"
import { MobileMenuBackButton } from "./MobileMenuBackButton"
import { MobileMenuTabbed } from "./MobileMenuTabbed"
import { MobileMenuTopLevel } from "./MobileMenuTopLevel"
import { DropdownMenuItem, isDropdownMenuItem, MenuItem } from "./types"

export type MobileMenuProps = {
  menuItems: MenuItem[]
}

export function MobileMenu({ menuItems }: MobileMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const selectedMenuItem = menuItems[selectedIndex] as
    | DropdownMenuItem
    | undefined

  if (isDropdownMenuItem(selectedMenuItem) && "tabs" in selectedMenuItem) {
    return (
      <MobileMenuTabbed
        tabs={selectedMenuItem.tabs}
        onBackButtonClick={() => setSelectedIndex(-1)}
      />
    )
  }

  if (isDropdownMenuItem(selectedMenuItem)) {
    return (
      <ul className="w-full divide-y divide-primary-gray-100 dark:divide-primary-gray-400">
        <li>
          <MobileMenuBackButton onClick={() => setSelectedIndex(-1)} />
        </li>
        <li>
          <h2 className="px-4 py-3 text-xl font-semibold">
            {selectedMenuItem.title}
          </h2>
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
