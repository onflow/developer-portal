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
    <div className="bg-primary-gray-50 dark:bg-black">
      <LandingHeaderHome
        title="Developer Resources"
        description="Understand the foundational concepts of Flow and its language, Cadence"
        tag="onflow"
      />

      <LinkCard2Column {...startProjectItems} bottomRounded={false} />

      <div className="mb-36">
        <LinkCard3Column items={threeColumnItems as any} topRounded={false} />
      </div>

      <div className="mb-20">
        <ToolsAndConcepts tools={tools} />
      </div>

      <div className="mb-36">
        <Flips flips={flips} />
      </div>

      <div className="mb-20">
        <UpcomingEvents {...upcomingEvents} />
      </div>

      <div className="my-24">
        <SocialLinksSignup />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
