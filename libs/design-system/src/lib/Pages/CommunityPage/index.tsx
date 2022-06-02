import Flips, { FlipsProps } from '../../Components/Flips';
import { LandingHeader } from '../../Components/LandingHeader';
import PageSection from '../shared/PageSection';
import PageSections from '../shared/PageSections';

export type CommunityPageProps = FlipsProps;

export default function CommunityPage({ flips }: CommunityPageProps) {
  return (
    <div className="bg-primary-gray-50 dark:bg-black">
      <PageSections>
        <PageSection className="pt-0">
          <LandingHeader
            buttonText="Button Text"
            buttonUrl="#"
            callout="Featured callout here two lines"
            description="Lorem ipsum dolor sit amet proin gravida lorem ipsum dolor sit."
            gradient="community"
            title="Community"
          />
        </PageSection>
        <PageSection>
          <Flips flips={flips} />
        </PageSection>
        <PageSection>#todo</PageSection>
        <PageSection>#todo</PageSection>
      </PageSections>
    </div>
  );
}
