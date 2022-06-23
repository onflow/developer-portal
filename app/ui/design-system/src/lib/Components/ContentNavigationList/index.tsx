import { ContentNavigation, ContentNavigationProps } from "../ContentNavigation"

export interface ContentNavigationListProps {
  header: string
  contentNavigationItems: ContentNavigationProps[]
}

export function ContentNavigationList({
  contentNavigationItems,
  header,
}: ContentNavigationListProps) {
  return (
    <div className="container">
      <h4 className="text-h2 pb-10">{header}</h4>
      <div
        className={`grid grid-cols-1 gap-4 md:grid-cols-${contentNavigationItems.length} md:gap-8`}
      >
        {contentNavigationItems.map(
          (contentNav: ContentNavigationProps, index: number) => (
            <ContentNavigation key={index} {...contentNav} />
          )
        )}
      </div>
    </div>
  )
}
