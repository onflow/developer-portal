import React, { useState } from 'react';

import { ReactComponent as PlayCircle } from '../../../../images/action/play-circle.svg';
import { ReactComponent as Time } from '../../../../images/content/date.svg';

export interface LargeVideoCardProps {
  link: string; // NOTE: link should be in the format that youtubes site uses ie: https://www.youtube.com/watch?v=...
  title: string;
  length: number; // seconds
}

/**
 * 
 * @param param0 
 */
export function LargeVideoCard({ link, title, length }: LargeVideoCardProps) {
  const [showOverlay, setShowOverlay] = useState(true);

  const minutes = String(Math.floor(length / 60)).padStart(2, '0');
  const seconds = length % 60;

  const url = new URL(link);
  const videoId = url.searchParams.get('v');

  if (url.hostname !== 'www.youtube.com') {
    throw new Error('VideoCard only accepts youtube embeds');
  }

  return (
    <div className="relative cursor-pointer rounded-lg">
      {showOverlay ? (
        <>
          <div
            className="absolute h-full w-full overflow-hidden rounded-lg"
            onClick={() => setShowOverlay(false)}
          >
            <img
              className="h-full w-full rounded-lg object-cover transition ease-in-out hover:scale-110"
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            />
          </div>

          <div className="pointer-events-none absolute h-full w-full rounded-lg bg-black opacity-70" />

          <div className="pointer-events-none absolute grid h-full w-full place-items-center">
            <PlayCircle width={48} height={64} />
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 w-full p-6 text-white md:w-3/4">
            <div className="text-h4  line-clamp-2">{title}</div>
            <div className="items-align flex gap-2">
              <Time className="stroke-white" height={20} width={20} />
              <div className="text-base">
                {minutes}:{seconds}
              </div>
            </div>
          </div>
        </>
      ) : null}
      <iframe
        className="aspect-[1/1] w-full rounded-lg md:aspect-[16/9]"
        src={`https://www.youtube.com/embed/${videoId}${
          showOverlay ? '' : '?autoplay=1'
        }`}
      />
    </div>
  );
}
