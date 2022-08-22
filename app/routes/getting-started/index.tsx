import { MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { getMetaTitle } from "~/root"
import { GettingStartedPage } from "~/ui/design-system/src/lib/Pages/GettingStartedPage"
import { refreshTools } from "../../cms/tools.server"
import * as staticData from "./data"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Getting Started"),
})

export const loader = async () => {
  await refreshTools(...staticData.recentToolItems, ...staticData.sdkCardItems)

  return {
    recentToolItems: staticData.recentToolItems,
    sdkCardItems: staticData.sdkCardItems,
  }
}

export default function Page() {
  const { sdkCardItems, recentToolItems } =
    useLoaderData<Awaited<ReturnType<typeof loader>>>()

  // The reason we're still accessing `staticData` directly in certain cases
  // is because we can't currently pass everything through the loader because
  // they include actual React component instances (icons, mainly).
  // So we'll need to refactor some things for those to work.
  // But we DO want to pass the tools through the loader because those could
  // potentially get updated by the `refreshTools` call.
  return (
    <GettingStartedPage
      editPageUrl="https://github.com/onflow/next-docs-v1/blob/main/app/routes/getting-started/data.tsx"
      landingHeaderItems={staticData.landingHeaderItems}
      sdkCardItems={sdkCardItems}
      recentToolItems={recentToolItems}
      recentArticleItems={staticData.recentArticleItems}
      contentNavigationListItems={staticData.contentNavigationListItems}
      linkCard3ColumnItems={staticData.linkCard3ColumnItems}
      linkCard2ColumnItems={staticData.linkCard2ColumnItems}
    />
  )
}
