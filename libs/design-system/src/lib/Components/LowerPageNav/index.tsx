import React from "react"
import { LowerPageNavLink } from './LowerPageNavLink';

export type LowerPageNavLink = {
  name: string;
  href: string;
};

export type LowerPageNavProps = {
  prev: LowerPageNavLink;
  next: LowerPageNavLink;
};

export function LowerPageNav({ prev, next }: LowerPageNavProps) {
  return (
    <div className="flex flex-wrap flex-1 p-6 place-content-between">
      {!!prev && <LowerPageNavLink link={prev} />}
      {!!next && <LowerPageNavLink link={next} next={true} />}
    </div>
  );
}
