import { ButtonLink } from '../Button';
import { Article } from '../../interfaces';
import { Carousel, CarouselProps } from '../Carousel';

export type FeaturedArticleSliderProps = CarouselProps & {
  articles: Article[];
};

const FeaturedArticle = ({
  heading,
  description,
  ctaLink,
  ctaText,
  imageUrl,
}) => (
  <div className="flex min-h-fit flex-col-reverse overflow-hidden rounded-2xl bg-white dark:bg-primary-gray-dark md:min-h-[30rem] md:flex-row">
    <div className="min-w-[50%] self-center py-10 pl-6 pr-6 md:pr-32 md:pl-20">
      <h3 className="text-h3">{heading}</h3>
      <p className="py-6 dark:text-primary-gray-100">{description}</p>
      <ButtonLink
        href={ctaLink}
        className="px-16 py-4 text-center text-white bg-black rounded-lg hover:cursor-pointer"
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
);

const FeaturedArticleSlider = ({
  articles,
  breakpoint = 'none',
  carouselItemWidth = 'w-10/12 md:w-full',
  ...carouselProps
}: FeaturedArticleSliderProps) => {
  return (
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
  );
};

export default FeaturedArticleSlider;
