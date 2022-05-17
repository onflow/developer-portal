import clsx from 'clsx';
import React from 'react';
import { format } from 'date-fns';
import { ChevronIcon } from '../icons';

export type SporkMetadata = {
  accessNode: string;
  date: Date;
  rootHeight: string;
  rootParentId: string;
  rootStateCommit: string;
  gitCommit: string;
  branchOrTag: string;
  dockerTag: string;
}

export type SporksCardProps = {
  heading: string;
  timestamp: Date;
  sporkMetadata: SporkMetadata;
}

const SporksCard = ({ heading, timestamp, sporkMetadata }: SporksCardProps) => {
  return (
    <div className="bg-white rounded-2xl flex-col items-center py-4 px-11 justify-between dark:bg-gray-800">
      <div className="flex justify-between">
        <h2>{heading}</h2>
        <span className="ml-2">{format(timestamp, 'MMMM d')}</span>
        <ChevronIcon />
      </div>
      <div className='flex-col'>
        <div>
          <p>Access Node</p>
          {sporkMetadata.accessNode}
        </div>
        <div>
          <p>Date</p>
          {format(sporkMetadata.date, 'LLL d, yyyy')}
        </div>
        <div>
          <p>Root Height</p>
          {sporkMetadata.rootHeight}
        </div>
        <div>
          <p>Root Parent ID</p>
          {sporkMetadata.rootParentId}
        </div>
        <div>
          <p>Root State Commit</p>
          {sporkMetadata.rootStateCommit}
        </div>
        <div>
          <p>Git Commit</p>
          {sporkMetadata.gitCommit}
        </div>
        <div>
          <p>Branch / Tag</p>
          {sporkMetadata.branchOrTag}
        </div>
        <div>
          <p>Docker Tag</p>
          {sporkMetadata.dockerTag}
        </div>
      </div>
    </div>
  )
}

export default SporksCard;
