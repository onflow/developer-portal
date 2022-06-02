import clsx from 'clsx';
import { ReactComponent as ChevronRightIcon } from '../../../../images/arrows/chevron-right-sm.svg';

const BASE_CLASSES =
  'inline-flex text-sm gap-3 items-center justify-center py-4 font-semibold min-w-[172px] text-center px-4 rounded-lg border hover:shadow-2xl';
const VARIANTS = {
  primary: [
    'bg-black text-white border-transparent',
    'hover:border-black hover:bg-white hover:text-black',
    'active:border-gray-500 active:bg-white active:text-gray-500',
    'dark:bg-white dark:text-black',
    'dark:hover:border-white dark:hover:bg-black dark:hover:text-white',
    'dark:active:border-gray-500 dark:active:bg-black dark:active:text-gray-500',
  ],
  'primary-inverse': [
    'dark:bg-black dark:text-white dark:border-transparent',
    'dark:hover:border-black dark:hover:bg-white dark:hover:text-black',
    'dark:active:border-gray-500 dark:active:bg-white dark:active:text-gray-500',
    'bg-white text-black border-black',
    'hover:border-white hover:bg-black hover:text-white',
    'active:border-gray-500 active:bg-black active:text-gray-500',
  ],
  secondary: [
    'text-primary-blue border-primary-blue',
    'hover:bg-primary-blue hover:text-white',
    'active:bg-blue-hover active:text-white',
    'dark:bg-black dark:text-blue-dark dark:border-blue-dark',
    'dark:hover:bg-blue-dark dark:hover:text-white',
    'dark:active:bg-blue-hover-dark dark:active:text-white dark:active:border-blue-hover-dark',
  ],
};

type ButtonContentProps = {
  children: React.ReactNode;
  prev?: boolean;
  next?: boolean;
};

type ButtonBaseProps = {
  variant?: keyof typeof VARIANTS;
} & ButtonContentProps;

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  ButtonBaseProps;

function ButtonContent({ next, prev, children }: ButtonContentProps) {
  return (
    <>
      {prev && (
        <div className="relative -top-[1px] rotate-180">
          <ChevronRightIcon />
        </div>
      )}
      {children}
      {next && <ChevronRightIcon />}
    </>
  );
}

export function Button({
  className,
  variant = 'primary',
  prev,
  next,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(BASE_CLASSES, VARIANTS[variant], className)}
      {...props}
    >
      <ButtonContent prev={prev} next={next} children={children} />
    </button>
  );
}

export type ButtonLinkProps = React.ComponentPropsWithoutRef<'a'> &
  ButtonBaseProps & {
    children: React.ReactNode;
  };

export function ButtonLink({
  className,
  variant = 'primary',
  next,
  prev,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={clsx(BASE_CLASSES, VARIANTS[variant], className)} {...props}>
      <ButtonContent prev={prev} next={next} children={children} />
    </a>
  );
}
