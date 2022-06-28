import { capitalCase } from "change-case"
import { InternalLandingHeaderProps } from "../../ui/design-system/src/lib/Components/InternalLandingHeader"
import cadence from "./presets/cadence.json"
import dappDevelopment from "./presets/dapp-development.json"
import fclJs from "./presets/fcl-js.json"
import flowCli from "./presets/flow-cli.json"
import kittyItems from "./presets/kitty-items.json"
import vscodeExtension from "./presets/vscode-extension.json"
import flowGoSdk from "./presets/flow-go-sdk.json"
import flowJsTesting from "./presets/flow-js-testing.json"
import { RepoSchema } from "./repo-schema"
import { ToolName } from "../../ui/design-system/src/lib/Components/Internal/tools"

export const DEFAULT_REPO_OWNER = process.env.GITHUB_REPO_OWNER || "onflow"
export const DEFAULT_CONTENT_PATH = "docs"

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
  "flow-cli": flowCli as RepoSchema,
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
  "flow-cli": "Flow CLI",
  "flow-js-testing": "Flow JS Testing",
  "flow-go-sdk": "Flow Go SDK",
  "fcl-js": "Flow Content Library JS",
  "vscode-extension": "VS Code Extension",
  "dapp-development": "DApp Development",
}

export const contentTools: Partial<Record<ContentName, ToolName>> = {
  cadence: "cadence",
  "flow-cli": "cli",
  "flow-emulator": "emulator",
  "fcl-js": "fcl",
  "flow-js-testing": "testing",
  "vscode-extension": "vscode",
}

/**
 * Custom headers that can optionally be applied per-content section and will
 * be shown on the section's landing page.
 */
export const landingHeaders: Partial<
  Record<ContentName, InternalLandingHeaderProps>
> = {
  cadence: {
    toolName: "cadence",
    description:
      "Cadence is a resource-oriented programming language that introduces new features to smart contract programming that help developers ensure that their code is safe, secure, clear, and approachable. Some of these features are:",
    headerCards: [
      {
        title: "Key reference",
        tags: ["Tutorial"],
        description: "Lorem ipsum about this link",
        href: "/cadence/design-patterns",
      },
      {
        title: "Key reference",
        tags: ["Tutorial", "Cadence"],
        description: "Lorem ipsum about this link",
        href: "/cadence/anti-patterns",
      },
      {
        title: "Key reference",
        tags: ["Tutorial"],
        description: "Lorem ipsum about this link",
        href: "/cadence/migration-guide",
      },
    ],
  },
}

type RepoName = typeof repositoryNames[number]
type FlowContentName = typeof flowContentNames[number]
export type ContentName = RepoName | FlowContentName

export type ContentSpec = {
  /**
   * The name of the github owner of the repo.
   */
  owner: string

  /**
   * The name of the repo itself that contains the content data.
   */
  repoName: string

  /**
   * The branch to pull data from.
   */
  branch: string

  /**
   * The path within the repo where the  underlying content can be found
   * (typically "/docs", but may differ in some cases)
   */
  basePath: string

  contentName: ContentName

  displayName: string
  schema?: RepoSchema
  landingHeader?: InternalLandingHeaderProps
}

export const contentSpecMap = [...repositoryNames, ...flowContentNames].reduce(
  (accum, name) => ({
    ...accum,
    [name]: {
      owner: DEFAULT_REPO_OWNER,
      repoName: isFlowContent(name) ? "flow" : name,
      branch: "master",
      basePath: isFlowContent(name)
        ? `docs/content/${name}`
        : DEFAULT_CONTENT_PATH,
      contentName: name,
      displayName: displayNames[name] || capitalCase(name),
      schema: schemas[name],
      landingHeader: landingHeaders[name],
    },
  }),
  {} as Record<ContentName, ContentSpec>
)

export function isRepo(name: string): name is RepoName {
  return repositoryNames.includes(name as RepoName)
}

export function isFlowContent(name: string): name is FlowContentName {
  return flowContentNames.includes(name as FlowContentName)
}

export function isContent(name: string): name is ContentName {
  return isRepo(name) || isFlowContent(name)
}

export const getContentSpec = (name: string) => {
  if (isContent(name)) {
    return contentSpecMap[name]
  }
}
