import React from 'react';
import { ReactComponent as GithubLogo } from '../../../../images/social/github.svg';
import { ReactComponent as DiscordLogo } from '../../../../images/social/discord.svg';
import { ReactComponent as DiscourseLogo } from '../../../../images/social/forum.svg';
import { ReactComponent as TwitterLogo } from '../../../../images/social/twitter.svg';
import { ReactComponent as ContentExternalLinkIcon } from '../../../../images/content/external-link.svg';
import socialLinksGradientPath from '../../../../images/gradients/social-links.svg';
import {
  GITHUB_URL,
  DISCORD_URL,
  DISCOURSE_URL,
  TWITTER_URL,
} from '../../constants';

type SocialLinkProps = {
  header: string;
  description: string;
  logo: any;
  className?: string;
  url: string;
};

const SocialLink = ({
  header,
  description,
  logo,
  className,
  url,
}: SocialLinkProps) => {
  const Logo = logo;
  return (
    <a
      href={url}
      className={`flex items-center justify-between py-6 hover:cursor-pointer xs:px-2 md:px-10 ${className}`}
      style={{ borderColor: 'rgba(105, 113, 126, 0.2)' }}
    >
      <div className="flex items-center">
        <div className="scale-150 md:scale-200 fill-black dark:fill-white">
          <Logo />
        </div>
        <div className="items-center pt-2 ml-6">
          <h4 className="text-xl font-semibold">{header}</h4>
          <p>{description}</p>
        </div>
      </div>

      <ContentExternalLinkIcon />
    </a>
  );
};

export type SocialLinksSignupProps = {};

const SocialLinksSignup = () => {
  return (
    <div
      className="my-16 "
      style={{
        backgroundImage: `url(${socialLinksGradientPath})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="w-full mb-20 md:px-28">
        <div
          className="grid grid-flow-col rounded-lg xs:grid-rows-4 xs:px-4 md:grid-rows-2 md:px-0"
          style={{ background: 'rgba(213, 221, 233, 0.3)' }}
        >
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={GithubLogo}
            className="border-b xs:border-r-0 md:border-r"
            url={GITHUB_URL}
          />
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={DiscourseLogo}
            className="xs:border-b xs:border-r-0 md:border-r md:border-b-0"
            url={DISCOURSE_URL}
          />
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={DiscordLogo}
            className="border-b"
            url={DISCORD_URL}
          />
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={TwitterLogo}
            url={TWITTER_URL}
          />
        </div>

        <div className="flex items-center justify-between mt-8 bg-white rounded-lg dark:bg-primary-dark-gray xs:flex-col xs:px-4 xs:pt-24 xs:pb-9 md:flex-row md:p-20">
          <h2 className="mr-8 text-h2 xs:mr-0 xs:mb-4">
            Subscribe to our newsletter
          </h2>
          <div className="flex xs:w-full xs:flex-col md:flex-row">
            <input
              placeholder="Email"
              className="h-14 min-w-[16rem] rounded-tl-lg rounded-bl-lg border-white p-4 text-primary-gray-300 focus:border-white xs:mb-4 xs:w-full xs:rounded-lg md:rounded-br-none md:rounded-tr-none"
              style={{ boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.08)' }}
            />
            <a
              className="px-12 py-4 text-center text-white bg-black border-black rounded-tr-lg rounded-br-lg h-14 xs:rounded-lg md:rounded-tl-none md:rounded-bl-none"
              href="/foo"
            >
              Subscribe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksSignup;
