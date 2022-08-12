import { useState } from "react"
import { MenuContent } from "./MenuContent"
import { MobileMenuBackButton } from "./MobileMenuBackButton"
import { MobileMenuTopLevel } from "./MobileMenuTopLevel"
import { DropdownMenu, MenuItem } from "./types"

export type MobileMenuProps = {
  menuItems: MenuItem[]
}

export function MobileMenu({ menuItems }: MobileMenuProps) {
  // Track which page and section we're on.
  // e.g. Documentation -> Setup would be { pageIndex: 0, sectionIndex: 1 } since it's the first page and second section in that page.
  const [selectedIndices, setSelectedIndices] = useState({
    pageIndex: -1,
    sectionIndex: -1,
  })
  const selectedMenuItem = menuItems[selectedIndices.pageIndex] as
    | MenuItem
    | DropdownMenu
    | undefined

  if (selectedMenuItem && "tabs" in selectedMenuItem) {
    return (
      <ul className="w-full pt-2">
        <li>
          <MobileMenuBackButton
            onClick={() =>
              setSelectedIndices({ pageIndex: -1, sectionIndex: -1 })
            }
            className="text-lg dark:text-gray-100"
          >
            {selectedMenuItem.tabs[selectedIndices.sectionIndex]?.title}
          </MobileMenuBackButton>
        </li>
        <li>
          <MenuContent
            className="px-4"
            cards={selectedMenuItem.tabs[selectedIndices.sectionIndex]?.cards}
            sections={
              selectedMenuItem.tabs[selectedIndices.sectionIndex]!.sections
            }
          />
        </li>
      </ul>
    )
  }

  if (selectedMenuItem && "cards" in selectedMenuItem) {
    return (
      <ul className="w-full border pt-2">
        <li>
          <MobileMenuBackButton
            onClick={() =>
              setSelectedIndices({
                pageIndex: -1,
                sectionIndex: -1,
              })
            }
            className="text-lg dark:text-gray-100"
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
      onItemSelected={setSelectedIndices}
    />
  )
}
