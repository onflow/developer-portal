import { LoaderFunction } from "@remix-run/node"
import { LearnPage } from "~/ui/design-system/src/lib/Pages/LearnPage"
import { temporarilyRedirectToComingSoon } from "~/utils/features"
import { data } from "./data"

export const loader: LoaderFunction = () => {
  temporarilyRedirectToComingSoon()
  return {}
}

export default function Page() {
  return (
    <LearnPage
      videos={data.videos}
      nftTutorials={data.nftTutorials}
      cadenceHref={data.cadenceHref}
      allTutorials={data.allTutorials}
      cadenceTutorials={data.cadenceTutorials}
      youtubeHref={data.youtubeHref}
    />
  )
}
