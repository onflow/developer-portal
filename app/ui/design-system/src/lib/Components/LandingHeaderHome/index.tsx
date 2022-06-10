import LandingImage from "../../../../images/misc/landing-home.png"
import { LandingHeaderContainer } from "../LandingHeader/LandingHeaderContainer"

export type LandingHeaderHomeProps = {
  description: string
  tag: string
  title: string
}

export function LandingHeaderHome({
  description,
  tag,
  title,
}: LandingHeaderHomeProps) {
  return (
    <LandingHeaderContainer className="flex justify-center" gradient="home">
      <div className="container flex flex-col items-center md:flex-row">
        <div className="flex flex-col items-start self-start flex-1 max-w-full py-6 pr-4 basis-1/2 md:mt-24 md:py-20">
          <p className="mb-1 font-bold font-display text-primary-gray-300 dark:text-primary-gray-200">
            #{tag}
          </p>
          <h1 className="text-h1 mb-6 max-w-full overflow-hidden text-ellipsis !text-4xl md:!text-7xl ">
            {title}
          </h1>
          <p>{description}</p>
        </div>
        <div className="flex-1 order-first basis-1/2 md:order-last">
          <img
            src={LandingImage}
            alt=""
            className="max-h-[195px] object-cover md:max-h-[540px]"
          />
        </div>
      </div>
    </LandingHeaderContainer>
  )
}
