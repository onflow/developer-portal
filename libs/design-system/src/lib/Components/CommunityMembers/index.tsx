import React from 'react';
import { RoundImage } from '../';

export type CommunityMembersProps = {
  authors: any;
  contributors: any;
};

const CommunityMembers = ({ authors, contributors }: CommunityMembersProps) => {
  return (
    <div className="flex flex-col justify-between rounded-lg bg-white px-6 py-9 dark:bg-primary-gray-dark md:max-h-[364px] md:flex-row md:px-12 md:py-8">
      <div className="flex-col">
        <div className="text-primary-gray-300">Meet the authors</div>
        <div className="flex-col mt-4">
          {authors.map(({ profileImage, name, title }, index: number) => (
            <div key={index} className="flex items-center py-2">
              <RoundImage imageUri={profileImage} altText={name} large />
              <div className="flex-col ml-4">
                <h6 className="font-semibold">{name}</h6>
                <div className="text-primary-gray-300">{title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-col mt-4 md:ml-4 md:mt-0 md:pl-4">
        <div className="text-primary-gray-300">Community contributors</div>
        <div className="grid grid-flow-row grid-cols-4 gap-2 mt-4 md:grid-cols-9 md:gap-4">
          {contributors.map(({ profileImage, name }, index: number) => (
            <RoundImage
              key={index}
              imageUri={profileImage}
              altText={name}
              large
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityMembers;
