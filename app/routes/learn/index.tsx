import { LoaderFunction, MetaFunction } from "@remix-run/node"
import { getMetaTitle } from "~/root"
import { LearnPage } from "~/ui/design-system/src/lib/Pages/LearnPage"
import { data } from "./data"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Learn"),
})

export const loader: LoaderFunction = () => {
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
      architectureTutorials={data.architectureTutorials}
    />
  )
}
