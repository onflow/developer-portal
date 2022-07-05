import { useLocation } from "@remix-run/react"
import clsx from "clsx"
import { useCallback, useRef, useState } from "react"
import {
  InternalLandingHeader,
  InternalLandingHeaderProps,
} from "../../Components/InternalLandingHeader"
import {
  InternalSidebar,
  InternalSidebarConfig,
  InternalSidebarSectionItem,
} from "../../Components/InternalSidebar"
import { findSidebarSectionItem } from "../../Components/InternalSidebar/findSidebarSectionItem"
import { flattenSidebarSectionItems } from "../../Components/InternalSidebar/flattenSidebarSectionItems"
import {
  InternalSidebarMenu,
  InternalSidebarMenuProps,
} from "../../Components/InternalSidebarMenu"
import { InternalSubnav } from "../../Components/InternalSubnav"
import { InternalToc, InternalTocItem } from "../../Components/InternalToc"
import { LowerPageNav } from "../../Components/LowerPageNav"
import {
  useResizeObserver,
  UseResizeObserverCallback,
} from "../../utils/useResizeObserver"
import {
  useInternalBreadcrumbs,
  UseInternalBreadcrumbsOptions,
} from "./useInternalBreadcrumbs"

export type InternalPageProps = React.PropsWithChildren<{
  /**
   * The path of the currently active item. This should be a path
   * relative to the repo (excluding the repo name), matching the item's href
   * as it is defined in the sidebar configuration object.
   */
  activePath: string

  githubUrl?: string

  header?: InternalLandingHeaderProps

  internalSidebarMenu?: InternalSidebarMenuProps

  /**
   * The configuration object that describes the page hierarchy.
   */
  sidebarConfig?: InternalSidebarConfig

  toc?: InternalTocItem[]
}> &
  Omit<UseInternalBreadcrumbsOptions, "activeItem">

export function InternalPage({
  activePath,
  children,
  contentDisplayName,
  contentPath,
  githubUrl,
  header,
  internalSidebarMenu,
  rootUrl = "/",
  sidebarConfig,
  toc,
}: InternalPageProps) {
  const activeItem = findSidebarSectionItem(sidebarConfig, activePath)
  const breadcrumbs = useInternalBreadcrumbs({
    activeItem,
    contentDisplayName,
    contentPath,
    rootUrl,
  })
  let prevItem: InternalSidebarSectionItem | undefined
  let nextItem: InternalSidebarSectionItem | undefined

  if (sidebarConfig && activeItem) {
    const allItems = flattenSidebarSectionItems(sidebarConfig)
    const activeItemIndex = allItems.indexOf(activeItem)
    prevItem = allItems[activeItemIndex - 1]
    nextItem = activeItemIndex >= 0 ? allItems[activeItemIndex + 1] : undefined
  }

  const location = useLocation()
  const [currentHash, setHash] = useState(location.hash)

  const subnavRef = useRef<HTMLDivElement>(null)
  const [subnavRect, setSubnavRect] = useState<DOMRect>()
  const resizeObserverCallback = useCallback<UseResizeObserverCallback>(() => {
    setSubnavRect(subnavRef.current?.getBoundingClientRect())
  }, [subnavRef, setSubnavRect])
  useResizeObserver(subnavRef, resizeObserverCallback)

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-20" ref={subnavRef}>
        <InternalSubnav items={breadcrumbs} githubUrl={githubUrl} />
      </div>
      {header && <InternalLandingHeader {...header} />}
      <div className="flex flex-1">
        {sidebarConfig && (
          <aside className="w-[300px] flex-none bg-gray-100 bg-opacity-80 dark:bg-primary-gray-dark">
            <div
              className="sticky h-full max-h-screen overflow-auto p-8"
              style={{
                top: subnavRect?.height ?? 0,
                maxHeight: `calc(100vh - ${subnavRect?.bottom ?? 0}px)`,
              }}
            >
              {internalSidebarMenu ? (
                <InternalSidebarMenu {...internalSidebarMenu} />
              ) : null}
              <InternalSidebar config={sidebarConfig} />
            </div>
          </aside>
        )}
        <main
          className={clsx("flex shrink grow-0 flex-row-reverse	", {
            "max-w-[calc(100%_-_300px)]": sidebarConfig,
            "max-w-full": !sidebarConfig,
          })}
        >
          {toc && (
            <div className="w-1/4 flex-none">
              <div
                className="sticky h-full max-h-screen overflow-auto p-8"
                style={{
                  top: subnavRect?.height ?? 0,
                  maxHeight: `calc(100vh - ${subnavRect?.bottom ?? 0}px)`,
                }}
              >
                <InternalToc
                  headings={toc}
                  currentHash={currentHash}
                  updateHash={(e) => setHash("#test")}
                />
              </div>
            </div>
          )}
          <div
            className={clsx("flex-none p-8 pl-16", {
              "w-3/4": !!toc,
              "w-full": !toc,
            })}
          >
            <div className="">{children}</div>
            <LowerPageNav
              prev={
                prevItem && {
                  href: `${rootUrl}${contentPath}/${prevItem.href}`,
                  name: prevItem.label,
                }
              }
              next={
                nextItem && {
                  href: `${rootUrl}${contentPath}/${nextItem.href}`,
                  name: nextItem.label,
                }
              }
            />
          </div>
        </main>
      </div>
    </div>
  )
}
