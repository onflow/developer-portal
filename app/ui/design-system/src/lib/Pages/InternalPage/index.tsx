import {
  InternalSidebar,
  InternalSidebarContainer,
} from "../../Components/InternalSidebar"
import {
  InternalSidebarMenu,
  InternalSidebarMenuProps,
} from "../../Components/InternalSidebarMenu"
import { InternalSubnav } from "../../Components/InternalSubnav"
import {
  useInternalBreadcrumbs,
  UseInternalBreadcrumbsOptions,
} from "./useInternalBreadcrumbs"

export type InternalPageProps = React.PropsWithChildren<{}> &
  UseInternalBreadcrumbsOptions & {
    internalSidebarMenu: InternalSidebarMenuProps
  }

export function InternalPage({
  activePath,
  children,
  contentDisplayName,
  contentPath,
  rootUrl = "/",
  sidebarConfig,
  internalSidebarMenu,
}: InternalPageProps) {
  const breadcrumbs = useInternalBreadcrumbs({
    activePath,
    contentDisplayName,
    contentPath,
    rootUrl,
    sidebarConfig,
  })

  return (
    <div className="flex flex-col">
      <InternalSubnav items={breadcrumbs} className="sticky top-0 z-20" />
      <div className="flex flex-1 flex-row">
        {sidebarConfig && (
          <div className="flex flex-col">
            <InternalSidebarContainer>
              <InternalSidebarMenu {...internalSidebarMenu} />
              <InternalSidebar config={sidebarConfig} />
            </InternalSidebarContainer>
          </div>
        )}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
