import React from 'react';

import {
  LandingHeader,
  LandingHeaderProps,
} from '../../Components/LandingHeader';
import {
  LinkCard2Column,
  LinkCard2ColumnProps,
} from '../../Components/LinkCard2Column';
import { SocialLinksSignup } from '../../Components';
import { SDKCard, SDKCardProps } from '../../Components/SDKCard';
import { Button, ButtonLink } from '../../Components/Button';
import FeaturedArticleCard, {
  FeaturedArticleCardProps,
} from '../../Components/FeaturedArticleCard';
import { ToolCard, ToolCardProps } from '../../Components/ToolCard';
import {
  ContentNavigation,
  ContentNavigationProps,
} from '../../Components/ContentNavigation';
import {
  LinkCard3Column,
  LinkCard3ColumnProps,
} from '../../Components/LinkCard3Column';
import { ReactComponent as GitHubIcon } from '../../../../images/social/github.svg';
import { ReactComponent as DiscordIcon } from '../../../../images/social/discord.svg';

export interface GettingStartedPageProps {
  landingHeaderItems: LandingHeaderProps;
  linkCard3ColumnItems: LinkCard3ColumnProps;
  linkCard2ColumnItems: LinkCard2ColumnProps;
  sdkCardItems: [
    SDKCardProps,
    SDKCardProps,
    SDKCardProps,
    SDKCardProps,
    SDKCardProps,
    SDKCardProps
  ];
  recentArticleItems: FeaturedArticleCardProps;
  recentToolItems: [ToolCardProps, ToolCardProps, ToolCardProps];
  contentNavigationItems: [
    ContentNavigationProps,
    ContentNavigationProps,
    ContentNavigationProps
  ];
}

export function GettingStartedPage({
  landingHeaderItems,
  linkCard3ColumnItems,
  linkCard2ColumnItems,
  sdkCardItems,
  recentArticleItems,
  recentToolItems,
  contentNavigationItems,
}: GettingStartedPageProps) {
  return (
    <div className="bg-primary-gray-50 dark:bg-black">
      <div className="relative pb-16 dark:border-primary-gray-400 md:border-b md:border-primary-gray-100 md:pb-28">
        <div className="absolute right-0 hidden h-full flex-col justify-center gap-2 pr-11 lg:flex">
          <a href="https://discord.com/invite/flow">
            <DiscordIcon />
          </a>
          <a href="https://github.com/onflow">
            <GitHubIcon />
          </a>
        </div>
        <LandingHeader
          buttonText={landingHeaderItems.buttonText}
          buttonUrl={landingHeaderItems.buttonUrl}
          callout={landingHeaderItems.callout}
          description={landingHeaderItems.description}
          gradient={landingHeaderItems.gradient}
          title={landingHeaderItems.title}
        />
      </div>

      <div className="pb-11 dark:border-primary-gray-400 md:border-b md:border-primary-gray-100 md:pt-20 md:pb-14">
        <div className="container">
          <h2 className="text-h2 hidden pb-14 md:block">First Steps</h2>
          <LinkCard3Column items={linkCard3ColumnItems.items} />
        </div>
      </div>

      <div className="px-4 dark:border-primary-gray-400 md:border-b md:border-primary-gray-100 md:pt-20 md:pb-28">
        <LinkCard2Column
          buttonText={linkCard2ColumnItems.buttonText}
          buttonUrl={linkCard2ColumnItems.buttonUrl}
          description={linkCard2ColumnItems.description}
          title={linkCard2ColumnItems.title}
          tags={linkCard2ColumnItems.tags}
          items={linkCard2ColumnItems.items}
        />
      </div>

      <div className=" pt-24 dark:border-primary-gray-400 md:border-b md:border-primary-gray-100 md:pb-28">
        <div className="container">
          <div className="mb-9 flex items-end justify-between">
            <h2 className="text-h2">SDK's</h2>
            <Button next variant="secondary" className="hidden md:inline-flex">
              View All SDKs
            </Button>
          </div>
          <div className="mb-4 grid grid-cols-1 grid-rows-5 gap-4 md:grid-cols-2 md:grid-rows-3">
            {sdkCardItems.map((sdkCard, i) => (
              <SDKCard
                key={i}
                title={sdkCard.title}
                authorIcon={sdkCard.authorIcon}
                authorName={sdkCard.authorName}
                tags={sdkCard.tags}
                link={sdkCard.link}
                stars={sdkCard.stars}
                toolIcon={sdkCard.toolIcon}
                lastCommit={sdkCard.lastCommit}
                lastRelease={sdkCard.lastRelease}
              />
            ))}
          </div>
          <Button variant="primary" className="w-full md:hidden">
            View All SDKs
          </Button>
        </div>
      </div>

      <div className="pt-52 dark:border-primary-gray-400 md:border-b md:border-primary-gray-100 md:pb-28 md:pt-20">
        <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-4 align-middle md:grid-cols-2">
          <div className="hidden items-center md:flex">
            <h4 className="text-h4">Recent Articles</h4>
          </div>

          <div className="flex items-end justify-between md:items-center ">
            <h4 className="text-h4">Recent Tools</h4>
            <Button next variant="secondary" className="hidden md:inline-flex">
              View All Tools
            </Button>
          </div>

          <div className="hidden md:block">
            <FeaturedArticleCard
              heading={recentArticleItems.heading}
              tags={recentArticleItems.tags}
              description={recentArticleItems.description}
              link={recentArticleItems.link}
              ctaText={recentArticleItems.ctaText}
            />
          </div>

          <div className="flex grow flex-col justify-between gap-4">
            {recentToolItems.map((tool, i) => (
              <ToolCard
                key={i}
                title={tool.title}
                authorIcon={tool.authorIcon}
                authorName={tool.authorName}
                tags={tool.tags}
                link={tool.link}
                stars={tool.stars}
                toolIcon={tool.toolIcon}
                description={tool.description}
              />
            ))}
            <ButtonLink
              variant="secondary"
              next
              className="inline-flex md:hidden"
              href="#"
            >
              View All Tools
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="pt-36 dark:border-primary-gray-400 md:border-b md:border-primary-gray-100 md:pt-20 md:pb-32">
        <div className="container mx-auto">
          <h4 className="text-h4 pb-5 md:pb-9">Explore More Content</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {contentNavigationItems.map((contentNav, i) => (
              <ContentNavigation
                key={i}
                title={contentNav.title}
                text={contentNav.text}
                link={contentNav.link}
                icon={contentNav.icon}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-40 pb-32">
        <SocialLinksSignup />
      </div>
    </div>
  );
}
