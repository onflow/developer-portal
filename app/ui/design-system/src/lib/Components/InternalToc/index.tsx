import { useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { useLocation } from "@remix-run/react"

export type InternalTocItem = {
  title: string
  hash: URL["hash"]
}

export type InternalTocProps = {
  headings: InternalTocItem[]
}

export function InternalToc({ headings }: InternalTocProps) {
  const headingsRef = useRef<Record<string, IntersectionObserverEntry>>({})
  const location = useLocation()
  const [activeId, setActiveId] = useState("")

  if (headings == null) {
    throw new Error(`headings missing`)
  }

  useEffect(() => {
    const onIntersectionObserved = (headings: IntersectionObserverEntry[]) => {
      headingsRef.current = headings.reduce((map: any, headingElement) => {
        map[headingElement.target.id] = headingElement
        return map
      }, headingsRef.current)
      const visibleHeadings: IntersectionObserverEntry[] = []
      Object.keys(headingsRef.current).forEach((key: string) => {
        const headingElement = headingsRef.current[key]
        if (headingElement?.isIntersecting) visibleHeadings.push(headingElement)
      })

      const getIndexFromId = (id: string) =>
        headingElements.findIndex((heading) => heading.id === id)

      if (visibleHeadings.length === 1 && visibleHeadings[0]) {
        setActiveId(visibleHeadings[0].target.id)
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort((a, b) =>
          Number(getIndexFromId(a.target.id) > getIndexFromId(b.target.id))
        )

        if (sortedVisibleHeadings.length > 1 && sortedVisibleHeadings[0]) {
          setActiveId(sortedVisibleHeadings[0].target.id)
        }
      }
    }

    const observer = new IntersectionObserver(onIntersectionObserved)

    const headingElements = headings.reduce(
      (headingElementsArr: HTMLElement[], heading: InternalTocItem) => {
        const headingElem = document.getElementById(
          heading.hash.substring(1, heading.hash.length)
        )
        if (headingElem) headingElementsArr.push(headingElem)
        return headingElementsArr
      },
      []
    )
    headingElements.forEach((headingElement: HTMLElement) =>
      observer.observe(headingElement)
    )
  }, [setActiveId, location.hash, headings])

  return (
    <div>
      <div className="mb-6 px-5 text-2xs uppercase text-gray-500">
        On this page
      </div>
      <div className="border-l-1 border-l border-l-gray-100 bg-opacity-80 dark:border-l-gray-800">
        {headings.map(({ title, hash }, index) => (
          <div className="flex" key={index}>
            <a
              href={hash}
              className={clsx(
                "mb-1 cursor-pointer py-2 px-5 text-sm text-primary-gray-400 hover:opacity-75 dark:text-gray-200",
                {
                  "bg-gray-100 bg-opacity-75 font-semibold text-primary-blue dark:bg-primary-gray-dark dark:text-gray-300":
                    activeId === hash.substring(1, hash.length),
                }
              )}
            >
              {title}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
