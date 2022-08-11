import { MenuItemLink } from "./MenuItemLink"
import { MobileMenuButton } from "./MobileMenuButton"
import { isLinkMenuItem, MenuItem } from "./types"
import { ReactComponent as ChevronRightIcon } from "../../../../images/arrows/chevron-right"
import NetworkStatus from "../../../../../../routes/poll-network"

export type MobileMenuTopLevelProps = {
  menuItems: MenuItem[]
  onItemSelected: (indices: [number, number]) => void
}

export function MobileMenuTopLevel({
  menuItems,
  onItemSelected,
}: MobileMenuTopLevelProps) {
  return (
    <div>
      <ul>
        {menuItems.map((menuItem, index) => (
          <li key={index} className="py-2">
            <div>
              <span className="px-4 text-primary-gray-400 dark:text-primary-gray-200">
                {menuItem.title}
              </span>
              {menuItem.tabs &&
                menuItem.tabs.map(
                  ({ title }: { title: string }, tabIndex: number) => (
                    <MobileMenuButton
                      className="flex w-full justify-between whitespace-nowrap text-left text-lg"
                      onClick={() => onItemSelected([index, tabIndex])}
                      key={title}
                    >
                      {title} <ChevronRightIcon />
                    </MobileMenuButton>
                  )
                )}
            </div>
          </li>
        ))}
        <li
          className="hover:cursor px-4 py-2"
          role="button"
          onClick={() =>
            onItemSelected([
              menuItems.findIndex((item) => item.title === "Network"),
              0,
            ])
          }
        >
          <NetworkStatus />
        </li>
      </ul>
      <MenuItemLink
        href="https://flow.com"
        title="flow.com"
        className="fixed bottom-0 right-0 px-4 py-3"
      />
    </div>
  )
}
