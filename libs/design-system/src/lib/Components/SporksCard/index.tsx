import React, { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ReactComponent as CopyIcon } from '../../../../images/action/copy.svg';
import { ReactComponent as ChevronUpIcon } from '../../../../images/arrows/chevron-up.svg';

export type SporkMetadata = {
  accessNode: string;
  date: Date;
  rootHeight: string;
  rootParentId: string;
  rootStateCommit: string;
  gitCommit: string;
  branchOrTag: string;
  dockerTag: string;
};

export type SporksCardProps = {
  heading: string;
  timestamp: Date;
  sporkMetadata: SporkMetadata;
  upcoming: boolean;
};

const CardItem = ({ label, data }: { label: string; data: any }) => (
  <div className="flex items-center justify-between p-4 group hover:cursor-pointer hover:bg-gray-50 ">
    <div className="break-all">
      <span className="block uppercase text-primary-gray-300">{label}</span>
      {data}
    </div>
    <div
      className="hidden group-hover:hidden md:group-hover:block"
      title={`Copy ${data}`}
      onClick={() => navigator.clipboard.writeText(data.toString())}
    >
      <CopyIcon />
    </div>
  </div>
);

const Spork = ({ heading, timestamp, sporkMetadata }) => {
  const {
    accessNode,
    date,
    rootHeight,
    rootParentId,
    rootStateCommit,
    gitCommit,
    branchOrTag,
    dockerTag,
  } = sporkMetadata;
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex-col items-center justify-between px-2 py-4 bg-white rounded-2xl px-11 hover:shadow-2xl dark:bg-primary-dark-gray">
      <div
        className="flex justify-between px-2 ease-in cursor-pointer"
        tabIndex={0}
        role="button"
        aria-pressed="false"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <span className="text-xl text-2xl font-bold">{heading}</span>
          <span className="ml-12">{format(timestamp, 'MMMM d')}</span>
        </div>
        {isExpanded && (
          <div className="mt-2">
            <ChevronUpIcon />
          </div>
        )}
      </div>
      {isExpanded && (
        <div className="flex-col py-4">
          <CardItem label="Access Node" data={accessNode} />
          <CardItem label="Date" data={format(date, 'LLL d, yyyy')} />
          <CardItem label="Root Height" data={rootHeight} />
          <CardItem label="Root Parent ID" data={rootParentId} />
          <CardItem label="Root State Commit" data={rootStateCommit} />
          <CardItem label="Git Commit" data={gitCommit} />
          <CardItem label="Branch / Tag" data={branchOrTag} />
          <CardItem label="Docker Tag" data={dockerTag} />
        </div>
      )}
    </div>
  );
};

const UpcomingSpork = ({ heading, timestamp }) => {
  return (
    <div className="flex-col items-center justify-between px-2 py-4 bg-white rounded-2xl px-11 dark:bg-primary-dark-gray">
      <div className="flex justify-between px-2">
        <div className="flex items-center">
          <span className="text-xl text-2xl font-bold">{heading}</span>
          <span className="ml-12">
            Coming in {formatDistanceToNow(timestamp)} (
            {format(timestamp, 'MMMM d')} 8-9AM PST)
          </span>
        </div>
      </div>
    </div>
  );
};

const SporksCard = ({
  heading,
  timestamp,
  sporkMetadata,
  upcoming,
}: SporksCardProps) => {
  return upcoming ? (
    <UpcomingSpork heading={heading} timestamp={timestamp} />
  ) : (
    <Spork
      heading={heading}
      timestamp={timestamp}
      sporkMetadata={sporkMetadata}
    />
  );
};

export default SporksCard;
