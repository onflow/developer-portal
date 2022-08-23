import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getMetaTitle } from "~/root"
import ToolsPage from "../../ui/design-system/src/lib/Pages/ToolsPage"
import { data as staticData } from "./data"
import { refreshTools } from "../../cms/tools.server"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Tools"),
})

export const loader: LoaderFunction = async () => {
  await refreshTools(
    ...staticData.tools,
    ...staticData.wallets,
    ...staticData.sdks,
    ...staticData.apisAndServices,
    ...staticData.explorers
  )
  return staticData
}

export default function Page() {
  const data = useLoaderData<typeof staticData>()

  return (
    <ToolsPage
      editPageUrl="https://github.com/onflow/developer-portal/blob/main/app/routes/tools/data.ts"
      explorers={data.explorers}
      apisAndServices={data.apisAndServices}
      contentNavigationListItems={data.contentNavigationListItems}
      sdks={data.sdks}
      tools={data.tools}
      wallets={data.wallets}
    />
  )
}
