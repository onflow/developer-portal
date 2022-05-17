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

const SporksCard = ({ heading, timestamp, sporkMetadata }: SporksCardProps) => {
  const { accessNode, date, rootHeight, rootParentId, rootStateCommit, gitCommit, branchOrTag, dockerTag } = sporkMetadata;
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl flex-col items-center py-4 px-11 justify-between dark:bg-gray-800 sm:px-2">
      <div className="flex justify-between mb-8 ease-in cursor-pointer sm:px-2" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center">
          <span className="text-2xl font-bold sm:text-xl">{heading}</span>
          <span className="ml-12">{format(timestamp, "MMMM d")}</span>
        </div>
        {isExpanded && <div className="sm:mt-2"><UpChevronIcon /></div>}
      </div>
      {isExpanded && <div className="flex-col">
        <div className="hover:bg-gray-50 p-4 group flex justify-between items-center" onClick={() => navigator.clipboard.writeText(accessNode)}>
          <div className="break-all">
            <span className="uppercase text-primary-gray-300 block">Access Node</span>
            {accessNode}
          </div>
          <div className="hidden group-hover:block"><CopyIcon /></div>
        </div>

        <div className="hover:bg-gray-50 p-4 group flex justify-between items-center" onClick={() => navigator.clipboard.writeText(date.toString())}>
          <div>
            <span className="uppercase text-primary-gray-300 block">Date</span>
            {format(date, "LLL d, yyyy")}
          </div>
          <div className="hidden group-hover:block"><CopyIcon /></div>
        </div>

        <div className="hover:bg-gray-50 p-4 group flex justify-between items-center" onClick={() => navigator.clipboard.writeText(rootHeight)}>
          <div className="break-all">
            <span className="uppercase text-primary-gray-300 block">Root Height</span>
            {rootHeight}
          </div>
          <div className="hidden group-hover:block"><CopyIcon /></div>
        </div>

        <div className="hover:bg-gray-50 p-4 group flex justify-between items-center" onClick={() => navigator.clipboard.writeText(rootParentId)}>
          <div className="break-all">
            <span className="uppercase text-primary-gray-300 block">Root Parent ID</span>
            {rootParentId}
          </div>
          <div className="hidden group-hover:block"><CopyIcon /></div>
        </div>

        <div className="hover:bg-gray-50 p-4 group flex justify-between items-center" onClick={() => navigator.clipboard.writeText(rootStateCommit)}>
          <div className="break-all">
            <span className="uppercase text-primary-gray-300 block">Root State Commit</span>
            {rootStateCommit}
          </div>
          <div className="hidden group-hover:block"><CopyIcon /></div>
        </div>

        <div className="hover:bg-gray-50 p-4 group flex justify-between items-center" onClick={() => navigator.clipboard.writeText(gitCommit)}>
          <div className="break-all">
            <span className="uppercase text-primary-gray-300 block">Git Commit</span>
            {gitCommit}
          </div>
          <div className="hidden group-hover:block"><CopyIcon /></div>
        </div>

        <div className="hover:bg-gray-50 p-4 group flex justify-between items-center" onClick={() => navigator.clipboard.writeText(branchOrTag)}>
          <div className="break-all">
            <span className="uppercase text-primary-gray-300 block">Branch / Tag</span>
            {branchOrTag}
          </div>
          <div className="hidden group-hover:block"><CopyIcon /></div>
        </div>

        <div className="hover:bg-gray-50 p-4 group flex justify-between items-center" onClick={() => navigator.clipboard.writeText(dockerTag)}>
          <div className="break-all">
            <span className="uppercase text-primary-gray-300 block">Docker Tag</span>
            {dockerTag}
          </div>
          <div className="hidden group-hover:block"><CopyIcon /></div>
        </div>
      </div>
      }
    </div>
  )
}

export default SporksCard;
