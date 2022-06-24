import { arrow, flip, useFloating } from "@floating-ui/react-dom"
import { Popover } from "@headlessui/react"
import clsx from "clsx"
import { useRef } from "react"
import { ReactComponent as Close } from "../../../../images/action/close"
import { ReactComponent as ChevronDown } from "../../../../images/arrows/chevron-down"
import { ToolName, TOOLS } from "../Internal/tools"
import DropdownArrow from "../shared/DropdownArrow"
import DropdownTransition from "../shared/DropdownTransition"

export type Version = {
  name: string
  href: string
}

type SectionGroup = { name: string; sections: ToolName[] }

const SIDEBAR_SECTION_GROUPS: SectionGroup[] = [
  {
    name: "Switch tool",
    sections: [
      // temporarily disabled
      // "emulator",
      "vscode",
      // temporarily disabled
      // "cli",
      "testing",
    ],
  },
  {
    name: "Concepts",
    sections: ["fcl", "cadence"],
  },
]

function Group({
  group,
  toolLinks,
}: {
  group: SectionGroup
  toolLinks: ToolLinkMap
}) {
  return (
    <>
      {group.sections.map((section: ToolName) => {
        const SelectedGroupSectionIcon = TOOLS[section].icon
        const SelectedGroupSectionGradientIcon = TOOLS[section].gradientIcon
        return (
          <div
            key={section}
            className="border-b border-b-primary-gray-100 last:border-none md:border-none md:p-0"
          >
            <a
              href={toolLinks[section]}
              className={clsx(
                "group flex items-center px-1 py-2 text-center text-sm hover:bg-primary-gray-100/50 dark:bg-black hover:dark:bg-primary-gray-400/5 md:h-[7.5rem] md:w-[7rem] md:flex-col md:rounded-lg md:px-4 md:py-5 md:shadow-2xl dark:md:shadow-2xl-dark"
              )}
            >
              <div className="mr-2 scale-75 md:mr-0 md:-mt-2">
                <div className="group-hover:hidden">
                  <SelectedGroupSectionIcon />
                </div>
                <div className="hidden group-hover:block">
                  <SelectedGroupSectionGradientIcon />
                </div>
              </div>
              <div className="flex items-center justify-center font-bold text-primary-gray-400 dark:text-primary-gray-100 md:h-[2rem] md:text-sm md:font-normal">
                {TOOLS[section].name}{" "}
              </div>
            </a>
          </div>
        )
      })}
    </>
  )
}

function SidebarSectionGroup({
  group,
  index,
  close,
  toolLinks,
}: {
  group: SectionGroup
  index: number
  close: () => void
  toolLinks: ToolLinkMap
}) {
  return (
    <div className="mb-2 md:mb-6 md:divide-y md:divide-solid dark:md:divide-primary-gray-300">
      <div className="my-2 flex items-center">
        <div className="mr-auto font-bold leading-none dark:text-primary-gray-100 md:text-xl md:font-semibold">
          {group.name}
        </div>
        {index === 0 && (
          <button
            className="hover:opacity-75"
            onClick={() => close()}
            aria-label="Close"
          >
            <Close />
          </button>
        )}
      </div>
      <div className="flex flex-col py-4 md:flex-row md:flex-wrap md:gap-4 md:py-6">
        <Group group={group} toolLinks={toolLinks} />
      </div>
    </div>
  )
}

type ToolLinkMap = Record<ToolName, string>

export type InternalSidebarMenuProps = {
  selectedTool: ToolName
  toolLinks: ToolLinkMap
}

export function InternalSidebarMenu({
  selectedTool,
  toolLinks,
}: InternalSidebarMenuProps) {
  const arrowRef = useRef(null)
  const {
    x,
    y,
    reference,
    floating,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    middleware: [arrow({ element: arrowRef }), flip()],
    placement: "bottom-start",
  })
  const SelectedIcon = TOOLS[selectedTool].icon
  return (
    <div>
      <Popover>
        {({ open }) => (
          <div className="relative">
            <Popover.Button
              ref={reference}
              className="mb-4 flex items-center rounded-lg pr-3 text-sm shadow-2xl hover:text-primary-gray-300 dark:bg-black dark:text-primary-gray-200 dark:shadow-2xl-dark-strong dark:hover:text-primary-gray-100"
            >
              <div className="scale-50">
                <SelectedIcon />
              </div>
              <div className="text-small font-bold">
                {TOOLS[selectedTool].name}
              </div>
              <div className="ml-auto pl-2">
                <ChevronDown />
              </div>
            </Popover.Button>
            <div
              className="absolute z-10 mt-8 w-screen px-4 md:min-w-[15rem]"
              ref={floating}
              style={{ top: y || 0, left: x || 0 }}
            >
              <DropdownTransition>
                <Popover.Panel className="relative mr-2 min-w-[17rem] max-w-[34rem] overflow-y-auto rounded-lg bg-white px-4 py-2 shadow-2xl dark:bg-primary-gray-dark dark:shadow-2xl-dark dark:hover:shadow-2xl-dark dark:hover:shadow-2xl-dark md:px-6 md:py-4">
                  {({ close }) =>
                    SIDEBAR_SECTION_GROUPS.map((group, index) => (
                      <SidebarSectionGroup
                        group={group}
                        index={index}
                        key={index}
                        close={close}
                        toolLinks={toolLinks}
                      />
                    ))
                  }
                </Popover.Panel>
              </DropdownTransition>
              <DropdownArrow
                arrowRef={arrowRef}
                x={arrowX}
                y={arrowY}
                open={open}
              />
            </div>
          </div>
        )}
      </Popover>
    </div>
  )
}
