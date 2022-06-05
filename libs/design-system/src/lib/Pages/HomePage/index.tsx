import {
  LandingHeaderHome,
  SocialLinksSignup,
  Footer,
  LinkCard2Column,
  LinkCard3Column,
  Flips,
  ToolsAndConcepts,
} from '../../Components';
import { FlipCellProps } from '../../Components/FlipCell';
import { ToolCardProps } from '../../Components/ToolCard';
import { LinkCard3ColumnProps } from '../../Components/LinkCard3Column';

export type HomePageProps = {
  flips: FlipCellProps[];
  tools: ToolCardProps[];
  threeColumnItems: LinkCard3ColumnProps;
};

const HomePage = ({ flips, tools, threeColumnItems }) => {
  return (
    <div>
      <LandingHeaderHome
        title="Developer Portal"
        description="Understand the foundational concepts of Flow and its language, Cadence"
        tag="onflow"
      />

      <LinkCard2Column
        buttonText="Get started"
        buttonUrl="#"
        title="Start your project"
        items={[]}
        description="Everything you need to start building on Flow is lorem ipsum Everything you need to orem ipsum Everything you need to  "
      />

      <LinkCard3Column items={threeColumnItems as any} />

      <div className="p-6 my-20">
        <ToolsAndConcepts tools={tools} />
      </div>

      <Flips flips={flips} />

      <div className="my-24">
        <SocialLinksSignup />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
