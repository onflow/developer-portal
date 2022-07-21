import { InternalLandingHeaderProps } from "~/ui/design-system/src/lib/Components/InternalLandingHeader"
import { ContentName } from "./contents-structure"

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
  "fcl-js": {
    toolName: "fcl-js",
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
}
