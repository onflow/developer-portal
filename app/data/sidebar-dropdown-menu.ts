import { InternaSidebarDropdownMenuGroup } from "../ui/design-system/src/lib/Components/InternalSidebarDropdownMenu"

export const SIDEBAR_DROPDOWN_MENU: InternaSidebarDropdownMenuGroup[] = [
  {
    title: "Tools",
    items: [
      { title: "CLI", href: "/tools/flow-cli", icon: "flow-cli" },
      {
        title: "Flow Client Library",
        href: "/tools/fcl-js",
        icon: "fcl-js",
      },
      {
        title: "Go SDK",
        href: "/tools/flow-go-sdk",
        icon: "default",
      },
      { title: "HTTP API", href: "/http-api", icon: "default" },
      { title: "Emulator", href: "/tools/emulator", icon: "emulator" },
      {
        title: "VS Code Extension",
        href: "/tools/vscode-extension",
        icon: "vscode-extension",
      },
      { title: "All tools", href: "/tools", icon: "default" },
    ],
  },
  {
    title: "Learn",
    items: [
      { title: "Cadence", href: "/cadence", icon: "cadence" },
      {
        title: "Kitty Items",
        href: "/learn/kitty-items",
        icon: "default",
      },
      {
        title: "Concepts & Guides",
        href: "/learn/concepts",
        icon: "default",
      },
      { title: "All content", href: "/learn", icon: "default" },
    ],
  },
  {
    title: "Nodes",
    items: [
      {
        title: "Operation",
        href: "/nodes/node-operation",
        icon: "default",
      },
      { title: "Staking", href: "/nodes/staking", icon: "default" },
      {
        title: "Flow Port",
        href: "/nodes/flow-port",
        icon: "flow-port",
      },
      { title: "Flow Nodes", href: "/nodes", icon: "default" },
    ],
  },
]
