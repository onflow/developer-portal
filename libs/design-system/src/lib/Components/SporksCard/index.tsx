import React, { useState } from "react";
import { format } from "date-fns";
import { CopyIcon, UpChevronIcon } from "../icons";

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

const CardItem = ({ label, data }: { label: string; data: any; }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 group">
    <div>
      <span className="block uppercase text-primary-gray-300">{label}</span>
      {data}
    </div>
    <div className="hidden group-hover:block hover:cursor-pointer" title={`Copy ${data}`} onClick={() => navigator.clipboard.writeText(data.toString())}><CopyIcon /></div>
  </div>
);

const SporksCard = ({ heading, timestamp, sporkMetadata }: SporksCardProps) => {
  const { accessNode, date, rootHeight, rootParentId, rootStateCommit, gitCommit, branchOrTag, dockerTag } = sporkMetadata;
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="flex-col items-center justify-between py-4 bg-white rounded-2xl px-11 dark:bg-primary-dark-gray sm:px-2 hover:shadow-2xl">
      <div className="flex justify-between ease-in cursor-pointer sm:px-2" tabIndex={0} role="button" aria-pressed="false" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center">
          <span className="text-2xl font-bold sm:text-xl">{heading}</span>
          <span className="ml-12">{format(timestamp, "MMMM d")}</span>
        </div>
        {isExpanded && <div className="sm:mt-2"><UpChevronIcon /></div>}
      </div>
      {
        isExpanded && <div className="flex-col py-4">
          <CardItem label="Access Node" data={accessNode} />
          <CardItem label="Date" data={format(date, "LLL d, yyyy")} />
          <CardItem label="Root Height" data={rootHeight} />
          <CardItem label="Root Parent ID" data={rootParentId} />
          <CardItem label="Root State Commit" data={rootStateCommit} />
          <CardItem label="Git Commit" data={gitCommit} />
          <CardItem label="Branch / Tag" data={branchOrTag} />
          <CardItem label="Docker Tag" data={dockerTag} />
        </div>
      }
    </div >
  )
}

export default SporksCard;
