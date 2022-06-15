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

  const { title, ...rest } = props
  const popoverClasses =
    "max-h-full border dark:border-gray-500 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"

  return (
    <Popover as="li" className={clsx({ "border-l": divider })}>
      <Popover.Button className="flex whitespace-nowrap px-4">
        {title} <ChevronDown />
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
        <Popover.Panel className="fixed top-[3rem] left-3 right-3 bottom-3 mx-auto mt-2 max-w-5xl origin-top-right ">
          <div className="h-full max-h-full">
            {"tabs" in rest ? (
              <DesktopMenuTabbed {...rest} className={popoverClasses} />
            ) : (
              <MenuContent {...rest} className={clsx("p-4", popoverClasses)} />
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
