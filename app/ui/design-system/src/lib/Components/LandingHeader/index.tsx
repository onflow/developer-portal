import { ButtonLink } from "../Button"
import { GradientName, LandingHeaderContainer } from "./LandingHeaderContainer"

export type LandingHeaderProps = {
  buttonText: string
  buttonUrl: string
  callout: string
  description: string
  gradient: GradientName
  title: string
}

export function LandingHeader({
  buttonText,
  buttonUrl,
  callout,
  description,
  gradient,
  title,
}: LandingHeaderProps) {
  return (
    <LandingHeaderContainer gradient={gradient}>
      <div className="container mx-auto flex flex-col justify-items-stretch pt-16 md:pt-20">
        <h1 className="text-h1 mb-14 max-w-full overflow-hidden text-ellipsis !text-4xl md:mt-24 md:!text-7xl md:!leading-tight">
          {title}
        </h1>
        <div className="flex flex-row items-stretch rounded-lg bg-primary-gray-100/30">
          <div className="px-5 py-10 md:basis-1/2 md:px-20 md:py-12">
            <h2 className="text-h2 mb-2 md:mb-4">{callout}</h2>
            <p>{description}</p>
            <ButtonLink
              className="mt-4 mb-4 md:mt-12"
              href={buttonUrl}
              variant="primary-no-darkmode"
            >
              {buttonText}
            </ButtonLink>
          </div>
          <div className="hidden basis-1/2 rounded-r-lg bg-white px-10 py-6 dark:bg-white/40 md:block md:px-20 md:py-12"></div>
        </div>
      </div>
    </LandingHeaderContainer>
  )
}
