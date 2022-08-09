import { arrow, autoUpdate, flip, useFloating } from "@floating-ui/react-dom"
import { Popover, Portal } from "@headlessui/react"
import { useLocation } from "@remix-run/react"
import clsx from "clsx"
import { Fragment, useRef } from "react"
import { ReactComponent as Close } from "../../../../images/action/close"
import { ReactComponent as ChevronDown } from "../../../../images/arrows/chevron-down"
import AppLink from "../AppLink"
import DropdownArrow from "../shared/DropdownArrow"
import DropdownTransition from "../shared/DropdownTransition"
import {
  InternaSidebarDropdownMenuIconType,
  SIDEBAR_DROPDOWN_ICONS,
} from "./icons"

export interface InternaSidebarDropdownMenuItem {
  title: string
  href: string
  icon: InternaSidebarDropdownMenuIconType
}

export interface InternaSidebarDropdownMenuGroup {
  title: string
  items: InternaSidebarDropdownMenuItem[]
}

function Group({
  items,
  onClick,
}: {
  items: InternaSidebarDropdownMenuItem[]
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <>
      {items.map((items, index) => {
        const { primary: PrimaryIcon, gradient: GradientIcon } =
          SIDEBAR_DROPDOWN_ICONS[items.icon]

        return (
          <div
            key={index}
            className="border-b border-b-primary-gray-100 last:border-none md:border-none md:p-2"
          >
            <AppLink
              to={items.href}
              className={clsx(
                "group flex items-center px-1 py-2 text-center text-sm hover:bg-primary-gray-100/50 dark:bg-black hover:dark:bg-primary-gray-400/5 md:h-[7.5rem] md:w-[7rem] md:flex-col md:rounded-lg md:px-4 md:py-5 md:shadow-2xl dark:md:shadow-2xl-dark"
              )}
              onClick={onClick}
            >
              <div className="mr-2 h-12 w-12 md:mb-4 md:mr-0 md:-mt-2">
                <div className="group-hover:hidden">
                  <PrimaryIcon />
                </div>
                <div className="hidden group-hover:block">
                  <GradientIcon />
                </div>
              </div>
              <div className="flex items-center justify-center font-bold text-primary-gray-400 dark:text-primary-gray-100 md:h-[2rem] md:text-sm md:font-normal">
                {items.title}{" "}
              </div>
            </AppLink>
          </div>
        )
      })}
    </>
  )
}

export type InternalSidebarDropdownMenuProps = {
  groups: InternaSidebarDropdownMenuGroup[]
}

export function InternalSidebarDropdownMenu({
  groups,
}: InternalSidebarDropdownMenuProps) {
  const arrowRef = useRef(null)
  const {
    x,
    y,
    strategy,
    reference,
    floating,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    middleware: [arrow({ element: arrowRef }), flip()],
    placement: "bottom-start",

    // This is necessary because this menu may be hidden when it's first mounted
    // (in the case of crossing mobile/desktop breakpoints)
    whileElementsMounted: autoUpdate,
  })

  const { pathname } = useLocation()

  // Find the first item whose href matches the current pathname. Ordering them
  // by href length prioritizes the "most specific" path (so if we
  // have a pathname like "/learn/foo/bar" that matches "/learn" and "/learn/foo"
  // items, we prefer "/learn/foo" over "/learn")
  const match = groups
    .reduce<InternaSidebarDropdownMenuItem[]>(
      (acc, group) =>
        acc.concat(
          group.items.filter((item) => pathname.startsWith(item.href))
        ),
      []
    )
    .sort((a, b) => b.href.length - a.href.length)[0]

  const { primary: SelectedIcon } =
    SIDEBAR_DROPDOWN_ICONS[match?.icon || "default"]

  return (
    <div>
      <Popover>
        {({ open, close }) => (
          <div className="relative">
            <Popover.Button
              ref={reference}
              className="mb-4 flex min-w-[210px] items-center rounded-lg p-2 pr-3 text-sm shadow-2xl hover:text-primary-gray-300 dark:bg-black dark:text-primary-gray-200 dark:shadow-2xl-dark-strong dark:hover:text-primary-gray-100"
            >
              <div className="mr-2 h-8 w-8">
                {SelectedIcon && <SelectedIcon />}
              </div>
              <div className="text-small font-bold">
                {match?.title || "Find a guide"}
              </div>
              <div className="ml-auto pl-2">
                <ChevronDown />
              </div>
            </Popover.Button>
            <Portal>
              <div
                className="z-40 mt-8 w-screen px-4"
                ref={floating}
                style={{ top: y || 0, left: x || 0, position: strategy }}
              >
                <DropdownTransition>
                  <Popover.Panel
                    className="relative mr-2 inline-grid min-w-[210px] max-w-[34rem] grid-cols-1 overflow-auto overflow-y-auto rounded-lg bg-white px-4 py-2 shadow-2xl dark:bg-primary-gray-dark dark:shadow-2xl-dark dark:hover:shadow-2xl-dark dark:hover:shadow-2xl-dark md:grid-cols-4 md:px-6 md:py-4"
                    style={{
                      maxHeight: `calc(95vh - ${y || 0}px)`,
                    }}
                  >
                    {({ close }) => (
                      <>
                        <button
                          className="absolute top-2 right-2 h-6 w-6 hover:opacity-75 md:top-4 md:right-4 md:h-8 md:w-8"
                          onClick={() => close()}
                          aria-label="Close"
                        >
                          <Close />
                        </button>
                        {groups.map((group, index) => (
                          <Fragment key={index}>
                            <div className="my-2 flex items-center md:col-span-4">
                              <div className="mr-auto font-bold leading-none dark:text-primary-gray-100 md:text-xl md:font-semibold">
                                {group.title}
                              </div>
                            </div>
                            <Group
                              items={group.items}
                              onClick={() => close()}
                            />
                          </Fragment>
                        ))}
                      </>
                    )}
                  </Popover.Panel>
                </DropdownTransition>
                <DropdownArrow
                  arrowRef={arrowRef}
                  x={arrowX}
                  y={arrowY}
                  open={open}
                />
              </div>
            </Portal>
          </div>
        )}
      </Popover>
    </div>
  )
}
