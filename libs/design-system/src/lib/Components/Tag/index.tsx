import React from "react"
// TODO: Merge with Tag in pr #1

export type TagProps = {
  name: string;
};

const Tag = ({ name }: TagProps) => (
  <span className="px-1 py-1 mr-2 font-mono text-xs rounded bg-primary-gray-50 text-primary-blue dark:bg-black dark:text-blue-dark">
    #{name}
  </span>
);

export default Tag;
