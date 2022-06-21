import ToolsPage from "../../ui/design-system/src/lib/Pages/ToolsPage"
import { data } from "./data"

export default function Page() {
  return (
    <ToolsPage
      explorers={data.explorers}
      ossservices={data.ossservices}
      hostedApis={data.hostedApis}
      cadenceTools={data.cadenceTools}
      contentNavigationItems={data.contentNavigationItems}
      sdks={data.sdks}
      tools={data.tools}
    />
  )
}
