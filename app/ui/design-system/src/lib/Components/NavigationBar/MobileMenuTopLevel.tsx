import NetworkStatus from "../../../../../../routes/poll-network"
import { ReactComponent as ChevronRightIcon } from "../../../../images/arrows/chevron-right"
import { MenuItemLink } from "./MenuItemLink"
import { MobileMenuButton } from "./MobileMenuButton"
import { MenuItem } from "./types"

export type MobileMenuTopLevelProps = {
  menuItems: MenuItem[]
  onItemSelected: (indices: any) => void
}

export function MobileMenuTopLevel({
  menuItems,
  onItemSelected,
}: MobileMenuTopLevelProps) {
  return (
    <div className="flex h-full flex-col">
      <ul>
        {menuItems.map((menuItem, pageIndex) => (
          <li key={pageIndex} className="mb-5 text-lg">
            <div>
              <div className="my-3 px-4 text-primary-gray-300/80 dark:text-primary-gray-200">
                {menuItem.title}
              </div>
              {"tabs" in menuItem &&
                menuItem.tabs.map(
                  ({ title }: { title: string }, tabIndex: number) => (
                    <MobileMenuButton
                      className="flex w-full justify-between whitespace-nowrap text-left"
                      onClick={() =>
                        onItemSelected({ pageIndex, sectionIndex: tabIndex })
                      }
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
          className="hover:cursor px-4"
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
      <div className="mt-auto flex pt-2">
        <MenuItemLink
          href="https://flow.com"
          title="flow.com"
          className="ml-auto px-4 py-3"
        />
      </div>
    </div>
  )
}
