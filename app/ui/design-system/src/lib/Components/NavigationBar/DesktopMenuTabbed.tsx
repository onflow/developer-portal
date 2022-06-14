import clsx from "clsx"
import { useState } from "react"
import { MenuContent } from "./MenuContent"
import { TabButton } from "./TabButton"
import { Tab } from "./types"

export type DesktopMenuTabbedProps = {
  className?: string
  tabs: Tab[]
}

export function DesktopMenuTabbed({ className, tabs }: DesktopMenuTabbedProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const selectedTab = tabs[selectedTabIndex]

  return (
    <div className={clsx("flex max-h-full items-stretch", className)}>
      <div
        className={"flex w-80 flex-initial flex-col overflow-y-auto shadow-lg"}
      >
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            description={tab.description}
            isSelected={index === selectedTabIndex}
            onClick={() => setSelectedTabIndex(index)}
            title={tab.title}
          />
        ))}
      </div>
      <div className="flex-1 overflow-y-hidden">
        {selectedTab && (
          <MenuContent
            cards={selectedTab.cards}
            className="p-4"
            isTabContent
            sections={selectedTab.sections}
          />
        )}
      </div>
    </div>
  )
}
