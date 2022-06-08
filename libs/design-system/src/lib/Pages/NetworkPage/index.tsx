import React from "react"
 
import { startOfDay } from 'date-fns';
import {
  NetworkCard,
  AnnouncementCard,
  Footer,
  NetworkDiscordCard,
  SocialLinksSignup,
  FeaturedArticleSlider,
} from '../../Components';
import { StatuspageApiResponse } from '../../interfaces';
import networkGradientPath from '../../../../images/gradients/network.svg';
import { Article } from '../../interfaces';
// @ts-ignore
import data from './sample';

const NetworkPage = () => {
  const article = {
    heading: 'Node operator callout',
    description:
      'Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow',
    ctaText: 'Learn more',
    ctaLink: 'https://flow.com',
    imageUrl:
      'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  } as Article;

  return (
    <div className="w-full p-6 bg-primary-gray-50 dark:bg-black">
      <div
        className="flex-col items-center bg-no-repeat"
        style={{ backgroundImage: `url(${networkGradientPath})` }}
      >
        <h1 className="text-h1 pt-[212px]">Network status</h1>

        <div className="mt-12 mb-[100px] flex-col ">
          {data.map(({ name, status }: StatuspageApiResponse) => {
            return (
              <div className="py-6">
                <NetworkCard
                  networkName={name}
                  status={
                    status === 'operational' ? 'Healthy' : 'Under Maintenance'
                  }
                  version="33"
                  lastSporkDate="April, 2022"
                  nextSporkDate="April, 2022"
                  link="https://google.com"
                />
              </div>
            );
          })}
        </div>

        <h3 className="text-h3">Live updates</h3>
        <div className="mt-6 mb-[100px] flex justify-between xs:flex-col xs:gap-4 md:flex-row">
          {[1, 2, 3].map(() => (
            <NetworkDiscordCard
              message="Mainnet has been down for the past two hours"
              timestamp={startOfDay(new Date())}
              messageLink="https://google.com"
              username="@john_flow"
            />
          ))}
        </div>

        <h3 className="text-h3">Announcements</h3>
        <div className="mb-[100px] flex-col">
          {[1, 2, 3].map(() => (
            <div className="py-4">
              <AnnouncementCard
                sourceIcon="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                sourceAltText="Github"
                heading="Holy schnikes Github is down"
                timestamp={startOfDay(new Date())}
                link="https://google.com"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="self-center">
        <FeaturedArticleSlider articles={[article]} />
      </div>

      <div className="my-24 xs:h-[57rem] md:h-[42rem]">
        <SocialLinksSignup />
      </div>

      <Footer />
    </div>
  );
};

export default NetworkPage;
