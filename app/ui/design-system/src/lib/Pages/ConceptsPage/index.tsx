import { ToolsAndConcepts } from "../../Components";
import { ButtonLink } from "../../Components/Button";
import {
  ContentNavigation,
  ContentNavigationProps,
} from "../../Components/ContentNavigation";
import { EventCard, EventCardProps } from "../../Components/EventCard";
import {
  FeatureLinkBlock,
  FeatureLinkBlockProps,
} from "../../Components/FeatureLinkBlock";
import {
  LandingHeader,
  LandingHeaderProps,
} from "../../Components/LandingHeader";
import { ToolCardProps } from "../../Components/ToolCard";
import PageBackground from "../shared/PageBackground";
import PageSection from "../shared/PageSection";
import PageSections from "../shared/PageSections";

export interface ConceptsPageProps {
  landingHeaderItems: LandingHeaderProps;
  featureLinkBlockItems: [FeatureLinkBlockProps, FeatureLinkBlockProps];
  toolCardItems: [
    ToolCardProps,
    ToolCardProps,
    ToolCardProps,
    ToolCardProps,
    ToolCardProps,
    ToolCardProps
  ];
  contentNavigationItems: [
    ContentNavigationProps,
    ContentNavigationProps,
    ContentNavigationProps
  ];
  eventCardItems: EventCardProps;
}

export function ConceptsPage({
  landingHeaderItems,
  featureLinkBlockItems,
  toolCardItems,
  contentNavigationItems,
  eventCardItems,
}: ConceptsPageProps) {
  return (
    <PageBackground>
      <PageSections>
        <PageSection className="pt-0">
          <LandingHeader
            title={landingHeaderItems.title}
            buttonText={landingHeaderItems.buttonText}
            buttonUrl={landingHeaderItems.buttonUrl}
            gradient={landingHeaderItems.gradient}
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
                icon={featureLinkBlock.icon}
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
        <PageSection>
          <div className="container">
            <h4 className="text-h4 md:text-h2 pb-6  md:pb-10">
              Explore More Content
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
              {contentNavigationItems.map((contentNavigationItem, i) => (
                <ContentNavigation
                  key={i}
                  title={contentNavigationItem.title}
                  text={contentNavigationItem.text}
                  link={contentNavigationItem.link}
                  icon={contentNavigationItem.icon}
                />
              ))}
            </div>
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
      </PageSections>
    </PageBackground>
  );
}
