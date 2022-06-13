import {
  Footer,
  SocialLinksSignup,
  ToolsAndConcepts,
  UpcomingEvents,
} from "../../Components"
import { ButtonLink } from "../../Components/Button"
import CommunityMembers, {
  CommunityMembersProps,
} from "../../Components/CommunityMembers"
import {
  ContentNavigation,
  ContentNavigationProps,
} from "../../Components/ContentNavigation"
import FeaturedArticleSlider, {
  FeaturedArticleSliderProps,
} from "../../Components/FeaturedArticleSlider"
import Flips, { FlipsProps } from "../../Components/Flips"
import { LandingHeader } from "../../Components/LandingHeader"
import ProjectCards, { ProjectCardsProps } from "../../Components/ProjectCards"
import { ToolsAndConceptsProps } from "../../Components/ToolsAndConcepts"
import { UpcomingEventsProps } from "../../Components/UpcomingEvents"
import { GITHUB_URL } from "../../constants"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"

export type CommunityPageProps = FlipsProps &
  ProjectCardsProps &
  FeaturedArticleSliderProps &
  ToolsAndConceptsProps & {
    communityMembers: CommunityMembersProps
    upcomingEvents: UpcomingEventsProps
    contentNavigationItems: ContentNavigationProps[]
  }

export default function CommunityPage({
  flips,
  communityMembers,
  projects,
  upcomingEvents,
  articles,
  tools,
  contentNavigationItems,
}: CommunityPageProps) {
  return (
    <PageBackground>
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
          <UpcomingEvents {...upcomingEvents} />
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
                className="ml-4 hidden md:flex"
              >
                Go to GitHub
              </ButtonLink>
            </div>
          </div>
          <CommunityMembers {...communityMembers} />
        </PageSection>
        <PageSection>
          <div className="container">
            <Flips flips={flips} />
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
            <ProjectCards projects={projects} />
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
            <ToolsAndConcepts tools={tools} />
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
            <h4 className="text-h4 mb-4">Explore More Content</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {contentNavigationItems.map(
                (contentNav: ContentNavigationProps, index: number) => (
                  <ContentNavigation key={index} {...contentNav} />
                )
              )}
            </div>
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
            <FeaturedArticleSlider articles={articles} />
          </div>
        </PageSection>
      </PageSections>
      <SocialLinksSignup />
      <Footer />
    </PageBackground>
  )
}
