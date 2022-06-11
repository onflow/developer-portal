import { startOfDay } from "date-fns"
import networkGradientPath from "../../../../images/gradients/network.svg"
import {
  AnnouncementCard,
  FeaturedArticleSlider,
  Footer,
  NetworkCard,
  NetworkDiscordCard,
  SocialLinksSignup,
} from "../../Components"
import { Article, StatuspageApiResponse } from "../../interfaces"
import data from "./sample"

const NetworkPage = () => {
  const article = {
    heading: "Node operator callout",
    description:
      "Everything you need to start building on Flow verything you need to start building on Flow everything you need to start building on Flow",
    ctaText: "Learn more",
    ctaLink: "https://flow.com",
    imageUrl:
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  } as Article

  return (
    <div className="w-full bg-primary-gray-50 p-6 dark:bg-black">
      <div
        className="flex-col items-center bg-no-repeat"
        style={{ backgroundImage: `url(${networkGradientPath})` }}
      >
        <h1 className="text-h1 pt-[212px]">Network status</h1>

        <div className="mt-12 mb-[100px] flex-col ">
          {
            // @ts-expect-error
            data.map(({ name, status }: StatuspageApiResponse) => {
              return (
                <div className="py-6" key={name}>
                  <NetworkCard
                    networkName={name}
                    status={
                      status === "operational" ? "Healthy" : "Under Maintenance"
                    }
                    version="33"
                    lastSporkDate="April, 2022"
                    nextSporkDate="April, 2022"
                    link="https://google.com"
                  />
                </div>
              )
            })
          }
        </div>

        <h3 className="text-h3">Live updates</h3>
        <div className="mt-6 mb-[100px] flex justify-between xs:flex-col xs:gap-4 md:flex-row">
          {[1, 2, 3].map((index) => (
            <div key={index}>
              <NetworkDiscordCard
                message="Mainnet has been down for the past two hours"
                timestamp={startOfDay(new Date())}
                messageLink="https://google.com"
                username="@john_flow"
              />
            </div>
          ))}
        </div>

        <h3 className="text-h3">Announcements</h3>
        <div className="mb-[100px] flex-col">
          {[1, 2, 3].map((index) => (
            <div className="py-4" key={index}>
              <AnnouncementCard
                sourceIcon="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
                sourceAltText="Github"
                heading="Holy schnikes Github is down"
                timestamp={startOfDay(new Date())}
                link="https://google.com"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="self-center">
        <FeaturedArticleSlider articles={[article]} />
      </div>

      <div className="my-24 xs:h-[57rem] md:h-[42rem]">
        <SocialLinksSignup />
      </div>

      <Footer />
    </div>
  )
}

export default NetworkPage
