import {
  add,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { useEffect, useState } from 'react';

/**
 * Returns the duration between the current time and the given end date,
 * as the number of days, hours, minutes and seconds remaining.
 *
 * This is the same implementation as the date-fns `intervalToDuration`
 * function with the following differences:
 * - The "start" date is always the current date.
 * - Days are the largest unit, omitting years, months, and weeks.
 * - If we are past the `end` date we return `undefined` instead of throwing a `RangeError`.
 *
 * @see https://github.com/date-fns/date-fns/blob/master/src/intervalToDuration/index.ts
 */
const calculateDuration = (end: Date) => {
  const start = new Date();
  const duration: Omit<Duration, 'years' | 'months' | 'weeks'> = {};

  if (start > end) {
    return undefined;
  }

  duration.days = differenceInDays(end, start);

  const remainingHours = add(start, { days: duration.days });
  duration.hours = differenceInHours(end, remainingHours);

  const remainingMinutes = add(remainingHours, { hours: duration.hours });
  duration.minutes = differenceInMinutes(end, remainingMinutes);

  const remainingSeconds = add(remainingMinutes, { minutes: duration.minutes });
  duration.seconds = differenceInSeconds(end, remainingSeconds);

  return duration;
};

type CountdownSegmentProps = {
  value?: number;
  unit: string;
};

function CountdownSegment({ value = 0, unit }: CountdownSegmentProps) {
  return (
    <span>
      {value.toFixed(0).padStart(2, '0')} {unit}
    </span>
  );
}

export type CountdownTimerProps = {
  className?: string;
  end: Date;
};

/**
 * Renders a timer that counts down the number of days, hours, minutes,
 * and seconds until the given `end` value, updating every second.
 *
 * To use a specific date/time in a particular time zone, first convert the date/time
 * to UTC (using, for example: https://www.timeanddate.com/worldclock/converter.html?iso=20220616T030000&p1=tz_pt&p2=1440)
 * and create the `Date` object passed to the `end` prop using `UTC.Date`.
 *
 * @example
 * This creates a countdown timer from 6/15/2022 8pm PDT:
 * ```tsx
 * <CountdownTimer end={new Date(Date.UTC(2022, 5, 16, 3, 0, 0))} />
 * ```
 */
export function CountdownTimer({ end, ...props }: CountdownTimerProps) {
  const [duration, setDuration] = useState(calculateDuration(end));

  useEffect(() => {
    // Ensures an immediate update when/if the `end` prop is changed.
    setDuration(calculateDuration(end));

    const intervalId = setInterval(() => {
      const nextDuration = calculateDuration(end);
      setDuration(nextDuration);

      if (nextDuration === undefined) {
        // No need to keep updating at this point - we've passed the end date.
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [end]);

  return (
    <span {...props}>
      <CountdownSegment unit="days" value={duration?.days} />{' '}
      <CountdownSegment unit="hours" value={duration?.hours} />{' '}
      <CountdownSegment unit="mins" value={duration?.minutes} />{' '}
      <CountdownSegment unit="secs" value={duration?.seconds} />
    </span>
  );
}
