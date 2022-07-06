import { ToolsAndConcepts, UpcomingEvents } from "../../Components"
import { ButtonLink } from "../../Components/Button"
// import CommunityMembers, {
//   CommunityMembersProps,
// } from "../../Components/CommunityMembers"
// import FeaturedArticleSlider, {
//   FeaturedArticleSliderProps,
// } from "../../Components/FeaturedArticleSlider"
import { CommunityMembersProps } from "../../Components/CommunityMembers"
import { FeaturedArticleSliderProps } from "../../Components/FeaturedArticleSlider"
import Flips, { FlipsProps } from "../../Components/Flips"
import ForumCell, { ForumCellProps } from "../../Components/ForumCell"
import { LandingHeader } from "../../Components/LandingHeader"
import ProjectCards, { ProjectCardsProps } from "../../Components/ProjectCards"
import { ToolsAndConceptsProps } from "../../Components/ToolsAndConcepts"
import { UpcomingEventsProps } from "../../Components/UpcomingEvents"
import {
  DISCOURSE_URL,
  // GITHUB_URL
} from "../../../../../../constants"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"
import {
  ContentNavigationList,
  ContentNavigationListProps,
} from "../../Components/ContentNavigationList"
import { HeaderWithLink } from "../../Components/HeaderWithLink"
import CommunityImage from "../../../../images/page/community.png"
import { LandingPageSecondaryNav } from "../../Components/LandingPageSecondaryNav"

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
  // communityMembers,
  projects,
  upcomingEvents,
  // articles,
  tools,
  contentNavigationListItems,
  forumTopics,
}: CommunityPageProps) {
  const sections = [
    { title: "Upcoming Events", elementId: "upcoming-events" },
    { title: "FLIPs", elementId: "flips" },
    { title: "Featured Initiatives", elementId: "featured-initiatives" },
    {
      title: "Tools",
      elementId: "tools",
    },
    {
      title: "Explore More Content",
      elementId: "explore-more-content",
    },
    { title: "From the Forum", elementId: "from-the-forum" },
  ]

  return (
    <PageBackground gradient="community">
      <LandingPageSecondaryNav sections={sections} />
      <PageSections>
        <PageSection className="pt-0 pb-0">
          <LandingHeader
            buttonText="More Information"
            buttonUrl="https://flow.com/ecosystemsupport"
            callout="The Flow Ecosystem Fund"
            description="Our $725 Million Flow Ecosystem Fund is designed to hypercharge innovation and growth across the Flow community."
            title="Community"
            imageSrc={CommunityImage}
          />
        </PageSection>
        <PageSection sectionId="upcoming-events">
          <UpcomingEvents {...upcomingEvents} headerLink="upcoming-events" />
        </PageSection>
        {/* <PageSection sectionId="community-members">
          <div className="container mb-8">
            <div className="flex items-center justify-between">
              <HeaderWithLink
                headerLink="community-members"
                className="text-h2"
              >
                <div>Designed by experts</div>
                <div>Refined by the community</div>
              </HeaderWithLink>
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
        </PageSection> */}
        <PageSection sectionId="flips">
          <Flips
            openFlips={openFlips}
            goodPlacesToStartFlips={goodPlacesToStartFlips}
            headerLink="flips"
          />
        </PageSection>
        <PageSection sectionId="featured-initiatives">
          <ProjectCards projects={projects} headerLink="featured-initiatives" />
        </PageSection>
        <PageSection sectionId="tools">
          <ToolsAndConcepts tools={tools} headerLink="tools" />
        </PageSection>
        <PageSection sectionId="explore-more-content">
          <ContentNavigationList
            header={contentNavigationListItems.header}
            contentNavigationItems={
              contentNavigationListItems.contentNavigationItems
            }
            headerLink="explore-more-content"
          />
        </PageSection>
        {/* <PageSection sectionId="featured-articles">
          <FeaturedArticleSlider
            articles={articles}
            headerLink="featured-articles"
          />
        </PageSection> */}
        <PageSection sectionId="from-the-forum">
          <div className="container mb-8">
            <div className="mb-10 flex items-center justify-between">
              <HeaderWithLink headerLink="from-the-forum" className="text-h2">
                From the forum
              </HeaderWithLink>
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
