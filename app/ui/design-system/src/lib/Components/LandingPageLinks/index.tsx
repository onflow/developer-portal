import { DISCORD_URL, GITHUB_URL } from "../../../../../../constants"
import { ReactComponent as DiscordIcon } from "../../../../images/social/discord"
import AppLink from "../AppLink"
import { GithubLink, GithubLinks } from "./GithubLinks"

export type LandingPageLinksProps = {
  editPageUrl?: string
}

const MAIN_GITHUB_LINK: GithubLink = {
  href: GITHUB_URL,
  title: "All onflow repositories",
}

export const LandingPageLinks = ({ editPageUrl }: LandingPageLinksProps) => {
  const githubLink = editPageUrl && {
    href: editPageUrl,
    title: "Edit this page",
  }

  return (
    <div className="flex flex-col gap-4 text-center text-primary-gray-400 dark:text-white">
      <AppLink
        to={DISCORD_URL}
        className="origin-left scale-150 hover:opacity-75"
        title="Discord"
      >
        <DiscordIcon />
      </AppLink>
      <GithubLinks
        links={githubLink ? [MAIN_GITHUB_LINK, githubLink] : [MAIN_GITHUB_LINK]}
      />
    </div>
  )
}
