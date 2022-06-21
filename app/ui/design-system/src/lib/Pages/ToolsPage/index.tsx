import { ToolsAndConcepts } from "../../Components"
import {
  ContentNavigation,
  ContentNavigationProps,
} from "../../Components/ContentNavigation"
import { LandingHeader } from "../../Components/LandingHeader"
import { SDKCardProps } from "../../Components/SDKCard"
import { SDKCards } from "../../Components/SDKCards"
import { ToolCardProps } from "../../Components/ToolCard"
import TutorialCard, { TutorialCardProps } from "../../Components/TutorialCard"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"

export type ToolsPageProps = {
  tools: ToolCardProps[]
  sdks: SDKCardProps[]
  contentNavigationItems: [
    ContentNavigationProps,
    ContentNavigationProps,
    ContentNavigationProps
  ]
  apis: TutorialCardProps[]
}

const ToolsPage = ({
  tools,
  sdks,
  contentNavigationItems,
  apis,
}: ToolsPageProps) => {
  return (
    <PageBackground gradient="tools">
      <PageSections>
        <PageSection className="pt-0 pb-0">
          <LandingHeader
            buttonText="Button Text"
            buttonUrl="#"
            callout="Featured callout here two lines"
            description="Lorem ipsum dolor sit amet proin gravida lorem ipsum dolor sit."
            title="Tools"
          />
        </PageSection>
        <PageSection>
          <ToolsAndConcepts bottomButtons={false} tools={tools} />
        </PageSection>
        <PageSection>
          <SDKCards
            header="Something"
            cards={sdks}
            description="Blurb aboud SDK's here lorem ipsum dolor sit amet proin."
          />
        </PageSection>
        <PageSection>
          {/* TODO: Extract to separate component */}
          {/* TODO: Align right to match design */}
          <div className="container">
            <h2 className="text-h2 mb-4">APIs and Service</h2>
            <p className="mb-6 text-primary-gray-300">
              Hosted APIs that provide access to the Flow network and related
              data (NFTs, events, etc).
            </p>
            <div className="grid grid-flow-col gap-4 overflow-x-scroll pb-6">
              {apis &&
                apis.map((api: TutorialCardProps, index: number) => (
                  <TutorialCard {...api} key={index} className="w-[272px]" />
                ))}
            </div>
          </div>
        </PageSection>
        <PageSection>
          {/* TODO: Extract into shared component */}
          <div className="container">
            <h4 className="text-h2 mb-10">Explore More Content</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
              {contentNavigationItems.map(
                (contentNav: ContentNavigationProps, index: number) => (
                  <ContentNavigation key={index} {...contentNav} />
                )
              )}
            </div>
          </div>
        </PageSection>
      </PageSections>
    </PageBackground>
  )
}

export default ToolsPage
