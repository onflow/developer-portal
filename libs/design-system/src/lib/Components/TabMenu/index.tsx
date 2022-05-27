import clsx from 'clsx';
import React, { useState } from 'react';

export type TabMenuProps = {
  tabs: string[];
};

const TabMenu = ({ tabs }: TabMenuProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="border-b-2 flex justify-center border-primary-gray-200 dark:border-primary-gray-100">
      {tabs.map((tab, index) => {
        const classes = clsx('hover:cursor-pointer py-6 px-12', { 'border-b-4 border-b-black font-bold dark:border-b-white': activeIndex === index })
        return  <span key={tab}  className={classes} onClick={() => setActiveIndex(index)}>{tab}</span>
      })}
    </div>
  );
};

export default TabMenu;
