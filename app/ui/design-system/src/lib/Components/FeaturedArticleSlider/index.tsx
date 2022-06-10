import { Article } from "../../interfaces"
import { ButtonLink } from "../Button"
import { Carousel, CarouselProps } from "../Carousel"

export type FeaturedArticleSliderProps = CarouselProps & {
  articles: Article[]
}

const FeaturedArticle = ({
  // @ts-expect-error please fix
  heading,
  // @ts-expect-error please fix
  description,
  // @ts-expect-error please fix
  ctaLink,
  // @ts-expect-error please fix
  ctaText,
  // @ts-expect-error please fix
  imageUrl,
}) => (
  <div className="flex min-h-fit flex-col-reverse overflow-hidden rounded-2xl bg-white dark:bg-primary-gray-dark md:min-h-[30rem] md:flex-row">
    <div className="min-w-[50%] self-center py-10 pl-6 pr-6 md:pr-32 md:pl-20">
      <h3 className="text-h3">{heading}</h3>
      <p className="py-6 text-primary-gray-300 dark:text-primary-gray-100">
        {description}
      </p>
      <ButtonLink
        href={ctaLink}
        className="px-16 py-4 text-center text-white bg-black rounded-lg hover:cursor-pointer"
        variant="primary-no-darkmode"
      >
        {ctaText}
      </ButtonLink>
    </div>
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className="cover min-h-[8rem] w-full"
    />
  </div>
)

const FeaturedArticleSlider = ({
  articles,
  breakpoint = "none",
  carouselItemWidth = "w-10/12 md:w-full",
  ...carouselProps
}: FeaturedArticleSliderProps) => {
  return (
    <div className="container">
      <div className="mb-10 text-h2">
        Featured article{articles.length > 0 ? "s" : ""}
      </div>

      <Carousel
        breakpoint={breakpoint}
        carouselItemWidth={carouselItemWidth}
        {...carouselProps}
      >
        {articles.map((article) => (
          <FeaturedArticle
            key={`${article.heading}-${article.ctaLink}`}
            {...article}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default FeaturedArticleSlider
