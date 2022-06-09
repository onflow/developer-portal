import { LowerPageNavLink } from './LowerPageNavLink';

export type LowerPageNavLinkType = {
  name: string;
  href: string;
};

export type LowerPageNavProps = {
  prev: LowerPageNavLinkType;
  next: LowerPageNavLinkType;
};

export function LowerPageNav({ prev, next }: LowerPageNavProps) {
  return (
    <div className="flex flex-wrap flex-1 p-6 place-content-between">
      {!!prev && <LowerPageNavLink link={prev} />}
      {!!next && <LowerPageNavLink link={next} next={true} />}
    </div>
  );
}
