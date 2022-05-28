import React from 'react';
import { ReactComponent as CommentIcon } from '../../../../images/arrows/message-circle.svg';
import { ReactComponent as CalendarIcon } from '../../../../images/action/date-calendar.svg';
import RoundImage from './RoundImage';
import Tag from './Tag';

export type User = {
  profilePicture: string;
  name: string;
};

export type FlipCellProps = {
  numComments: number;
  heading: string;
  tags: string[];
  participant: User;
  date: string;
  forumLink: string;
};

const FlipCell = ({
  heading,
  tags,
  participant,
  numComments,
  date,
  forumLink,
}: FlipCellProps) => {
  return (
    <a
      href={forumLink}
      className="flex flex-col items-center justify-between p-6 bg-white rounded-lg hover:cursor-pointer hover:shadow-2xl dark:bg-primary-dark-gray md:flex-row md:p-8"
    >
      <div className="flex items-center">
        <svg
          className="hidden md:inline-flex"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="18" cy="18" r="17.5" stroke="#47FFB2" />
          <circle cx="18" cy="18" r="5.5" fill="#47FFB2" stroke="#47FFB2" />
        </svg>
        <div className="ml-0 md:ml-4">
          <p className="mb-1 text-lg font-semibold md:text-xl">{heading}</p>
          <span className="text-primary-gray-300">
            {tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </span>
        </div>
      </div>
      <div className="flex items-center mt-12 md:mt-0">
        <div className="w-28">
          <RoundImage
            imageUri={participant.profilePicture}
            altText={participant.name}
          />
        </div>
        <div className="flex space-between text-primary-gray-300">
          <CalendarIcon /> {date}
        </div>
        <div className="flex ml-3 text-primary-gray-300">
          <CommentIcon /> <span className="ml-3">{numComments}</span>
        </div>
      </div>
    </a>
  );
};

export default FlipCell;
