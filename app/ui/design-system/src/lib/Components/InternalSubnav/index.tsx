import clsx from "clsx"
import { Breadcrumbs, BreadcrumbsProps } from "../Breadcrumbs"
import { InternalVersionSelect, Version } from "../InternalVersionSelect"

export type InternalSubnavProps = BreadcrumbsProps & {
  className?: string
  selectedVersionName?: string
  versions?: Version[]
}

export function InternalSubnav({
  className,
  items,
  selectedVersionName,
  versions,
}: InternalSubnavProps) {
  return (
    <div
      className={clsx(
        "flex items-center border-b border-b-primary-gray-100 bg-white py-2 dark:border-b-primary-gray-300 dark:bg-black ",
        className
      )}
    >
      <div className="container flex flex-1 flex-wrap items-center">
        <div className="mr-auto pr-2 ">
          <Breadcrumbs items={items} />
        </div>
        <div>
          {!!selectedVersionName && !!versions && (
            <InternalVersionSelect
              versions={versions}
              selectedVersionName={selectedVersionName}
            />
          )}
        </div>
      </div>
    </div>
  )
}
