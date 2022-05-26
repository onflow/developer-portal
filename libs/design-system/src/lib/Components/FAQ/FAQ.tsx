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
    <div className="bg-transparent">
      {faqList.map((faq, i) => {
        const itemExpanded = expanded[i];
        const isAboveExpandedItem = expanded.at(i + 1);
        const isLast = i === expanded.length - 1;

        return (
          <div
            onClick={() => toggleExpansion(i)}
            className={`cursor-pointer py-7 md:px-7 ${
              itemExpanded
                ? 'my-1.5 rounded-lg bg-white'
                : isLast || isAboveExpandedItem
                ? ''
                : 'border-b border-gray-200'
            }`}
          >
            <div
              className={`flex items-center justify-between ${
                itemExpanded ? 'pb-3' : ''
              }`}
            >
              <div
                className={`${
                  itemExpanded ? 'text-2xl font-semibold' : 'text-base'
                } md:font-semibold ${variation === 'large' ? 'md:text-2xl' : ''}`}
              >
                {faq.question}
              </div>
              {itemExpanded ? <ChevronDown /> : <ChevronRight />}
            </div>
            {itemExpanded ? (
              <div className="whitespace-pre-wrap text-gray-700">
                {faq.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
