import { SDKCardProps } from "~/ui/design-system/src/lib/Components/SDKCard"
import ToolCliIconSrc from "../../ui/design-system/images/tools/tool-cli.svg"
import ToolEmulatorIconSrc from "../../ui/design-system/images/tools/tool-emulator.svg"
import ToolFclIconSrc from "../../ui/design-system/images/tools/tool-fcl.svg"
import ToolTestingIconSrc from "../../ui/design-system/images/tools/tool-testing.svg"
import ToolVsCodeIconSrc from "../../ui/design-system/images/tools/tool-vscode.svg"
import ToolPortIconSrc from "../../ui/design-system/images/tools/tool-port.svg"
import CodeIcon from "../../ui/design-system/images/content/code.svg"

// Flow Dev Tools
const cliTool: SDKCardProps = {
  title: "CLI",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["documentation", "active", "required"],
  link: "https://docs.onflow.org/flow-cli/",
  stars: 171,
  iconSrc: ToolCliIconSrc,
  description:
    "Flow CLI brings Flow to your terminal. Easily interact with the network and build your dapps.",
}

const emulatorTool: SDKCardProps = {
  title: "Emulator",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["documentation", "active", "local-dev"],
  link: "https://docs.onflow.org/emulator/",
  stars: 62,
  iconSrc: ToolEmulatorIconSrc,
  description:
    "The Flow Emulator is a lightweight tool that emulates the behavior of the real Flow network. Packaged via CLI.",
}

const vsCodeTool: SDKCardProps = {
  title: "VS Code Extension",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["documentation", "active", "local-dev"],
  link: "https://github.com/onflow/vscode-cadence",
  stars: 33,
  iconSrc: ToolVsCodeIconSrc,
  description:
    "The Visual Studio Code extension for Cadence. Extensive features such as code generation, deploying contracts, and a lot more.",
}

const intellijTool: SDKCardProps = {
  title: "Intellij Cadence Plugin",
  authorIcon: "https://avatars.githubusercontent.com/u/92172623?s=200&v=4",
  authorName: "cadence-tools",
  tags: ["documentation"],
  link: "https://github.com/cadence-tools/cadence-for-intellij-platform",
  stars: 6,
  iconSrc: CodeIcon,
  description:
    "Support for Cadence, the resource-oriented smart contract language of Flow, in Intellij Platform IDEs.",
}

const commandLineLinter: SDKCardProps = {
  title: "Command Line Cadence Linter",
  authorIcon: "https://avatars.githubusercontent.com/u/76526021?s=200&v=4",
  authorName: "samatechtw",
  tags: ["documentation", "local-dev"],
  link: "https://github.com/samatechtw/cadence-lint",
  stars: 3,
  iconSrc: CodeIcon,
  description: "CLI linter for Cadence projects and files.",
}

const cdcWebpackPlugin: SDKCardProps = {
  title: "Cadence Linter",
  authorIcon: "https://avatars.githubusercontent.com/u/831220?s=200&v=4",
  authorName: "agencyenterprise",
  tags: ["javascript", "webpack", "cadence"],
  link: "https://github.com/agencyenterprise/cadence-webpack-plugin",
  stars: 6,
  iconSrc: CodeIcon,
  description: "Webpack plugin that helps importing Cadence files.",
}

const jsTestingLibTool: SDKCardProps = {
  title: "JS Testing Library",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["documentation", "active", "local-dev"],
  link: "https://docs.onflow.org/flow-js-testing/",
  stars: 38,
  iconSrc: ToolTestingIconSrc,
  description:
    "A Jest based framework to enable Cadence testing via a set of JavaScript methods and tools",
}

const cadutTool: SDKCardProps = {
  title: "Flow Cadut",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["documentation", "active"],
  link: "https://github.com/onflow/flow-cadut",
  stars: 13,
  iconSrc: CodeIcon,
  description:
    "Node based template generator to simplify interaction with Cadence files.",
}

const faucetTool: SDKCardProps = {
  title: "Faucet",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["service", "testnet"],
  link: "https://github.com/onflow/flow-cadut",
  stars: 13,
  iconSrc: "https://testnet-faucet.onflow.org/testnet-faucet-icon.svg",
  description: "Create and fund your testnet account with testnet FLOW.",
}
// SDKs
const fclSDK: SDKCardProps = {
  title: "Javascript SDK (FCL)",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["documentation", "active"],
  link: "https://github.com/onflow/fcl-js",
  stars: 268,
  iconSrc: ToolFclIconSrc,
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
  title: "Kotlin SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/80722240?s=200&v=4",
  authorName: "The NFT Company",
  tags: ["examples", "active"],
  link: "https://github.com/onflow/flow-jvm-sdk",
  stars: 11,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
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
}

