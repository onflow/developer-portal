import { endOfWeek } from "date-fns"
import { useState } from "react"
import { ReactComponent as ChevronLeftIcon } from "../../../../images/arrows/chevron-left"
import {
  Callout,
  Footer,
  NetworkDetailsCard,
  Pagination,
  SocialLinksSignup,
  SporksCard,
  TabMenu,
} from "../../Components"
import { FeaturedArticle } from "../../Components/FeaturedArticleSlider"
import { Article, StatuspageApiResponse } from "../../interfaces"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"

export type NetworkDetailPageProps = {
  networkStatuses: StatuspageApiResponse[]
  networkName: string
  featuredArticle: Article
}

const NetworkDetailPage = ({
  networkName,
  networkStatuses,
  featuredArticle,
}: NetworkDetailPageProps) => {
  const convertedName = networkName
    .split("-")
    .map((name) => name[0].toUpperCase() + name.slice(1))
    .join(" ")
  const defaultIndex = networkStatuses.findIndex((object) => {
    return object.name === convertedName
  })
  const [selectedNetworkIndex, setSelectedNetworkIndex] = useState(defaultIndex)
  const tabs = networkStatuses.map((network: StatuspageApiResponse) => ({
    name: network.name,
    link: convertedName,
  }))
  const currentNetwork = networkStatuses[selectedNetworkIndex]

  return (
    <PageBackground>
      <PageSections divided={false}>
        <PageSection>
          <div className="container relative">
            <a
              href="/network"
              className="absolute top-[110px] right-0 flex max-w-fit text-primary-blue hover:opacity-75 dark:text-blue-dark md:right-auto md:top-0 md:left-0 md:py-6"
            >
              <ChevronLeftIcon /> Network
            </a>
          </div>
          <TabMenu
            tabs={tabs}
            defaultTabIndex={selectedNetworkIndex}
            onTabChange={setSelectedNetworkIndex}
            centered
          />
          <div className="text-h3 md:text-h1 mt-16 mb-14 md:text-center md:text-5xl">
            {currentNetwork.name}
          </div>
          <NetworkDetailsCard
            status={
              currentNetwork.status === "operational"
                ? "Healthy"
                : "Under Maintenance"
            }
            statusLink="https://google.com"
            version="33"
            lastSporkDate="April, 2022"
            nextSporkDate="April, 2022"
            rssFeed="/link"
          />
        </PageSection>
        <PageSection>
          <div className="container">
            <div className="text-h2 xs:font-md mb-8">Upcoming Spork</div>
            <SporksCard
              heading={currentNetwork.name}
              timestamp={endOfWeek(new Date())}
              sporkMetadata={{
                accessNode: "access-001.mainnet15.nodes.onflow.org:9000",
                date: new Date(),
                rootHeight: "19050753",
                rootParentId:
                  "ac4dbf344ce96e39e15081f1dc3fbbf6dc80532e402de9a57af847d3b35df596",
                rootStateCommit:
                  "641eb088e3ce1a01ff56df2d3a14372c65a7fef44c08799eb92cd7759d1d1d2a",
                gitCommit: "f019c1dbd778ce9f92dea61349ca36003678a9ad",
                branchOrTag: "v0.22.9-patch-1-epoch-view-check-hotfix",
                dockerTag: "v0.22.9-patch-1-epoch-view-check-hotfix",
              }}
              upcoming
            />
          </div>
        </PageSection>
        <PageSection>
          <div className="container">
            <div className="text-h4 xs:font-md mb-8">Past Sporks</div>
            <div className="mb-4 divide-y dark:divide-primary-gray-400">
              {[1, 2, 3, 4].map((index) => (
                <div className="divided-item-hover" key={index}>
                  <SporksCard
                    heading={currentNetwork.name}
                    timestamp={endOfWeek(new Date())}
                    sporkMetadata={{
                      accessNode: "access-001.mainnet15.nodes.onflow.org:9000",
                      date: new Date(),
                      rootHeight: "19050753",
                      rootParentId:
                        "ac4dbf344ce96e39e15081f1dc3fbbf6dc80532e402de9a57af847d3b35df596",
                      rootStateCommit:
                        "641eb088e3ce1a01ff56df2d3a14372c65a7fef44c08799eb92cd7759d1d1d2a",
                      gitCommit: "f019c1dbd778ce9f92dea61349ca36003678a9ad",
                      branchOrTag: "v0.22.9-patch-1-epoch-view-check-hotfix",
                      dockerTag: "v0.22.9-patch-1-epoch-view-check-hotfix",
                    }}
                  />
                </div>
              ))}
            </div>
            <Pagination
              itemCount={40}
              pageSize={4}
              page={1}
              setPage={() => null}
            />
          </div>
        </PageSection>
        <PageSection>
          <div className="container">
            <div className="self-center">
              <FeaturedArticle {...featuredArticle} />
            </div>
          </div>
        </PageSection>
        <PageSection>
          <div className="container">
            <Callout
              heading="Spork FAQ"
              description="Lorem ipsum dolor sit amet proin gravida lorem ipsum"
              ctaText="View FAQ"
              ctaLink="https://flow.com"
            />
          </div>
        </PageSection>
      </PageSections>
      <SocialLinksSignup />
      <Footer />
    </PageBackground>
  )
}

export default NetworkDetailPage
