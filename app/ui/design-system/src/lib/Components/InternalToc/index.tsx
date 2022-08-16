import { Disclosure } from "@headlessui/react"
import { useLocation } from "@remix-run/react"
import clsx from "clsx"
import { useEffect, useRef, useState } from "react"
import { ReactComponent as ChevronDownIcon } from "../../../../images/arrows/chevron-down"
import { ReactComponent as ChevronUpIcon } from "../../../../images/arrows/chevron-up"
import AppLink from "../AppLink"

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
      <div className="mb-6 px-5 text-xs uppercase text-gray-500">
        On this page
      </div>
      <div className="border-l-1 border-l border-l-gray-100 bg-opacity-80 dark:border-l-gray-800">
        {headings.map(({ title, hash }, index) => (
          <div className="flex" key={index}>
            <AppLink
              to={hash}
              className={clsx(
                "mb-1 cursor-pointer py-2 px-5 text-sm text-primary-gray-400 hover:opacity-75 dark:text-gray-200",
                {
                  "bg-gray-100 bg-opacity-75 font-semibold text-primary-blue dark:bg-primary-gray-dark dark:text-gray-300":
                    activeId === hash.substring(1, hash.length),
                }
              )}
            >
              {title}
            </AppLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export function InternalTocDisclosure({
  headings,
}: Omit<InternalTocProps, "currentHash" | "updateHash">) {
  return (
    <div className="b-1 border-primary-gray-200">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between border-y border-primary-gray-100 pt-4 pb-3 text-sm uppercase text-primary-gray-300 dark:border-primary-gray-300 dark:text-primary-gray-200">
              On this page
              <span>{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
            </Disclosure.Button>
            <Disclosure.Panel className="mt-2 flex flex-col p-2">
              {headings.map(({ title, hash }, index) => (
                <AppLink
                  key={index}
                  to={hash}
                  className="my-2 text-primary-gray-400 hover:opacity-75 dark:text-gray-200"
                >
                  {title}
                </AppLink>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
