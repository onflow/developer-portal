import { SDKCardProps } from "~/ui/design-system/src/lib/Components/SDKCard"
import { ToolCardProps } from "~/ui/design-system/src/lib/Components/ToolCard"

// Flow Dev Tools
const CLI: SDKCardProps = {
  title: "FCL SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["documentation", "active"],
  link: "https://github.com/onflow/fcl-js",
  stars: 268,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
}

// SDKs
const fclSDK: SDKCardProps = {
  title: "FCL SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["documentation", "active"],
  link: "https://github.com/onflow/fcl-js",
  stars: 268,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
}

const goSDK: SDKCardProps = {
  title: "Go SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["documentation", "active"],
  link: "https://github.com/onflow/flow-go-sdk",
  stars: 186,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
}

const jvmSDK: SDKCardProps = {
  title: "JVM SDK",
  authorIcon:
    "https://onunblocked.com/_next/static/media/logo-unblocked-by-nftco.8d69dd0c.svg",
  authorName: "The NFT Company",
  tags: ["active"],
  link: "https://github.com/onflow/flow-jvm-sdk",
  stars: 52,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
}

const httpSDK: SDKCardProps = {
  title: "HTTP API",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["active", "documentation"],
  link: "https://docs.onflow.org/http-api/",
  stars: 417,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  description: "This is a sample.",
}

const rustSDK: SDKCardProps = {
  title: "Rust",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "mini flow",
  tags: ["Tags"],
  link: "#",
  stars: 52,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
}

const swiftSDK: SDKCardProps = {
  title: "Swift",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "mini flow",
  tags: ["documentation", "active"],
  link: "#",
  stars: 52,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
}

const dotNetSDK: SDKCardProps = {
  title: ".NET",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "mini flow",
  tags: ["documentation", "active"],
  link: "https://github.com/tyronbrand/flow.net",
  stars: 52,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
}

// Community Tools

const overflowTool: ToolCardProps = {
  title: "Overflow",
  authorIcon: "https://avatars.githubusercontent.com/u/10621?v=4",
  authorName: "bjartek",
  tags: ["Go", "testing", "cadence"],
  link: "https://github.com/bjartek/overflow",
  stars: 17,
  iconSrc: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  description:
    "Test your Cadence logic with a go-based testing framework made specifically for Flow.",
}

const flowScannerTool: ToolCardProps = {
  title: "Flow Scanner",
  authorIcon: "https://avatars.githubusercontent.com/u/93519414?s=200&v=4",
  authorName: "mini flow",
  tags: ["events", "indexing"],
  link: "#",
  stars: 9,
  iconSrc: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  description: `A standalone service that can monitor the Flow blockchain for one or more Cadence event types and 
      broadcast those events to one or more consumers.`,
}

const flowserTool: ToolCardProps = {
  title: "Flowser",
  authorIcon: "https://docs.flowser.dev/img/logo.svg",
  authorName: "onflowser",
  tags: ["GUI", "explorer", "local"],
  link: "https://docs.flowser.dev/",
  stars: 28,
  iconSrc: "https://docs.flowser.dev/img/logo.svg",
  description: `Flowser lets you inspect the current state of any flow blockchain network (emulator, testnet, mainnet,..) and
        it also manages the Flow emulator"`,
}

export {
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
}
