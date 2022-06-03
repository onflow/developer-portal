import React from 'react';
import { LandingHeader } from '../../Components/LandingHeader';
import { LinkCard2Column } from '../../Components/LinkCard2Column';
import { ReactComponent as CadenceIcon } from '../../../../images/tools/tool-cadence-gradient.svg';
import { renderToStaticMarkup } from 'react-dom/server';
import { SocialLinksSignup } from '../../Components';
import { SDKCard } from '../../Components/SDKCard';
import { Button } from '../../Components/Button';
import FeaturedArticleCard from '../../Components/FeaturedArticleCard';
import { ToolCard } from '../../Components/ToolCard';
import { ContentNavigation } from '../../Components/ContentNavigation';
const svgToDataUri = (element: Parameters<typeof renderToStaticMarkup>[0]) => {
  const svgString = encodeURIComponent(renderToStaticMarkup(element));
  return `data:image/svg+xml,${svgString}`;
};
export function GettingStartedPage() {
  return (
    <div className="bg-slate-100 dark:bg-black">
      <div className="mb-16">
        <LandingHeader
          buttonText="Button Text"
          buttonUrl="#changeme"
          callout="Featured callout here two lines"
          description="Lorem ipsum dolor sit amet proin gravida lorem ipsum dolor sit."
          gradient="getting-started"
          title="Getting Started"
        />
      </div>

      <section>
        <h2 className="text-h2 container mx-auto hidden md:block">
          First Steps
        </h2>
      </section>

      <div className="px-4">
        <LinkCard2Column
          buttonText="Get Started"
          buttonUrl="#changeme"
          description="Building on Flow is easy. Start building now with lorem ipsum et sigitus loranum prospitarius."
          title="Start Your Project"
          tags={['Tag', 'Lorem', 'Ipsum']}
          items={[
            {
              title: 'Title Here 1 Line Only',
              description:
                'A package used to interact with user wallets and the Flow blockchain.',
              href: 'https://www.onflow.org',
              icon: svgToDataUri(<CadenceIcon />),
            },
            {
              title: 'Internal single link example',
              description:
                'This is an example of an item with a single internal link.',
              href: '#create-non-fungible-token',
              icon: '',
            },
          ]}
        />
      </div>

      <div className="container mx-auto pt-24">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-h2">SDK's</h2>
          <Button next variant='secondary'>View All SDK's</Button>
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
        <Button variant="primary" className="w-full md:hidden">
          View All SDK's
        </Button>
      </div>

      <div className="container mx-auto mt-52 grid grid-cols-1 gap-x-10 gap-y-4 align-middle md:grid-cols-2">
        <div className="hidden items-center md:flex">
          <h4 className="text-h4">Recent Articles</h4>
        </div>

        <div className="flex items-end justify-between md:items-center">
          <h4 className="text-h4">Recent Tools</h4>
          <Button next variant="secondary" className="hidden md:block">
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

        <div className="flex flex-col gap-4">
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
          <Button variant="secondary" next>
            View All Tools
          </Button>
        </div>
      </div>

      <div className="container mx-auto mt-36 mb-24">
        <h4 className="text-h4">Explore More Content</h4>
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

      <div className='container mx-auto pt-40 pb-32'>
        <SocialLinksSignup />
      </div>
    </div>
  );
}
