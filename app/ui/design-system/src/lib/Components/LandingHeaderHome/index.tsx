import LandingImage from "../../../../images/misc/landing-home.png"
import { LandingHeaderContainer } from "../LandingHeader/LandingHeaderContainer"
import { ReactComponent as DiscordIcon } from "../../../../images/social/discord"
import { ReactComponent as GithubIcon } from "../../../../images/social/github"
import { GITHUB_URL, DISCORD_URL } from "../../constants"

export type LandingHeaderHomeProps = {
  description: string
  tag: string
  title: string
}

export function LandingHeaderHome({
  description,
  tag,
  title,
}: LandingHeaderHomeProps) {
  return (
    <LandingHeaderContainer className="flex justify-center" gradient="home">
      <div className="flex">
        <div className="container flex flex-col items-center md:flex-row">
          <div className="flex max-w-full flex-1 basis-1/2 flex-col items-start self-start py-6 pr-4 md:mt-24 md:py-20">
            <p className="mb-1 font-display font-bold text-primary-gray-300 dark:text-primary-gray-200">
              #{tag}
            </p>
            <h1 className="text-h1 mb-6 max-w-full overflow-hidden text-ellipsis !text-4xl md:!text-7xl ">
              {title}
            </h1>
            <p>{description}</p>
          </div>
          <div className="order-first flex-1 basis-1/2 md:order-last">
            <img
              src={LandingImage}
              alt=""
              className="max-h-[195px] object-cover md:max-h-[540px]"
            />
          </div>
        </div>
        <div className="fixed top-1/2 hidden flex-col text-center text-primary-gray-400 dark:text-white md:flex">
          <a href={DISCORD_URL} className="pb-4">
            <DiscordIcon />
          </a>
          <a href={GITHUB_URL}>
            <GithubIcon />
          </a>
        </div>
      </div>
    </LandingHeaderContainer>
  )
}
