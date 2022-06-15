import { MenuItemLink } from "./MenuItemLink"
import { MobileMenuButton } from "./MobileMenuButton"
import { isLinkMenuItem, MenuItem } from "./types"

export type MobileMenuTopLevelProps = {
  menuItems: MenuItem[]
  onItemSelected: (index: number) => void
}

export function MobileMenuTopLevel({
  menuItems,
  onItemSelected,
}: MobileMenuTopLevelProps) {
  return (
    <ul className="w-full divide-y dark:divide-gray-500">
      {menuItems.map(({ divider, ...menuItem }, index) => (
        <li key={index}>
          {isLinkMenuItem(menuItem) ? (
            <MenuItemLink {...menuItem} className="px-4 py-3" />
          ) : (
            <MobileMenuButton
              className="w-full whitespace-nowrap text-left"
              onClick={() => onItemSelected(index)}
            >
              {menuItem.title}
            </MobileMenuButton>
          )}
        </li>
      ))}
    </ul>
  )
}
