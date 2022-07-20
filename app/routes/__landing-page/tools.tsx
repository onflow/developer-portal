import { MetaFunction } from "@remix-run/node"
import { getMetaTitle } from "~/root"
import ToolsPage from "~/ui/design-system/src/lib/Pages/ToolsPage"
import { data } from "../../cms/route-presets/tools/data"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Tools"),
})

export default function Page() {
  return (
    <ToolsPage
      editPageUrl="https://github.com/onflow/next-docs-v1/blob/main/app/routes/tools/data.ts"
      explorers={data.explorers}
      apisAndServices={data.apisAndServices}
      contentNavigationListItems={data.contentNavigationListItems}
      sdks={data.sdks}
      tools={data.tools}
    />
  )
}
