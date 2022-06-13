import TutorialCard, { TutorialCardProps } from "."
import Pagination from "../Pagination"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

export type PaginatedTutorialCardListProps = {
  className?: string

  /**
   * An optional identifier that, when changed, causes the pagination to
   * be reset to the first page.
   */
  listId?: unknown

  pageSize?: number

  tutorials: TutorialCardProps[]
}

export const PaginatedTutorialCardList = ({
  className,
  listId,
  pageSize = 4,
  tutorials,
}: PaginatedTutorialCardListProps) => {
  const topRef = useRef<HTMLDivElement>()
  const [page, setPage] = useState(1)

  // Whenever the page changes we want to scroll to the top of the list -- but
  // only if the page change was triggered by the pagination component. So by
  // incrementing this value any time the page is triggered there, we can
  // trigger the scroll-to-top behavior only in those cases.
  const [resetScroll, setResetScroll] = useState(0)

  useEffect(() => {
    // If the listId changes we reset to the first page.
    // This allows the consuming component to force the page to reset
    // when the list of tutorials is changed in some significant way (i.e. the
    // list was filtered)
    setPage(1)
  }, [listId])

  useLayoutEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [resetScroll])

  return (
    <div className={className}>
      <div
        className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-4"
        // @ts-expect-error please fix
        ref={topRef}
      >
        {tutorials
          .slice((page - 1) * pageSize, page * pageSize)
          .map((tutorialProps, index) => (
            <TutorialCard key={index} className="w-full" {...tutorialProps} />
          ))}
      </div>
      <Pagination
        className="mt-4"
        itemCount={tutorials.length}
        page={page}
        pageSize={pageSize}
        setPage={(nextPage) => {
          if (page !== nextPage) {
            setResetScroll(resetScroll + 1)
            setPage(nextPage)
          }
        }}
      />
    </div>
  )
}

export default TutorialCard