const pythonSDK: SDKCardProps = {
  title: "Python SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/67895329?v=4",
  authorName: "janezpodhostnik",
  tags: ["documentation", "active"],
  link: "https://github.com/janezpodhostnik/flow-py-sdk",
  stars: 24,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
}

const dartSDK: SDKCardProps = {
  title: "Dart SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/3136647?s=48&v=4",
  authorName: "MaxStalker",
  tags: ["documentation", "active"],
  link: "https://github.com/MaxStalker/flow-dart-sdk",
  stars: 8,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
}

const rustSDK: SDKCardProps = {
  title: "Rust SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/43851243?s=48&v=4",
  authorName: "fee1-dead",
  tags: ["documentation"],
  link: "https://github.com/fee1-dead/flow.rs",
  stars: 5,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
}

const rubySDK: SDKCardProps = {
  title: "Ruby SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/1345497?s=200&v=4",
  authorName: "glucode",
  tags: ["documentation"],
  link: "https://github.com/glucode/flow_client",
  stars: 8,
  iconSrc:
    "https://raw.githubusercontent.com/glucode/flow_client/main/logo%402x.png",
}

const elixirSDK: SDKCardProps = {
  title: "Elixer SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/20113?s=48&v=4",
  authorName: "nkezhaya",
  tags: ["documentation"],
  link: "https://github.com/nkezhaya/on_flow",
  stars: 3,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg",
}

const swiftSDK: SDKCardProps = {
  title: "Swift SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/94294508?s=200&v=4",
  authorName: "Outblock",
  tags: ["documentation", "active"],
  link: "https://github.com/Outblock/flow-swift",
  stars: 5,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
}

const dotNetSDK: SDKCardProps = {
  title: ".NET SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/44845449?s=48&v=4",
  authorName: "tyronbrand",
  tags: ["documentation", "active"],
  link: "https://github.com/tyronbrand/flow.net",
  stars: 7,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
}

const phpSDK: SDKCardProps = {
  title: "PHP SDK",
  authorIcon: "https://avatars.githubusercontent.com/u/17953578?s=200&v=4",
  authorName: "mayvenstudios",
  tags: ["in-development"],
  link: "https://github.com/tyronbrand/flow.net",
  stars: 7,
  iconSrc:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg",
}

// Community Tools
const overflowTool: SDKCardProps = {
  title: "Overflow",
  authorIcon: "https://avatars.githubusercontent.com/u/10621?v=4",
  authorName: "bjartek",
  tags: ["Go", "testing", "cadence"],
  link: "https://github.com/bjartek/overflow",
  stars: 17,
  iconSrc: CodeIcon,
  description:
    "Test your Cadence logic with a go-based testing framework made specifically for Flow.",
}

const flowserTool: SDKCardProps = {
  title: "Flowser",
  authorIcon: "https://docs.flowser.dev/img/logo.svg",
  authorName: "onflowser",
  tags: ["GUI", "explorer", "local"],
  link: "https://docs.flowser.dev/",
  stars: 28,
  iconSrc: "https://docs.flowser.dev/img/logo.svg",
  description: `Flowser lets you inspect the current state of any flow blockchain network emulator, testnet, and mainnet.`,
}

// Explorers
const flowScanTool = {
  title: "Flowscan",
  tags: ["metrics", "lookup", "mainnet"],
  link: "https://flowscan.org/",
  iconSrc: "https://flowscan.org/images/flowscan-logo-only.svg",
  description: `Flowscan is a blockchain explorer that lets you browse all on-chain events, transactions, contracts, and accounts.`,
}

const flowViewSourceTool = {
  title: "Flow View Source",
  tags: ["lookup", "open-source"],
  authorIcon: "https://avatars.githubusercontent.com/u/1102494?s=48&v=4",
  authorName: "orodio",
  stars: 15,
  link: "https://github.com/orodio/flow-view-source",
  iconSrc: CodeIcon,
  description: `Flow view source is a blockchain explorer that's open sourced and connected to FCL for running transactions.`,
}

