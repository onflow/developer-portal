import React from 'react';
import CommentIcon from '../icons/CommentIcon';
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
};

const ForumCell = ({ heading, subheading, participants, numComments }: ForumCellProps) => {
  return (
    <div className="flex bg-white rounded-lg py-6 px-11 items-center space-x-8">
      <div className='flex-1'>
        <p className="mb-2 text-xl font-semibold">{heading}</p>
        <span className="text-brand-gray-300">{subheading}</span>
      </div>
      <div className="flex w-28">
        {participants.map((participant) => <div className="overflow-hidden last:overflow-visible" key={participant.name}><RoundImage imageUri={participant.profilePicture} altText={participant.name} /></div>
        )}
      </div>
      <div className="flex ml-3 text-brand-gray-300"><CommentIcon /> <span className="ml-3">{numComments}</span></div>
    </div >
  )
}

export default ForumCell;
