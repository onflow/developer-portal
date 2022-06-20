import cadence from "./presets/cadence.json"
import fclJs from "./presets/fcl-js.json"
import flow from "./presets/flow.json"
import flowGoSdk from "./presets/flow-go-sdk.json"
import flowJsTesting from "./presets/flow-js-testing.json"
import { RepoSchema } from "./repo-schema"

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
]

// Some documentations temporarily lives in the /flow/docs/contents repository
const flowContentNames = ["kitty-items", "vs-code-extension"]

const repoList = repositoryNames.map((repositoryName) => ({
  org: "onflow",
  repo: repositoryName,
}))

type Repo = typeof repoList

const repoPresets: Partial<Record<Repo[number]["repo"], RepoSchema>> = {
  flow: flow as RepoSchema,
  cadence: cadence as RepoSchema,
  "fcl-js": fclJs as RepoSchema,
  "flow-go-sdk": flowGoSdk as RepoSchema,
  "flow-js-testing": flowJsTesting as RepoSchema,
}

export { repoList, repoPresets }
