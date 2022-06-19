import { MenuItem } from "~/ui/design-system/src/lib/Components/NavigationBar/types"

import { NavigationBarProps } from "~/ui/design-system/src/lib/Components/NavigationBar"
import EcosystemIcon from "~/ui/design-system/images/content/ecosystem"
import { IntroCardProps } from "~/ui/design-system/src/lib/Components/NavigationBar/IntroCard"
import {
  Section,
  Tab,
} from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import {
  BuildTabData,
  SetupTabData,
  LearnTabData,
  CadenceTabData,
} from "./documentationTabData"
import { ConnectTabData, ContributeTabData } from "./joinFlowTabData"
import { NetworkCards, NetworkSections } from "./networkTabData"

export const sectionSubSection = {
  title: "Title Name",
  href: "#todo",
}

export const sectionLink = {
  title: "123",
  href: "#todo",
}

export const section: Section = {
  links: [
    {
      title: "View all SDKs",
      href: "#todo",
    },
    {
      title: "View all Tools",
      href: "#todo",
    },
  ],
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

export const documentationMenuData: Tab[] = [
  BuildTabData,
  SetupTabData,
  LearnTabData,
  CadenceTabData,
]

export const joinFlowMenuData: Tab[] = [ConnectTabData, ContributeTabData]

export const navBarData: Omit<NavigationBarProps, "onDarkModeToggle"> = {
  menuItems: [
    {
      title: "Documentation",
      tabs: documentationMenuData,
    },
    {
      title: "Join Flow",
      tabs: joinFlowMenuData,
    },
    {
      title: "Network",
      cards: NetworkCards,
      sections: NetworkSections,
    },
    {
      divider: true,
      title: "Flow.com",
      href: "https://flow.com",
    },
  ] as MenuItem[],
}
