import { GettingStartedPage } from "~/ui/design-system/src/lib/Pages/GettingStartedPage"
import {
  contentNavigationItems,
  recentArticleItems,
  recentToolItems,
  sdkCardItems,
  linkCard2ColumnItems,
  linkCard3ColumnItems,
  landingHeaderItems,
} from "./data"

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
