import React from 'react';
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
      className="flex flex-col items-start items-center justify-around px-8 py-6 bg-white rounded-lg dark:bg-primary-dark-gray px-11 hover:cursor-pointer hover:shadow-2xl md:flex-row"
    >
      <div className="flex-1">
        <p className="mb-2 text-xl font-semibold">{heading}</p>
        <span className="text-primary-gray-300">{subheading}</span>
      </div>
      <div className="flex items-center justify-between mt-8 md:mt-0">
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
        <div className="flex items-center ml-3 ml-9 text-primary-gray-300 dark:text-primary-gray-100">
          <CommentIcon />
          <span className="ml-3">{numComments}</span>
        </div>
      </div>
    </a>
  );
};

export default ForumCell;
