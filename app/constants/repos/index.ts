import { capitalCase } from "change-case"
import { InternalLandingHeaderProps } from "../../ui/design-system/src/lib/Components/InternalLandingHeader"

// First Level: Individual Repo Presets
import cadence from "./first-route-presets/cadence.json"
import flowNFT from "./first-route-presets/flow-nft.json"
import flowFT from "./first-route-presets/flow-ft.json"
import nftStorefront from "./first-route-presets/nft-storefront.json"

// Second Level: Individual Repo Inner Content Presents
import cadenceLanguage from "./second-route-presets/cadence-language.json"
import fclJs from "./second-route-presets/fcl-js.json"
import flowCli from "./second-route-presets/flow-cli.json"
import kittyItems from "./second-route-presets/kitty-items.json"
import flowJsTesting from "./second-route-presets/flow-js-testing.json"
import flowGoSdk from "./second-route-presets/flow-go-sdk.json"
import cadenceTutorial from "./second-route-presets/cadence-tutorial.json"

// First Level: Flow Section Presets
import flow from "./first-route-presets/flow.json"
import learn from "./first-route-presets/learn.json"
import nodes from "./first-route-presets/nodes.json"
import community from "./first-route-presets/community.json"
import tools from "./first-route-presets/tools.json"

// Second Level: Flow Inner Content Presets
import concepts from "./second-route-presets/concepts.json"
import dappDevelopment from "./second-route-presets/dapp-development.json"
import coreContracts from "./second-route-presets/core-contracts.json"
import flowToken from "./second-route-presets/flow-token.json"
import fusd from "./second-route-presets/fusd.json"
import flowPort from "./second-route-presets/flow-port.json"
import nftMarketPlace from "./second-route-presets/nft-marketplace.json"
import staking from "./second-route-presets/staking.json"
import nodeOperation from "./second-route-presets/node-operation.json"
import vscodeExtension from "./second-route-presets/vscode-extension.json"
import emulator from "./second-route-presets/emulator.json"
import faq from "./second-route-presets/faq.json"

import { populateRepoSchema, RepoSchema } from "./repo-schema"
import {
  SECOND_ROUTES,
  FIRST_ROUTES,
  REPO_MAP,
  REPO_INNER_CONTENT_NAMES,
  FLOW_INNER_CONTENT_NAMES,
  FLOW_FIRST_ROUTES,
  REPO_NAMES,
  isSecondRoute,
} from "./contents-structure"
import { landingHeaders } from "./custom-headers"

export const DEFAULT_REPO_OWNER = "onflow"
export const DEFAULT_CONTENT_PATH = "docs"

/* Sidebar presets for all repositories and content names */
export const schemas: Partial<Record<string, RepoSchema>> = {
  // First Level: Individual repository ({repository}/...)
  cadence: cadence as RepoSchema,
  "flow-nft": flowNFT as RepoSchema,
  "flow-ft": flowFT as RepoSchema,
  "nft-storefront": nftStorefront as RepoSchema,

  // Second Level: Individual repository inner content schema (repository/{inner}/...)
  language: populateRepoSchema(cadenceLanguage as RepoSchema),
  "flow-cli": flowCli as RepoSchema,
  "fcl-js": fclJs as RepoSchema,
  "flow-go-sdk": flowGoSdk as RepoSchema,
  "flow-js-testing": flowJsTesting as RepoSchema,
  tutorial: populateRepoSchema(cadenceTutorial as RepoSchema),

  // First Level: Flow Repo Sections (flow/{section}/...)
  flow: flow as RepoSchema,
  learn: learn as RepoSchema,
  nodes: nodes as RepoSchema,
  tools: tools as RepoSchema,
  community: community as RepoSchema,

  // Second Level: Flow Inner Contents (flow/section/{inner}/...)
  "kitty-items": kittyItems as RepoSchema,
  "vscode-extension": vscodeExtension as RepoSchema,
  emulator: emulator as RepoSchema,
  concepts: concepts as RepoSchema,
  "dapp-development": dappDevelopment as RepoSchema,
  "core-contracts": coreContracts as RepoSchema,
  "flow-token": flowToken as RepoSchema,
  fusd: fusd as RepoSchema,
  faq: faq as RepoSchema,
  "node-operation": nodeOperation as RepoSchema,
  staking: staking as RepoSchema,
  "flow-port": flowPort as RepoSchema,
  "nft-marketplace": nftMarketPlace as RepoSchema,
}

/* Overriden display names (defaults to dashes converted to spaces then capitalized) */
export const displayNames: Partial<Record<string, string>> = {
  "flow-cli": "Flow CLI",
  "flow-js-testing": "Flow JS Testing",
  "flow-go-sdk": "Flow Go SDK",
  "fcl-js": "Flow Client Library (JS)",
  "vscode-extension": "VS Code Extension",
  "dapp-development": "DApp Development",
  "nft-marketplace": "NFT Marketplace",
  fusd: "FUSD",
  faq: "FAQ",
}

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

  contentName: string

  displayName: string
  schema?: RepoSchema
  landingHeader?: InternalLandingHeaderProps
}

function getBasePath(name: string) {
  var basePath = DEFAULT_CONTENT_PATH
  if (FLOW_FIRST_ROUTES.includes(name)) {
    basePath = `docs/content`
  } else if (FLOW_INNER_CONTENT_NAMES.includes(name)) {
    basePath = `docs/content/${name}`
  } else if (REPO_INNER_CONTENT_NAMES.includes(name)) {
    basePath = `docs/${name}`
  }
  return basePath
}

const getRepoName = (name: string) => {
  if (FLOW_FIRST_ROUTES.includes(name)) {
    return "flow"
  }
  if (REPO_NAMES.includes(name)) {
    return name
  }
  return REPO_MAP[name]!
}

const allRoutes: string[] = [...FIRST_ROUTES, ...SECOND_ROUTES]
export const contentSpecMap = allRoutes.reduce(
  (accum, name) => ({
    ...accum,
    [name]: {
      owner: DEFAULT_REPO_OWNER,
      repoName: getRepoName(name),
      branch: "master",
      basePath: getBasePath(name),
      contentName: name,
      displayName: displayNames[name] || capitalCase(name),
      schema: schemas[name],
      landingHeader: landingHeaders[name],
    },
  }),
  {} as Record<string, ContentSpec>
)

export const getContentSpec = (
  firstRoute: string,
  secondRoute?: string | undefined
) => {
  if (firstRoute) {
    if (secondRoute && isSecondRoute(secondRoute)) {
      return contentSpecMap[secondRoute]
    }
    return contentSpecMap[firstRoute]
  }
}
