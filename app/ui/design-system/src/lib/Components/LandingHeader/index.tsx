import { ReactComponent as DiscordIcon } from "../../../../images/social/discord"
import { ReactComponent as GithubIcon } from "../../../../images/social/github"
import { DISCORD_URL, GITHUB_URL } from "../../constants"
import { ButtonLink } from "../Button"
import LandingImage from "../../../../images/misc/landing-home.png"

export type LandingHeaderProps = {
  buttonText: string
  buttonUrl: string
  callout: string
  description: string
  imageSrc?: string
  title: string
}

export const LandingHeaderLinks = () => (
  <div className="fixed right-14 top-1/4 hidden flex-col text-center text-primary-gray-400 dark:text-white lg:flex">
    <a
      href={DISCORD_URL}
      className="scale-150 pb-4 hover:opacity-75"
      target="_blank"
      rel="noreferrer"
      title="Discord"
    >
      <DiscordIcon />
    </a>
    <a
      href={GITHUB_URL}
      className="scale-150 hover:opacity-75"
      target="_blank"
      rel="noreferrer"
      title="GitHub"
    >
      <GithubIcon />
    </a>
  </div>
)

export function LandingHeader({
  buttonText,
  buttonUrl,
  callout,
  description,
  imageSrc = LandingImage,
  title,
}: LandingHeaderProps) {
  return (
    <div className="container mx-auto flex flex-col justify-items-stretch py-16 md:py-32">
      <h1 className="text-h1 mb-14 max-w-full overflow-hidden text-ellipsis !text-4xl md:mt-12 md:!text-7xl md:!leading-tight">
        {title}
      </h1>
      <div className="flex flex-row items-stretch rounded-lg bg-primary-gray-100/30">
        <div className="px-5 py-10 md:basis-1/2 md:px-20 md:py-12">
          <h2 className="text-h2 mb-2 md:mb-4">{callout}</h2>
          <p>{description}</p>
          <ButtonLink
            className="mt-4 mb-4 md:mt-12"
            href={buttonUrl}
            variant="primary-no-darkmode"
          >
            {buttonText}
          </ButtonLink>
        </div>
        <div className="hidden rounded-r-lg border bg-white px-10 py-6 dark:bg-white/40 md:block md:block md:basis-1/2 md:px-20 md:py-12">
          <img src={imageSrc} alt={title} />
        </div>
      </div>
      <LandingHeaderLinks />
    </div>
  )
}
