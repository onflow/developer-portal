import { HeaderWithLink } from "../HeaderWithLink"
import { HomepageStartItem, HomepageStartItemProps } from "../HomepageStartItem"

export interface HomepageStartListProps {
  items: any
  setActiveTab: (arg0: string) => void
}

export function HomepageStartList({
  items,
  setActiveTab,
}: HomepageStartListProps) {
  return (
    <div className="container">
      <HeaderWithLink headerLink={""} className="text-h2 pb-10">
        Start Building Today
      </HeaderWithLink>
      <div
        className={`grid grid-cols-1 gap-4 md:grid-cols-${items.length} md:gap-8`}
      >
        {items.map((itemData: HomepageStartItemProps, index: number) => (
          <HomepageStartItem
            setActiveTab={setActiveTab}
            key={index}
            {...itemData}
          />
        ))}
      </div>
    </div>
  )
}
