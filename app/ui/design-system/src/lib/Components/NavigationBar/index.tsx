import { Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { ReactComponent as FlowDocsLogo } from "../../../../images/logos/flow-docs-logo"
import { ReactComponent as FlowDocsLogoLight } from "../../../../images/logos/flow-docs-logo-light"
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

export function NavigationBar({
  menuItems,
  onDarkModeToggle,
}: NavigationBarProps) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <nav className="z-10 flex h-16 items-start justify-between bg-white px-3 py-4 text-primary-gray-400 dark:bg-black dark:text-white">
      <div className="h-[2rem] py-1">
        <FlowDocsLogo className="shrink-0 dark:hidden" height="2rem" />
        <FlowDocsLogoLight className="hidden dark:block" height="2rem" />
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
          <li className="flex	items-center whitespace-nowrap border-l px-4">
            <button type="button" onClick={() => onDarkModeToggle()}>
              <ModeDark className="dark:hidden" />
              <ModeLight className="hidden dark:block" />
            </button>
          </li>
          <li className="md:hidden">
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
        <div className="fixed top-16 left-0 right-0 bottom-0 z-10 origin-top-right overflow-auto bg-white dark:bg-black md:hidden">
          <MobileMenu menuItems={menuItems} />
        </div>
      </Transition>
    </nav>
  )
}
