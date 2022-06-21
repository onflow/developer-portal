import SdkElixirIconSrc from "../../ui/design-system/images/sdk/elixir.svg"
import SdkGoIconSrc from "../../ui/design-system/images/sdk/go.svg"
import SdkNetIconSrc from "../../ui/design-system/images/sdk/net.svg"
import SdkRustIconSrc from "../../ui/design-system/images/sdk/rust.svg"
import SdkSwiftIconSrc from "../../ui/design-system/images/sdk/swift.svg"
import ToolCliIconSrc from "../../ui/design-system/images/tools/tool-cli.svg"
import ToolEmulatorIconSrc from "../../ui/design-system/images/tools/tool-emulator.svg"
import ToolFclIconSrc from "../../ui/design-system/images/tools/tool-fcl.svg"
import ToolPortIconSrc from "../../ui/design-system/images/tools/tool-port.svg"
import ToolTestingIconSrc from "../../ui/design-system/images/tools/tool-testing.svg"
import ToolVsCodeIconSrc from "../../ui/design-system/images/tools/tool-vscode.svg"
import { ToolsPageProps } from "../../ui/design-system/src/lib/Pages/ToolsPage"

import {
  flowScannerTool,
  flowserTool,
  overflowTool,
  dotNetSDK,
  swiftSDK,
  rustSDK,
  httpSDK,
  jvmSDK,
  goSDK,
  fclSDK,
} from "../../component-data/Tools"

export const data: ToolsPageProps = {
  tools: [
    {
      title: "Flow Port",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tool"],
      link: "#",
      stars: 52,
      iconSrc: ToolPortIconSrc,
      description:
        "Lorem ipsum text here can go a two liner sentence or a one liner",
    },
    {
      title: "Emulator",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tool"],
      link: "#",
      stars: 52,
      iconSrc: ToolEmulatorIconSrc,
      description:
        "Lorem ipsum text here can go a two liner sentence or a one liner",
    },
    {
      title: "CLI",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tool"],
      link: "#",
      stars: 52,
      iconSrc: ToolCliIconSrc,
      description:
        "Lorem ipsum text here can go a two liner sentence or a one liner",
    },
    {
      title: "VS Code Extension",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tool"],
      link: "#",
      stars: 52,
      iconSrc: ToolVsCodeIconSrc,
      description:
        "Lorem ipsum text here can go a two liner sentence or a one liner",
    },
    {
      title: "Flow Client Library",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tool"],
      link: "#",
      stars: 52,
      iconSrc: ToolFclIconSrc,
      description:
        "Lorem ipsum text here can go a two liner sentence or a one liner",
    },

    {
      title: "Testing Library",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tool"],
      link: "#",
      stars: 52,
      iconSrc: ToolTestingIconSrc,
      description:
        "Lorem ipsum text here can go a two liner sentence or a one liner",
    },
  ],
  sdks: [dotNetSDK, swiftSDK, rustSDK, httpSDK, jvmSDK, goSDK, fclSDK],
  contentNavigationItems: [
    {
      title: "Concepts",
      text: "Lorem ipsum dolor sit amet proin gravida lorem ipsum",
      link: "#",
      icon: "concepts",
    },
    {
      title: "Learn",
      text: "Lorem ipsum dolor sit amet proin gravida lorem ipsum",
      link: "#",
      icon: "learn",
    },
    {
      title: "Tools",
      text: "Lorem ipsum dolor sit amet proin gravida lorem ipsum",
      link: "#",
      icon: "tools",
    },
  ],
  apis: [
    {
      heading: "One liner",
      tags: ["Tool"],
      description: "An online contest that lorem ipsum ipsums ipsum",
      lastUpdated: "23/3/2022",
      level: "Beginners",
      imageUri:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/2560px-A_black_image.jpg",
      link: "/tutorials",
    },
    {
      heading: "Two liner sentence for this card",
      tags: ["Tool"],
      description: "An online contest that lorem ipsum ipsums ipsum",
      lastUpdated: "23/3/2022",
      level: "Beginners",
      imageUri:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/2560px-A_black_image.jpg",
      link: "/tutorials",
    },
    {
      heading: "One liner",
      tags: ["Tool"],
      description: "An online contest that lorem ipsum ipsums ipsum",
      lastUpdated: "23/3/2022",
      level: "Beginners",
      imageUri:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/2560px-A_black_image.jpg",
      link: "/tutorials",
    },
    {
      heading: "Two liner sentence for this card",
      tags: ["Tool"],
      description: "An online contest that lorem ipsum ipsums ipsum",
      lastUpdated: "23/3/2022",
      level: "Beginners",
      imageUri:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/2560px-A_black_image.jpg",
      link: "/tutorials",
    },
    {
      heading: "One liner",
      tags: ["Tool"],
      description: "An online contest that lorem ipsum ipsums ipsum",
      lastUpdated: "23/3/2022",
      level: "Beginners",
      imageUri:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/2560px-A_black_image.jpg",
      link: "/tutorials",
    },
    {
      heading: "Two liner sentence for this card",
      tags: ["Tool"],
      description: "An online contest that lorem ipsum ipsums ipsum",
      lastUpdated: "23/3/2022",
      level: "Beginners",
      imageUri:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/2560px-A_black_image.jpg",
      link: "/tutorials",
    },
  ],
}
