import ToolsPage from "../../ui/design-system/src/lib/Pages/ToolsPage"
import { data } from "./data"

export default function Page() {
  return (
    <ToolsPage
      apis={data.apis}
      contentNavigationItems={data.contentNavigationItems}
      sdks={data.sdks}
      tools={data.tools}
    />
  )
}
