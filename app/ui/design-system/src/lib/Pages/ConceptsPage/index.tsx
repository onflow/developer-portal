import { ToolsAndConcepts } from "../../Components"
import { ButtonLink } from "../../Components/Button"
import {
  ContentNavigationList,
  ContentNavigationListProps,
} from "../../Components/ContentNavigationList"
import { EventCard, EventCardProps } from "../../Components/EventCard"
import {
  FeatureLinkBlock,
  FeatureLinkBlockProps,
} from "../../Components/FeatureLinkBlock"
import {
  LandingHeader,
  LandingHeaderProps,
} from "../../Components/LandingHeader"
import { ToolCardProps } from "../../Components/ToolCard"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"

export interface ConceptsPageProps {
  landingHeaderItems: LandingHeaderProps
  featureLinkBlockItems: [FeatureLinkBlockProps, FeatureLinkBlockProps]
  toolCardItems: [
    ToolCardProps,
    ToolCardProps,
    ToolCardProps,
    ToolCardProps,
    ToolCardProps,
    ToolCardProps
  ]
  contentNavigationListItems: ContentNavigationListProps
  eventCardItems: EventCardProps
}

export function ConceptsPage({
  landingHeaderItems,
  featureLinkBlockItems,
  toolCardItems,
  contentNavigationListItems,
  eventCardItems,
}: ConceptsPageProps) {
  return (
    <PageBackground gradient="concepts">
      <PageSections>
        <PageSection className="pt-0">
          <LandingHeader
            title={landingHeaderItems.title}
            buttonText={landingHeaderItems.buttonText}
            buttonUrl={landingHeaderItems.buttonUrl}
            callout={landingHeaderItems.callout}
            description={landingHeaderItems.description}
          />
        </PageSection>
        <PageSection>
          <div className="container grid grid-cols-1 gap-y-7">
            {featureLinkBlockItems.map((featureLinkBlock, i) => (
              <FeatureLinkBlock
                key={i}
                title={featureLinkBlock.title}
                description={featureLinkBlock.description}
                links={featureLinkBlock.links}
                iconSrc={featureLinkBlock.iconSrc}
                ctaLink={featureLinkBlock.ctaLink}
                ctaText={featureLinkBlock.ctaText}
              />
            ))}
          </div>
        </PageSection>
        <PageSection>
          <ToolsAndConcepts
            tools={toolCardItems}
            headerButtontext="View all Tools"
            bottomButtons={false}
          />
          <div className="px-4 pt-6 md:hidden">
            <ButtonLink
              className="w-full cursor-pointer"
              variant="primary"
              rightIcon="right"
            >
              View all Tools
            </ButtonLink>
          </div>
        </PageSection>
        <PageSection className="hidden md:block">
          <div className="container">
            <EventCard
              ctaText={eventCardItems.ctaText}
              description={eventCardItems.description}
              eventDate={eventCardItems.eventDate}
              href={eventCardItems.href}
              imageSrc={eventCardItems.imageSrc}
              location={eventCardItems.location}
              tags={eventCardItems.tags}
              title={eventCardItems.title}
            />
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
    </PageBackground>
  )
}
