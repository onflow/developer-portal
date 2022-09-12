import {
  HtmlMetaDescriptor,
  json,
  LinkDescriptor,
  MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { DynamicLinksFunction } from "remix-utils"
import { data as staticData } from "~/data/pages/tools"
import { getCanonicalLinkDescriptor, getMetaTitle } from "~/utils/seo.server"
import { refreshTools } from "../cms/tools.server"
import ToolsPage, {
  ToolsPageProps,
} from "../ui/design-system/src/lib/Pages/ToolsPage"

export const handle: {
  dynamicLinks: DynamicLinksFunction<LoaderData>
} = { dynamicLinks: ({ data }) => data?.links || [] }

export const meta: MetaFunction = ({ data }: { data: LoaderData }) =>
  data?.meta || {}

export type LoaderData = ToolsPageProps & {
  links: LinkDescriptor[]
  meta: HtmlMetaDescriptor
}

export const loader = async () => {
  await refreshTools(
    ...staticData.apisAndServices,
    ...staticData.explorers,
    ...staticData.sdks,
    ...staticData.tools,
    ...staticData.wallets
  )
  return json<LoaderData>({
    ...staticData,
    links: [getCanonicalLinkDescriptor("/tools")],
    meta: {
      title: getMetaTitle("Tools"),
    },
  })
}

export default function Page() {
  const data = useLoaderData<typeof loader>()

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
