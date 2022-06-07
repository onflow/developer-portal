import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { LandingHeader } from '../../Components/LandingHeader';
import { LinkCard2Column } from '../../Components/LinkCard2Column';
import { ReactComponent as CadenceIcon } from '../../../../images/tools/tool-cadence.svg';
import { ReactComponent as FCLIcon } from '../../../../images/tools/tool-fcl.svg';
import { SocialLinksSignup } from '../../Components';
import { SDKCard } from '../../Components/SDKCard';
import { Button } from '../../Components/Button';
import FeaturedArticleCard from '../../Components/FeaturedArticleCard';
import { ToolCard } from '../../Components/ToolCard';
import { ContentNavigation } from '../../Components/ContentNavigation';
import { LinkCard3Column } from '../../Components/LinkCard3Column';
import { ReactComponent as GitHubIcon } from '../../../../images/social/github.svg';
import { ReactComponent as DiscordIcon } from '../../../../images/social/discord.svg';
import { svgToDataUri } from '../../Components/LinkCard2Column/LinkCard2Column.stories';

const Icon1 = () => (
  <svg
    width="38"
    height="42"
    viewBox="0 0 38 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.543 22.4783V18.8572L18.9988 16.9147L22.4545 18.8572V22.4783L18.9988 24.4208L15.543 22.4783Z"
      stroke="#69717E"
      strokeWidth="0.5"
    />
    <path d="M16 22V19.5L18.5 21V23.5L16 22Z" fill="#69717E" stroke="#69717E" />
    <path
      d="M11.6768 16.6911L18.9498 12.4414L26.3221 16.6921V24.957L18.9497 29.1318L11.6768 24.958V16.6911Z"
      stroke="#69717E"
      strokeWidth="0.5"
    />
    <path
      d="M8.22657 14.6674L18.9998 8.60136L29.7731 14.6674V26.634L18.9998 32.6499L8.22656 26.634L8.22657 14.6674Z"
      stroke="#69717E"
      strokeWidth="0.5"
    />
    <path
      d="M11.5889 16.6191L8.20522 14.6755"
      stroke="#69717E"
      strokeWidth="0.5"
    />
    <path
      d="M26.3965 16.6279L29.8747 14.6297"
      stroke="#69717E"
      strokeWidth="0.5"
    />
    <path d="M19 29.1855L19 32.6758" stroke="#69717E" strokeWidth="0.5" />
    <path
      d="M33.1797 12.7314L36.8855 10.6025"
      stroke="#69717E"
      strokeWidth="0.5"
    />
    <path
      d="M4.82031 12.7314L1.11453 10.6025"
      stroke="#69717E"
      strokeWidth="0.5"
    />
    <path
      d="M4.87767 12.7761L18.9998 4.764L33.1218 12.7761V28.7929L18.9998 36.805L4.87767 28.7929V12.7761Z"
      stroke="#69717E"
      strokeWidth="0.5"
    />
    <path
      d="M1.25 10.6294L19 0.289326L36.75 10.6294V31.0326L19 41.2805L1.25 31.0326L1.25 10.6294Z"
      stroke="#69717E"
      strokeWidth="0.5"
    />
  </svg>
);

const Icon2 = () => (
  <svg
    width="33"
    height="37"
    viewBox="0 0 33 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.02727 27.9036L16.7178 36.7266L31.6204 28.1226L32.8176 9.55968L16.8366 0.237935L0.944936 9.41299L1.02727 27.9036ZM9.52072 5.11211L1.78834 9.57641L7.95206 13.1717L15.7803 8.65211L9.52072 5.11211ZM10.0869 4.78524L16.8351 0.889131L22.9989 4.48445L16.3464 8.32524L10.0869 4.78524ZM16.9155 8.64706L23.5592 4.81129L31.9643 9.71399L25.4512 13.4743L16.9155 8.64706ZM25.7302 13.9636L32.2104 10.2222L31.5787 20.0171L25.4914 23.5316L25.7302 13.9636ZM24.9198 23.8617L25.1586 14.2936L17.1965 18.8905L17.0893 28.3331L17.133 28.3574L24.9198 23.8617ZM25.475 24.1915L31.5352 20.6926L31.0777 27.7855L25.3021 31.1201L25.475 24.1915ZM24.7304 31.4501L24.9033 24.5215L17.1384 29.0046L17.082 28.9733L17.0032 35.9114L24.7304 31.4501ZM24.885 13.8012L16.3493 8.97393L8.5124 13.4986L16.9175 18.4013L24.885 13.8012ZM8.30518 14.0297L16.6333 18.8875L16.5295 28.0224L8.34726 23.4801L8.30518 14.0297ZM8.35014 24.1259L16.5223 28.6625L16.4398 35.924L8.3825 31.3934L8.35014 24.1259ZM7.81785 31.0759L7.78551 23.8125L1.55689 20.3547L1.58903 27.5734L7.81785 31.0759ZM1.55401 19.7089L7.78263 23.1667L7.74048 13.7004L1.51108 10.0667L1.55401 19.7089Z"
      fill="#69717E"
    />
  </svg>
);

