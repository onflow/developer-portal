import {
  Flips,
  Footer,
  LandingHeaderContainer,
  LandingHeaderHome,
  LinkCard2Column,
  LinkCard3Column,
  SocialLinksSignup,
  ToolsAndConcepts,
  UpcomingEvents,
} from "../../Components"
import { FlipCellProps } from "../../Components/FlipCell"
import { LinkCard2ColumnProps } from "../../Components/LinkCard2Column"
import { LinkCard3ColumnProps } from "../../Components/LinkCard3Column"
import { ToolCardProps } from "../../Components/ToolCard"
import { UpcomingEventsProps } from "../../Components/UpcomingEvents"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"

export type HomePageProps = {
  startProjectItems: LinkCard2ColumnProps
  flips: FlipCellProps[]
  tools: ToolCardProps[]
  concepts: ToolCardProps[]
  threeColumnItems: LinkCard3ColumnProps
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
    <PageBackground>
      <LandingHeaderContainer
        gradient="home"
        className="bg-[center_top_-270px]"
      >
        <LandingHeaderHome
          title="Developer Portal"
          description="Understand the foundational concepts of Flow and its language, Cadence"
          tag="onflow"
        />
        <LinkCard2Column {...startProjectItems} bottomRounded={false} />
      </LandingHeaderContainer>
      <PageSections>
        <PageSection>
          <LinkCard3Column items={threeColumnItems as any} topRounded={false} />
        </PageSection>
        <PageSection>
          <ToolsAndConcepts tools={tools} concepts={concepts} />
        </PageSection>
        <PageSection>
          <Flips flips={flips} />
        </PageSection>
        <PageSection>
          <UpcomingEvents {...upcomingEvents} />
        </PageSection>
      </PageSections>
      <SocialLinksSignup />
      <Footer />
    </PageBackground>
  )
}

export default HomePage
