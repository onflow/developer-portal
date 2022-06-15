import { useState } from "react"
import { MenuContent, MenuContentProps } from "./MenuContent"
import { MobileMenuBackButton } from "./MobileMenuBackButton"
import { MobileMenuButton } from "./MobileMenuButton"
import { TabButtonProps } from "./TabButton"
import { TabHeading } from "./TabHeading"

export type MobileMenuTabbedProps = {
  onBackButtonClick: () => void
  tabs: Array<MenuContentProps & Omit<TabButtonProps, "isSelected" | "onClick">>
}

export function MobileMenuTabbed({
  onBackButtonClick,
  tabs,
}: MobileMenuTabbedProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(-1)
  const selectedTab = tabs[selectedTabIndex]

  if (selectedTab) {
    return (
      <ul className="w-full divide-y dark:divide-gray-500">
        <li>
          <MobileMenuBackButton onClick={() => setSelectedTabIndex(-1)} />
        </li>
        <li>
          <TabHeading
            className="px-4 py-3"
            description={selectedTab.description}
            isSelected
            title={selectedTab.title}
          />
          <MenuContent
            cards={selectedTab.cards}
            className="px-4"
            sections={selectedTab.sections}
          />
        </li>
      </ul>
    )
  }

  return (
    <ul className="w-full divide-y dark:divide-gray-500">
      <li>
        <MobileMenuBackButton onClick={() => onBackButtonClick()} />
      </li>
      {tabs.map((tab, index) => (
        <li key={index}>
          <MobileMenuButton
            className="text-left"
            onClick={() => setSelectedTabIndex(index)}
            {...tab}
          >
            <TabHeading
              description={tab.description}
              isSelected={selectedTab}
              title={tab.title}
            />
          </MobileMenuButton>
        </li>
      ))}
    </ul>
  )
}
