import { Transition } from "@headlessui/react"
import { useLocation } from "@remix-run/react"
import { Fragment, useEffect, useState } from "react"
import SvgChevronRight from "../../../../images/arrows/chevron-right"
import flowDocsLogoDark from "../../../../images/logos/flow-docs-logo-dark.png"
import flowDocsLogoDark2X from "../../../../images/logos/flow-docs-logo-dark@2x.png"
import flowDocsLogoLight from "../../../../images/logos/flow-docs-logo-light.png"
import flowDocsLogoLight2X from "../../../../images/logos/flow-docs-logo-light@2x.png"
import { ReactComponent as ModeDark } from "../../../../images/toggles/mode-dark"
import { ReactComponent as ModeLight } from "../../../../images/toggles/mode-light"
import AppLink from "../AppLink"
import { Search, SearchProps } from "../Search"
import { DesktopMenu } from "./DesktopMenu"
import { MobileMenu } from "./MobileMenu"
import { MobileMenuToggleButton } from "./MobileMenuToggleButton"
import { MenuItem } from "./types"

export type NavigationBarProps = {
  menuItems: MenuItem[]
  onDarkModeToggle: () => void
  algolia?: SearchProps
}

export const NAV_HEIGHT = 110

export function NavigationBar({
  menuItems,
  onDarkModeToggle,
  algolia,
}: NavigationBarProps) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.key])

  return (
    <nav
      style={{ height: NAV_HEIGHT, minHeight: NAV_HEIGHT }}
      className="z-40 flex flex-col dark:bg-black dark:text-white"
    >
      <div className="flex w-full items-center justify-center bg-black px-4 text-white dark:bg-white dark:text-black">
        <AppLink
          to="https://hackathon.flow.com/"
          className=" flex flex-row items-center justify-center py-1 hover:opacity-75"
        >
          <img
            src={
              "https://assets-global.website-files.com/5f734f4dbd95382f4fdfa0ea/63e254beeb2edc54cc059acc_hackathon-logo.d4db7683-p-500.png"
            }
            alt="Flow Hackathon"
            className="mr-4 max-h-12"
          />
          <div className="relative top-2 pr-4">
            Build the future of web3 at the upcoming Flow Hackathon (Feb 21-26).
            Over $500,000 in prizes. Register Now
          </div>
          <SvgChevronRight className="relative top-2" />
        </AppLink>
      </div>
      <div className="flex items-center bg-white px-4 pb-1 text-primary-gray-400 dark:bg-black dark:text-white">
        <div className="flex items-center">
          <AppLink to="/" className="mr-4 w-full py-2 hover:opacity-75">
            <img
              src={flowDocsLogoLight}
              srcSet={`${flowDocsLogoLight}, ${flowDocsLogoLight2X} 2x`}
              alt="Flow Developers"
              className="hidden w-full dark:block"
            />
            <img
              src={flowDocsLogoDark}
              srcSet={`${flowDocsLogoDark}, ${flowDocsLogoDark2X} 2x`}
              alt="Flow Developers"
              className="block w-full dark:hidden"
            />
          </AppLink>
        </div>
        <div className="mt-1 flex flex-1 justify-end">
          {!!algolia && (
            <div className="mr-4 flex items-center">
              <Search {...algolia} />
            </div>
          )}
          <DesktopMenu menuItems={menuItems} />
          <ul className="flex items-center">
            <li className="flex items-center whitespace-nowrap border-l border-primary-gray-100 pl-4 dark:border-primary-gray-400">
              <button
                type="button"
                onClick={() => onDarkModeToggle()}
                className="hover:text-primary-blue dark:hover:text-blue-hover-dark"
              >
                <ModeDark className="dark:hidden" />
                <ModeLight className="hidden dark:block dark:text-[#FFE68D] dark:hover:text-white" />
              </button>
            </li>
            <li className="main-nav-mobile-menu-toggle pl-4">
              <MobileMenuToggleButton
                isOpen={isMobileNavOpen}
                onOpenChanged={(open) => setMobileNavOpen(open)}
              />
            </li>
          </ul>
        </div>
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
        <div
          className="mobile-nav-container fixed left-0 right-0 bottom-0 z-40 origin-top-right overflow-auto border border-t-primary-gray-100 bg-white pt-4 dark:border-t-primary-gray-300 dark:bg-black"
          style={{ top: NAV_HEIGHT }}
        >
          <MobileMenu menuItems={menuItems} />
        </div>
      </Transition>
    </nav>
  )
}
