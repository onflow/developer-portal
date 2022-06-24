import cadence from "./presets/cadence.json"
import fclJs from "./presets/fcl-js.json"
import kittyItems from "./presets/kitty-items.json"
import vscodeExtension from "./presets/vscode-extension.json"
import flowGoSdk from "./presets/flow-go-sdk.json"
import flowJsTesting from "./presets/flow-js-testing.json"
import dappDevelopment from "./presets/dapp-development.json"
import { RepoSchema } from "./repo-schema"
import { capitalCase } from "change-case"

/* Repository names and Flow internal content names */
const repositoryNames = [
  "flow",
  "cadence",
  "flow-cli",
  "flow-js-testing",
  "flow-go-sdk",
  "fcl-js",
  "flow-emulator",
  "flow-cadut",
  "mock-developer-doc",
] as const

export const flowContentNames = [
  "kitty-items",
  "vscode-extension",
  "dapp-development",
] as const

/* Sidebar presets for all repositories and content names */
export const schemas: Partial<Record<ContentName, RepoSchema>> = {
  cadence: cadence as RepoSchema,
  "fcl-js": fclJs as RepoSchema,
  "flow-go-sdk": flowGoSdk as RepoSchema,
  "flow-js-testing": flowJsTesting as RepoSchema,

  // flow content
  "kitty-items": kittyItems as RepoSchema,
  "vscode-extension": vscodeExtension as RepoSchema,
  "dapp-development": dappDevelopment as RepoSchema,
}

/* Overriden display names (defaults to dashes converted to spaces then capitalized) */
export const displayNames: Partial<Record<ContentName, string>> = {
  "flow-cli": "FLow CLI",
  "flow-js-testing": "Flow JS Testing",
  "flow-go-sdk": "Flow Go SDK",
  "fcl-js": "Flow Content Library JS",
  "vscode-extension": "VS Code Extension",
  "dapp-development": "DApp Development",
}

type RepoName = typeof repositoryNames[number]
type FlowContentName = typeof flowContentNames[number]
export type ContentName = RepoName | FlowContentName

export type ContentSpec = {
  repoName: string
  contentName: string
  displayName: string
  schema?: RepoSchema
}

export const contentSpecMap = [...repositoryNames, ...flowContentNames].reduce(
  (accum, name) => ({
    ...accum,
    [name]: {
      repoName: repositoryNames.includes(name as RepoName) ? name : "flow",
      contentName: name,
      displayName: displayNames[name] || capitalCase(name),
      schema: schemas[name],
    },
  }),
  {} as Record<ContentName, ContentSpec>
)

export function isRepo(name: string): name is RepoName {
  return (repositoryNames as Readonly<Array<string>>).includes(name)
}

export function isFlowContent(name: string): name is FlowContentName {
  return (flowContentNames as Readonly<Array<string>>).includes(name)
}

export function isContent(name: string): name is ContentName {
  return isRepo(name) || isFlowContent(name)
}

export const getContentSpec = (name: string) => {
  if (isContent(name)) {
    return contentSpecMap[name]
  }
  throw new Error(`Unknown name: ${name}`)
}
