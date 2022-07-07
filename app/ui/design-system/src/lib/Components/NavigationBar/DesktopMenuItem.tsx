import { Popover, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment } from "react"
import { NAV_HEIGHT } from "."
import { ReactComponent as ChevronDown } from "../../../../images/arrows/chevron-down"
import { DesktopMenuTabbed } from "./DesktopMenuTabbed"
import { MenuContent } from "./MenuContent"
import { MenuItemLink } from "./MenuItemLink"
import { MenuItem } from "./types"

export type DesktopMenuItemProps = MenuItem

export function DesktopMenuItem({ divider, ...props }: DesktopMenuItemProps) {
  if ("href" in props) {
    return (
      <li
        className={clsx({
          "border-l border-primary-gray-100 dark:border-primary-gray-400":
            divider,
        })}
      >
        <MenuItemLink {...props} className="px-4" />
      </li>
    )
  }

  const { title, ...contentProps } = props

  return (
    <Popover
      as="li"
      className={clsx({
        "border-l border-primary-gray-100 dark:border-primary-gray-400":
          divider,
      })}
    >
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx(
              "flex whitespace-nowrap px-2 hover:text-primary-blue focus:outline-none dark:hover:text-blue-hover-dark lg:px-4",
              {
                "text-primary-blue dark:text-blue-dark": open,
              }
            )}
          >
            <>
              {title}{" "}
              <ChevronDown
                className={clsx("transform transition duration-300 lg:ml-2", {
                  "rotate-x-180": open,
                })}
              />
            </>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel
              className="fixed left-0 right-0 bottom-0 z-40 origin-top-right"
              style={{ top: NAV_HEIGHT }}
            >
              <div className="relative z-20 max-h-full">
                {"tabs" in contentProps ? (
                  <DesktopMenuTabbed {...contentProps} />
                ) : (
                  <MenuContent {...contentProps} />
                )}
              </div>
              <Popover.Overlay
                className="fixed left-0 right-0 bottom-0"
                style={{ top: NAV_HEIGHT }}
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
