import { Transition } from "@headlessui/react"
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
import { InternalSidebarMenuProps } from "../../Components/InternalSidebarMenu"
import { InternalSubnav } from "../../Components/InternalSubnav"
import {
  InternalToc,
  InternalTocDisclosure,
  InternalTocItem,
} from "../../Components/InternalToc"
import { LowerPageNav } from "../../Components/LowerPageNav"
import { MobileMenuToggleButton } from "../../Components/NavigationBar/MobileMenuToggleButton"
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
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false)

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

  const subnavRef = useRef<HTMLDivElement>(null)
  const [subnavRect, setSubnavRect] = useState<DOMRect>()
  const resizeObserverCallback = useCallback<UseResizeObserverCallback>(() => {
    setSubnavRect(subnavRef.current?.getBoundingClientRect())
  }, [subnavRef, setSubnavRect])
  useResizeObserver(subnavRef, resizeObserverCallback)

  return (
    <div className="flex flex-col">
      <div className="sticky top-0 z-20" ref={subnavRef}>
        <InternalSubnav
          isSidebarOpen={isMobileSidebarOpen}
          onSidebarToggle={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
          items={breadcrumbs}
          githubUrl={githubUrl}
        />
      </div>
      {header && <InternalLandingHeader {...header} />}
      {sidebarConfig && (
        <Transition
          unmount={false}
          as="div"
          className="fixed left-0 right-0 bottom-0 z-40 bg-white dark:bg-black md:hidden"
          style={{
            top: subnavRect ? subnavRect.top : 0,
          }}
          show={isMobileSidebarOpen}
          enter="transform transition duration-300 ease-in-out"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="mb-2 border-b border-b-primary-gray-100 px-6 pt-1 pb-2 dark:border-b-primary-gray-300">
            <MobileMenuToggleButton
              className="mr-4 md:hidden"
              height="20px"
              isOpen
              onOpenChanged={() => setMobileSidebarOpen(false)}
            />
          </div>
          <div className="p-6">
            <InternalSidebar
              config={sidebarConfig}
              menu={internalSidebarMenu}
            />
          </div>
        </Transition>
      )}

      <div className="relative flex flex-1">
        {sidebarConfig && (
          <>
            <aside className="hidden w-[300px] flex-none md:block">
              <div
                className="sticky h-full max-h-screen overflow-auto p-8"
                style={{
                  top: subnavRect?.height ?? 0,
                  maxHeight: `calc(100vh - ${subnavRect?.bottom ?? 0}px)`,
                }}
              >
                <InternalSidebar
                  config={sidebarConfig}
                  menu={internalSidebarMenu}
                />
              </div>
            </aside>
          </>
        )}
        <main
          className={clsx("flex max-w-full shrink grow-0 flex-row-reverse", {
            "md:max-w-[calc(100%_-_300px)]": sidebarConfig,
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
            className={clsx("w-full flex-none p-8 pl-16", {
              "md:w-3/4": !!toc,
            })}
          >
            {toc && (
              <div className="md:hidden">
                <InternalTocDisclosure headings={toc} />
              </div>
            )}
            <div>{children}</div>
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
