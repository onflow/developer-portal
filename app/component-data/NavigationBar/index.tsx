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
  href: "/builders",
  ctaText: "Get Started",
  description: "New to Flow? Start here to understand and learn the basics.",
  imageHref:
    "https://www.dropbox.com/sh/5z8cfonblsycxj1/AACbXQwa8aFbgkM23GX5gnnSa?dl=0&preview=Asset+6%403x.png",
  title: "Get Started",
}

export const tabs: Tab[] = [
  {
    title: "Build",
    description: "Start developing dapps on Flow.",
    cards: Array(3).fill(card),
    sections: Array(5).fill(section),
  },
  {
    title: "Setup",
    description: "Connect to our networks or get started locally.",
    cards: [card],
    sections: [section, section, section, mediumSection],
  },
  {
    title: "Learn",
    description: "Understand how Flow works.",
    sections: [section, section, section, mediumSection],
  },
  {
    title: "Cadence",
    description: "Flow's smart contract programming language.",
    sections: [largeSection],
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
