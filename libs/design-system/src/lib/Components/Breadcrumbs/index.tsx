export type BreadcrumbsProps = {
  current?: string;
};

function Separator() {
  return (
    <span className="mx-3 font-weight-semibold text-primary-gray-200 dark:text-primary-gray-300">
      /
    </span>
  );
}

function BreadcrumbLink({ name, href }: { name: string; href: string }) {
  return (
    <a
      href={href}
      className="text-primary-gray-300 hover:text-primary-gray-400 dark:text-primary-gray-200 dark:hover:text-primary-gray-100"
    >
      {name}
    </a>
  );
}

export function Breadcrumbs({ current }: BreadcrumbsProps) {
  return (
    <div className="flex flex-wrap items-center text-sm">
      <BreadcrumbLink name="Home" href="#" />
      <Separator />
      <BreadcrumbLink name="Tool" href="#" />
      {!!current && (
        <>
          <Separator />
          <div className="text-primary-gray-400 dark:text-primary-gray-100">
            {current}
          </div>
        </>
      )}
    </div>
  );
}
