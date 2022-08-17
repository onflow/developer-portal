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
import AppLink from "../../Components/AppLink"
import { FeaturedArticle } from "../../Components/FeaturedArticleSlider"
import { HeaderWithLink } from "../../Components/HeaderWithLink"
import { SporksCardProps } from "../../Components/SporksCard"
import { Article, StatuspageApiResponse } from "../../interfaces"
import PageBackground from "../shared/PageBackground"
import PageSection from "../shared/PageSection"
import PageSections from "../shared/PageSections"
import { dateYYYYMMDD } from "../../utils/dates"

export type NetworkDetailPageProps = {
  networkStatuses: StatuspageApiResponse[]
  networkName: string
  featuredArticle: Article
  pastSporks: SporksCardProps[]
}

export const getNetworkNameFromParam = (param: string) =>
  param
    .split("-")
    .map((name) => name.slice(0, 1).toUpperCase() + name.slice(1))
    .join(" ")

const NetworkDetailPage = ({
  networkName,
  networkStatuses,
  featuredArticle,
  pastSporks,
}: NetworkDetailPageProps) => {
  const convertedName = getNetworkNameFromParam(networkName)
  const defaultIndex = networkStatuses.findIndex((object) => {
    return object.name === convertedName
  })
  const [selectedNetworkIndex, setSelectedNetworkIndex] = useState(defaultIndex)
  const tabs = networkStatuses.map((network: StatuspageApiResponse) => ({
    name: network.name,
    link: `/network/${network.name.replace(" ", "-").toLowerCase()}`,
  }))
  const currentNetwork = networkStatuses[selectedNetworkIndex]

  return (
    <PageBackground>
      <PageSections divided={false}>
        <PageSection>
          <div className="container relative">
            <AppLink
              to="/network"
              className="absolute top-[110px] right-0 flex max-w-fit text-primary-blue hover:opacity-75 dark:text-blue-dark md:right-auto md:top-0 md:left-0 md:py-6"
            >
              <ChevronLeftIcon /> Network
            </AppLink>
          </div>
          <TabMenu tabs={tabs} onTabChange={setSelectedNetworkIndex} centered />
          <div className="text-h3 md:text-h1 mt-16 mb-14 pl-4 md:text-center md:text-5xl">
            {currentNetwork?.name}
          </div>
          <NetworkDetailsCard
            status={
              currentNetwork?.status === "operational"
                ? "Healthy"
                : "Under Maintenance"
            }
            statusLink="https://status.onflow.org"
            version="33"
            lastSporkDate={
              pastSporks[0] ? dateYYYYMMDD(pastSporks[0]!.timestamp) : "N/A"
            }
            nextSporkDate="TBD"
          />
        </PageSection>
        <PageSection sectionId="upcoming-spork">
          <div className="container">
            <HeaderWithLink
              headerLink="upcoming-spork"
              className="text-h2 xs:font-md mb-8"
            >
              Upcoming Spork
            </HeaderWithLink>
            <SporksCard
              heading={currentNetwork?.name || ""}
              timestamp={endOfWeek(new Date()).toString()}
              sporkMetadata={{
                accessNode: "access-001.mainnet15.nodes.onflow.org:9000",
                date: new Date().toString(),
                rootHeight: "19050753",
                rootParentId:
                  "ac4dbf344ce96e39e15081f1dc3fbbf6dc80532e402de9a57af847d3b35df596",
                rootStateCommit:
                  "641eb088e3ce1a01ff56df2d3a14372c65a7fef44c08799eb92cd7759d1d1d2a",
                gitCommit: "f019c1dbd778ce9f92dea61349ca36003678a9ad",
              }}
              upcoming
            />
          </div>
        </PageSection>
        <PageSection sectionId="past-sporks">
          <div className="container">
            <HeaderWithLink
              headerLink="past-sporks"
              className="text-h4 xs:font-md mb-8"
            >
              Past Sporks
            </HeaderWithLink>
            <div className="mb-4 divide-y dark:divide-primary-gray-400">
              {pastSporks.map((spork, index) => (
                <div className="divided-item-hover" key={index}>
                  <SporksCard {...spork} />
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
