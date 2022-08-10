import clsx from "clsx"
import { useCallback, useRef, useState } from "react"
import calculateReadingTime from "reading-time"
import { AttributionData } from "~/cms"
import { Attribution } from "../../Components/Attribution/Attribution"
import { SidebarItem } from "../../Components/InternalSidebar"
import { useActiveSidebarItems } from "../../Components/InternalSidebar/useActiveSidebarItems"
import {
  InternalToc,
  InternalTocDisclosure,
  InternalTocItem,
} from "../../Components/InternalToc"
import { LowerPageNav } from "../../Components/LowerPageNav"
import {
  useResizeObserver,
  UseResizeObserverCallback,
} from "../../utils/useResizeObserver"
import { useProvideInternalPageEditUrl } from "./InternalPageEditUrlContext"

export type InternalPageContentProps = React.PropsWithChildren<{
  editPageUrl?: string

  /**
   * The configuration object that describes the page hierarchy.
   */
  sidebarItems?: SidebarItem[]

  toc?: InternalTocItem[]

  readTime?: ReturnType<typeof calculateReadingTime>

  attributionData?: AttributionData
}>

function InternalAttribution({
  attributionData,
  readTime,
}: {
  attributionData: AttributionData
  readTime?: ReturnType<typeof calculateReadingTime>
}) {
  const updatedDate = attributionData?.lastCommit.committerDate
  const lastUpdatedAuthorName = attributionData?.lastCommit.author.login
  const lastCommitUrl = attributionData?.lastCommit.htmlUrl
  if (
    !attributionData ||
    !updatedDate ||
    !lastUpdatedAuthorName ||
    !lastCommitUrl
  )
    return null

  return (
    <Attribution
      updatedDate={updatedDate}
      authorName={lastUpdatedAuthorName}
      authorIcon={attributionData.lastCommit.author.gravatar_url}
      otherAuthorsCount={attributionData.otherContributorsCount}
      commitUrl={lastCommitUrl}
      readMinutes={readTime?.minutes}
    />
  )
}

export function InternalPageContent({
  children,
  editPageUrl,
  sidebarItems,
  toc,
  attributionData,
  readTime,
}: InternalPageContentProps) {
  useProvideInternalPageEditUrl(editPageUrl)
  const { previous, next } = useActiveSidebarItems(sidebarItems || [])
  const subnavRef = useRef<HTMLDivElement>(null)
  const [subnavRect, setSubnavRect] = useState<DOMRect>()
  const resizeObserverCallback = useCallback<UseResizeObserverCallback>(() => {
    setSubnavRect(subnavRef.current?.getBoundingClientRect())
  }, [subnavRef, setSubnavRect])
  useResizeObserver(subnavRef, resizeObserverCallback)

  return (
    <main
      className={clsx("flex max-w-full shrink-0 grow flex-row-reverse", {
        "md:max-w-[calc(100%_-_300px)]": sidebarItems,
      })}
    >
      {toc && (
        <div className="hidden flex-none md:flex md:w-1/4">
          <div
            className="sticky h-full max-h-screen overflow-auto p-8"
            style={{
              top: subnavRect?.height ?? 0,
              maxHeight: `calc(100vh - ${subnavRect?.bottom ?? 0}px)`,
            }}
          >
            <InternalToc headings={toc} />
          </div>
        </div>
      )}
      <div
        className={clsx("w-full flex-none p-8 pl-16 pb-80", {
          "md:w-3/4": !!toc,
        })}
      >
        {toc && (
          <div className="mb-8 md:mb-0 md:hidden">
            <InternalTocDisclosure headings={toc} />
          </div>
        )}
        {!!attributionData && (
          <InternalAttribution
            attributionData={attributionData}
            readTime={readTime}
          />
        )}
        <div>{children}</div>
        <LowerPageNav prev={previous} next={next} />
      </div>
    </main>
  )
}
