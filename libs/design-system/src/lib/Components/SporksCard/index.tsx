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
  upcoming?: boolean;
  isDefaultExpanded?: boolean;
};

const CardItem = ({ label, data }: { label: string; data: any }) => (
  <div className="flex items-center justify-between p-4 group hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-black">
    <div className="break-all">
      <span className="block uppercase text-primary-gray-300">{label}</span>
      {data}
    </div>
    <div
      className="hidden dark:fill-primary-gray-200 xs:group-hover:hidden md:group-hover:block"
      title={`Copy ${data}`}
      onClick={() => navigator.clipboard.writeText(data.toString())}
    >
      <CopyIcon />
    </div>
  </div>
);

const Spork = ({ heading, timestamp, sporkMetadata, isDefaultExpanded }) => {
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
  const [isExpanded, setIsExpanded] = useState(isDefaultExpanded);

  return (
    <div className="flex-col items-center justify-between py-4 bg-white rounded-2xl px-11 hover:shadow-2xl dark:bg-primary-dark-gray xs:px-2">
      <div
        className="flex justify-between ease-in cursor-pointer xs:px-2"
        tabIndex={0}
        role="button"
        aria-pressed="false"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <span className="text-2xl font-bold xs:text-xl">{heading}</span>
          <span className="ml-12">{format(timestamp, 'MMMM d')}</span>
        </div>
        {isExpanded && (
          <div className="xs:mt-2">
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
    <div className="flex-col items-center justify-between py-6 bg-white rounded-2xl px-11 dark:bg-primary-dark-gray">
      <div className="flex text-left xs:flex-col md:flex-row">
        <span className="text-2xl font-bold xs:mb-4 xs:text-xl md:mb-0">
          {heading}
        </span>
        <span className="xs:ml-0 md:ml-12">
          Coming in {formatDistanceToNow(timestamp)} (
          {format(timestamp, 'MMMM d')} 8-9AM PST)
        </span>
      </div>
    </div>
  );
};

const SporksCard = ({
  heading,
  timestamp,
  sporkMetadata,
  upcoming = false,
  isDefaultExpanded = true,
}: SporksCardProps) => {
  return upcoming ? (
    <UpcomingSpork heading={heading} timestamp={timestamp} />
  ) : (
    <Spork
      heading={heading}
      timestamp={timestamp}
      sporkMetadata={sporkMetadata}
      isDefaultExpanded={isDefaultExpanded}
    />
  );
};

export default SporksCard;
