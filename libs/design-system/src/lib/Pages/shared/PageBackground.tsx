import React from "react"
import clsx from 'clsx';

export default function GrayPage({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx('bg-primary-gray-50 dark:bg-black', className)}>
      {children}
    </div>
  );
}
