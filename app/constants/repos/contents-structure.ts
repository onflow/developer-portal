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
export const REPOSITORY_STRUCTURE: Partial<Record<string, any>> = {
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

export const REPO_NAMES = Object.keys(REPOSITORY_STRUCTURE)
export const REPO_INNER_CONTENT_NAMES =
  Object.values(REPOSITORY_STRUCTURE).flat()
export const REPO_MAP = mapToKey(REPOSITORY_STRUCTURE)
export const FLOW_INNER_CONTENT_NAMES = REPOSITORY_STRUCTURE.flow!

/* Routing Structure */
export const FIRST_ROUTES = [
  "flow",
  "learn",
  "community",
  "tools",
  "cadence",
  "nodes",
] as const
export const SECOND_ROUTES = [
  "dapp-development",
  "concepts",
  "core-contracts",
  "flow-token",
  "fusd",
  "faq",
  "nft-marketplace",
  "vscode-extension",
  "emulator",
  "fcl-js",
  "flow-js-testing",
  "flow-go-sdk",
  "flow-cli",
  "node-operation",
  "staking",
  "flow-port",
  "kitty-items",
  "bounties",
  "language",
  "tutorial",
] as const

export type FirstRoute = typeof FIRST_ROUTES[number]
export type SecondRoute = typeof SECOND_ROUTES[number]

export const isFirstRoute = (name: string) => {
  let notReadOnlyCopy: string[] = [...FIRST_ROUTES]
  return notReadOnlyCopy.includes(name)
}

export const isSecondRoute = (name: string) => {
  let notReadOnlyCopy: string[] = [...SECOND_ROUTES]
  return notReadOnlyCopy.includes(name)
}

export const ROUTING_STRUCTURE: Partial<
  Record<FirstRoute, ReadonlyArray<SecondRoute>>
> = {
  flow: [
    "dapp-development",
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
  learn: ["kitty-items", "concepts"],
  community: ["bounties"],
  cadence: ["language", "tutorial"],
}
export const FLOW_FIRST_ROUTES = ["flow", "nodes"]
export const FIRST_ROUTE_MAP = mapToKey(ROUTING_STRUCTURE)
