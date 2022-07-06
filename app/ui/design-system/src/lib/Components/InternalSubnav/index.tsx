import clsx from "clsx"
import { ReactComponent as GithubLogo } from "../../../../images/social/github"
import { Breadcrumbs, BreadcrumbsProps } from "../Breadcrumbs"
import { InternalVersionSelect, Version } from "../InternalVersionSelect"
import { MobileMenuToggleButton } from "../NavigationBar/MobileMenuToggleButton"

export type InternalSubnavProps = BreadcrumbsProps & {
  className?: string
  githubUrl?: string
  isSidebarOpen?: boolean
  onSidebarToggle?: () => void
  selectedVersionName?: string
  versions?: Version[]
}

export function InternalSubnav({
  className,
  githubUrl,
  items,
  isSidebarOpen,
  onSidebarToggle,
  selectedVersionName,
  versions,
}: InternalSubnavProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center justify-between border-b border-b-primary-gray-100 bg-white px-6 dark:border-b-primary-gray-300 dark:bg-black",
        className
      )}
    >
      <div className="flex items-start py-2 pr-2 ">
        {isSidebarOpen !== undefined && onSidebarToggle !== undefined && (
          <MobileMenuToggleButton
            className="mr-3 md:hidden"
            height="20px"
            isOpen={isSidebarOpen}
            onOpenChanged={() => onSidebarToggle()}
          />
        )}

        <Breadcrumbs items={items} />
      </div>
      <div className="flex items-center py-2 ">
        {!!selectedVersionName && !!versions && (
          <InternalVersionSelect
            versions={versions}
            selectedVersionName={selectedVersionName}
          />
        )}
        {githubUrl && (
          <a href={githubUrl} className="whitespace-nowrap text-sm">
            <GithubLogo className="inline scale-90" /> Edit on Github
          </a>
        )}
      </div>
    </div>
  )
}
