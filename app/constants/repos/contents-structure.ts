function mapToKey(structure: Partial<Record<string, any>>) {
  var valueToKey: Partial<Record<string, string>> = {}

  Object.keys(structure).forEach((keyName: string) => {
    let valueContents = structure[keyName]
    valueContents.forEach((eachValue: string) => {
      valueToKey[eachValue] = keyName
    })
  })

  return valueToKey
}

/* Repository structure: repository/content/... */
export const repositoryStructure: Partial<Record<string, any>> = {
  cadence: ["language", "tutorial"],
  "flow-cli": [],
  "flow-js-testing": [],
  "flow-go-sdk": [],
  "fcl-js": [],
  "flow-cadut": [],
  "mock-developer-doc": [],
  "flow-nft": [],
  "flow-ft": [],
  "nft-storefront": [],
  flow: [
    "dapp-development",
    "concepts",
    "core-contracts",
    "flow-token",
    "fusd",
    "faq",
    "nft-marketplace",
    "vscode-extension",
    "node-operation",
    "staking",
    "flow-port",
    "kitty-items",
    "bounties",
    "emulator",
  ],
} as const

export const repoNames = Object.keys(repositoryStructure)
export const repoInnerContentNames = Object.values(repositoryStructure).flat()
export const repositoryMap = mapToKey(repositoryStructure)
export const flowInnerContents = repositoryStructure.flow!

export const routingStructure: Partial<Record<FirstRoute, any>> = {
  flow: [
    "dapp-development",
    "concepts",
    "core-contracts",
    "flow-token",
    "fusd",
    "faq",
    "nft-marketplace",
  ],
  tools: [
    "vscode-extension",
    "emulator",
    "fcl-js",
    "flow-js-testing",
    "flow-go-sdk",
    "flow-cli",
  ],
  nodes: ["node-operation", "staking", "flow-port"],
  learn: ["kitty-items"],
  community: ["bounties"],
  cadence: ["language", "tutorial"],
} as const

export const flowSections = ["flow", "nodes"]
export const firstRoutes = Object.keys(routingStructure)
export const secondRoutes = Object.values(routingStructure).flat()
export const firstRouteMap = mapToKey(routingStructure)

// The first routes are presets and not taken from the git repository structure
export type FirstRoute =
  | "flow"
  | "tools"
  | "nodes"
  | "learn"
  | "community"
  | "cadence"
