import { LearnPage } from "~/ui/design-system/src/lib/Pages/LearnPage"
import { data } from "./data"

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
