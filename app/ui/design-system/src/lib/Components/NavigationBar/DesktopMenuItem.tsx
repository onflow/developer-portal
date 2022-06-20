import { Popover, Transition } from "@headlessui/react"
import clsx from "clsx"
import { Fragment } from "react"
import { ReactComponent as ChevronDown } from "../../../../images/arrows/chevron-down"
import { DesktopMenuTabbed } from "./DesktopMenuTabbed"
import { MenuContent } from "./MenuContent"
import { MenuItemLink } from "./MenuItemLink"
import { MenuItem } from "./types"

export type DesktopMenuItemProps = MenuItem

export function DesktopMenuItem({ divider, ...props }: DesktopMenuItemProps) {
  if ("href" in props) {
    return (
      <li className={clsx({ "border-l": divider })}>
        <MenuItemLink {...props} className="px-4" />
      </li>
    )
  }

  const { title, ...contentProps } = props

  return (
    <Popover as="li" className={clsx({ "border-l": divider })}>
      {({ open }) => (
        <>
          <Popover.Button
            className={clsx("flex whitespace-nowrap px-4 focus:outline-none", {
              "text-primary-blue dark:text-blue-dark": open,
            })}
          >
            <>
              {title}{" "}
              <ChevronDown
                className={clsx("transform transition duration-300", {
                  "rotate-x-180": open,
                })}
              />
            </>
          </Popover.Button>
          <Popover.Overlay className="fixed top-16 left-0 right-0 bottom-0" />
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="fixed top-16 left-0 right-0 bottom-0 z-10 origin-top-right">
              <div className="h-full max-h-full">
                {"tabs" in contentProps ? (
                  <DesktopMenuTabbed {...contentProps} />
                ) : (
                  <MenuContent {...contentProps} />
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
