import React from 'react';
import CommentIcon from '../icons/CommentIcon';
import RoundImage from './RoundImage';
import Tag from './Tag';
import CalendarIcon from '../icons/CalendarIcon';

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
};

const FlipCell = ({ heading, tags, participant, numComments, date }: FlipCellProps) => {
  return (
    <div className="flex bg-white rounded-lg py-6 px-11 items-center space-x-8">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="17.5" stroke="#47FFB2" />
        <circle cx="18" cy="18" r="5.5" fill="#47FFB2" stroke="#47FFB2" />
      </svg>
      <div className='flex-1'>
        <p className="mb-2 text-xl font-semibold">{heading}</p>
        <span className="text-brand-gray-300">{tags.map(tag => <Tag key={tag} name={tag} />)}</span>
      </div>
      <div className="flex w-28">
        <RoundImage imageUri={participant.profilePicture} altText={participant.name} />
      </div>
      <div className="text-brand-gray-300 flex space-between"><CalendarIcon /> {date}</div>
      <div className="flex ml-3 text-brand-gray-300"><CommentIcon /> <span className="ml-3">{numComments}</span></div>
    </div >
  )
}

export default FlipCell;
