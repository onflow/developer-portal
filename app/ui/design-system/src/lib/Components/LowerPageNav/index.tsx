import { LowerPageNavLink } from "./LowerPageNavLink"

export type LowerPageNavLinkType = {
  name: string
  href: string
}

export type LowerPageNavProps = {
  prev?: LowerPageNavLinkType
  next?: LowerPageNavLinkType
}

export function LowerPageNav({ prev, next }: LowerPageNavProps) {
  return (
    <div className="flex flex-1 flex-wrap place-content-between p-6">
      {prev ? <LowerPageNavLink link={prev} /> : <span />}
      {next ? <LowerPageNavLink link={next} next={true} /> : <span />}
    </div>
  )
}
