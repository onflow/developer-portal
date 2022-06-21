import {
  Flips,
  LandingHeaderHome,
  LinkCard2Column,
  LinkCard3Column,
  SocialLinksSignup,
  ToolsAndConcepts,
  UpcomingEvents,
} from "../../Components"
import { FlipsProps } from "../../Components/Flips"
import { LinkCard2ColumnProps } from "../../Components/LinkCard2Column"
import { LinkCard3ColumnItems } from "../../Components/LinkCard3Column"
import { ToolCardProps } from "../../Components/ToolCard"
import { TutorialCardProps } from "../../Components/TutorialCard"
import { UpcomingEventsProps } from "../../Components/UpcomingEvents"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"

export type HomePageProps = {
  startProjectItems: LinkCard2ColumnProps
  flips: FlipsProps
  tools: ToolCardProps[]
  concepts?: TutorialCardProps[]
  threeColumnItems: LinkCard3ColumnItems
  upcomingEvents: UpcomingEventsProps
}

const HomePage = ({
  startProjectItems,
  flips,
  tools,
  concepts,
  threeColumnItems,
  upcomingEvents,
}: HomePageProps) => {
  return (
    <PageBackground gradient="home">
      <LandingHeaderHome
        title="Developer Portal"
        description="Understand the foundational concepts of Flow and its language, Cadence"
        tag="preview"
      />
      <LinkCard2Column
        {...startProjectItems}
        bottomRounded={false}
        homePage={true}
      />
      <LinkCard3Column items={threeColumnItems} topRounded={false} />
      <PageSections>
        <PageSection className="pt-0" />
        <PageSection>
          <ToolsAndConcepts tools={tools} concepts={concepts} />
        </PageSection>
        <PageSection>
          <Flips {...flips} />
        </PageSection>
        <PageSection>
          <UpcomingEvents {...upcomingEvents} />
        </PageSection>
      </PageSections>
      <SocialLinksSignup />
    </PageBackground>
  )
}

export default HomePage
