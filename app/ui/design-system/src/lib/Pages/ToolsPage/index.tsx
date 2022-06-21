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
// import Arches from "../../../../images/misc/arches.png"

export type ToolsPageProps = {
  tools: ToolCardProps[]
  sdks: SDKCardProps[]
  explorers: SDKCardProps[]
  ossservices: SDKCardProps[]
  hostedApis: SDKCardProps[]
  cadenceTools: SDKCardProps[]
  contentNavigationItems: [
    ContentNavigationProps,
    ContentNavigationProps,
    ContentNavigationProps
  ]
}

const ToolsPage = ({
  tools,
  sdks,
  explorers,
  ossservices,
  hostedApis,
  cadenceTools,
  contentNavigationItems,
}: ToolsPageProps) => {
  return (
    <PageBackground gradient="tools">
      <PageSections>
        <PageSection className="pt-0 pb-0">
          <LandingHeader
            buttonText="View guide"
            buttonUrl="https://docs.onflow.org/dapp-development/DappArchitectures/"
            callout="Flow Dapp Architecture Guide"
            description="Wondering what tools you need? See our dapp architectures guide to help you out."
            title="Tools"
            // imageSrc={Arches} TODO: FIX.
          />
        </PageSection>
        <PageSection>
          <SDKCards
            header="Development Tools"
            cards={tools}
            description="These essential tools will help you build, test, and debug your dapp on Flow."
          />
        </PageSection>
        <PageSection>
          <SDKCards
            header="SDKs"
            cards={sdks}
            description="Blurb aboud SDK's here lorem ipsum dolor sit amet proin."
          />
        </PageSection>
        <PageSection>
          <SDKCards
            header="Open Source Services"
            cards={ossservices}
            description="Blurb aboud SDK's here lorem ipsum dolor sit amet proin."
          />
        </PageSection>
        <PageSection>
          <SDKCards
            header="Flow Blockchain Explorers"
            cards={explorers}
            description="Blurb aboud SDK's here lorem ipsum dolor sit amet proin."
          />
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
