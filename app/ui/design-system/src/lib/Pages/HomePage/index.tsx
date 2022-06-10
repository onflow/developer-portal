import {
  Flips,
  Footer,
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
  threeColumnItems: LinkCard3ColumnProps
  upcomingEvents: UpcomingEventsProps
}

const HomePage = ({
  startProjectItems,
  flips,
  tools,
  threeColumnItems,
  upcomingEvents,
}: HomePageProps) => {
  return (
    <PageBackground>
      <LandingHeaderHome
        title="Developer Resources"
        description="Understand the foundational concepts of Flow and its language, Cadence"
        tag="onflow"
      />
      <PageSections>
        <PageSection>
          <LinkCard2Column {...startProjectItems} bottomRounded={false} />
          <LinkCard3Column items={threeColumnItems as any} topRounded={false} />
        </PageSection>

        <PageSection>
          <ToolsAndConcepts tools={tools} />
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
