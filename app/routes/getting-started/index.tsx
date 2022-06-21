import { MetaFunction } from "@remix-run/node"
import { getMetaTitle } from "~/root"
import { GettingStartedPage } from "~/ui/design-system/src/lib/Pages/GettingStartedPage"
import {
  contentNavigationItems,
  landingHeaderItems,
  linkCard2ColumnItems,
  linkCard3ColumnItems,
  recentArticleItems,
  recentToolItems,
  sdkCardItems,
} from "./data"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Getting Started"),
})

export default function Page() {
  return (
    <GettingStartedPage
      landingHeaderItems={landingHeaderItems}
      sdkCardItems={sdkCardItems}
      recentToolItems={recentToolItems}
      recentArticleItems={recentArticleItems}
      contentNavigationItems={contentNavigationItems}
      linkCard3ColumnItems={linkCard3ColumnItems}
      linkCard2ColumnItems={linkCard2ColumnItems}
    />
  )
}
