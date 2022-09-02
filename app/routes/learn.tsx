import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import {
  allTutorials,
  architectureTutorials,
  cadenceHref,
  cadenceTutorials,
  contentNavigationListItems,
  editPageUrl,
  nftTutorials,
  secondaryNavSections,
  videos,
  youtubeHref,
} from "~/data/pages/learn"
import {
  LearnPage,
  LearnPageProps,
} from "~/ui/design-system/src/lib/Pages/LearnPage"
import { getCanonicalLinkDescriptor, getMetaTitle } from "~/utils/seo.server"
import { externalLinks } from "../data/external-links"

export const meta: MetaFunction = () => ({
  title: getMetaTitle("Learn"),
})

export const links: LinksFunction = () => [getCanonicalLinkDescriptor("/learn")]

export type LoaderData = Omit<LearnPageProps, "threeColumnItems">

export const loader: LoaderFunction = (): LoaderData => ({
  allTutorials,
  architectureTutorials,
  discordUrl: externalLinks.discord,
  discourseUrl: externalLinks.discourse,
  cadenceHref,
  cadenceTutorials,
  contentNavigationListItems,
  editPageUrl,
  githubUrl: externalLinks.github,
  nftTutorials,
  secondaryNavSections,
  twitterUrl: externalLinks.twitter,
  videos,
  youtubeHref,
})

export default function Page() {
  const data = useLoaderData<LoaderData>()

  return (
    <LearnPage
      allTutorials={data.allTutorials}
      architectureTutorials={data.architectureTutorials}
      cadenceHref={data.cadenceHref}
      cadenceTutorials={data.cadenceTutorials}
      contentNavigationListItems={data.contentNavigationListItems}
      discordUrl={data.discordUrl}
      discourseUrl={data.discourseUrl}
      editPageUrl={data.editPageUrl}
      githubUrl={data.githubUrl}
      nftTutorials={data.nftTutorials}
      secondaryNavSections={data.secondaryNavSections}
      twitterUrl={data.twitterUrl}
      videos={data.videos}
      youtubeHref={data.youtubeHref}
    />
  )
}
