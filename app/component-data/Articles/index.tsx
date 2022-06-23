import { FeaturedArticleCardProps } from "~/ui/design-system/src/lib/Components/FeaturedArticleCard"
import { TutorialCardProps } from "~/ui/design-system/src/lib/Components/TutorialCard"
import CodeIcon from "~/ui/design-system/images/content/code.svg"

export const redSquirrelGetStartedArticle: FeaturedArticleCardProps = {
  heading: "Getting started on Flow by RedSquirrel",
  tags: ["tutorial", "nft", "beginner"],
  description: `
  Deploy a Cadence smart contract to a local emulator and interact with it as soon as possible!
  I recently got the opportunity to help build a Non-Fungible Token using the Flow Blockchain.
  This was a whole new blockchain for me! Getting up and running with a new technology is always a
  challenge, and I find that sometimes figuring out where to start is the hardest part.`,
  link: "https://medium.com/redsquirrel-tech/getting-started-with-the-flow-blockchain-31bfab956a96",
  ctaText: "View Article",
}

export const organizingCadenceTutorial: TutorialCardProps = {
  heading: "How to organize Cadence projects",
  tags: ["protocol", "network"],
  description: `How you organize the files for your project in your Github repo by Joshua Hannan - a senior smart contract engineer at Flow.`,
  link: "https://joshuahannan.medium.com/how-i-organize-my-cadence-projects-75b811b700d9",
  imageUri: "https://miro.medium.com/max/1400/1*o_J8FQHAIczyhTehcT1ziw.png",
  // lastUpdated: "Apr 8, 2021",
  // author: {
  //   name: "Joshua Hannan",
  //   profileImage: "https://miro.medium.com/fit/c/176/176/1*1bOpQWSQ1Npzd-ptssLB7g.png"
  // }
}

export const introToFlow: TutorialCardProps & FeaturedArticleCardProps = {
  heading: "Introduction to Flow blockchain",
  tags: ["protocol", "network"],
  description: `When Dapper Labs built Crypto Kitties we learned a lot.
    Most importantly, we realized that the technology at the time was not ready for this kind of application.
    Being the visionaries we are, we set to build a better tech for what we plan to do.
    We set to build what is now Flow blockchain.`,
  link: "https://jan-bernatik.medium.com/introduction-to-flow-blockchain-7532977c8af8",
  ctaText: "View Article",
  imageUri: "https://miro.medium.com/max/1400/1*WXAWBMemgaBaHvO-oXDrEA.png",
}

export const getTheFlowDown: TutorialCardProps & FeaturedArticleCardProps = {
  heading: "Get the Flow Down",
  tags: ["resource-list", "community"],
  description: `Get the Flow Down is a curated collection of the best Flow blockchain tools, tutorials, articles and more!`,
  link: "https://jan-bernatik.medium.com/introduction-to-flow-blockchain-7532977c8af8",
  ctaText: "View List",
  imageUri: CodeIcon,
}
