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
        <div className="relative xs:h-[96rem] md:h-[38rem]">
          <div className="absolute z-50 w-full">
            <h1 className="text-h1">Network status</h1>

            <div className="flex-col mt-12">
              {data.map(({ name, status }: StatuspageApiResponse) => {
                return (
                  <div className="py-6">
                    <NetworkCard
                      networkName={name}
                      status={
                        status === 'operational'
                          ? 'Healthy'
                          : 'Under Maintenance'
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
          </div>

          {/* Orange gradient */}
          <div
            className="tool-gradient-fcl absolute top-0 h-[41rem] w-[56rem] xs:w-1/2 "
            style={{
              filter: 'blur(66px)',
              transform: 'matrix(0.92, 0.11, -0.46, 0.99, 0, 0)',
              opacity: 0.5,
            }}
          />

          {/* Blue gradient */}
          <div
            className="tool-gradient-emulator absolute top-0 h-[28rem] w-[48rem] xs:left-[30%] xs:w-1/2 md:left-[40%] "
            style={{
              filter: 'blur(84px)',
              transform: 'matrix(-0.97, -0.07, 0.27, -1, 0, 0)',
              opacity: 0.5,
            }}
          />
        </div>
        <div style={{ height: '100px' }}></div>

        <h3 className="text-h3">Live updates</h3>
        <div className="flex justify-between mt-6 xs:flex-col xs:gap-4 md:flex-row">
          {[1, 2, 3].map(() => (
            <NetworkDiscordCard
              message="Mainnet has been down for the past two hours"
              timestamp={startOfDay(new Date())}
              messageLink="https://google.com"
              username="@john_flow"
            />
          ))}
        </div>
        <div style={{ height: '100px' }}></div>

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
      <div style={{ height: '100px' }}></div>

      <div className="self-center">
        <Callout
          heading="Node operator callout"
          description="Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow"
          ctaText="Learn more"
          ctaLink="https://flow.com"
        />
      </div>

      <div className="my-24 xs:h-[57rem] md:h-[42rem]">
        <SocialLinksSignup />
      </div>

      <Footer />
    </div>
  );
};

export default NetworkPage;
