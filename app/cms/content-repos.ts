export const DEFAULT_REPO_OWNER = "onflow"
export const DEFAULT_CONTENT_PATH = "docs"

type RepoContentSpec = {
  owner: string
  contentPath?: string
  branch?: string
}

const repos: Partial<Record<string, RepoContentSpec>> = {
  flow: {
    owner: "onflow",
  },
  cadence: {
    owner: "onflow",
  },
  "flow-cli": {
    owner: "onflow",
  },
  "flow-js-testing": {
    owner: "onflow",
  },
  "flow-go-sdk": {
    owner: "onflow",
  },
  "fcl-js": {
    owner: "onflow",
  },
  "flow-emulator": {
    owner: "onflow",
  },
  "kitty-items": {
    owner: "onflow",
  },
  "vscode-extension": {
    owner: "onflow",
  },
  "flow-port": {
    owner: "onflow",
  },
  "core-contracts": {
    owner: "onflow",
  },
}

export default repos
