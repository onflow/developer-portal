import clsx from 'clsx';
import React, { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ReactComponent as CopyIcon } from '../../../../images/action/copy.svg';
import { ReactComponent as ChevronUpIcon } from '../../../../images/arrows/chevron-up.svg';
import { ReactComponent as ChevronDownIcon } from '../../../../images/arrows/chevron-down.svg';

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
      className="hidden group-hover:hidden md:group-hover:block"
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
  const cardStyles = clsx(
    'flex-col items-center justify-between px-4 py-6 rounded-2xl hover:shadow-2xl md:px-8',
    {
      'bg-white dark:bg-primary-dark-gray': isExpanded,
      'dark:bg-black': !isExpanded,
    }
  );

  return (
    <div className={cardStyles} onClick={() => setIsExpanded(!isExpanded)}>
      <div
        className="flex justify-between px-2 ease-in cursor-pointer"
        tabIndex={0}
        role="button"
        aria-pressed="false"
      >
        <div className="flex items-center">
          <span className="pr-4 text-xl text-2xl font-bold">{heading}</span>
          <span className="pl-4 border-l border-primary-gray-100 text-primary-gray-300">
            {format(timestamp, 'MMMM d')}
          </span>
        </div>
        <div className="dark:text-primary-gray-200">
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
      </div>
      {isExpanded && (
        <div className="flex-col pt-4 pb-2">
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
    <div className="flex-col items-center justify-between px-4 py-6 bg-white rounded-2xl dark:bg-primary-dark-gray md:px-8">
      <div className="flex flex-col justify-start px-2 md:flex-row">
        <span className="text-xl text-2xl font-bold md:pr-4">{heading}</span>
        <hr className="inline-block w-6 my-4 md:hidden" />
        <span className="border-primary-gray-100 md:border-l md:pl-4">
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
