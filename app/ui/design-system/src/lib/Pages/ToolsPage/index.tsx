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
            <div className="align-center mb-6 flex items-end justify-between">
              <div>
                <h2 className="text-h2 mb-4">Tools</h2>
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
              className="mt-6 w-full md:hidden"
              href="#"
            >
              View All Tools
            </ButtonLink>
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
            <div className="align-center mb-6 flex items-end justify-between">
              <div>
                <h2 className="text-h2 mb-4">SDKs</h2>
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
              className="mt-6 w-full md:hidden"
              href="#"
            >
              View All SDKs
            </ButtonLink>
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
            <h2 className="text-h2 mb-4">APIs and Service</h2>
            <p className="mb-6 text-primary-gray-300">
              Hosted APIs that provide access to the Flow network and related
              data (NFTs, events, etc).
            </p>
            <div className="grid grid-flow-col gap-4 overflow-x-scroll pb-6">
              {apis &&
                apis.map((api: TutorialCardProps, index: number) => (
                  <TutorialCard {...api} key={index} />
                ))}
            </div>
          </div>
        </PageSection>

        <PageSection>
          <div className="container">
            <h4 className="text-h4 mb-4">Explore More Content</h4>
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
