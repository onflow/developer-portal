import { Transition } from "@headlessui/react"
import { LoaderFunction } from "@remix-run/node"
import { Outlet, useLoaderData, useOutletContext } from "@remix-run/react"
import clsx from "clsx"
import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router"
import { RepoSchema } from "~/cms/schema"
import findPreset from "~/cms/utils/find-preset.server"
import findRemotePreset from "~/cms/utils/find-remote-preset.server"
import {
  useInternalBreadcrumbs,
  UseInternalBreadcrumbsOptions,
} from "~/cms/utils/hooks/useInternalBreadcrumbs"
import { populateRepoSchema as populateMissingSidebarLabels } from "~/cms/utils/schema-utils"
import {
  InternalLandingHeader,
  InternalLandingHeaderProps,
} from "~/ui/design-system/src/lib/Components/InternalLandingHeader"
import {
  InternalSidebar,
  InternalSidebarConfig,
  InternalSidebarSectionItem,
} from "~/ui/design-system/src/lib/Components/InternalSidebar"
import { findSidebarSectionItem } from "~/ui/design-system/src/lib/Components/InternalSidebar/findSidebarSectionItem"
import { flattenSidebarSectionItems } from "~/ui/design-system/src/lib/Components/InternalSidebar/flattenSidebarSectionItems"
import { InternalSidebarMenuProps } from "~/ui/design-system/src/lib/Components/InternalSidebarMenu"
import { InternalSubnav } from "~/ui/design-system/src/lib/Components/InternalSubnav"
import {
  InternalToc,
  InternalTocDisclosure,
} from "~/ui/design-system/src/lib/Components/InternalToc"
import { LowerPageNav } from "~/ui/design-system/src/lib/Components/LowerPageNav"
import { MobileMenuToggleButton } from "~/ui/design-system/src/lib/Components/NavigationBar/MobileMenuToggleButton"
import {
  useResizeObserver,
  UseResizeObserverCallback,
} from "~/ui/design-system/src/lib/utils/useResizeObserver"
import { MdxPage } from "../../cms"

export type InternalPageProps = {
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
} & Omit<UseInternalBreadcrumbsOptions, "activeItem">

type LoaderData = RepoSchema

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<LoaderData> => {
  let sidebarConfig

  if (params.repo || params.path) {
    sidebarConfig = await findRemotePreset(
      request.url,
      "sidebar",
      params.path ? params.path : params.repo!
    )
  }

  if (!sidebarConfig) {
    sidebarConfig = await findPreset(request.url, "sidebar")
  }

  try {
    const formatted = populateMissingSidebarLabels(sidebarConfig)
    return formatted
  } catch (e) {
    return sidebarConfig
  }
}

type ContextData = {
  mdx: MdxPage
}

export default function InternalPage({
  activePath,
  contentDisplayName,
  contentPath,
  githubUrl,
  header,
  rootUrl = "/",
}: InternalPageProps) {
  const context = useOutletContext<ContextData>()
  const { toc } = context.mdx

  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const { sidebar: sidebarConfig } = useLoaderData<LoaderData>()
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

  const contentRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (contentRef.current && !header) {
      // Only scroll on pages without a header.
      contentRef.current.scrollIntoView(true)
    }
  }, [pathname, header])

  return (
    <div className="flex flex-col pb-16">
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
          as="div"
          className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-black md:hidden"
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
            <InternalSidebar config={sidebarConfig} menu={{ selected: "" }} />
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
                  menu={{ selected: "" }}
                />
              </div>
            </aside>
          </>
        )}
        <main
          className={clsx("flex max-w-full shrink-0 grow flex-row-reverse", {
            "md:max-w-[calc(100%_-_300px)]": sidebarConfig,
          })}
          ref={contentRef}
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
              <div className="md:hidden">
                <InternalTocDisclosure headings={toc} />
              </div>
            )}
            <div>
              <Outlet context={context} />
            </div>
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
