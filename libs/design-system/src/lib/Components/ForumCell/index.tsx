import React from 'react';
import { ReactComponent as CommentIcon } from '../../../../images/arrows/message-circle.svg';
import RoundImage from './RoundImage';

export type User = {
  profilePicture: string;
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
      className="flex items-center py-6 bg-white rounded-lg px-11 hover:cursor-pointer hover:shadow-2xl dark:bg-primary-dark-gray xs:flex-col xs:items-start xs:justify-around xs:px-8 md:flex-row"
    >
      <div className="flex-1">
        <p className="mb-2 text-xl font-semibold">{heading}</p>
        <span className="text-primary-gray-300">{subheading}</span>
      </div>
      <div className="flex justify-between xs:mt-8 xs:items-center md:mt-0">
        <div className="relative h-12 w-[9rem] xs:left-0">
          {participants.map((participant, index) => (
            <div
              className="absolute inset-y-0"
              style={{ left: `${index * 26}px` }}
              key={participant.name}
            >
              <RoundImage
                imageUri={participant.profilePicture}
                altText={participant.name}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center ml-3 text-primary-gray-300 dark:text-primary-gray-100 xs:ml-9">
          <CommentIcon />
          <span className="ml-3">{numComments}</span>
        </div>
      </div>
    </a>
  );
};

export default ForumCell;
