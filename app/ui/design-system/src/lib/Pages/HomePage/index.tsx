import {
  Flips,
  LandingHeaderHome,
  LinkCard2Column,
  LinkCard3Column,
  SocialLinksSignup,
  ToolsAndConcepts,
  UpcomingEvents,
} from "../../Components"
import {
  ContentNavigationList,
  ContentNavigationListProps,
} from "../../Components/ContentNavigationList"
import { ContentNavigationProps } from "../../Components/ContentNavigation"
import { FlipsProps } from "../../Components/Flips"
import { LinkCard2ColumnProps } from "../../Components/LinkCard2Column"
import { LinkCard3ColumnItems } from "../../Components/LinkCard3Column"
import { SocialLinksSignupProps } from "../../Components/SocialLinksSignup"
import { ToolCardProps } from "../../Components/ToolCard"
import { TutorialCardProps } from "../../Components/TutorialCard"
import { UpcomingEventsProps } from "../../Components/UpcomingEvents"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"

export type HomePageProps = SocialLinksSignupProps & {
  concepts?: TutorialCardProps[]
  contentNavigationListItems: ContentNavigationListProps
  editPageUrl?: string
  flips: FlipsProps
  startProjectItems: LinkCard2ColumnProps
  threeColumnItems: LinkCard3ColumnItems
  tools: ToolCardProps[]
  upcomingEvents: UpcomingEventsProps
}

const HomePage = ({
  concepts,
  contentNavigationListItems,
  discordUrl,
  discourseUrl,
  editPageUrl,
  flips,
  githubUrl,
  threeColumnItems,
  tools,
  twitterUrl,
  upcomingEvents,
}: HomePageProps) => {
  const homepageHeaderItems: ContentNavigationProps[] = [
    {
      title: "Learn Flow",
      text: "Dive into Flow key concepts through tutorials, guides, and examples",
      link: "/learn",
      icon: "get-started",
    },
    {
      title: "Flow Quickstarts",
      text: "Run your frist Flow dApp in just a few clicks",
      link: "/learn",
      icon: "get-started",
    },
    {
      title: "Documentation",
      text: "All the developer resources you need to build on Flow",
      link: "/tools",
      icon: "tools",
    },
  ]

  return (
    <PageBackground gradient="home">
      <LandingHeaderHome
        description="Discover the developer ecosystem and master the Flow blockchain"
        discordUrl={discordUrl}
        editPageUrl={editPageUrl}
        githubUrl={githubUrl}
        tag="onflow"
        title="Developer Portal"
      />
      <ContentNavigationList
        header="Start Building Today"
        contentNavigationItems={homepageHeaderItems}
        headerLink="start-building-today"
      />
      <PageSections>
        <PageSection className="pt-0" />
        <PageSection sectionId="browse-by-topic">
          <LinkCard3Column items={threeColumnItems} topRounded={true} />
        </PageSection>
        <PageSection sectionId="sdks-and-tools">
          <ToolsAndConcepts
            tools={tools}
            concepts={concepts}
            headerLink={"sdks-and-tools"}
          />
        </PageSection>
        <PageSection sectionId="flips">
          <Flips {...flips} headerLink="flips" />
        </PageSection>
        {upcomingEvents.events.length > 0 && (
          <PageSection sectionId="upcoming-events">
            <UpcomingEvents {...upcomingEvents} headerLink="upcoming-events" />
          </PageSection>
        )}
        <PageSection sectionId="explore-more-content">
          <ContentNavigationList
            header={contentNavigationListItems.header}
            contentNavigationItems={
              contentNavigationListItems.contentNavigationItems
            }
            headerLink="explore-more-content"
          />
        </PageSection>
      </PageSections>
      <SocialLinksSignup
        discordUrl={discordUrl}
        discourseUrl={discourseUrl}
        githubUrl={githubUrl}
        twitterUrl={twitterUrl}
      />
    </PageBackground>
  )
}

export default HomePage
