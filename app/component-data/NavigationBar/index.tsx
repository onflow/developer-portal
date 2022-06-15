import { MenuItem } from "~/ui/design-system/src/lib/Components/NavigationBar/types"

import { NavigationBarProps } from "~/ui/design-system/src/lib/Components/NavigationBar"
import EcosystemIcon from "~/ui/design-system/images/content/ecosystem"
import { IntroCardProps } from "~/ui/design-system/src/lib/Components/NavigationBar/IntroCard"
import {
  Section,
  Tab,
} from "~/ui/design-system/src/lib/Components/NavigationBar/types"

export const sectionSubSection = {
  title: "Title Name",
  href: "#todo",
}

export const sectionLink = {
  title: "Link to Page",
  href: "#todo",
}

export const section: Section = {
  links: [sectionLink],
  title: "Section Title",
  subSections: Array(5).fill(sectionSubSection),
  icon: <EcosystemIcon height="1em" width="1em" />,
}

export const mediumSection: Section = {
  links: [sectionLink],
  title: "Section Title",
  subSections: Array(8).fill(sectionSubSection),
  icon: <EcosystemIcon height="1em" width="1em" />,
}

export const largeSection: Section = {
  title: "A Large Section",
  subSections: Array(25).fill(sectionSubSection),
  links: [sectionLink, sectionLink],
}

export const card: IntroCardProps = {
  href: "",
  ctaText: "Get Started",
  description: "Intro blurb for an intro card, maximum two lines.",
  imageHref: "",
  title: "Two-line title here lorem ipsum",
}

export const tabs: Tab[] = [
  {
    title: "Multiple Cards and Sections",
    description: "A tab that contains multiple cards and sections",
    cards: Array(3).fill(card),
    sections: Array(5).fill(section),
  },
  {
    title: "Single Card and Multiple Sections",
    description: "A tab that contains a single card and multiple sections",
    cards: [card],
    sections: [section, section, section, mediumSection],
  },
  {
    title: "Sections only",
    description: "A tab that contains only sections",
    sections: [section, section, section, mediumSection],
  },
  {
    title: "One Large Section",
    description: "A tab that contains a single large section",
    sections: [largeSection],
  },
  {
    title: "Small Section",
    description: "A tab that contains a small section",
    sections: [
      {
        links: [sectionLink, sectionLink],
        title: "Section Title",
        subSections: [sectionSubSection, sectionSubSection],
        icon: <EcosystemIcon height="1em" width="1em" />,
      },
    ],
  },
]

export const navBarData: Omit<NavigationBarProps, "onDarkModeToggle"> = {
  menuItems: [
    {
      title: "Documentation",
      tabs,
    },
    {
      title: "Join Flow",
      cards: Array(3).fill(card),
      sections: Array(5).fill(section),
    },
    {
      title: "Network",
      sections: [largeSection],
    },
    {
      divider: true,
      title: "Flow.com",
      href: "https://flow.com",
    },
  ] as MenuItem[],
}
