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
  startProjectItems,
  threeColumnItems,
  tools,
  twitterUrl,
  upcomingEvents,
}: HomePageProps) => {
  const homepageStart = [
    {
      title: "Learn Flow",
      description:
        "Dive into Flow key concepts through tutorials, guides and examples",
      href: "/learn",
      iconType: "learn",
    },
    {
      title: "Flow Quickstarts",
      description: "Run your first Flow dApp in just a few clicks",
      href: "/tools/fcl-js/tutorials/flow-app-quickstart/",
      iconType: "quickstart",
    },
    {
      title: "Documentation",
      description: "All the developer resources you need to build on Flow",
      href: "/tools",
      iconType: "documentation",
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
      <LinkCard2Column items={homepageStart} homePage={true} />
      <LinkCard3Column items={threeColumnItems} topRounded={false} />
      <PageSections>
        <PageSection className="pt-0" />
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
