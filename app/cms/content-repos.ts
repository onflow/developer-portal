export const DEFAULT_BRANCH = "main"
export const DEFAULT_PATH = "docs"
export const DEFAULT_OWNER = "onflow"

type RepoName = string
type RepoOptions = {
  branch?: string
  path?: string
  owner?: string
}

const defaultOptions: RepoOptions = {
  branch: DEFAULT_BRANCH,
  path: DEFAULT_PATH,
  owner: DEFAULT_OWNER,
}

export const repos: Map<RepoName, RepoOptions> = new Map()

repos.set("flow", defaultOptions)
repos.set("cadence", defaultOptions)
repos.set("flow-cli", defaultOptions)
repos.set("flow-js-testing", defaultOptions)
repos.set("flow-go-sdk", defaultOptions)
repos.set("fcl-js", defaultOptions)
repos.set("flow-emulator", defaultOptions)
repos.set("kitty-items", defaultOptions)
repos.set("vscode-extension", defaultOptions)
repos.set("flow-port", defaultOptions)

export default repos
