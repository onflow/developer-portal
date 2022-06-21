import {
  ContentNavigation,
  ContentNavigationProps,
} from "../../Components/ContentNavigation"
import { LandingHeader } from "../../Components/LandingHeader"
import { SDKCardProps } from "../../Components/SDKCard"
import { SDKCards } from "../../Components/SDKCards"
import { ToolCardProps } from "../../Components/ToolCard"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"
// import Arches from "../../../../images/misc/arches.png"

export type ToolsPageProps = {
  tools: ToolCardProps[]
  sdks: SDKCardProps[]
  explorers: SDKCardProps[]
  apisAndServices: SDKCardProps[]
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
  apisAndServices,
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
            description="Libraries that make it easy to connect to Flow in multiple languages and frameworks."
          />
        </PageSection>
        <PageSection>
          <SDKCards
            header="APIs & Services"
            cards={apisAndServices}
            description="Hosted and open source services that abstract some of the most difficult parts of building on the blockchain."
          />
        </PageSection>
        <PageSection>
          <SDKCards
            header="Flow Blockchain Explorers"
            cards={explorers}
            description="Different ways of looking up on-chain metrics, events, transactions, accounts, and more."
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
