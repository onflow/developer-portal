import clsx from 'clsx';

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
    'bg-white text-black',
    'hover:border-white hover:bg-black hover:text-white',
    'active:border-gray-500 active:bg-black active:text-gray-500',
  ],
  secondary: [
    'bg-white text-primary-blue border-primary-blue',
    'hover:bg-primary-blue hover:text-white',
    'active:bg-blue-hover active:text-white',
    'dark:bg-black dark:text-blue-dark dark:border-blue-dark',
    'dark:hover:bg-blue-dark dark:hover:text-white',
    'dark:active:bg-blue-hover-dark dark:active:text-white dark:active:border-blue-hover-dark',
  ],
};

type ButtonBaseProps = {
  variant?: keyof typeof VARIANTS;
};

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  ButtonBaseProps;

export function Button({
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-lg border-2 hover:shadow-2xl',
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}

export type ButtonLinkProps = React.ComponentPropsWithoutRef<'a'> &
  ButtonBaseProps & {
    children: React.ReactNode;
  };

export function ButtonLink({
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={clsx(
        'rounded-lg border-2 hover:shadow-2xl',
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
