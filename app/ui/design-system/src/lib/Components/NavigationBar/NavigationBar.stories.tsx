import { Meta, Story } from "@storybook/react"
import { NavigationBar, NavigationBarProps } from "."
import { ReactComponent as EcosystemIcon } from "../../../../images/content/ecosystem"
import { ReactComponent as SDKIcon } from "../../../../images/content/sdk"
import { ReactComponent as UseCaseIcon } from "../../../../images/content/use-cases"
import { DesktopMenuTabbed } from "./DesktopMenuTabbed"
import { IntroCardCarousel, IntroCardCarouselProps } from "./IntroCardCarousel"
import { MenuContent } from "./MenuContent"
import {
  MobileMenuToggleButton,
  MobileMenuToggleButtonProps,
} from "./MobileMenuToggleButton"
import { card, data, section, tabs } from "./sample"
import { SectionHeading, SectionHeadingProps } from "./SectionHeading"
import { SectionLink, SectionLinkProps } from "./SectionLink"
import { SubsectionLink, SubsectionLinkProps } from "./SubsectionLink"
import { TabButton, TabButtonProps } from "./TabButton"

export default {
  title: "Components/NavigationBar",
} as Meta

const Template: Story<NavigationBarProps> = (args) => (
  <NavigationBar {...args} />
)

export const Default = Template.bind({})
Default.args = { ...data }

export const Mobile = Template.bind({})
Mobile.args = { ...Default.args }
Mobile.parameters = {
  viewport: {
    defaultViewport: "xs",
  },
}

/******************************************************************
 * IntroCardCarousel
 ******************************************************************/

const IntroCardCarouselTemplate: Story<IntroCardCarouselProps> = (args) => (
  <IntroCardCarousel {...args} />
)
export const IntroCardCarouselStory = IntroCardCarouselTemplate.bind({})
IntroCardCarouselStory.storyName = "Intro Card Carousel"
IntroCardCarouselStory.parameters = {
  layout: "padded",
}
IntroCardCarouselStory.args = {
  cards: [card, card, card],
}

/******************************************************************
 * SectionHeading
 ******************************************************************/

const SectionHeadingTemplate: Story<SectionHeadingProps> = (args) => (
  <SectionHeading {...args} />
)
export const SectionHeadingStory = SectionHeadingTemplate.bind({})
SectionHeadingStory.storyName = "Section Heading"
SectionHeadingStory.parameters = {
  layout: "padded",
}
SectionHeadingStory.argTypes = {
  icon: {
    options: ["None", "Ecosystem", "SDK", "Use Case"],
    mapping: {
      None: undefined,
      Ecosystem: <EcosystemIcon height="1em" width="1em" />,
      SDK: <SDKIcon height="1em" width="1em" />,
      "Use Case": <UseCaseIcon height="1em" width="1em" />,
    },
    control: { type: "inline-radio" },
  },
}
SectionHeadingStory.args = {
  title: "Section title",
  icon: "none",
}

/******************************************************************
 * SubsectionLink
 ******************************************************************/

const SubsectionLinkTemplate: Story<SubsectionLinkProps> = (args) => (
  <SubsectionLink {...args} />
)
export const SubsectionLinkStory = SubsectionLinkTemplate.bind({})
SubsectionLinkStory.storyName = "Subsection Link"
SubsectionLinkStory.parameters = {
  layout: "padded",
}
SubsectionLinkStory.args = {
  title: "Title Name",
  href: "#link",
}

/******************************************************************
 * SectionLink
 ******************************************************************/

const SectionLinkTemplate: Story<SectionLinkProps> = (args) => (
  <div style={{ width: "15em" }}>
    <SectionLink {...args} />
  </div>
)
export const SectionLinkStory = SectionLinkTemplate.bind({})
SectionLinkStory.storyName = "Section Link"
SectionLinkStory.parameters = {
  layout: "padded",
}
SectionLinkStory.args = {
  title: "Title Name",
  href: "#link",
}

/******************************************************************
 * MobileMenuToggleButton
 ******************************************************************/

const MobileMenuToggleButtonTemplate: Story<MobileMenuToggleButtonProps> = (
  args
) => <MobileMenuToggleButton {...args} />
export const MobileMenuToggleButtonStory = MobileMenuToggleButtonTemplate.bind(
  {}
)
MobileMenuToggleButtonStory.storyName = "Mobile Menu Toggle Button"
MobileMenuToggleButtonStory.parameters = {
  layout: "padded",
}
MobileMenuToggleButtonStory.args = {
  isOpen: true,
}

/******************************************************************
 * TabButton
 ******************************************************************/

const TabButtonTemplate: Story<TabButtonProps> = (args) => (
  <div style={{ width: "20em" }}>
    <TabButton {...args} />
  </div>
)
export const TabButtonStory = TabButtonTemplate.bind({})
TabButtonStory.storyName = "Tab Button"
TabButtonStory.parameters = {
  layout: "padded",
}
TabButtonStory.args = {
  title: "Title",
  description: "Connect to lorem ipsum dolor sit amet proin",
  isSelected: true,
}

/******************************************************************
 * MenuContent
 ******************************************************************/

const MenuContentTemplate: Story<{
  cardCount: number
  sectionCount: number
}> = ({ cardCount, sectionCount }) => (
  <MenuContent
    cards={Array(cardCount).fill(card)}
    sections={Array(sectionCount).fill(section)}
  />
)
export const MenuContentStory = MenuContentTemplate.bind({})
MenuContentStory.storyName = "Menu Content"
MenuContentStory.argTypes = {
  cardCount: {
    control: { type: "number", min: 0, max: 30 },
  },
  sectionCount: {
    control: { type: "number", min: 1, max: 30 },
  },
}
MenuContentStory.args = {
  cardCount: 3,
  sectionCount: 4,
}

/******************************************************************
 * DesktopMenuTabbed
 ******************************************************************/

const DesktopMenuTabbedTemplate: Story<{
  tabCount: number
}> = ({ tabCount }) => <DesktopMenuTabbed tabs={tabs.slice(0, tabCount)} />
export const DesktopMenuTabbedStory = DesktopMenuTabbedTemplate.bind({})
DesktopMenuTabbedStory.storyName = "DesktopMenuTabbed"
DesktopMenuTabbedStory.argTypes = {
  tabCount: {
    control: { type: "number", min: 0, max: tabs.length },
  },
}
DesktopMenuTabbedStory.args = {
  tabCount: 4,
}
