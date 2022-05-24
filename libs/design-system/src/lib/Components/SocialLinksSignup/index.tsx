import React from 'react';
import GithubLogo from '../../Images/social/github.svg';
import DiscordLogo from '../../Images/social/discord.svg';
import TwitterLogo from '../../Images/social/twitter.svg';
import DiscourseLogo from '../../Images/social/discourse.svg';

type SocialLinkProps = {
  header: string;
  description: string;
  logo: any;
  className?: string;
};

const SocialLink = ({
  header,
  description,
  logo,
  className,
}: SocialLinkProps) => {
  return (
    <div
      className={`flex py-10 sm:px-6 md:px-20 ${className}`}
      style={{ borderColor: 'rgba(105, 113, 126, 0.2)' }}
    >
      <img className="sm:w-8 md:w-fit" src={logo} />
      <div className="items-center pt-2 ml-6">
        <h4 className="text-xl font-semibold">{header}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export type SocialLinksSignupProps = {};

const SocialLinksSignup = () => {
  return (
    <div className="relative mt-16 px-28">
      <div className="absolute z-50 w-full ">
        <div
          className="grid grid-flow-col rounded-lg sm:grid-rows-4 sm:px-4 md:grid-rows-2 md:px-0"
          style={{ background: 'rgba(213, 221, 233, 0.3)' }}
        >
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={GithubLogo}
            className="border-b-2 sm:border-r-0 md:border-r-2"
          />
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={DiscourseLogo}
            className="sm:border-r-0 sm:border-b-2 md:border-r-2 md:border-b-0"
          />
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={DiscordLogo}
            className="border-b-2"
          />
          <SocialLink
            header="Title"
            description="One liner explaining this"
            logo={TwitterLogo}
          />
        </div>
        <div className="flex items-center justify-between p-20 mt-8 mb-20 bg-white rounded-lg dark:bg-primary-dark-gray sm:flex-col sm:px-4 sm:pb-8 md:flex-row md:p-20">
          <h2 className="mr-8 text-h2">Subscribe to our newsletter</h2>
          <div className="flex h-14 sm:flex-col md:flex-row">
            <input
              placeholder="Email"
              className="p-4 border-white rounded-tl-lg rounded-bl-lg text-primary-gray-300 focus:border-white"
              style={{ boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.08)' }}
            />
            <a
              className="px-12 py-4 text-center text-white bg-black border-black rounded-tr-lg rounded-br-lg"
              href="/foo"
            >
              Subscribe
            </a>
          </div>
        </div>
      </div>
      <div
        style={{
          background: '#347BB2',
          filter: 'blur(84px)',
          transform: 'matrix(-0.97, -0.07, 0.27, -1, 0, 0)',
          width: '733px',
          height: '446px',
          opacity: 0.5,
          position: 'absolute',
          top: '5%',
          left: '40%',
        }}
      />
      <div
        style={{
          background: '#00EF8B',
          filter: 'blur(66px)',
          transform: 'matrix(0.92, 0.11, -0.46, 0.99, 0, 0)',
          width: '890px',
          height: '530px',
          opacity: 0.6,
          position: 'absolute',
          top: '20%',
        }}
      />
    </div>
  );
};

export default SocialLinksSignup;
