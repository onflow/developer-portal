import { ButtonLink } from '../Button';
import { Article } from '../../interfaces';
import { Carousel } from '../Carousel';

export type FeaturedArticleSliderProps = {
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
        className="rounded-lg bg-black px-16 py-4 text-center text-white hover:cursor-pointer"
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

const FeaturedArticleSlider = ({ articles }: FeaturedArticleSliderProps) => {
  return (
    <Carousel>
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
