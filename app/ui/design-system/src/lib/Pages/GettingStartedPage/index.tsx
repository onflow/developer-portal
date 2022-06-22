import { SocialLinksSignup } from "../../Components"
import { ButtonLink } from "../../Components/Button"
import { Carousel } from "../../Components/Carousel"
import {
  ContentNavigationList,
  ContentNavigationListProps,
} from "../../Components/ContentNavigationList"
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
  recentArticleItems: FeaturedArticleCardProps[]
  recentToolItems: [ToolCardProps, ToolCardProps, ToolCardProps]
  contentNavigationListItems: ContentNavigationListProps
}

export function GettingStartedPage({
  landingHeaderItems,
  linkCard3ColumnItems,
  linkCard2ColumnItems,
  sdkCardItems,
  recentArticleItems,
  recentToolItems,
  contentNavigationListItems,
}: GettingStartedPageProps) {
  return (
    <PageBackground gradient="getting-started">
      <PageSections>
        <PageSection className="pt-0 pb-0">
          <LandingHeader
            buttonText={landingHeaderItems.buttonText}
            buttonUrl={landingHeaderItems.buttonUrl}
            callout={landingHeaderItems.callout}
            description={landingHeaderItems.description}
            title={landingHeaderItems.title}
            imageSrc={landingHeaderItems.imageSrc}
            imagePadding={false}
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
              <Carousel
                breakpoint="none"
                carouselItemWidth="w-full"
                className="justify-stretch h-full"
              >
                {recentArticleItems.map((recentArticleItem, index) => (
                  <FeaturedArticleCard
                    bg="page-bg-gradient-getting-started bg-bottom border-primary-gray-100 border dark:border-primary-gray-400 h-full"
                    key={index}
                    {...recentArticleItem}
                  />
                ))}
              </Carousel>
            </div>
            <div className="flex grow flex-col justify-between gap-4">
              {recentToolItems.map((toolProps, i) => (
                <ToolCard key={i} {...toolProps} />
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
          <ContentNavigationList
            header={contentNavigationListItems.header}
            contentNavigationItems={
              contentNavigationListItems.contentNavigationItems
            }
          />
        </PageSection>
      </PageSections>
      <SocialLinksSignup />
    </PageBackground>
  )
}
