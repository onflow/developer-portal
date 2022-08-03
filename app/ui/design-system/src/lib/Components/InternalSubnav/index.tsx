import clsx from "clsx"
import { ReactComponent as GithubLogo } from "../../../../images/social/github"
import AppLink from "../AppLink"
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
        "flex flex-wrap items-center justify-between border-b border-b-primary-gray-100 bg-white bg-gradient-to-b from-primary-gray-50 via-transparent to-transparent px-6 dark:border-b-primary-gray-300 dark:bg-black dark:from-transparent",
        className
      )}
    >
      <div className="flex items-start py-5 pr-2 ">
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
          <AppLink
            to={githubUrl}
            className="hidden whitespace-nowrap text-sm text-primary-blue hover:text-blue-hover dark:text-blue-dark dark:hover:text-blue-hover-dark md:block"
          >
            <GithubLogo className="inline scale-90" /> Edit on Github
          </AppLink>
        )}
      </div>
    </div>
  )
}
