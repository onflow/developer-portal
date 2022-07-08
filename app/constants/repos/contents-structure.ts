/* Repository structure: repository/content/... */
export const repositoryStructure: Partial<Record<string, any>> = {
  cadence: ["language", "tutorial"],
  "flow-cli": [],
  "flow-js-testing": [],
  "flow-go-sdk": [],
  "fcl-js": [],
  "flow-emulator": [],
  "flow-cadut": [],
  "mock-developer-doc": [],
  "flow-nft": [],
  "flow-ft": [],
  "nft-storefront": [],
} as const
export const repositoryNames = Object.keys(repositoryStructure) // First
export const repositoryContentNames = Object.values(repositoryStructure).flat() // Second

function mapToFirstRoute(
  structure: Partial<Record<string, any>>,
  firstRouteNames: string[]
) {
  var secondToFirstRoute: Partial<Record<ContentName, string>> = {}

  firstRouteNames.forEach((firstRouteName: string) => {
    let secondRouteContents = structure[firstRouteName]
    secondRouteContents.forEach((secondRouteName: string) => {
      secondToFirstRoute[secondRouteName] = firstRouteName
    })
  })

  return secondToFirstRoute
}
export const repositoryMap = mapToFirstRoute(
  repositoryStructure,
  repositoryNames
)

/* Flow Content Structure: (flow/)section/content/... */
export const flowContentStructure: Partial<Record<string, any>> = {
  flow: [
    "dapp-development",
    "concepts",
    "core-contracts",
    "flow-token",
    "fusd",
    "faq",
  ],
  tools: ["vscode-extension", "emulator"],
  nodes: ["node-operation", "staking", "flow-port"],
  learn: ["kitty-items", "nft-marketplace"],
  community: ["bounties"],
} as const
export const flowSectionNames = Object.keys(flowContentStructure) // First
export const flowContentNames = Object.values(flowContentStructure).flat() // Second
export const flowContentSectionMap = mapToFirstRoute(
  flowContentStructure,
  flowSectionNames
)

export type RepoName = typeof repositoryNames[number]
export type FlowSectionName = typeof flowSectionNames[number]
export type FlowContentName = typeof flowContentNames[number]
export type ContentName = RepoName | FlowSectionName | FlowContentName
