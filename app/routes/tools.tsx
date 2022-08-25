import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { data as staticData } from "~/data/pages/tools"
import { getMetaTitle } from "~/utils/seo"
import { refreshTools } from "../cms/tools.server"
import ToolsPage, {
  ToolsPageProps,
} from "../ui/design-system/src/lib/Pages/ToolsPage"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Tools"),
})

export type LoaderData = ToolsPageProps

export const loader: LoaderFunction = async (): Promise<ToolsPageProps> => {
  await refreshTools(
    ...staticData.apisAndServices,
    ...staticData.explorers,
    ...staticData.sdks,
    ...staticData.tools,
    ...staticData.wallets
  )
  return staticData
}

export default function Page() {
  const data = useLoaderData<ToolsPageProps>()

  return (
    <ToolsPage
      apisAndServices={data.apisAndServices}
      contentNavigationListItems={data.contentNavigationListItems}
      discordUrl={data.discordUrl}
      editPageUrl={data.editPageUrl}
      explorers={data.explorers}
      githubUrl={data.githubUrl}
      sdks={data.sdks}
      secondaryNavSections={data.secondaryNavSections}
      tools={data.tools}
      wallets={data.wallets}
    />
  )
}
