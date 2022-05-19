import React from 'react';

export type TagProps = {
  name: string;
}

const Tag = ({ name }: TagProps) =>
  <span className="rounded py-px px-1 bg-primary-gray-50 text-primary-blue mr-2 dark:bg-primary-gray-200">#{name}</span>

export default Tag;
