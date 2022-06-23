import { InternalSidebar } from "../../Components/InternalSidebar"
import { InternalSubnav } from "../../Components/InternalSubnav"
import {
  useInternalBreadcrumbs,
  UseInternalBreadcrumbsOptions,
} from "./useInternalBreadcrumbs"

export type InternalPageProps = React.PropsWithChildren<{}> &
  UseInternalBreadcrumbsOptions

export function InternalPage({
  activePath,
  rootUrl = "/",
  children,
  repo,
  sidebarConfig,
}: InternalPageProps) {
  const breadcrumbs = useInternalBreadcrumbs({
    activePath,
    rootUrl,
    sidebarConfig,
    repo,
  })

  return (
    <div className="flex flex-col">
      <InternalSubnav items={breadcrumbs} className="sticky top-0 z-10" />
      <div className="flex flex-1 flex-row overflow-auto">
        {sidebarConfig && <InternalSidebar config={sidebarConfig} />}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
