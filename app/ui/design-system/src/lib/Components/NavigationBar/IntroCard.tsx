import { ButtonLink } from "../Button"
import { Card } from "./types"

export type IntroCardProps = Card

export function IntroCard({
  ctaText,
  description,
  href,
  imageAlt = "",
  imageHref,
  title,
}: IntroCardProps) {
  return (
    <div className="flex flex-col items-stretch">
      <div className="h-[128px] bg-white">
        <img src={imageHref} alt={imageAlt} />
      </div>
      <h6 className="text-h6 my-4 !leading-tight">{title}</h6>
      <p className="mb-6 leading-none dark:text-primary-gray-100">
        {description}
      </p>
      <ButtonLink
        href={href}
        className="whitespace-nowrap px-16 py-4 text-center"
      >
        {ctaText}
      </ButtonLink>
    </div>
  )
}
