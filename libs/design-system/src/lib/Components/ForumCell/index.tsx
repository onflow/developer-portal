import React from "react"
 
import { ReactComponent as CommentIcon } from '../../../../images/arrows/message-circle.svg';
import RoundImage from '../RoundImage';

export type User = {
  profileImage: string;
  name: string;
};

export type ForumCellProps = {
  numComments: number;
  heading: string;
  subheading: string;
  participants: User[];
  forumLink: string;
};

const ForumCell = ({
  heading,
  subheading,
  participants,
  numComments,
  forumLink,
}: ForumCellProps) => {
  return (
    <a
      href={forumLink}
      className="flex flex-col items-start items-center justify-around rounded-lg bg-white px-8 py-6 px-11 hover:cursor-pointer hover:shadow-2xl dark:bg-primary-gray-dark md:flex-row"
    >
      <div className="flex-1">
        <p className="mb-2 text-xl font-semibold">{heading}</p>
        <span className="text-primary-gray-300">{subheading}</span>
      </div>
      <div className="mt-8 flex items-center justify-between md:mt-0">
        <div className="relative left-0 h-12 w-[9rem]">
          {participants.map((participant, index) => (
            <div
              className="absolute inset-y-0"
              style={{ left: `${index * 26}px` }}
              key={participant.name}
            >
              <RoundImage
                imageUri={participant.profileImage}
                altText={participant.name}
              />
            </div>
          ))}
        </div>
        <div className="ml-3 ml-9 flex items-center text-primary-gray-300 dark:text-primary-gray-100">
          <CommentIcon />
          <span className="ml-3">{numComments}</span>
        </div>
      </div>
    </a>
  );
};

export default ForumCell;
