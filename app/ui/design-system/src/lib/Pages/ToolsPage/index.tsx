import { LandingHeader } from "../../Components/LandingHeader"
import { SDKCardProps } from "../../Components/SDKCard"
import { SDKCards } from "../../Components/SDKCards"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"
import ArchesImageSrc from "../../../../images/misc/arches.png"
import {
  ContentNavigationList,
  ContentNavigationListProps,
} from "../../Components/ContentNavigationList"

export type ToolsPageProps = {
  tools: SDKCardProps[]
  sdks: SDKCardProps[]
  explorers: SDKCardProps[]
  apisAndServices: SDKCardProps[]
  contentNavigationListItems: ContentNavigationListProps
}

const ToolsPage = ({
  tools,
  sdks,
  explorers,
  apisAndServices,
  contentNavigationListItems,
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
            imageSrc={ArchesImageSrc}
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
          <ContentNavigationList
            header={contentNavigationListItems.header}
            contentNavigationItems={
              contentNavigationListItems.contentNavigationItems
            }
          />
        </PageSection>
      </PageSections>
    </PageBackground>
  )
}

export default ToolsPage
