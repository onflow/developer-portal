import React from 'react';
import { startOfDay } from 'date-fns';
import {
  NetworkCard,
  AnnouncementCard,
  Footer,
  NetworkDiscordCard,
  Callout,
  SocialLinksSignup,
} from '../../Components';
import { StatuspageApiResponse } from '../../interfaces';
// @ts-ignore
import data from './sample';

const NetworkPage = () => {
  return (
    <div className="w-full">
      <div className="flex-col items-center">
        <h1 className="text-h1">Network status</h1>

        <div className="flex-col mt-12">
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
        <div style={{ height: '100px' }}></div>

        <h3 className="text-h3">Live updates</h3>
        <div style={{ height: '260px' }} className="flex justify-between mt-6">
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
        <div className="flex-col">
          {[1, 2, 3].map(() => (
            <div className="py-4">
              <AnnouncementCard
                sourceIcon="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                sourceAltText="Github"
                heading="Holy shit Github is down"
                timestamp={startOfDay(new Date())}
                link="https://google.com"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="self-center my-36">
        <Callout
          heading="Node operator callout"
          description="Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow"
          ctaText="Learn more"
          ctaLink="https://flow.com"
        />
      </div>
      <div style={{ height: '653px' }} className="my-24">
        <SocialLinksSignup />
      </div>
      <Footer />
    </div>
  );
};

export default NetworkPage;
