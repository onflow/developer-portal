import cadence from "./presets/cadence.json"
import fclJs from "./presets/fcl-js.json"
import kittyItems from "./presets/kitty-items.json"
import vscodeExtension from "./presets/vscode-extension.json"
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

const flowContentNames = ["kitty-items", "vscode-extension"]

const repoList = [...repositoryNames, ...flowContentNames].map(
  (repositoryName) => ({
    org: "onflow",
    repo: repositoryName,
  })
)

type Repo = typeof repoList

const flowContentPresets: Partial<Record<string, RepoSchema>> = {
  "kitty-items": kittyItems as RepoSchema,
  "vscode-extension": vscodeExtension as RepoSchema,
}

const repoPresets: Partial<Record<Repo[number]["repo"], RepoSchema>> = {
  cadence: cadence as RepoSchema,
  "fcl-js": fclJs as RepoSchema,
  "flow-go-sdk": flowGoSdk as RepoSchema,
  "flow-js-testing": flowJsTesting as RepoSchema,
}

export { repoList, repoPresets, flowContentNames, flowContentPresets }
