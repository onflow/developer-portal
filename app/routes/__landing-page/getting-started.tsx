import { MetaFunction } from "@remix-run/node"
import { getMetaTitle } from "~/root"
import { GettingStartedPage } from "~/ui/design-system/src/lib/Pages/GettingStartedPage"
import {
  contentNavigationListItems,
  landingHeaderItems,
  linkCard2ColumnItems,
  linkCard3ColumnItems,
  recentArticleItems,
  recentToolItems,
  sdkCardItems,
} from "~/cms/route-presets/getting-started/data"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Getting Started"),
})

export default function Page() {
  return (
    <GettingStartedPage
      editPageUrl="https://github.com/onflow/next-docs-v1/blob/main/app/routes/getting-started/data.tsx"
      landingHeaderItems={landingHeaderItems}
      sdkCardItems={sdkCardItems}
      recentToolItems={recentToolItems}
      recentArticleItems={recentArticleItems}
      contentNavigationListItems={contentNavigationListItems}
      linkCard3ColumnItems={linkCard3ColumnItems}
      linkCard2ColumnItems={linkCard2ColumnItems}
    />
  )
}
