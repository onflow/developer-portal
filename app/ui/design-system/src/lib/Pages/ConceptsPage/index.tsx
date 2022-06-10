import { ButtonLink } from '../../Components/Button';
import {
  ContentNavigation,
  ContentNavigationProps,
} from '../../Components/ContentNavigation';
import { EventCard, EventCardProps } from '../../Components/EventCard';
import {
  FeatureLinkBlock,
  FeatureLinkBlockProps,
} from '../../Components/FeatureLinkBlock';
import {
  LandingHeader,
  LandingHeaderProps,
} from '../../Components/LandingHeader';
import { ToolCard, ToolCardProps } from '../../Components/ToolCard';

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
    <div className="bg-primary-gray-50 dark:bg-black">
      <div className="pb-10 md:border-b md:border-primary-gray-100 md:pb-28">
        <LandingHeader
          title={landingHeaderItems.title}
          buttonText={landingHeaderItems.buttonText}
          buttonUrl={landingHeaderItems.buttonUrl}
          gradient={landingHeaderItems.gradient}
          callout={landingHeaderItems.callout}
          description={landingHeaderItems.description}
        />
      </div>

      <div className="pb-32 md:border-b md:border-primary-gray-100 md:pb-28 md:pt-20">
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
      </div>

      <div className="pb-40 md:border-b md:border-primary-gray-100 md:pt-20 md:pb-28">
        <div className="container">
          <div className="flex justify-between md:pb-11">
            <div>
              <h4 className="text-h4 md:text-h2 pb-4 text-2xl md:pb-2">
                Tools
              </h4>
              <div className="hidden md:block">
                Core concepts and tools you'll need to get started building on
                Flow
              </div>
              <div className="block pb-4 md:hidden">Tools lorem ipsum</div>
            </div>
            <div>
              <ButtonLink
                rightIcon="right"
                variant="secondary"
                className="hidden md:inline-flex"
              >
                View all
              </ButtonLink>
            </div>
          </div>
          <div className="grid-rows-auto grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-y-6 md:gap-x-9">
            {toolCardItems.map((toolCard, i) => (
              <ToolCard
                key={i}
                title={toolCard.title}
                authorIcon={toolCard.authorIcon}
                authorName={toolCard.authorName}
                tags={toolCard.tags}
                link={toolCard.link}
                stars={toolCard.stars}
                toolIcon={toolCard.toolIcon}
                description={toolCard.description}
              />
            ))}
            <ButtonLink className="inline-flex md:hidden" rightIcon="right">
              View All Tools
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="border-b border-primary-gray-100 pb-24 md:pt-20">
        <div className="container">
          <h4 className="text-h4 md:text-h2 pb-6  md:pb-10">
            Explore More Content
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {contentNavigationItems.map((contentNavigationItem, i) => (
              <ContentNavigation
                title={contentNavigationItem.title}
                text={contentNavigationItem.text}
                link={contentNavigationItem.link}
                icon={contentNavigationItem.icon}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden border-b border-primary-gray-100 md:block md:pb-48 md:pt-20">
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
      </div>
    </div>
  );
}
