import { ReactComponent as Bug } from "../../../../images/page/bug"
import { ReactComponent as Community } from "../../../../images/page/community"
import { ReactComponent as Concepts } from "../../../../images/page/concepts"
import { ReactComponent as Funding } from "../../../../images/page/funding"
import { ReactComponent as GettingStarted } from "../../../../images/page/get-started"
import { ReactComponent as Learn } from "../../../../images/page/learn"
import { ReactComponent as Tools } from "../../../../images/page/tools"

export type ContentNavigationIconProps = {
  icon:
    | "bug"
    | "community"
    | "concepts"
    | "funding"
    | "get-started"
    | "learn"
    | "tools"
}

export function ContentNavigationIcon({ icon }: ContentNavigationIconProps) {
  switch (icon) {
    case "bug":
      return <Bug />
    case "community":
      return <Community />
    case "concepts":
      return <Concepts />
    case "funding":
      return <Funding />
    case "get-started":
      return <GettingStarted />
    case "learn":
      return <Learn />
    case "tools":
      return <Tools />
    default:
      throw new Error("Icon type not recognized")
  }
}
