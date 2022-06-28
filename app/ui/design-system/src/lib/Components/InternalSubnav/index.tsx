import clsx from "clsx"
import { Breadcrumbs, BreadcrumbsProps } from "../Breadcrumbs"
import { InternalVersionSelect, Version } from "../InternalVersionSelect"
import { ReactComponent as GithubLogo } from "../../../../images/social/github"

export type InternalSubnavProps = BreadcrumbsProps & {
  className?: string
  githubUrl?: string
  selectedVersionName?: string
  versions?: Version[]
}

export function InternalSubnav({
  className,
  githubUrl,
  items,
  selectedVersionName,
  versions,
}: InternalSubnavProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap items-center items-center justify-between border-b border-b-primary-gray-100 bg-white py-2 px-6 dark:border-b-primary-gray-300 dark:bg-black",
        className
      )}
    >
      <div className="pr-2">
        <Breadcrumbs items={items} />
      </div>
      <div className="flex items-center">
        {!!selectedVersionName && !!versions && (
          <InternalVersionSelect
            versions={versions}
            selectedVersionName={selectedVersionName}
          />
        )}
        {githubUrl && (
          <a href={githubUrl} className="whitespace-nowrap">
            <GithubLogo className="inline" /> Edit on Github
          </a>
        )}
      </div>
    </div>
  )
}
