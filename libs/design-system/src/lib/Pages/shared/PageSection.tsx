import clsx from 'clsx';

export default function PageSection({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={clsx('pt-16 pb-20', className)}>{children}</div>;
}
