import { ReactComponent as Learn } from "../../../../images/page/flow-learn-icon"
import { ReactComponent as Quickstart } from "../../../../images/page/flow-quickstart-icon"
import { ReactComponent as Documentation } from "../../../../images/page/flow-documentation-icon"

export type HomepageStartItemIconsProps = {
  icon: string
}

export function HomepageStartItemIcons({ icon }: HomepageStartItemIconsProps) {
  switch (icon) {
    case "learn":
      return <Learn />
    case "quickstart":
      return <Quickstart />
    case "documentation":
      return <Documentation />
    default:
      throw new Error("Icon type not recognized")
  }
}
