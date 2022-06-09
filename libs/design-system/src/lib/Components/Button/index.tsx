import clsx from 'clsx';
import { ReactComponent as ChevronRightIcon } from '../../../../images/arrows/chevron-right-sm';
import { ReactComponent as ExternalLinkIcon } from '../../../../images/content/external-link-variant';

const BASE_CLASSES =
  'inline-flex items-center justify-center font-semibold text-center border hover:shadow-2xl';

const VARIANTS = {
  primary: [
    'bg-black text-white border-transparent',
    'hover:border-black hover:bg-white hover:text-black',
    'active:border-gray-500 active:bg-white active:text-gray-500',
    'dark:bg-white dark:text-black',
    'dark:hover:border-white dark:hover:bg-black dark:hover:text-white',
    'dark:active:border-gray-500 dark:active:bg-black dark:active:text-gray-500',
  ],
  'primary-no-darkmode': [
    'bg-black text-white border-transparent',
    'hover:border-black hover:bg-white hover:text-black',
    'active:border-gray-500 active:bg-white active:text-gray-500',
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

const SIZES = {
  sm: ['text-sm min-w-[172px] p-2 rounded-md gap-2'],
  md: ['text-sm min-w-[172px] p-4 rounded-lg gap-3'],
};

type ButtonContentProps = {
  children: React.ReactNode;
  leftIcon?: 'left';
  rightIcon?: 'right' | 'external';
  external?: boolean;
};

type ButtonBaseProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
} & ButtonContentProps;

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  ButtonBaseProps;

function ButtonContent({
  leftIcon,
  rightIcon,
  external,
  children,
}: ButtonContentProps) {
  return (
    <>
      {leftIcon === 'left' && (
        <div className="relative -top-[1px] rotate-180">
          <ChevronRightIcon />
        </div>
      )}
      {children}
      {rightIcon === 'right' && <ChevronRightIcon />}
      {rightIcon === 'external' && <ExternalLinkIcon />}
    </>
  );
}

export function Button({
  className,
  size = 'md',
  variant = 'primary',
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(BASE_CLASSES, SIZES[size], VARIANTS[variant], className)}
      {...props}
    >
      <ButtonContent
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        children={children}
      />
    </button>
  );
}

export type ButtonLinkProps = React.ComponentPropsWithoutRef<'a'> &
  ButtonBaseProps & {
    children: React.ReactNode;
  };

export function ButtonLink({
  className,
  size = 'md',
  variant = 'primary',
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={clsx(BASE_CLASSES, SIZES[size], VARIANTS[variant], className)}
      {...props}
    >
      <ButtonContent
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        children={children}
      />
    </a>
  );
}
