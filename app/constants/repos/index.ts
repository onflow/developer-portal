import cadence from "./presets/cadence.json"
import { RepoSchema } from "./repo-schema"

const repoList = [
  { org: "onflow", repo: "flow" },
  { org: "onflow", repo: "cadence" },
  { org: "onflow", repo: "flow-cli" },
  { org: "onflow", repo: "flow-js-testing" },
  { org: "onflow", repo: "flow-go-sdk" },
  { org: "onflow", repo: "fcl-js" },
  { org: "onflow", repo: "flow-emulator" },
  { org: "onflow", repo: "flow-cadut" },
  { org: "onflow", repo: "mock-developer-doc" },
]

type Repo = typeof repoList

const repoPresets: Partial<Record<Repo[number]["repo"], RepoSchema>> = {
  cadence: cadence as RepoSchema,
}

export { repoList, repoPresets }
