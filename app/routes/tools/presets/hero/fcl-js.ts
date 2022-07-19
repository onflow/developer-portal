import { InternalLandingHeaderProps } from "~/ui/design-system/src/lib/Components/InternalLandingHeader"

export const landingHeaders: Partial<Record<any, InternalLandingHeaderProps>> =
  {
    "fcl-js": {
      toolName: "fcl-js",
      description:
        "Cadence is a resource-oriented programming language that introduces new features to smart contract programming that help developers ensure that their code is safe, secure, clear, and approachable. Some of these features are:",
      headerCards: [
        {
          title: "Hello World!",
          tags: ["tutorial", "playground"],
          description:
            "Write and deploy your first smart contract within minutes on our Playground.",
          href: "/cadence/tutorial/02-hello-world/",
        },
        {
          title: "FCL",
          tags: ["reference", "syntax"],
          description:
            "Learn the functionality, terminology and syntax of the Cadence language.",
          href: "/cadence/language/",
        },
        {
          title: "Solidity to Cadence Intro",
          tags: ["guide", "patterns"],
          description:
            "Learn the key differences in the account models between Solidity and Cadence.",
          href: "/cadence/msg-sender/",
        },
      ],
    },
  }
