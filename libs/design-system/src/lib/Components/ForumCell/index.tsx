import React from 'react';
import CommentIcon from '../Icons/CommentIcon';
import RoundImage from './RoundImage';

export type User = {
  profileImage: string;
  name: string;
};

export type ForumCellProps = {
  numComments: number;
  heading: string;
  subheading: string;
  participants: User[];
};

const ForumCell = ({
  heading,
  subheading,
  participants,
  numComments,
}: ForumCellProps) => {
  return (
    <div className="flex items-center rounded-lg bg-white py-6 px-11 hover:shadow-2xl dark:bg-primary-gray-dark sm:flex-col sm:px-8 md:flex-row">
      <div className="flex-1">
        <p className="mb-2 text-xl font-semibold">{heading}</p>
        <span className="text-primary-gray-300">{subheading}</span>
      </div>
      <div className="flex justify-between sm:mt-8 md:mt-0">
        <div className="relative h-12 w-32">
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
        <div className="ml-3 flex items-center text-primary-gray-300 dark:text-primary-gray-100 sm:mt-2 md:mt-0">
          <CommentIcon /> <span className="ml-3">{numComments}</span>
        </div>
      </div>
    </div>
  );
};

export default ForumCell;
