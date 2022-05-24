import React from 'react';
import Githublogo from '../../Images/social/github';
import Discordlogo from '../../Images/social/discord';
import Twitterlogo from '../../Images/social/twitter';
import Discourselogo from '../../Images/social/discourse';
import { ContentExternalLinkIcon } from '../icons';
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
    <div
      className={`flex items-center py-6 xs:px-2 md:px-10 ${className}`}
      style={{ borderColor: 'rgba(105, 113, 126, 0.2)' }}
    >
      <div className="md:scale-150">
        <Logo />
      </div>
      <div className="items-center pt-2 ml-6">
        <h4 className="text-xl font-semibold">{header}</h4>
        <p>{description}</p>
      </div>
      <a href={url}>
        <ContentExternalLinkIcon />
      </a>
    </div>
  );
};

export type SocialLinksSignupProps = {};

const SocialLinksSignup = () => {
  return (
    <div className="relative my-16">
      <div className="absolute z-50 w-full mb-20 md:px-28">
        <div
          className="grid grid-flow-col rounded-lg xs:grid-rows-4 xs:px-4 md:grid-rows-2 md:px-0"
          style={{ background: 'rgba(213, 221, 233, 0.3)' }}
        >
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={Githublogo}
            className="border-b-2 xs:border-r-0 md:border-r-2"
            url={GITHUB_URL}
          />
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={Discourselogo}
            className="xs:border-r-0 xs:border-b-2 md:border-r-2 md:border-b-0"
            url={DISCOURSE_URL}
          />
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={Discordlogo}
            className="border-b-2"
            url={DISCORD_URL}
          />
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={Twitterlogo}
            url={TWITTER_URL}
          />
        </div>

        <div className="flex items-center justify-between p-20 mt-8 bg-white rounded-lg xs:pb-22 dark:bg-primary-dark-gray xs:flex-col xs:px-4 md:flex-row md:p-20">
          <h2 className="mr-8 text-h2 xs:mr-0 xs:mb-4">
            Subscribe to our newsletter
          </h2>
          <div className="flex h-14 xs:flex-col md:flex-row">
            <input
              placeholder="Email"
              className="p-4 border-white rounded-tl-lg rounded-bl-lg md:rounded-tb-none h-14 text-primary-gray-300 focus:border-white xs:mb-4 xs:w-full xs:rounded-lg md:rounded-tr-none"
              style={{ boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.08)' }}
            />
            <a
              className="px-12 py-4 text-center text-white bg-black border-black rounded-tr-lg rounded-br-lg xs:rounded-lg md:rounded-tl-none md:rounded-bl-none"
              href="/foo"
            >
              Subscribe
            </a>
          </div>
        </div>
      </div>

      {/* Green gradient */}
      <div
        className="tool-gradient-cli absolute top-[20%] h-[41rem] w-[56rem] xs:w-1/2 "
        style={{
          filter: 'blur(66px)',
          transform: 'matrix(0.92, 0.11, -0.46, 0.99, 0, 0)',
          opacity: 0.5,
        }}
      />

      {/* Blue gradient */}
      <div
        className="tool-gradient-vscode absolute top-full mt-28 h-[28rem] w-[48rem] xs:left-[30%] xs:w-1/2 md:left-[40%] "
        style={{
          filter: 'blur(84px)',
          transform: 'matrix(-0.97, -0.07, 0.27, -1, 0, 0)',
          opacity: 0.5,
        }}
      />
    </div>
  );
};

export default SocialLinksSignup;
