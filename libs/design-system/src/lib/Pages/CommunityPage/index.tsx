import { ButtonLink } from '../../Components/Button';
import CommunityMembers, {
  CommunityMembersProps,
} from '../../Components/CommunityMembers';
import Flips, { FlipsProps } from '../../Components/Flips';
import { LandingHeader } from '../../Components/LandingHeader';
import ProjectCards, { ProjectCardsProps } from '../../Components/ProjectCards';
import { GITHUB_URL } from '../../constants';
import GrayPage from '../shared/GrayPage';
import PageSection from '../shared/PageSection';
import PageSections from '../shared/PageSections';

export type CommunityPageProps = FlipsProps &
  ProjectCardsProps & {
    communityMembers: CommunityMembersProps;
  };

export default function CommunityPage({
  flips,
  communityMembers,
  projects,
}: CommunityPageProps) {
  return (
    <GrayPage>
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
          <div className="container mb-8">
            <div className="flex items-center justify-between">
              <div className="text-h2">
                <div>Designed by experts</div>
                <div>Refined by the community</div>
              </div>
              <ButtonLink
                rightIcon="right"
                href={GITHUB_URL}
                variant="secondary"
                target="_blank"
                rel="noreferrer"
                className="hidden ml-4 md:flex"
              >
                Go to GitHub
              </ButtonLink>
            </div>
          </div>
          <CommunityMembers {...communityMembers} />
        </PageSection>
        <PageSection>
          <Flips flips={flips} />
        </PageSection>
        <PageSection>
          <ProjectCards projects={projects} />
        </PageSection>
      </PageSections>
    </GrayPage>
  );
}