const bigDipperTool = {
  title: "Big Dipper",
  tags: ["metrics", "lookup", "mainnet"],
  link: "https://flow.bigdipper.live/",
  iconSrc: CodeIcon,
  description: `Big Dipper is a blockchain explorer that lets you browse all on-chain blocks, transactions, contracts, and accounts.`,
}

// oss services
const walletApiTool = {
  title: "Flow Wallet API",
  authorIcon: "https://avatars.githubusercontent.com/u/88199046?s=200&v=4",
  authorName: "flow-hydraulics",
  tags: ["Go", "api", "open-source", "documentation"],
  link: "https://github.com/flow-hydraulics/flow-wallet-api",
  stars: 30,
  iconSrc: CodeIcon,
  description:
    "Service for managing custodial and admin wallets on the Flow blockchain. Configurable with GCP and AWS KMS.",
}

const eventIndexingTool = {
  title: "Flow Scanner",
  authorIcon: "https://avatars.githubusercontent.com/u/93519414?s=200&v=4",
  authorName: "rayvin-flow",
  tags: ["typescript", "api", "open-source", "documentation"],
  link: "https://github.com/rayvin-flow/flow-scanner",
  stars: 9,
  iconSrc: CodeIcon,
  description:
    "Service that can monitor the Flow blockchain for one or more Cadence event types and broadcast them.",
}

const accountApiTool = {
  title: "Flow Account API",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "onflow",
  tags: ["go", "api"],
  link: "https://github.com/onflow/flow-account-api",
  stars: 3,
  iconSrc: CodeIcon,
  description:
    "API for non-custodial Flow wallets to create accounts and maintain a registry of public key to account address.",
}

const flowMarketplaceMonitorTool = {
  title: "Flow Event Monitor - Marketplace",
  authorIcon: "https://avatars.githubusercontent.com/u/20524533?s=48&v=4",
  authorName: "ph0ph0",
  tags: ["aws", "api", "documentation"],
  link: "https://github.com/ph0ph0/FlowMarketplaceEventMonitor",
  stars: 8,
  iconSrc: CodeIcon,
  description:
    "An AWS Cloudformation stack that listens to Flow events and stores them for querying.",
}

const alchemyAccessTool = {
  title: "Alchemy HTTP API",
  tags: ["api", "hosted", "monitoring"],
  link: "https://docs.alchemy.com/flow/",
  iconSrc: "https://res.cloudinary.com/apideck/icons/alchemy",
  description: `An API for the Flow Access Node and provides dashboard tools for debugging and monitoring.`,
}

const alchemyNFTTool = {
  title: "Alchemy Flow NFT API",
  tags: ["api", "hosted", "nfts"],
  link: "https://docs.alchemy.com/flow/documentation/flow-nft-apis",
  iconSrc: "https://res.cloudinary.com/apideck/icons/alchemy",
  description: `A NFT API to retrieve on and off chain metadata for all NFTs of a given account and more.`,
}

const graffleTool = {
  title: "Graffle",
  tags: ["api", "hosted", "webhooks"],
  link: "https://graffle.io/",
  iconSrc: "https://graffle.io/static/brand/logo_single.svg",
  description: `Hosted infrastructure and APIs to index, monitor and store on-chain events alongside other extensive features.`,
}

const flowPortTool = {
  title: "Flow Port",
  authorIcon: "https://avatars.githubusercontent.com/u/62387156?s=64&v=4",
  authorName: "mini flow",
  tags: ["Tool"],
  link: "https://port.onflow.org/",
  stars: 52,
  iconSrc: ToolPortIconSrc,
  description: "Your portal to the decentralized world of Flow.",
}

export {
  flowserTool,
  overflowTool,
  dotNetSDK,
  swiftSDK,
  rustSDK,
  rubySDK,
  elixirSDK,
  httpSDK,
  jvmSDK,
  goSDK,
  pythonSDK,
  phpSDK,
  dartSDK,
  fclSDK,
  cliTool,
  emulatorTool,
  jsTestingLibTool,
  cadutTool,
  faucetTool,
  flowScanTool,
  flowViewSourceTool,
  bigDipperTool,
  walletApiTool,
  eventIndexingTool,
  accountApiTool,
  flowMarketplaceMonitorTool,
  alchemyAccessTool,
  alchemyNFTTool,
  intellijTool,
  vsCodeTool,
  commandLineLinter,
  cdcWebpackPlugin,
  graffleTool,
  flowPortTool,
}
