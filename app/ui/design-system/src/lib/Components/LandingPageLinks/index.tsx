import { ReactComponent as DiscordIcon } from "../../../../images/social/discord"
import AppLink from "../AppLink"
import { GithubLinks, GithubLinksProps } from "./GithubLinks"

export type LandingPageLinksProps = {
  discordUrl: string
  editPageUrl?: string
  githubUrl: string
}

export const LandingPageLinks = ({
  discordUrl,
  editPageUrl,
  githubUrl,
}: LandingPageLinksProps) => {
  const links: GithubLinksProps["links"] = [
    { href: githubUrl, title: "All onflow repositories" },
  ]

  if (editPageUrl) {
    links.push({
      href: editPageUrl,
      title: "Edit this page",
    })
  }

  return (
    <div className="flex flex-col gap-4 text-center text-primary-gray-400 dark:text-white">
      <AppLink
        to={discordUrl}
        className="origin-left scale-150 hover:opacity-75"
        title="Discord"
      >
        <DiscordIcon />
      </AppLink>
      <GithubLinks links={links} />
    </div>
  )
}
