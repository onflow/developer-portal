import clsx from "clsx"
import { useState } from "react"

export type TabMenuProps = {
  tabs: string[]
  onTabChange: (index: number) => void
  defaultTabIndex: number
  centered?: boolean
}

// TODO: Use links for tabs
const TabMenu = ({
  tabs,
  onTabChange,
  centered,
  defaultTabIndex,
}: TabMenuProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultTabIndex)

  return (
    <div
      className={clsx(
        "flex justify-start gap-4 overflow-x-auto border-b border-primary-gray-100 text-sm dark:border-primary-gray-300 md:text-base",
        {
          "md:justify-center": centered,
        }
      )}
    >
      {tabs.map((tab, index) => {
        const isCurrentIndex = activeIndex === index

        const indicatorClasses = clsx(
          "absolute bottom-0 w-full bg-black rounded-tr-lg rounded-tl-lg h-[6px] dark:bg-white",
          { block: isCurrentIndex, hidden: !isCurrentIndex }
        )

        return (
          <div
            key={tab}
            className="relative cursor-pointer py-4 text-center text-black hover:text-primary-gray-400 dark:text-white hover:dark:text-primary-gray-100 md:py-6"
            role="button"
            onClick={(e) => {
              setActiveIndex(index)
              onTabChange(index)
            }}
          >
            <span
              className={clsx(
                "whitespace-nowrap px-4 text-sm md:px-6 md:text-base",
                isCurrentIndex ? "-mx-[1px] font-bold" : ""
              )}
            >
              {tab}
            </span>
            <div className={indicatorClasses} />
          </div>
        )
      })}
    </div>
  )
}

export default TabMenu
