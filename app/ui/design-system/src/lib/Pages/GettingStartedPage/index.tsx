import { ReactComponent as DiscordIcon } from "../../../../images/social/discord"
import { ReactComponent as GitHubIcon } from "../../../../images/social/github"
import { SocialLinksSignup } from "../../Components"
import { ButtonLink } from "../../Components/Button"
import {
  ContentNavigation,
  ContentNavigationProps,
} from "../../Components/ContentNavigation"
import FeaturedArticleCard, {
  FeaturedArticleCardProps,
} from "../../Components/FeaturedArticleCard"
import {
  LandingHeader,
  LandingHeaderProps,
} from "../../Components/LandingHeader"
import {
  LinkCard2Column,
  LinkCard2ColumnProps,
} from "../../Components/LinkCard2Column"
import {
  LinkCard3Column,
  LinkCard3ColumnProps,
} from "../../Components/LinkCard3Column"
import { SDKCardProps } from "../../Components/SDKCard"
import { SDKCards } from "../../Components/SDKCards"
import { ToolCard, ToolCardProps } from "../../Components/ToolCard"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"

export interface GettingStartedPageProps {
  landingHeaderItems: LandingHeaderProps
  linkCard3ColumnItems: LinkCard3ColumnProps
  linkCard2ColumnItems: LinkCard2ColumnProps
  sdkCardItems: [
    SDKCardProps,
    SDKCardProps,
    SDKCardProps,
    SDKCardProps,
    SDKCardProps,
    SDKCardProps
  ]
  recentArticleItems: FeaturedArticleCardProps
  recentToolItems: [ToolCardProps, ToolCardProps, ToolCardProps]
  contentNavigationItems: [
    ContentNavigationProps,
    ContentNavigationProps,
    ContentNavigationProps
  ]
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
    <PageBackground>
      <PageSections>
        <PageSection className="pt-0 pb-0">
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
        </PageSection>

        <PageSection>
          <div className="container">
            <h2 className="text-h2 hidden pb-14 md:block">First Steps</h2>
            <LinkCard3Column items={linkCard3ColumnItems.items} />
          </div>
        </PageSection>

        <PageSection>
          <LinkCard2Column
            buttonText={linkCard2ColumnItems.buttonText}
            buttonUrl={linkCard2ColumnItems.buttonUrl}
            description={linkCard2ColumnItems.description}
            title={linkCard2ColumnItems.title}
            tags={linkCard2ColumnItems.tags}
            items={linkCard2ColumnItems.items}
          />
        </PageSection>
        <PageSection>
          <SDKCards cards={sdkCardItems} />
        </PageSection>
        <PageSection>
          <div className="container mx-auto grid grid-cols-1 gap-x-8 gap-y-4 align-middle md:grid-cols-2">
            <div className="hidden items-center md:flex">
              <h4 className="text-h4">Recent Articles</h4>
            </div>
            <div className="flex items-end justify-between md:items-center ">
              <h4 className="text-h4">Recent Tools</h4>
              <ButtonLink
                rightIcon="right"
                variant="secondary"
                className="hidden md:inline-flex"
                href="#"
              >
                View All Tools
              </ButtonLink>
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
                rightIcon="right"
                className="inline-flex md:hidden"
                href="#"
              >
                View All Tools
              </ButtonLink>
            </div>
          </div>
        </PageSection>
        <PageSection>
          {/* TODO: Extract into shared component */}
          <div className="container">
            <h4 className="text-h2 mb-10">Explore More Content</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
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
        </PageSection>
      </PageSections>
      <SocialLinksSignup />
    </PageBackground>
  )
}
