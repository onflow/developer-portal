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
