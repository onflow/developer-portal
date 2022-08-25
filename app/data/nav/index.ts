import { NavigationBarProps } from "~/ui/design-system/src/lib/Components/NavigationBar"
import {
  buildTabData,
  setupTabData,
  learnTabData,
  cadenceTabData,
} from "./documentationTabData"
import { ConnectTabData, ContributeTabData } from "./communityTabData"
import { NetworkCards, NetworkSections } from "./networkTabData"

export const nav: NavigationBarProps["menuItems"] = [
  {
    title: "Documentation",
    tabs: [buildTabData, setupTabData, learnTabData, cadenceTabData],
  },
  {
    title: "Community",
    tabs: [ConnectTabData, ContributeTabData],
  },
  {
    title: "Network",
    cards: NetworkCards,
    sections: NetworkSections,
  },
]
