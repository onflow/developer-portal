import { LoaderFunction } from "@remix-run/server-runtime"
import ToolsPage, {
  ToolsPageProps,
} from "../../ui/design-system/src/lib/Pages/ToolsPage"
import SdkElixirIconSrc from "../../ui/design-system/images/sdk/elixir.svg"
import SdkGoIconSrc from "../../ui/design-system/images/sdk/go.svg"
import SdkNetIconSrc from "../../ui/design-system/images/sdk/net.svg"
import SdkRustIconSrc from "../../ui/design-system/images/sdk/rust.svg"
import SdkSwiftIconSrc from "../../ui/design-system/images/sdk/swift.svg"
import ToolPortIconSrc from "../../ui/design-system/images/tools/tool-port.svg"
import ToolCliIconSrc from "../../ui/design-system/images/tools/tool-cli.svg"
import ToolFclIconSrc from "../../ui/design-system/images/tools/tool-fcl.svg"
import ToolEmulatorIconSrc from "../../ui/design-system/images/tools/tool-emulator.svg"
import ToolVsCodeIconSrc from "../../ui/design-system/images/tools/tool-vscode.svg"
import ToolTestingIconSrc from "../../ui/design-system/images/tools/tool-testing.svg"
import { useLoaderData } from "@remix-run/react"

const loaderData: ToolsPageProps = {
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
      title: "Flow Client Lbrary",
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
  sdks: [
    {
      title: "Swift",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tool"],
      link: "#",
      stars: 52,
      iconSrc: SdkSwiftIconSrc,
      lastCommit: "22/3",
      lastRelease: "207",
    },
    {
      title: "Elixir",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tool"],
      link: "#",
      stars: 52,
      iconSrc: SdkElixirIconSrc,
      lastCommit: "22/3",
      lastRelease: "207",
    },
    {
      title: "Go",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tool"],
      link: "#",
      stars: 52,
      iconSrc: SdkGoIconSrc,
      lastCommit: "22/3",
      lastRelease: "207",
    },
    {
      title: "Rust",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tool"],
      link: "#",
      stars: 52,
      iconSrc: SdkRustIconSrc,
      lastCommit: "22/3",
      lastRelease: "207",
    },
    {
      title: ".Net",
      authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
      authorName: "mini flow",
      tags: ["Tool"],
      link: "#",
      stars: 52,
      iconSrc: SdkNetIconSrc,
      lastCommit: "22/3",
      lastRelease: "207",
    },
  ],
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

export const loader: LoaderFunction = async () => {
  return loaderData
}

export default function Page() {
  const data = useLoaderData<typeof loaderData>()
  return (
    <ToolsPage
      apis={data.apis}
      contentNavigationItems={data.contentNavigationItems}
      sdks={data.sdks}
      tools={data.tools}
    />
  )
}
