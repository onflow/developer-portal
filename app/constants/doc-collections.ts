import { Repo } from "../cms/types"
import { InternalLandingHeaderProps } from "../ui/design-system/src/lib/Components/InternalLandingHeader"
import { SidebarItem } from "../ui/design-system/src/lib/Components/InternalSidebar"

/**
 * Represents the source location for a collection of documents.
 */
export interface DocCollectionSource extends Repo {
  /**
   * The root path of the docs for the current collection (typically "/docs")
   */
  rootPath: string
}

// intentionally avoiding ts Record type here, because the ts to json-schema
// generator doesn't work well with Record<string, ...> types
// https://github.com/YousefED/typescript-json-schema/issues/337
type Headers = { [key: string]: InternalLandingHeaderProps }
type Redirects = { [key: string]: string }
type Sidebars = { [key: string]: SidebarItem[] }

/**
 * A manifest descripting the doc collection and it's properties.
 */
export type DocCollectionManifest = {
  /**
   * The name of this collection to display to the end-user (i.e. for
   * breadcrumbs, headings, etc)
   */
  displayName: string

  /**
   * A mapping of paths to sidebars that should be rendered when a page is
   * within the given path. Paths should be relative to the doc collection root.
   * TODO: clarify how the sidebar is determined from a requested content path.
   */
  sidebars?: Sidebars

  /**
   * A mapping of paths and the headers they should render. Paths should
   * be relative to the doc collection root.
   */
  headers?: Headers

  /**
   * A mapping of paths that should be redirected. These should be relative
   * to the doc collection root.
   */
  redirects?: Redirects
}

export interface DocCollection {
  source: DocCollectionSource
  manifest: DocCollectionManifest
}

// TODO: Move this to a JSON file or files.

/**
 * NOTES:
 * - In general, paths should be relative to the root of the DocCollection. The
 *   root can be specified using an empty string.
 * - Sidebar items should be relative to the sidebar's location itself.
 */
