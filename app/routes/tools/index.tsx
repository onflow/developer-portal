import { LoaderFunction } from "@remix-run/server-runtime"
import ToolsPage, {
  ToolsPageProps,
} from "../../ui/design-system/src/lib/Pages/ToolsPage"
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
      iconType: "port",
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
      iconType: "emulator",
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
      iconType: "cli",
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
      iconType: "emulator",
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
      iconType: "fcl",
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
      iconType: "testing",
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
      iconType: "swift",
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
      iconType: "elixir",
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
      iconType: "go",
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
      iconType: "rust",
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
      iconType: "net",
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