const Icon3 = () => (
  <svg
    width="36"
    height="41"
    viewBox="0 0 36 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.53199e-07 9.64258L18 20.2497V40.4997L0 30.214L4.53199e-07 9.64258Z"
      fill="#69717E"
    />
    <path
      d="M35.5 29.9241L18.5 39.6384V20.25V19.9643L18.2538 19.8192L1.02007 9.66362L18 0.567228L35.5 9.94223V29.9241Z"
      stroke="#69717E"
    />
  </svg>
);

export function GettingStartedPage() {
  return (
    <div className="bg-primary-gray-50 dark:bg-black">
      <div className="relative pb-16 md:border-b md:border-primary-gray-100 md:pb-28">
        <div className="absolute right-0 hidden h-full flex-col justify-center gap-2 pr-11 lg:flex">
          <a href="https://discord.com/invite/flow">
            <DiscordIcon />
          </a>
          <a href="https://github.com/onflow">
            <GitHubIcon />
          </a>
        </div>
        <LandingHeader
          buttonText="Button Text"
          buttonUrl="#changeme"
          callout="Featured callout here two lines"
          description="Lorem ipsum dolor sit amet proin gravida lorem ipsum dolor sit."
          gradient="getting-started"
          title="Getting Started"
        />
      </div>

      <div className="pb-11 md:border-b md:border-primary-gray-100 md:pt-20 md:pb-14">
        <div className="container">
          <h2 className="text-h2 hidden pb-14 md:block">First Steps</h2>
          <LinkCard3Column
            items={[
              {
                title: 'Try Flow',
                description:
                  'A package used to interact with user wallets and the Flow blockchain.',
                icon: <Icon1 />,
                links: [
                  {
                    title: 'Online Playground',
                    href: '#tutorial1',
                    tags: ['tutorial'],
                  },
                  {
                    title: 'Kitty Items Tutorial',
                    href: '#tutorial2',
                    tags: ['tutorial'],
                  },
                  {
                    title: 'Crypto Dappy',
                    href: '#tutorial3',
                    tags: ['tutorial'],
                  },
                  {
                    title: 'Flow Blockchain Explorer',
                    href: '#tutorial3',
                    tags: ['tutorial'],
                  },
                  {
                    title: 'Sample Smart Contracts',
                    href: '#tutorial3',
                    tags: ['tutorial'],
                  },
                  {
                    title: 'Flow Client Library',
                    href: '#tutorial3',
                    tags: ['tutorial'],
                  },
                ],
              },
              {
                title: 'Learn',
                description:
                  'An up to 3-line blurb here describing the section lorem ipsum dolor sit amet proin.',
                icon: <Icon2 />,
                links: [
                  {
                    title: 'Guide 1',
                    href: '#tutorial1',
                    tags: ['tutorial'],
                  },
                  {
                    title: 'Guide 2',
                    href: '#tutorial2',
                  },
                  {
                    title: 'An external link',
                    href: 'https://www.onflow.org',
                    tags: ['tutorial', 'external'],
                  },
                ],
              },
              {
                title: 'Start Building',
                description: 'Smart contracts description.',
                icon: <Icon3 />,
                links: [
                  {
                    title: 'Name of a Smart Contract tutorial',
                    href: '#tutorial1',
                    tags: ['tutorial'],
                  },
                  {
                    title: 'Name of a tutorial',
                    href: '#tutorial2',
                    tags: ['tag1', 'tag2', 'tag3', 'tag4'],
                  },
                  {
                    title: "View all SDK's",
                    href: '#sdks',
                  },
                ],
              },
            ]}
          />
        </div>
      </div>

      <div className="px-4 md:border-b md:border-primary-gray-100 md:pt-20 md:pb-28">
        <LinkCard2Column
          buttonText="View Concepts"
          buttonUrl="#changeme"
          description="Building on Flow is easy. Start building now with lorem ipsum et sigitus loranum prospitarius."
          title="Core Concepts"
          tags={['Tag', 'Lorem', 'Ipsum']}
          items={[
            {
              title: 'Cadence',
              description:
                'A package used to interact with user wallets and the Flow blockchain.',
              href: 'https://www.onflow.org',
              icon: svgToDataUri(<CadenceIcon />),
            },
            {
              title: 'Flow Client Library',
              description:
                'A package used to interact with user wallets and the Flow blockchain.',
              href: '#create-non-fungible-token',
              icon: svgToDataUri(<FCLIcon />),
            },
          ]}
        />
      </div>

      <div className="container pt-24 md:border-b md:border-primary-gray-100 md:pb-28">
        <div className="mb-9 flex items-end justify-between">
          <h2 className="text-h2">SDK's</h2>
          <Button next variant="secondary" className="hidden md:inline-flex">
            View All SDKs
          </Button>
        </div>
        <div className="mb-4 grid grid-cols-1 grid-rows-5 gap-4 md:grid-cols-2 md:grid-rows-3">
          <SDKCard
            title="Flow Port"
            authorIcon="https://avatars.githubusercontent.com/u/62387156?s=64&v=4"
            authorName="mini flow"
            tags={['Tags']}
            link="#"
            stars={52}
            toolIcon="https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png"
            lastCommit="22/3"
            lastRelease="207"
          />
          <SDKCard
            title="Flow Port"
            authorIcon="https://avatars.githubusercontent.com/u/62387156?s=64&v=4"
            authorName="mini flow"
            tags={['Tags']}
            link="#"
            stars={52}
            toolIcon="https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png"
            lastCommit="22/3"
            lastRelease="207"
          />
          <SDKCard
            title="Flow Port"
            authorIcon="https://avatars.githubusercontent.com/u/62387156?s=64&v=4"
            authorName="mini flow"
            tags={['Tags']}
            link="#"
            stars={52}
            toolIcon="https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png"
            lastCommit="22/3"
            lastRelease="207"
          />
          <SDKCard
            title="Flow Port"
            authorIcon="https://avatars.githubusercontent.com/u/62387156?s=64&v=4"
            authorName="mini flow"
            tags={['Tags']}
            link="#"
            stars={52}
            toolIcon="https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png"
            lastCommit="22/3"
            lastRelease="207"
          />
          <SDKCard
            title="Flow Port"
            authorIcon="https://avatars.githubusercontent.com/u/62387156?s=64&v=4"
            authorName="mini flow"
            tags={['Tags']}
            link="#"
            stars={52}
            toolIcon="https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png"
            lastCommit="22/3"
            lastRelease="207"
          />
          <div className="hidden md:block">
            <SDKCard
              title="Flow Port"
              authorIcon="https://avatars.githubusercontent.com/u/62387156?s=64&v=4"
              authorName="mini flow"
              tags={['Tags']}
              link="#"
              stars={52}
              toolIcon="https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png"
              lastCommit="22/3"
              lastRelease="207"
            />
          </div>
        </div>
        <Button variant="primary" className="w-full md:hidden">
          View All SDKs
        </Button>
      </div>

      <div className="pt-52 md:border md:border-primary-gray-100 md:pb-28 md:pt-20">
        <div className="container mx-auto grid grid-cols-1 gap-x-10 gap-y-4 align-middle md:grid-cols-2">
          <div className="hidden items-center md:flex">
            <h4 className="text-h4">Recent Articles</h4>
          </div>

          <div className="flex items-end justify-between md:items-center">
            <h4 className="text-h4">Recent Tools</h4>
            <Button next variant="secondary" className="hidden md:inline-flex">
              View All Tool's
            </Button>
          </div>

          <div className="hidden md:block">
            <FeaturedArticleCard
              heading="This is a featured article with two rows title"
              tags={['Tag']}
              description="Everything you need to start building on,  Flow verything you need to start building on start building on start building on"
              link="/article"
              ctaText="Click me!"
            />
          </div>

          <div className="flex flex-col gap-4 grow justify-between">
            <ToolCard
              title="Flow Port"
              authorIcon="https://avatars.githubusercontent.com/u/62387156?s=64&v=4"
              authorName="mini flow"
              tags={['Tags']}
              link="#"
              stars={52}
              toolIcon="https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png"
              description="Lorem ipsum text here can go a two liner sentence or a one liner"
            />
            <ToolCard
              title="Flow Port"
              authorIcon="https://avatars.githubusercontent.com/u/62387156?s=64&v=4"
              authorName="mini flow"
              tags={['Tags']}
              link="#"
              stars={52}
              toolIcon="https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png"
              description="Lorem ipsum text here can go a two liner sentence or a one liner"
            />
            <ToolCard
              title="Flow Port"
              authorIcon="https://avatars.githubusercontent.com/u/62387156?s=64&v=4"
              authorName="mini flow"
              tags={['Tags']}
              link="#"
              stars={52}
              toolIcon="https://cdn4.iconfinder.com/data/icons/logos-3/504/Swift-2-512.png"
              description="Lorem ipsum text here can go a two liner sentence or a one liner"
            />
            <Button variant="secondary" next className='inline-flex md:hidden'>
              View All Tools
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-36 md:border md:border-primary-gray-100 md:pt-20 md:pb-32">
        <div className="container mx-auto">
          <h4 className="text-h4 pb-5 md:pb-9">Explore More Content</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <ContentNavigation
              title="Learn"
              text="Lorem ipsum dolor sit amet proin gravida lorem ipsum"
              link="#"
              icon="learn"
            />
            <ContentNavigation
              title="Tools"
              text="Lorem ipsum dolor sit amet proin gravida lorem ipsum"
              link="#"
              icon="tools"
            />
            <ContentNavigation
              title="Concepts"
              text="Lorem ipsum dolor sit amet proin gravida lorem ipsum"
              link="#"
              icon="concepts"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-40 pb-32">
        <SocialLinksSignup />
      </div>
    </div>
  );
}
