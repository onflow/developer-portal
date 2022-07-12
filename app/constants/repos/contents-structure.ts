function mapToKey(structure: Partial<Record<string, any>>, keys: string[]) {
  var valueToKey: Partial<Record<ContentName, string>> = {}

  keys.forEach((keyName: string) => {
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
  // "flow-emulator": [],
  "flow-cadut": [],
  "mock-developer-doc": [],
  "flow-nft": [],
  "flow-ft": [],
  "nft-storefront": [],
  flow: [
    // Inner contents of the 'flow' repository
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
export const repositoryMap = mapToKey(repositoryStructure, repoNames)
export const flowInnerContents: string[] = repositoryStructure.flow

export const routingStructure: Partial<Record<string, any>> = {
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
export const firstRoutes = Object.keys(routingStructure) // First
export const secondRoutes: Array<string> =
  Object.values(routingStructure).flat() // Second
export const firstRouteMap = mapToKey(routingStructure, firstRoutes)

export type FirstRoute = typeof firstRoutes[number]
export type SecondRoute = typeof secondRoutes[number]
export type ContentName = FirstRoute | SecondRoute
