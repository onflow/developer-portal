import {
  DISCORD_URL,
  DISCOURSE_URL,
  GITHUB_URL,
  TWITTER_URL,
} from "../../../../../../constants"
import { ReactComponent as ContentExternalLinkIcon } from "../../../../images/content/external-link"
import socialLinksGradientPath from "../../../../images/gradients/social-links.svg"
import { ReactComponent as DiscordLogo } from "../../../../images/social/discord"
import { ReactComponent as DiscourseLogo } from "../../../../images/social/forum"
import { ReactComponent as GithubLogo } from "../../../../images/social/github"
import { ReactComponent as TwitterLogo } from "../../../../images/social/twitter"
import AppLink from "../AppLink"

type SocialLinkProps = {
  header: string
  description: string
  logo: any
  className?: string
  url: string
}

const SocialLink = ({
  header,
  description,
  logo,
  className,
  url,
}: SocialLinkProps) => {
  const Logo = logo
  return (
    <AppLink
      to={url}
      className={`flex items-center justify-between py-6 px-2 hover:cursor-pointer hover:opacity-70 md:px-10 ${className}`}
      style={{ borderColor: "rgba(105, 113, 126, 0.2)" }}
    >
      <div className="flex items-center">
        <div className="md:scale-200 scale-150 fill-black dark:fill-white">
          <Logo />
        </div>
        <div className="ml-6 items-center pt-2">
          <h4 className="text-xl font-semibold">{header}</h4>
          <p>{description}</p>
        </div>
      </div>
      <ContentExternalLinkIcon />
    </AppLink>
  )
}

export type SocialLinksSignupProps = {}

const SocialLinksSignup = () => {
  return (
    <div
      className="bg-cover bg-[center_top] bg-no-repeat py-36 lg:bg-[length:70%] xl:bg-[center_top_-30px]"
      style={{
        backgroundImage: `url(${socialLinksGradientPath})`,
      }}
    >
      <div className="container">
        <div
          className="grid grid-cols-1 rounded-lg px-4 md:grid-cols-2 md:px-0"
          style={{ background: "rgba(213, 221, 233, 0.3)" }}
        >
          <SocialLink
            header="Github"
            description="All repos maintained by the core contributors of Flow."
            logo={GithubLogo}
            className="border-b border-r-0 md:border-r"
            url={GITHUB_URL}
          />
          <SocialLink
            header="Forum"
            description="A place to discuss proposals, check updates, and find answers."
            logo={DiscourseLogo}
            className="border-b"
            url={DISCOURSE_URL}
          />
          <SocialLink
            header="Discord"
            description="Talk directly to the developer community."
            logo={DiscordLogo}
            className="border-b border-r-0 md:border-b-0 md:border-r"
            url={DISCORD_URL}
          />
          <SocialLink
            header="Twitter"
            description="Checkout the latest happenings on Flow."
            logo={TwitterLogo}
            url={TWITTER_URL}
          />
        </div>
        {/** Temporarily disabling email capture */}
        {/* <div className="mt-8 flex flex-col items-center justify-between rounded-lg bg-white px-4 py-10 dark:bg-primary-gray-dark sm:p-10 md:flex-row md:py-20 md:px-[75px]">
          <h2 className="mb-4 text-center text-h2 md:mr-8 md:text-left">
            Subscribe to our newsletter
          </h2>
          <div className="flex flex-col md:flex-row">
            <input
              placeholder="Email"
              type="email"
              className="mb-4 h-14 w-full min-w-[16rem] rounded-lg rounded-tl-lg rounded-bl-lg border-white p-4 text-primary-gray-300 focus:border-white md:rounded-br-none md:rounded-tr-none"
              style={{ boxShadow: "0px 4px 40px rgba(0, 0, 0, 0.08)" }}
            />
            <a
              className="px-12 py-4 text-center text-white bg-black border-black rounded-lg rounded-tr-lg rounded-br-lg h-14 hover:bg-primary-gray-400 dark:hover:bg-primary-gray-400/50 md:rounded-tl-none md:rounded-bl-none"
              href="/foo"
            >
              Subscribe
            </a>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default SocialLinksSignup
