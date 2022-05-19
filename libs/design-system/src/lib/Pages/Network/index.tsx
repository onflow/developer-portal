import React from "react";
import { startOfDay } from 'date-fns';
import { NetworkCard } from "../../Components";
import AnnouncementCard from "../../Components/AnnouncementCard";

const NetworkPage = () => {
  return (
    <div>
      <div className="flex-col">
        <h1 className="text-h1">
          Network status
        </h1>

        <div className="flex-col p-2 my-8 gap-y-2">
          <NetworkCard
            networkName="Mainnet"
            status="Under Maintenance"
            version="33"
            lastSporkDate="April, 2022"
            nextSporkDate="April, 2022"
            link="https://google.com" />

          <NetworkCard
            networkName="Testnet"
            status="Healthy"
            version="33"
            lastSporkDate="April, 2022"
            nextSporkDate="April, 2022"
            link="https://google.com" />

          <NetworkCard
            networkName="Canary"
            status="Healthy"
            version="33"
            lastSporkDate="April, 2022"
            nextSporkDate="April, 2022"
            link="https://google.com"
          />
        </div>

        <h3 className="text-h3">
          Live updates
        </h3>

        <h3 className="text-h3">
          Announcements
        </h3>
        <div className="flex-col">
          <AnnouncementCard sourceIcon='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
            sourceAltText='Github'
            heading='Breaking Change: Bugfix for Cadence Resource Owner Field'
            timestamp={startOfDay(new Date())}
            link='https://google.com' />

          <AnnouncementCard sourceIcon='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
            sourceAltText='Github'
            heading='Holy shit Github is down'
            timestamp={startOfDay(new Date())}
            link='https://google.com' />

          <AnnouncementCard sourceIcon='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
            sourceAltText='Github'
            heading='Breaking Change: Bugfix for Cadence Resource Owner Field'
            timestamp={startOfDay(new Date())}
            link='https://google.com' />
        </div>
      </div>
    </div>
  )
};

export default NetworkPage;
