import {
  LandingHeaderHome,
  SocialLinksSignup,
  Footer,
  LinkCard2Column,
  LinkCard3Column,
  Flips,
  ToolsAndConcepts,
  UpcomingEvents,
} from '../../Components';
import PageSections from '../shared/PageSections';
import PageSection from '../shared/PageSection';
import PageBackground from '../shared/PageBackground';
import { FlipCellProps } from '../../Components/FlipCell';
import { ToolCardProps } from '../../Components/ToolCard';
import { LinkCard3ColumnProps } from '../../Components/LinkCard3Column';
import { LinkCard2ColumnProps } from '../../Components/LinkCard2Column';
import { UpcomingEventsProps } from '../../Components/UpcomingEvents';

export type HomePageProps = {
  startProjectItems: LinkCard2ColumnProps;
  flips: FlipCellProps[];
  tools: ToolCardProps[];
  threeColumnItems: LinkCard3ColumnProps;
  upcomingEvents: UpcomingEventsProps;
};

const HomePage = ({
  startProjectItems,
  flips,
  tools,
  threeColumnItems,
  upcomingEvents,
}: HomePageProps) => {
  return (
    <PageBackground>
      <LandingHeaderHome
        title="Developer Resources"
        description="Understand the foundational concepts of Flow and its language, Cadence"
        tag="onflow"
      />

      <PageSections>
        <PageSection className="md:px-20">
          <LinkCard2Column {...startProjectItems} bottomRounded={false} />
          <LinkCard3Column items={threeColumnItems as any} topRounded={false} />
        </PageSection>

        <PageSection>
          <ToolsAndConcepts tools={tools} />
        </PageSection>

        <PageSection>
          <Flips flips={flips} />
        </PageSection>

        <PageSection>
          <UpcomingEvents {...upcomingEvents} />
        </PageSection>
      </PageSections>

      <div className="my-24">
        <SocialLinksSignup />
      </div>

      <Footer />
    </PageBackground>
  );
};

export default HomePage;
