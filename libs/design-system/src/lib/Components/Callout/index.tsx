import { ReactComponent as Alert } from '../../Images/action/alert.svg';

export type CalloutProps = {
  title?: string;
  text: string;
  linkName?: string;
  linkHref?: string;
};

export function Callout({ title, text, linkName, linkHref }: CalloutProps) {
  return (
    <div className="flex px-8 py-6 border rounded-lg border-primary-yellow bg-misc-yellow-lightest text-primary-gray-400 dark:border-misc-indigo-dark dark:bg-misc-blue-neutral dark:stroke-white dark:text-white">
      <Alert />
      <div className="flex-1 ml-2">
        {!!title && <b>{title} </b>}
        {text}
      </div>
      {!!linkHref && (
        <div className="ml-6">
          <a
            href={linkHref}
            className="text-sm text-primary-gray-300 hover:text-primary-gray-400 dark:text-primary-gray-100 dark:hover:text-primary-gray-50"
          >
            {linkName || linkHref}
          </a>
        </div>
      )}
    </div>
  );
}
