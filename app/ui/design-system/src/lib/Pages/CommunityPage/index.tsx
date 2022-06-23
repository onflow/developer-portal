import { ToolsAndConcepts, UpcomingEvents } from "../../Components"
import { ButtonLink } from "../../Components/Button"
import CommunityMembers, {
  CommunityMembersProps,
} from "../../Components/CommunityMembers"
import FeaturedArticleSlider, {
  FeaturedArticleSliderProps,
} from "../../Components/FeaturedArticleSlider"
import Flips, { FlipsProps } from "../../Components/Flips"
import ForumCell, { ForumCellProps } from "../../Components/ForumCell"
import { LandingHeader } from "../../Components/LandingHeader"
import ProjectCards, { ProjectCardsProps } from "../../Components/ProjectCards"
import { ToolsAndConceptsProps } from "../../Components/ToolsAndConcepts"
import { UpcomingEventsProps } from "../../Components/UpcomingEvents"
import { DISCOURSE_URL, GITHUB_URL } from "../../../../../../constants"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"
import {
  ContentNavigationList,
  ContentNavigationListProps,
} from "../../Components/ContentNavigationList"

export type CommunityPageProps = FlipsProps &
  ProjectCardsProps &
  FeaturedArticleSliderProps &
  ToolsAndConceptsProps & {
    communityMembers: CommunityMembersProps
    upcomingEvents: UpcomingEventsProps
    contentNavigationListItems: ContentNavigationListProps
    forumTopics: ForumCellProps[]
  }

export default function CommunityPage({
  openFlips,
  goodPlacesToStartFlips,
  communityMembers,
  projects,
  upcomingEvents,
  articles,
  tools,
  contentNavigationListItems,
  forumTopics,
}: CommunityPageProps) {
  return (
    <PageBackground gradient="community">
      <PageSections>
        <PageSection className="pt-0 pb-0">
          <LandingHeader
            buttonText="Button Text"
            buttonUrl="#"
            callout="Featured callout here two lines"
            description="Lorem ipsum dolor sit amet proin gravida lorem ipsum dolor sit."
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
          <Flips
            openFlips={openFlips}
            goodPlacesToStartFlips={goodPlacesToStartFlips}
          />
        </PageSection>
        <PageSection>
          <ProjectCards projects={projects} />
        </PageSection>
        <PageSection>
          <ToolsAndConcepts tools={tools} />
        </PageSection>
        <PageSection>
          <ContentNavigationList
            header={contentNavigationListItems.header}
            contentNavigationItems={
              contentNavigationListItems.contentNavigationItems
            }
          />
        </PageSection>
        <PageSection>
          <FeaturedArticleSlider articles={articles} />
        </PageSection>
        <PageSection>
          <div className="container mb-8">
            <div className="mb-10 flex items-center justify-between">
              <h4 className="text-h2">From the forum</h4>
              <ButtonLink
                rightIcon="right"
                href={DISCOURSE_URL}
                variant="secondary"
                target="_blank"
                rel="noreferrer"
                className="ml-4 hidden md:flex"
              >
                Go to Forum
              </ButtonLink>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {forumTopics.map((topic: ForumCellProps, index: number) => (
                <ForumCell {...topic} key={index} />
              ))}
            </div>
          </div>
        </PageSection>
      </PageSections>
    </PageBackground>
  )
}
