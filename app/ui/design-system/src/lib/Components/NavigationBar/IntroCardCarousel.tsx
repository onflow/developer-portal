import { Carousel } from "../Carousel"
import { IntroCard, IntroCardProps } from "./IntroCard"

export type IntroCardCarouselProps = {
  cards: IntroCardProps[]
}

export function IntroCardCarousel({ cards }: IntroCardCarouselProps) {
  return (
    <Carousel
      breakpoint="none"
      carouselItemWidth="w-full"
      className="w-72 rounded-md bg-primary-gray-50 px-8 pt-6 pb-4 dark:bg-black"
      indicatorColor="bg-primary-gray-100 dark:bg-primary-gray-300"
      indicatorSelectedColor="bg-primary-gray-300 dark:bg-white"
      indicatorSize="xs"
    >
      {cards.map((card, index) => (
        <IntroCard key={index} {...card} />
      ))}
    </Carousel>
  )
}
