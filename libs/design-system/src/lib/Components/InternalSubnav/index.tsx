import { Breadcrumbs, BreadcrumbsProps } from '../Breadcrumbs';
import { InternalVersionSelect, Version } from '../InternalVersionSelect';

export type InternalSubnavProps = BreadcrumbsProps & {
  selectedVersionName?: string;
  versions?: Version[];
};

export function InternalSubnav({
  current,
  selectedVersionName,
  versions,
}: InternalSubnavProps) {
  return (
    <div className="flex flex-1 flex-wrap items-center border-b border-b-primary-gray-100 bg-white py-2 dark:border-b-primary-gray-300 dark:bg-black md:min-h-[4rem]">
      <div className="pr-2 mr-auto ">
        <Breadcrumbs current={current} />
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
  );
}
