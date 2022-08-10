import { MenuItem } from "~/ui/design-system/src/lib/Components/NavigationBar/types"

import { NavigationBarProps } from "~/ui/design-system/src/lib/Components/NavigationBar"
import { Tab } from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import {
  buildTabData,
  setupTabData,
  learnTabData,
  cadenceTabData,
} from "./documentationTabData"
import { ConnectTabData, ContributeTabData } from "./communityTabData"
import { NetworkCards, NetworkSections } from "./networkTabData"

const documentationMenuData: Tab[] = [
  buildTabData,
  setupTabData,
  learnTabData,
  cadenceTabData,
]

export const communityTab: Tab[] = [ConnectTabData, ContributeTabData]

export const navBarData: Omit<NavigationBarProps, "onDarkModeToggle"> = {
  menuItems: [
    {
      title: "Documentation",
      tabs: documentationMenuData,
    },
    {
      title: "Community",
      tabs: communityTab,
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