export const docCollections: Record<string, DocCollection> = {
  /** cadence */
  cadence: {
    source: {
      owner: "onflow",
      name: "cadence",
      branch: "master",
      rootPath: "docs/",
    },
    manifest: {
      displayName: "Cadence",
      headers: {
        "": {
          icon: "cadence",
          title: "Cadence",
          description:
            "Cadence is a resource-oriented programming language that introduces new features to smart contract programming that help developers ensure that their code is safe, secure, clear, and approachable. Some of these features are:",
          headerCards: [
            {
              title: "Hello World!",
              tags: ["tutorial", "playground"],
              description:
                "Write and deploy your first smart contract within minutes on our Playground.",
              href: "/cadence/tutorial/02-hello-world",
            },
            {
              title: "Cadence Language",
              tags: ["reference", "syntax"],
              description:
                "Learn the functionality, terminology and syntax of the Cadence language.",
              href: "/cadence/language",
            },
            {
              title: "Solidity to Cadence Intro",
              tags: ["guide", "patterns"],
              description:
                "Learn the key differences in the account models between Solidity and Cadence.",
              href: "/cadence/msg-sender",
            },
          ],
        },
      },
      redirects: {
        language: "language/syntax",
        tutorial: "tutorial/01-first-steps",
      },
      sidebars: {
        "": [
          {
            title: "Developer Guides",
            items: [
              {
                title: "Introduction to Cadence",
                href: "",
              },
              {
                title: "Cadence Design Patterns",
                href: "design-patterns",
              },
              {
                title: "Contract Upgrades with Incompatible Changes",
                href: "contract-upgrades",
              },
              {
                title: "Cadence Anti-Patterns",
                href: "anti-patterns",
              },
              {
                title: "msg․sender Considered Harmful",
                href: "msg-sender",
              },
              {
                title: "Measuring Time in Cadence",
                href: "measuring-time",
              },
              {
                title: "Migration Guide",
                href: "migration-guide",
              },
              {
                title: "JSON-Cadence Data Interchange Format",
                href: "json-cadence-spec",
              },
            ],
          },
          {
            title: "Cadence",
            items: [
              {
                title: "Language Reference",
                href: "language",
              },
              {
                title: "Tutorial",
                href: "tutorial/02-hello-world",
              },
            ],
          },
        ],
        language: [
          {
            title: "Cadence Language",
            items: [
              { href: "syntax", title: "Syntax" },
              {
                href: "constants-and-variables",
              },
              { href: "type-annotations" },
              { href: "values-and-types" },
              { href: "operators" },
              { href: "functions" },
              { href: "control-flow" },
              { href: "scope" },
              { href: "type-safety" },
              { href: "type-inference" },
              { href: "composite-types" },
              { href: "resources" },
              { href: "access-control" },
              { href: "interfaces" },
              { href: "enumerations" },
              { href: "restricted-types" },
              { href: "references" },
              { href: "imports" },
              { href: "accounts" },
              {
                href: "capability-based-access-control",
              },
              { href: "contracts" },
              { href: "contract-updatability" },
              { href: "events" },
              { href: "core-events" },
              { href: "transactions" },
              { href: "run-time-types", title: "Run-time Types" },
              { href: "built-in-functions", title: "Built-in Functions" },
              { href: "environment-information" },
              { href: "crypto" },
              { href: "glossary" },
            ],
          },
        ],
        tutorial: [
          {
            title: "Cadence Language",
            items: [
              { href: "01-first-steps" },
              { href: "02-hello-world" },
              { href: "03-resources" },
              { href: "04-capabilities" },
              { href: "05-non-fungible-tokens-1" },
              { href: "05-non-fungible-tokens-2" },
              { href: "06-fungible-tokens" },
              { href: "07-marketplace-setup" },
              { href: "08-marketplace-compose" },
              { href: "09-voting" },
              { href: "10-resources-compose" },
            ],
          },
        ],
      },
    },
  },

  /** community */
  "community/bounties": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/bounties/",
    },
    manifest: {
      displayName: "Bounties",
      sidebars: {
        "": [
          {
            title: "Community",
            items: [
              {
                title: "Bug Bounty",
                href: "",
              },
              {
                title: "Responsible Disclosure",
                href: "responsible-disclosure",
              },
            ],
          },
        ],
      },
    },
  },

  /** flow */
  "flow/core-contracts": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/core-contracts/",
    },
    manifest: {
      displayName: "Core Contracts",
      sidebars: {
        "": [
          {
            title: "Flow Core Contracts",
            items: [
              {
                title: "Introduction",
                href: "",
              },
            ],
          },
          {
            title: "Core Contracts",
            items: [
              {
                title: "Fungible Token",
                href: "fungible-token",
              },
              {
                title: "Flow Token",
                href: "flow-token",
              },
              {
                title: "Flow Fees",
                href: "flow-fees",
              },
              {
                title: "Service Account",
                href: "service-account",
              },
              {
                title: "Staking Table",
                href: "staking-contract-reference",
              },
              {
                title: "Epoch Contracts",
                href: "epoch-contract-reference",
              },
            ],
          },
          {
            title: "Other Important Contracts",
            items: [
              {
                title: "Locked Tokens",
                href: "locked-tokens",
              },
              {
                title: "Staking Collection",
                href: "staking-collection",
              },
              {
                title: "Non-Fungible Token",
                href: "non-fungible-token",
              },
              {
                title: "NFT Metadata",
                href: "nft-metadata",
              },
            ],
          },
        ],
      },
    },
  },
  "flow/dapp-development": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/dapp-development",
    },
    manifest: {
      displayName: "DApp Development",
      sidebars: {
        "": [
          {
            title: "Dapp Development Guide",
            items: [
              {
                title: "Introduction",
                href: "",
              },
            ],
          },
          {
            title: "Building Your Dapp",
            items: [
              {
                title: "Anatomy of a Flow Dapp",
                href: "flow-dapp-anatomy",
              },
              {
                title: "User Accounts & Wallets",
                href: "user-accounts-and-wallets",
              },
              {
                title: "In-dapp Payments",
                href: "in-dapp-payments",
              },
              {
                title: "Smart Contracts",
                href: "smart-contracts",
              },
              {
                title: "Off-chain Infrastructure",
                href: "dapp-infrastructure",
              },
              {
                title: "Dapp Architecture on the Flow Blockchain",
                href: "DappArchitectures",
              },
              {
                title: "NFT Drop Strategies",
                href: "NFT-drop-styles",
              },
            ],
          },
          {
            title: "Deploying Your Dapp",
            items: [
              {
                title: "The Road to Mainnet",
                href: "deployment",
              },
              {
                title: "1. Smart Contract Testing",
                href: "contract-testing",
              },
              {
                title: "2. Testnet Deployment",
                href: "testnet-deployment",
              },
              {
                title: "3. Testnet Testing",
                href: "testnet-testing",
              },
              {
                title: "4. Mainnet Account Setup",
                href: "mainnet-account-setup",
              },
              {
                title: "5. Mainnet Deployment",
                href: "mainnet-deployment",
              },
            ],
          },
        ],
      },
    },
  },
  "flow/faq": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/faq/",
    },
    manifest: {
      displayName: "FAQ",
      redirects: {
        "": "backers",
      },
      sidebars: {
        "": [
          {
            title: "Frequently Asked Questions",
            items: [
              {
                title: "Users & Backers",
                href: "backers",
              },
              {
                title: "Builders & Developers",
                href: "developers",
              },
              {
                title: "Operators",
                href: "operators",
              },
            ],
          },
        ],
      },
    },
  },
  "flow/flow-ft": {
    source: {
      owner: "onflow",
      name: "flow-ft",
      branch: "master",
      rootPath: "docs/",
    },
    manifest: {
      displayName: "Flow FT",
      sidebars: {
        "": [
          {
            title: "Flow Fungible Token",
            items: [
              {
                title: "Overview",
                href: "overview",
              },
            ],
          },
        ],
      },
    },
  },
  "flow/flow-nft": {
    source: {
      owner: "onflow",
      name: "flow-nft",
      branch: "master",
      rootPath: "docs/",
    },
    manifest: {
      displayName: "Flow NFT",
      sidebars: {
        "": [
          {
            title: "Flow Non-Fungible Token",
            items: [
              {
                title: "Overview",
                href: "overview",
              },
            ],
          },
        ],
      },
    },
  },
  "flow/flow-token": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/flow-token/",
    },
    manifest: {
      displayName: "Flow Token",
      sidebars: {
        "": [
          {
            title: "Flow Token",
            items: [
              {
                title: "Introduction",
                href: "",
              },
            ],
          },
          {
            title: "Overview",
            items: [
              {
                title: "Flow Wallets",
                href: "available-wallets",
              },
              {
                title: "For Contributors",
                href: "earn",
              },
              {
                title: "Key Concepts",
                href: "concepts",
              },
              {
                title: "For Backers",
                href: "backers",
              },
              {
                title: "Claiming FLOW Tokens",
                href: "delivery",
              },
              {
                title: "Token Recipient FAQs",
                href: "faq",
              },
            ],
          },
          {
            title: "Token Delivery",
            items: [
              {
                title: "Locked/Leased FLOW Account Setup",
                href: "locked-account-setup",
              },
            ],
          },
        ],
      },
    },
  },
  "flow/fusd": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/fusd/",
    },
    manifest: {
      displayName: "FUSD",
      sidebars: {
        "": [
          {
            title: "FUSD",
            items: [
              {
                title: "Introduction",
                href: "",
              },
              {
                title: "Transactions & Scripts",
                href: "transactions",
              },
              {
                title: "Providers",
                href: "providers",
              },
            ],
          },
        ],
      },
    },
  },
  "flow/nft-marketplace": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/nft-marketplace/",
    },
    manifest: {
      displayName: "NFT Marketplace",
      sidebars: {
        "": [
          {
            title: "NFT Marketplace",
            items: [
              {
                title: "Overview",
                href: "",
              },
              {
                title: "Building Blocks",
                href: "building-blocks",
              },
              {
                title: "Best Practices",
                href: "best-practices",
              },
              {
                title: "Handling Accounts",
                href: "handling-accounts",
              },
              {
                title: "Minting NFTs",
                href: "minting-nfts",
              },
              {
                title: "Selling NFTs",
                href: "selling-nfts",
              },
            ],
          },
        ],
      },
    },
  },
  "flow/nft-storefront": {
    source: {
      owner: "onflow",
      name: "nft-storefront",
      branch: "master",
      rootPath: "docs/",
    },
    manifest: {
      displayName: "NFT Storefront",
      sidebars: {
        "": [
          {
            title: "NFT Storefront",
            items: [
              {
                title: "Overview",
                href: "overview",
              },
            ],
          },
        ],
      },
    },
  },

  /** learn */
  "learn/concepts": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/concepts/",
    },
    manifest: {
      displayName: "Concepts",
      sidebars: {
        "": [
          {
            title: "Flow",
            items: [
              {
                title: "Introduction",
                href: "",
              },
            ],
          },
          {
            title: "Concepts",
            items: [
              {
                title: "Accounts, Keys & Signing",
                href: "accounts-and-keys",
              },
              {
                title: "Signing a Transaction",
                href: "transaction-signing",
              },
              {
                title: "Segmented Transaction Fees",
                href: "variable-transaction-fees",
              },
              {
                title: "Storing Data",
                href: "storage",
              },
            ],
          },
        ],
      },
    },
  },
  "learn/kitty-items": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/kitty-items/",
    },
    manifest: {
      displayName: "Kitty Items",
      sidebars: {
        "": [
          {
            title: "Kitty Items",
            items: [
              {
                title: "Introduction",
                href: "",
              },
            ],
          },
          {
            title: "Tutorials",
            items: [
              {
                title: "Install",
                href: "install",
              },
              {
                title: "Modify",
                href: "modify",
              },
              {
                title: "Next Steps",
                href: "next-steps",
              },
              {
                title: "Start",
                href: "start",
              },
              {
                title: "Update",
                href: "update",
              },
            ],
          },
        ],
      },
    },
  },

  /** nodes */
  "nodes/flow-port": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/flow-port/",
    },
    manifest: {
      displayName: "Flow Port",
      sidebars: {
        "": [
          {
            title: "Flow Port",
            items: [
              {
                title: "How to Use Flow Port",
                href: "",
              },
            ],
          },
        ],
      },
    },
  },
  "nodes/node-operation": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/node-operation/",
    },
    manifest: {
      displayName: "Node Operation",
      sidebars: {
        "": [
          {
            title: "Overview",
            items: [
              {
                title: "Introduction",
                href: "",
              },
              {
                title: "Node Setup",
                href: "node-setup",
              },
              {
                title: "Node Roles",
                href: "node-roles",
              },
              {
                title: "Operator FAQs",
                href: "faq",
              },
            ],
          },
          {
            title: "Operator Guides",
            items: [
              {
                title: "Node Bootstrapping",
                href: "node-bootstrap",
              },
              {
                title: "Node Migration",
                href: "node-migration",
              },
              {
                title: "Machine Accounts for Existing Node Operators",
                href: "machine-existing-operator",
              },
              {
                title: "Database Encryption for Existing Node Operators",
                href: "db-encryption-existing-operator",
              },
              {
                title: "Node Monitoring",
                href: "monitoring-nodes",
              },
              {
                title: "Observer Node",
                href: "full-observer-node",
              },
              {
                title: "Spork Process",
                href: "spork",
              },
              {
                title: "Past Spork Info",
                href: "past-sporks",
              },
              {
                title: "Upcoming Sporks",
                href: "upcoming-sporks",
              },
            ],
          },
        ],
      },
    },
  },
  "nodes/staking": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/staking/",
    },
    manifest: {
      displayName: "Staking",
      sidebars: {
        "": [
          {
            title: "Overview",
            items: [
              {
                title: "Introduction",
                href: "",
              },
              {
                title: "Epoch and Reward Schedule",
                href: "schedule",
              },
              {
                title: "Stake Slashing",
                href: "stake-slashing",
              },
              {
                title: "FAQs",
                href: "faq",
              },
            ],
          },
          {
            title: "Technical Docs",
            items: [
              {
                title: "Epoch and Staking Terminology",
                href: "epoch-terminology",
              },
              {
                title: "Epoch Preparation Protocol",
                href: "epoch-preparation",
              },
              {
                title: "Epoch Scripts and Events",
                href: "epoch-scripts-events",
              },
              {
                title: "Staking Auction",
                href: "technical-overview",
              },
              {
                title: "Staking Scripts and Events",
                href: "staking-scripts-events",
              },
              {
                title: "QC and DKG",
                href: "qc-dkg",
              },
              {
                title: "QC/DKG Scripts and Events",
                href: "qc-dkg-scripts-events",
              },
              {
                title: "Machine Account",
                href: "machine-account",
              },
            ],
          },
          {
            title: "Technical Guides",
            items: [
              {
                title: "Technical Staking Options",
                href: "staking-options",
              },
              {
                title: "Staking Collection Guide",
                href: "staking-collection",
              },
            ],
          },
          {
            title: "Custody Providers",
            items: [
              {
                title: "Staking Using a Custody Provider",
                href: "custody-providers",
              },
            ],
          },
        ],
      },
    },
  },

  /** tools */
  "tools/emulator": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/emulator/",
    },
    manifest: {
      displayName: "Emulator",
      sidebars: {
        "": [
          {
            title: "Flow Emulator",
            items: [
              {
                title: "Introduction",
                href: "",
              },
            ],
          },
        ],
      },
    },
  },
  "tools/fcl-dev-wallet": {
    source: {
      owner: "onflow",
      name: "fcl-dev-wallet",
      branch: "master",
      rootPath: "docs/",
    },
    manifest: { displayName: "FCL Dev Wallet" },
  },
  "tools/fcl-js": {
    source: {
      owner: "onflow",
      name: "fcl-js",
      branch: "master",
      rootPath: "docs/",
    },
    manifest: {
      displayName: "Flow Client Library (JS)",
      headers: {
        "": {
          icon: "fcl-js",
          title: "Flow Client Library",
          description:
            "The Flow Client Library (FCL) JS is a package used to interact with user wallets and the Flow blockchain enabling dapps to support all FCL-compatible wallets and users without any custom integrations to the dapp code",
          headerCards: [
            {
              title: "Installation",
              tags: ["setup", "guide"],
              description:
                "Set up your local environment and install the necessary dependencies to start using FCL",
              href: "/tools/fcl-js#getting-started",
            },
            {
              title: "Flow App Quickstart",
              tags: ["tutorial", "dapp"],
              description:
                "A tutorial that will allow you to start building with web3 on the Flow blockchain and FCL",
              href: "/cadence/language/",
            },
            {
              title: "Wallet Discovery",
              tags: ["wallets", "reference"],
              description:
                "Learn more about integrating Flow compatible wallets with your dapp",
              href: "/tools/fcl-js/reference/discovery",
            },
          ],
        },
      },
      sidebars: {
        "": [
          {
            title: "Flow Client Library JS",
            items: [
              {
                title: "Introduction",
                href: "",
              },
            ],
          },
          {
            title: "Tutorials",
            items: [
              {
                title: "Flow App Quickstart",
                href: "tutorials/flow-app-quickstart",
              },
            ],
          },
          {
            title: "Reference",
            items: [
              {
                title: "API",
                href: "reference/api",
              },
              {
                title: "Authentication",
                href: "reference/authentication",
              },
              {
                title: "Configuring FCL",
                href: "reference/configure-fcl",
              },
              {
                title: "Discovery",
                href: "reference/discovery",
              },
              {
                title: "Proving Authentication",
                href: "reference/proving-authentication",
              },
              {
                title: "Scripts",
                href: "reference/scripts",
              },
              {
                title: "SDK Guidelines",
                href: "reference/sdk-guidelines",
              },
              {
                title: "Transactions",
                href: "reference/transactions",
              },
              {
                title: "User Signatures",
                href: "reference/user-signatures",
              },
            ],
          },
        ],
      },
    },
  },
  "tools/flow-cadut": {
    source: {
      owner: "onflow",
      name: "flow-cadut",
      branch: "master",
      rootPath: "docs/",
    },
    manifest: { displayName: "Flow Cadut" },
  },
  "tools/flow-cli": {
    source: {
      owner: "onflow",
      name: "flow-cli",
      branch: "master",
      rootPath: "docs/",
    },
    manifest: {
      displayName: "Flow CLI",
      sidebars: {
        "": [
          {
            title: "Flow CLI",
            items: [
              {
                title: "Introduction",
                href: "",
              },
              {
                title: "Installation",
                href: "install",
              },
            ],
          },
          {
            title: "Keys",
            items: [
              {
                title: "Generate Keys",
                href: "generate-keys",
              },
              {
                title: "Decode Keys",
                href: "decode-keys",
              },
            ],
          },
          {
            title: "Accounts",
            items: [
              {
                title: "Get an Account",
                href: "get-accounts",
              },
              {
                title: "Create an Account",
                href: "create-accounts",
              },
              {
                title: "Deploy a Contract",
                href: "account-add-contract",
              },
              {
                title: "Update a Contract",
                href: "account-update-contract",
              },
              {
                title: "Remove a Contract",
                href: "account-remove-contract",
              },
              {
                title: "Staking Info",
                href: "account-staking-info",
              },
            ],
          },
          {
            title: "Deployment",
            items: [
              {
                title: "Start Emulator",
                href: "start-emulator",
              },
              {
                title: "Add Project Contracts",
                href: "project-contracts",
              },
              {
                title: "Deploy a Project",
                href: "deploy-project-contracts",
              },
            ],
          },
          {
            title: "Scripts",
            items: [
              {
                title: "Execute a Script",
                href: "execute-scripts",
              },
            ],
          },
          {
            title: "Transactions",
            items: [
              {
                title: "Send a Transaction",
                href: "send-transactions",
              },
              {
                title: "Get a Transaction",
                href: "get-transactions",
              },
              {
                title: "Build a Transaction",
                href: "build-transactions",
              },
              {
                title: "Build a Complex Transaction",
                href: "complex-transactions",
              },
              {
                title: "Sign a Transaction",
                href: "send-transactions",
              },
              {
                title: "Send a Signed Transaction",
                href: "sign-transaction",
              },
              {
                title: "Decode a Transaction",
                href: "decode-transactions",
              },
            ],
          },
          {
            title: "flow.json",
            items: [
              {
                title: "Initialize Configuration",
                href: "initialize-configuration",
              },
              {
                title: "Configuration",
                href: "configuration",
              },
              {
                title: "Manage Configuration",
                href: "manage-configuration",
              },
              {
                title: "Security",
                href: "security",
              },
            ],
          },
          {
            title: "Get Flow Data",
            items: [
              {
                title: "Get Blocks",
                href: "get-blocks",
              },
              {
                title: "Get Events",
                href: "get-events",
              },
              {
                title: "Get Collections",
                href: "get-collections",
              },
              {
                title: "Get Network Status",
                href: "get-status",
              },
            ],
          },
          {
            title: "Utils",
            items: [
              {
                title: "Create App",
                href: "project-app",
              },
              {
                title: "Generate Signature",
                href: "signature-generate",
              },
              {
                title: "Verify Signature",
                href: "signature-verify",
              },
              {
                title: "Snapshot Save",
                href: "snapshot-save",
              },
            ],
          },
        ],
      },
    },
  },
  "tools/flow-go-sdk": {
    source: {
      owner: "onflow",
      name: "flow-go-sdk",
      branch: "master",
      rootPath: "docs/",
    },
    manifest: {
      displayName: "Flow Go SDK",
      sidebars: {
        "": [
          {
            title: "Flow Go SDK",
            items: [
              {
                title: "Getting Started",
                href: "",
              },
            ],
          },
        ],
      },
    },
  },
  "tools/flow-js-testing": {
    source: {
      owner: "onflow",
      name: "flow-js-testing",
      branch: "master",
      rootPath: "docs/",
    },
    manifest: {
      displayName: "Flow JS Testing",
      sidebars: {
        "": [
          {
            title: "Flow Javscript Testing",
            items: [
              {
                title: "Introduction",
                href: "",
              },
              {
                title: "Accounts",
                href: "accounts",
              },
              {
                title: "API",
                href: "api",
              },
              {
                title: "Contracts",
                href: "contracts",
              },
              {
                title: "Emulator",
                href: "emulator",
              },
              {
                title: "Executing Scripts",
                href: "execute-scripts",
              },
              {
                title: "Flow Token",
                href: "flow-token",
              },
              {
                title: "Generator",
                href: "generator",
              },
              {
                title: "Init Framework",
                href: "init",
              },
              {
                title: "Installation",
                href: "install",
              },
              {
                title: "Jest Helpers",
                href: "jest-helpers",
              },
              {
                title: "Sending Transactions",
                href: "send-transactions",
              },
              {
                title: "Structure",
                href: "structure",
              },
              {
                title: "Templates",
                href: "templates",
              },
              {
                title: "Types",
                href: "types",
              },
            ],
          },
        ],
      },
    },
  },
  "tools/vscode-extension": {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/vscode-extension/",
    },
    manifest: {
      displayName: "VS Code Extension",
      sidebars: {
        "": [
          {
            title: "Cadence VS Code Extension",
            items: [
              {
                title: "Introduction",
                href: "",
              },
            ],
          },
        ],
      },
    },
  },
  flow: {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/flow/",
    },
    manifest: {
      displayName: "Flow",
      sidebars: {
        "": [
          {
            title: "Flow",
            items: [
              {
                title: "DApp Development",
                href: "dapp-development",
              },
              {
                title: "Core Contracts",
                href: "core-contracts",
              },
              {
                title: "Flow Token",
                href: "flow-token",
              },
              {
                title: "FUSD",
                href: "fusd",
              },
              {
                title: "NFT Marketplace",
                href: "nft-marketplace",
              },
            ],
          },
          {
            title: "Building Your Dapp",
            items: [
              {
                title: "Flow FAQ",
                href: "faq",
              },
              {
                title: "User Accounts & Wallets",
                href: "dapp-development/user-accounts-and-wallets",
              },
              {
                title: "In-dapp Payments",
                href: "dapp-development/in-dapp-payments",
              },
              {
                title: "Smart Contracts",
                href: "dapp-development/smart-contracts",
              },
              {
                title: "Off-chain Infrastructure",
                href: "dapp-development/dapp-infrastructure",
              },
              {
                title: "Dapp Architecture on the Flow Blockchain",
                href: "dapp-development/DappArchitectures",
              },
              {
                title: "NFT Drop Strategies",
                href: "dapp-development/NFT-drop-styles",
              },
            ],
          },
          {
            title: "Deploying Your Dapp",
            items: [
              {
                title: "The Road to Mainnet",
                href: "dapp-development/deployment",
              },
              {
                title: "1. Smart Contract Testing",
                href: "dapp-development/contract-testing",
              },
              {
                title: "2. Testnet Deployment",
                href: "dapp-development/testnet-deployment",
              },
              {
                title: "3. Testnet Testing",
                href: "dapp-development/testnet-testing",
              },
              {
                title: "4. Mainnet Account Setup",
                href: "dapp-development/mainnet-account-setup",
              },
              {
                title: "5. Mainnet Deployment",
                href: "dapp-development/mainnet-deployment",
              },
            ],
          },
        ],
      },
    },
  },
  nodes: {
    source: {
      owner: "onflow",
      name: "flow",
      branch: "master",
      rootPath: "docs/content/nodes/",
    },
    manifest: {
      displayName: "Flow Nodes",
      sidebars: {
        "": [
          {
            title: "Overview",
            items: [
              {
                title: "Introduction",
                href: "",
              },
              {
                title: "Node Setup",
                href: "node-operation/node-setup",
              },
              {
                title: "Node Roles",
                href: "node-operation/node-roles",
              },
              {
                title: "Operator FAQs",
                href: "node-operation/faq",
              },
            ],
          },
          {
            title: "Operator Guides",
            items: [
              {
                title: "Node Bootstrapping",
                href: "node-operation/node-bootstrap",
              },
              {
                title: "Node Migration",
                href: "node-operation/node-migration",
              },
              {
                title: "Machine Accounts for Existing Node Operators",
                href: "node-operation/machine-existing-operator",
              },
              {
                title: "Database Encryption for Existing Node Operators",
                href: "node-operation/db-encryption-existing-operator",
              },
              {
                title: "Node Monitoring",
                href: "node-operation/monitoring-nodes",
              },
              {
                title: "Observer Node",
                href: "node-operation/full-observer-node",
              },
              {
                title: "Spork Process",
                href: "node-operation/spork",
              },
              {
                title: "Past Spork Info",
                href: "node-operation/past-sporks",
              },
              {
                title: "Upcoming Sporks",
                href: "node-operation/upcoming-sporks",
              },
            ],
          },
        ],
      },
    },
  },
}
