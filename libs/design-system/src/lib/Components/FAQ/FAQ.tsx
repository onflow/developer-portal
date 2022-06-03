import React, { useState } from 'react';

import { ReactComponent as ChevronRight } from '../../../../images/arrows/chevron-right.svg';
import { ReactComponent as ChevronDown } from '../../../../images/arrows/chevron-down.svg';

export interface IFAQ {
  question: string;
  answer: string;
}

export interface FAQProps {
  faqList: IFAQ[];
  variation: 'large' | 'small';
}

export function FAQ({ faqList, variation }: FAQProps) {
  const [expanded, setExpanded] = useState(
    new Array(faqList.length).fill(false)
  );

  const toggleExpansion = (index: number) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div className="dark:bg-black">
      {faqList.map((faq, i) => {
        const itemExpanded = expanded[i];
        const isAboveExpandedItem = expanded.at(i + 1);
        const isLast = i === expanded.length - 1;

        return (
          <div // TODO: see https://github.com/onflow/next-docs-v1/pull/51#discussion_r883674775
            onClick={() => toggleExpansion(i)}
            role="button"
            className={`md:px6 cursor-pointer py-7 px-4 md:px-7 ${
              itemExpanded
                ? 'my-1.5 rounded-lg bg-white dark:bg-primary-gray-dark'
                : isLast || isAboveExpandedItem
                ? ''
                : 'border-b border-gray-200 dark:border-primary-gray-400'
            }`}
          >
            <div
              className={`flex items-center justify-between ${
                itemExpanded ? 'pb-3' : ''
              }`}
            >
              <div
                className={`${
                  itemExpanded
                    ? 'text-2xl font-semibold'
                    : 'text-base dark:text-primary-gray-100'
                } ${
                  variation === 'large' ? 'md:text-2xl md:font-semibold' : ''
                }`}
              >
                {faq.question}
              </div>
              <div className="text-gray-800 dark:text-primary-gray-100">
                {itemExpanded ? <ChevronDown /> : <ChevronRight />}
              </div>
            </div>
            {itemExpanded && (
              <div className="whitespace-pre-wrap text-gray-700 dark:text-primary-gray-200">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
