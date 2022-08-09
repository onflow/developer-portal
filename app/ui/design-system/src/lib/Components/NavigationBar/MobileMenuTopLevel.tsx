import { MenuItemLink } from "./MenuItemLink"
import { MobileMenuButton } from "./MobileMenuButton"
import { isLinkMenuItem, MenuItem } from "./types"
import { ReactComponent as ChevronRightIcon } from "../../../../images/arrows/chevron-right"

export type MobileMenuTopLevelProps = {
  menuItems: MenuItem[]
  onItemSelected: (index: number) => void
}

export function MobileMenuTopLevel({
  menuItems,
  onItemSelected,
}: MobileMenuTopLevelProps) {
  return (
    <ul>
      {menuItems.map(({ divider, ...menuItem }, index) => (
        <li key={index} className="py-2">
          {isLinkMenuItem(menuItem) ? (
            <MenuItemLink {...menuItem} className="px-4 py-3" />
          ) : (
            <div>
              <span className="px-4 text-primary-gray-400 dark:text-primary-gray-200">
                {menuItem.title}
              </span>
              {menuItem.tabs &&
                menuItem.tabs.map(({ title }: { title: string }) => (
                  <MobileMenuButton
                    className="flex w-full justify-between whitespace-nowrap text-left text-lg"
                    onClick={() => onItemSelected(index)}
                    key={title}
                  >
                    {title} <ChevronRightIcon />
                  </MobileMenuButton>
                ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
