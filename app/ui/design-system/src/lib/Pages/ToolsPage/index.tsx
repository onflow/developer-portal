import { ButtonLink } from "../../Components/Button"
import { LandingHeader } from "../../Components/LandingHeader"
import PageBackground from "../shared/PageBackground"
import PageSections from "../shared/PageSections"
import PageSection from "../shared/PageSection"
import { ToolCard, ToolCardProps } from "../../Components/ToolCard"
import { SDKCard, SDKCardProps } from "../../Components/SDKCard"
import {
  ContentNavigation,
  ContentNavigationProps,
} from "../../Components/ContentNavigation"
import { SocialLinksSignup, Footer } from "../../Components"
import TutorialCard, { TutorialCardProps } from "../../Components/TutorialCard"

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
    <PageBackground>
      <PageSections className="p-4">
        <PageSection>
          <LandingHeader
            buttonText="Button Text"
            buttonUrl="#"
            callout="Featured callout here two lines"
            description="Lorem ipsum dolor sit amet proin gravida lorem ipsum dolor sit."
            gradient="tools"
            title="Tools"
          />
        </PageSection>

        <PageSection>
          <div className="container">
            <div className="flex items-end justify-between mb-6 align-center">
              <div>
                <h2 className="mb-4 text-h2">Tools</h2>
                <p className="text-primary-gray-300">
                  Blurb about tools and stuff
                </p>
              </div>
              <ButtonLink
                rightIcon="right"
                variant="secondary"
                className="hidden md:inline-flex"
                href="#"
              >
                View All Tools
              </ButtonLink>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
              {tools &&
                tools.map((tool: ToolCardProps, index: number) => (
                  <ToolCard key={index} {...tool} />
                ))}
            </div>
            <ButtonLink
              rightIcon="right"
              variant="secondary"
              className="w-full mt-6 md:hidden"
              href="#"
            >
              View All Tools
            </ButtonLink>
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
            <div className="flex items-end justify-between mb-6 align-center">
              <div>
                <h2 className="mb-4 text-h2">SDKs</h2>
                <p className="text-primary-gray-300">
                  Blurb about SDKs and stuff
                </p>
              </div>
              <ButtonLink
                rightIcon="right"
                variant="secondary"
                className="hidden md:inline-flex"
                href="#"
              >
                View All SDKs
              </ButtonLink>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
              {sdks &&
                sdks.map((sdk: SDKCardProps, index: number) => (
                  <SDKCard key={index} {...sdk} />
                ))}
            </div>
            <ButtonLink
              rightIcon="right"
              variant="secondary"
              className="w-full mt-6 md:hidden"
              href="#"
            >
              View All SDKs
            </ButtonLink>
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
            <h2 className="mb-4 text-h2">APIs and Service</h2>
            <p className="mb-6 text-primary-gray-300">
              Hosted APIs that provide access to the Flow network and related
              data (NFTs, events, etc).
            </p>
            <div className="grid grid-flow-col gap-4 pb-6 overflow-x-scroll">
              {apis &&
                apis.map((api: TutorialCardProps, index: number) => (
                  <TutorialCard {...api} key={index} />
                ))}
            </div>
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
            <h4 className="mb-4 text-h4">Explore More Content</h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {contentNavigationItems.map(
                (contentNav: ContentNavigationProps, index: number) => (
                  <ContentNavigation key={index} {...contentNav} />
                )
              )}
            </div>
          </div>
        </PageSection>
      </PageSections>

      <SocialLinksSignup />
      <Footer />
    </PageBackground>
  )
}

export default ToolsPage
