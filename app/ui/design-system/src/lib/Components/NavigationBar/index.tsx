import { Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { ReactComponent as FlowDocsLogo } from "../../../../images/logos/flow-docs-logo"
import { ReactComponent as ModeDark } from "../../../../images/toggles/mode-dark"
import { ReactComponent as ModeLight } from "../../../../images/toggles/mode-light"
import { Search } from "../Search"
import { DesktopMenu } from "./DesktopMenu"
import { MobileMenu } from "./MobileMenu"
import { MobileMenuToggleButton } from "./MobileMenuToggleButton"
import { MenuItem } from "./types"

export type NavigationBarProps = {
  menuItems: MenuItem[]
  onDarkModeToggle: () => void
}

export const NAV_HEIGHT = 96

export function NavigationBar({
  menuItems,
  onDarkModeToggle,
}: NavigationBarProps) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <nav
      style={{ height: NAV_HEIGHT }}
      className="z-40 flex items-center bg-white p-4 text-primary-gray-400 dark:bg-black dark:text-white lg:px-8"
    >
      <div className="flex items-center">
        <a href="/" className="py-2 hover:opacity-75">
          <FlowDocsLogo className="shrink-0" />
        </a>
      </div>
      <div className="mt-1 flex flex-1 justify-end">
        {/* TODO: fetch appId and apiKey from env */}
        <div className="mr-4 flex items-center">
          <Search
            appId="DKF9ZIO5WM"
            apiKey="d53324bc00b550f87f608c2c56636bc6"
            indexName="crawler_Flow Docs"
          />
        </div>
        <DesktopMenu menuItems={menuItems} />
        <ul className="flex items-center">
          <li className="flex items-center whitespace-nowrap border-primary-gray-100 pl-4 dark:border-primary-gray-400 md:border-l">
            <button
              type="button"
              onClick={() => onDarkModeToggle()}
              className="hover:text-primary-blue dark:hover:text-blue-hover-dark"
            >
              <ModeDark className="dark:hidden" />
              <ModeLight className="hidden dark:block dark:text-[#FFE68D] dark:hover:text-white" />
            </button>
          </li>
          <li className="pl-4 md:hidden">
            <MobileMenuToggleButton
              isOpen={isMobileNavOpen}
              onOpenChanged={(open) => setMobileNavOpen(open)}
            />
          </li>
        </ul>
      </div>
      <Transition
        as={Fragment}
        show={isMobileNavOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="fixed top-[96px] left-0 right-0 bottom-0 z-40 origin-top-right overflow-auto bg-white dark:bg-black md:hidden">
          <MobileMenu menuItems={menuItems} />
        </div>
      </Transition>
    </nav>
  )
}
