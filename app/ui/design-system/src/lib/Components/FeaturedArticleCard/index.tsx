import { ButtonLink } from "../Button"
import Tag from "../Tag"

export type FeaturedArticleCardProps = {
  heading: string
  tags: string[]
  link: string
  description: string
  ctaText: string
}

const FeaturedArticleCard = ({
  heading,
  tags,
  link,
  description,
  ctaText,
}: FeaturedArticleCardProps) => {
  return (
    <div className="rounded-lg bg-white px-8 py-12 dark:bg-primary-gray-dark md:py-[122px] md:px-[80px]">
      {tags.map((tag) => (
        <Tag name={tag} />
      ))}
      <div className="text-h2 my-2">{heading}</div>
      <p className="mb-14 text-primary-gray-300 dark:text-primary-gray-200">
        {description}
      </p>
      <ButtonLink href={link} className="px-6 py-4">
        {ctaText}
      </ButtonLink>
    </div>
  )
}

export default FeaturedArticleCard
