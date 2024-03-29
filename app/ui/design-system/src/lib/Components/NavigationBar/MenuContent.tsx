import clsx from "clsx"
import { IntroCardCarousel } from "./IntroCardCarousel"
import { MenuContentGrid } from "./MenuContentGrid"
import { SectionHeading } from "./SectionHeading"
import { SectionLinkList } from "./SectionLinkList"
import { SubsectionLink } from "./SubsectionLink"
import { Menu } from "./types"

export type MenuContentProps = Menu & {
  className?: string

  /**
   * `true` if this is being rendered as part of a higher-level tab.
   */
  isTabContent?: boolean
}

export function MenuContent({
  className,
  cards = [],
  isTabContent = false,
  sections,
}: MenuContentProps) {
  const isSingleSection = sections.length === 1
  const hasCards = cards.length > 0
  const contentClasses = clsx(
    "flex h-full flex-col gap-6 bg-white p-4 dark:bg-primary-gray-dark md:flex-row min-h-[460px]",
    className
  )
  return (
    <div className={contentClasses}>
      {cards.length > 0 && (
        <div>
          <IntroCardCarousel cards={cards} />
        </div>
      )}
      {isSingleSection ? (
        // Special case: In the event of a single (potentially large) section,
        // allow the individual items within the section to span multiple
        // columns.
        <div className="items-justify-between flex w-full flex-col">
          <MenuContentGrid hasCards={hasCards} isTabContent={isTabContent}>
            <SectionHeading
              className="col-span-full mb-2"
              title={sections[0]!.title}
              icon={sections[0]!.icon}
            />
            {sections[0]?.subSections?.map((subsection, index) => (
              <SubsectionLink
                key={index}
                href={subsection.href}
                title={subsection.title}
              />
            ))}
          </MenuContentGrid>
          {sections[0]!.links && (
            <MenuContentGrid
              className="mt-2 border-t"
              hasCards={hasCards}
              isTabContent={isTabContent}
            >
              <SectionLinkList links={sections[0]!.links} />
            </MenuContentGrid>
          )}
        </div>
      ) : (
        <MenuContentGrid
          className="flex-1 gap-4 md:gap-x-12 md:gap-y-8"
          hasCards={cards.length > 0}
          isTabContent={isTabContent}
        >
          {sections.map(
            (
              {
                links,
                subSections,
                subSectionComponent: SubSection,
                title,
                icon,
              },
              sectionIndex
            ) => (
              <div key={sectionIndex} className="flex flex-col justify-between">
                <div>
                  <SectionHeading title={title} icon={icon} />
                  <div className="mt-2 flex flex-col gap-y-1">
                    {subSections &&
                      subSections.map((subsection, subSectionIndex) => (
                        <SubsectionLink
                          key={subSectionIndex}
                          href={subsection.href}
                          title={subsection.title}
                        />
                      ))}
                    {SubSection && <SubSection />}
                  </div>
                </div>
                {links && (
                  <SectionLinkList
                    className="border-t border-primary-gray-100 dark:border-primary-gray-400"
                    links={links}
                  />
                )}
              </div>
            )
          )}
        </MenuContentGrid>
      )}
    </div>
  )
}
