import React from "react"
import LandingImage from '../../../../images/misc/landing-home.png';
import { LandingHeaderContainer } from '../LandingHeader/LandingHeaderContainer';

export type LandingHeaderHomeProps = {
  description: string;
  tag: string;
  title: string;
};

export function LandingHeaderHome({
  description,
  tag,
  title,
}: LandingHeaderHomeProps) {
  return (
    <LandingHeaderContainer className="flex justify-center" gradient="home">
      <div className="container flex max-w-full flex-col items-center md:flex-row">
        <div className="flex max-w-full flex-1 basis-1/2 flex-col items-start self-start px-4 py-6 md:mt-24 md:px-20 md:py-20">
          <p className="mb-1 font-display font-bold text-primary-gray-300 dark:text-primary-gray-200">
            #{tag}
          </p>
          <h1 className="text-h1 mb-6 max-w-full overflow-hidden text-ellipsis !text-4xl md:!text-7xl ">
            {title}
          </h1>
          <p>{description}</p>
        </div>
        <div className="order-first flex-1 basis-1/2 md:order-last">
          <img
            src={LandingImage}
            alt=""
            className="max-h-[195px] object-cover md:max-h-[540px]"
          />
        </div>
      </div>
    </LandingHeaderContainer>
  );
}
