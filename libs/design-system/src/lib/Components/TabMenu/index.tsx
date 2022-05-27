import clsx from 'clsx';
import React, { useState } from 'react';

export type TabMenuProps = {
  tabs: string[];
};

const TabMenu = ({ tabs }: TabMenuProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex md:justify-center border-b-2 border-primary-gray-200 dark:border-primary-gray-100 overflow-x-scroll xs:justify-start">
      {tabs.map((tab, index) => {
        const isCurrentIndex = activeIndex === index;
        const classes = clsx('hover:cursor-pointer', { 'font-bold':  isCurrentIndex });
        const indicatorClasses = clsx('bg-black rounded-tr-lg rounded-tl-lg h-2 mt-4 dark:bg-white', { 'block':  isCurrentIndex, 'hidden':  !isCurrentIndex });

        return  (
          <div key={tab} className="text-center md:min-w-[8rem] xs:min-w-[6rem]">
            <span  className={classes} onClick={() => setActiveIndex(index)}>{tab}</span>
            <div className={indicatorClasses} />
          </div>
        )
        })}
    </div>
  );
};

export default TabMenu;
