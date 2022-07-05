/* Repository names and Flow internal content names */
export const repositoryNames = [
  "cadence",
  "flow-cli",
  "flow-js-testing",
  "flow-go-sdk",
  "fcl-js",
  "flow-emulator",
  "flow-cadut",
  "mock-developer-doc",
  "flow-nft",
  "flow-ft",
  "nft-storefront",
  "flow-emulator",
] as const

/* section : [ flow contents ..] */
export const flowContentStructure: Partial<Record<string, any>> = {
  flow: [
    "dapp-development",
    "concepts",
    "core-contracts",
    "flow-token",
    "fusd",
  ],
  tools: ["vscode-extension", "emulator"],
  faq: ["faq"],
  nodes: ["node-operation", "staking", "flow-port"],
  learn: ["kitty-items", "nft-marketplace"],
  community: ["bounties"],
} as const
export const flowContentNames = Object.values(flowContentStructure).flat()
export const flowSectionNames = Object.keys(flowContentStructure)

function mapContentSection() {
  var contentSectionMap: Partial<Record<ContentName, string>> = {}
  flowSectionNames.forEach((section: string) => {
    let contents = flowContentStructure[section]
    contents.forEach((content: string) => {
      contentSectionMap[content] = section
    })
  })
  return contentSectionMap
}
export const flowContentSectionMap = mapContentSection()

export type RepoName = typeof repositoryNames[number]
export type FlowSectionName = typeof flowSectionNames[number]
export type FlowContentName = typeof flowContentNames[number]
export type ContentName = RepoName | FlowSectionName | FlowContentName
