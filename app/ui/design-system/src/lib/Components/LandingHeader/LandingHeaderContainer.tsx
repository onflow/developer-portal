import clsx from "clsx"

export type GradientName =
  | "community"
  | "concepts"
  | "getting-started"
  | "home"
  | "network"
  | "tools"

export type LandingHeaderContainerProps =
  React.ComponentPropsWithoutRef<"header"> & {
    gradient: GradientName
  }

// TODO: Consider adding background gradient to PageBackground to avoid clipping
export function LandingHeaderContainer({
  className,
  gradient,
  ...props
}: LandingHeaderContainerProps) {
  return (
    <div
      className={clsx(
        `bg-gradient-${gradient} bg-cover bg-[center_top_-75px] bg-no-repeat md:bg-[length:100%_100%]`,
        className
      )}
      {...props}
    />
  )
}
