import { HeaderWithLink } from "../HeaderWithLink"
import { HomepageStartItem, HomepageStartItemProps } from "../HomepageStartItem"

export interface HomepageStartListProps {
  setActiveTab: (arg0: string) => void
}

export function HomepageStartList({ setActiveTab }: HomepageStartListProps) {
  const homepageHeaderItems: HomepageStartItemProps[] = [
    {
      title: "Learn Flow",
      text: "Dive into Flow key concepts through tutorials, guides, and examples",
      tab: "learn",
      icon: "learn",
      setActiveTab: setActiveTab,
    },
    {
      title: "Flow Quickstarts",
      text: "Run your frist Flow dApp in just a few clicks",
      tab: "quickstart",
      icon: "quickstart",
      setActiveTab: setActiveTab,
    },
    {
      title: "Documentation",
      text: "All the developer resources you need to build on Flow",
      tab: "documentation",
      icon: "documentation",
      setActiveTab: setActiveTab,
    },
  ]

  return (
    <div className="container">
      <HeaderWithLink headerLink={""} className="text-h2 pb-10">
        Start Building Today
      </HeaderWithLink>
      <div
        className={`grid grid-cols-1 gap-4 md:grid-cols-${homepageHeaderItems.length} md:gap-8`}
      >
        {homepageHeaderItems.map(
          (contentNav: HomepageStartItemProps, index: number) => (
            <HomepageStartItem key={index} {...contentNav} />
          )
        )}
      </div>
    </div>
  )
}
