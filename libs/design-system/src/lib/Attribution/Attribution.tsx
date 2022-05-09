import clsx from 'clsx';
import React from 'react';
import CalendarIcon from './CalendarIcon';
import ClockIcon from './ClockIcon';
import DifficultyIcon from './DifficultyIcon';

export type AttributionProps = {
  updatedDate: string;
  authorName: string;
  authorIcon?: string;
  otherAuthorsCount?: number;
  readMinutes?: number;
  difficulty?: string;
};

const Section = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={clsx('flex items-center gap-1', className)}>{children}</div>
);

export function Attribution({
  updatedDate,
  authorName,
  authorIcon,
  otherAuthorsCount,
  readMinutes,
  difficulty,
}: AttributionProps) {
  return (
    <div className="border-b-1 flex flex-col gap-2 border-b border-b-gray-400 py-3 text-xs text-gray-500 sm:flex-row sm:items-center sm:gap-4">
      <Section>
        <span className="mr-1">
          <CalendarIcon />
        </span>
        <span className="mr-1">Updated: {updatedDate} by</span>
        {!!authorIcon && <img src={authorIcon} alt={authorName} width={20} />}
        <b className="text-gray-900">{authorName}</b>{' '}
        {otherAuthorsCount
          ? `(+ ${otherAuthorsCount} other${otherAuthorsCount > 1 ? 's' : ''})`
          : ''}
      </Section>
      <Section className="gap-4 sm:gap-4">
        {!!readMinutes && (
          <Section>
            <ClockIcon /> {readMinutes} min read
          </Section>
        )}
        {!!difficulty && (
          <Section>
            <DifficultyIcon /> {difficulty}
          </Section>
        )}
      </Section>
    </div>
  );
}
