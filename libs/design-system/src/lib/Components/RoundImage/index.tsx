import React from 'react';
import clsx from 'clsx';

export type RoundImageProps = {
  imageUri: string;
  altText: string;
  large?: boolean;
};

const RoundImage = ({ imageUri, altText, large = false }: RoundImageProps) => {
  const imageClasses = clsx(
    'rounded-full border-2 border-white dark:border-primary-gray-dark object-cover',
    {
      'h-14 w-14': large,
      'h-10 w-10': !large,
    }
  );

  return <img className={imageClasses} alt={altText} src={imageUri} />;
};

export default RoundImage;
