import { RoundImage } from '../';

export type CommunityMembersProps = {
  authors: any;
  contributors: any;
};

const CommunityMembers = ({ authors, contributors }: CommunityMembersProps) => {
  return (
    <div className="container">
      <div className="flex flex-col justify-between px-6 bg-white rounded-lg py-9 dark:bg-primary-gray-dark md:flex-row md:px-20 md:py-14">
        <div className="flex min-w-[250px] flex-col">
          <div className="text-xs text-primary-gray-300">Meet the authors</div>
          <div className="flex-col mt-4">

            { // @ts-expect-error please fix
              authors.map(({ profileImage, name, title }, index: number) => (
              <div key={index} className="flex mb-4">
                <RoundImage imageUri={profileImage} altText={name} large />
                <div className="flex flex-col justify-center ml-4">
                  <h6 className="text-lg font-semibold">{name}</h6>
                  <div className="text-primary-gray-300">{title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-col mt-4 md:ml-4 md:mt-0 md:pl-4">
          <div className="text-xs text-primary-gray-300">
            Community contributors
          </div>
          <div className="flex flex-row flex-wrap gap-3 mt-4 md:gap-4">
            { // @ts-expect-error please fix
            contributors.map(({ profileImage, name }, index: number) => (
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
    </div>
  );
};

export default CommunityMembers;
