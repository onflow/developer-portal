import { Link } from "@remix-run/react"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"

interface Section {
  title: string
  elementId: string
}

export interface LandingPageSecondaryNavProps {
  sections: Section[]
}

export function LandingPageSecondaryNav({
  sections,
}: LandingPageSecondaryNavProps) {
  const sectionsRef = useRef<Record<string, IntersectionObserverEntry>>({})
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const onIntersect = (sections: IntersectionObserverEntry[]) => {
      sectionsRef.current = sections.reduce(
        (
          map: Record<string, IntersectionObserverEntry>,
          headingElement: IntersectionObserverEntry
        ) => {
          map[headingElement.target.id] = headingElement
          return map
        },
        sectionsRef.current
      )

      const visibleSections: IntersectionObserverEntry[] = []
      Object.keys(sectionsRef.current).forEach((key: string) => {
        const headingElement = sectionsRef.current[key]
        if (
          headingElement?.intersectionRatio &&
          headingElement.intersectionRatio > 0
        )
          visibleSections.push(headingElement)
      })

      if (visibleSections.length === 1 && visibleSections[0]) {
        setActiveId(visibleSections[0].target.id)
      } else if (visibleSections.length > 1) {
        // the section that has the greatest percentage in the
        // viewport gets its header item highlighted
        const sortedVisibleSections = visibleSections.sort((a, b) => {
          if (a.intersectionRatio > b.intersectionRatio) return -1
          return 0
        })

        if (sortedVisibleSections.length > 1 && sortedVisibleSections[0]) {
          setActiveId(sortedVisibleSections[0].target.id)
        }
      }
    }

    const observer = new IntersectionObserver(onIntersect, {
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })

    const sectionElements = sections.reduce(
      (sectionElementsArr: HTMLElement[], section: Section) => {
        const sectionElement = document.getElementById(section.elementId)
        if (sectionElement) sectionElementsArr.push(sectionElement)
        return sectionElementsArr
      },
      []
    )
    sectionElements.forEach((sectionElement: HTMLElement) =>
      observer.observe(sectionElement)
    )
  }, [])

  return (
    <div className="sticky top-0 z-10 hidden h-12 items-center justify-center gap-7 bg-accent-light-gray py-3 px-1 dark:bg-[#30353E] dark:text-white md:flex">
      {sections.map(({ elementId, title }, i) => (
        <Link
          to={`#${elementId}`}
          className={clsx("px-1.5 py-1 line-clamp-1", {
            "rounded-lg bg-gray-500": activeId === elementId,
          })}
          key={i}
        >
          {title}
        </Link>
      ))}
    </div>
  )
}
