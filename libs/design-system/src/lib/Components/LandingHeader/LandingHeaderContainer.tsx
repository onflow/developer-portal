import clsx from 'clsx';
import React from 'react';

export type GradientName =
  | 'community'
  | 'concepts'
  | 'getting-started'
  | 'home'
  | 'network'
  | 'tools';

export type LandingHeaderContainerProps =
  React.ComponentPropsWithoutRef<'header'> & {
    gradient: GradientName;
  };

export function LandingHeaderContainer({
  className,
  gradient,
  ...props
}: LandingHeaderContainerProps) {
  return (
    <header
      className={clsx(`bg-gradient-${gradient} bg-cover`, className)}
      {...props}
    />
  );
}
