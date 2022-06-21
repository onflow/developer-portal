import { FeaturedArticleCardProps } from "~/ui/design-system/src/lib/Components/FeaturedArticleCard"
import { TutorialCardProps } from "~/ui/design-system/src/lib/Components/TutorialCard"

const introToFlowBlockchainArticle: FeaturedArticleCardProps = {
  heading: "Introduction to Flow blockchain",
  tags: ["protocol", "network"],
  description: `When Dapper Labs built Crypto Kitties we learned a lot.
    Most importantly, we realized that the technology at the time was not ready for this kind of application.
    Being the visionaries we are, we set to build a better tech for what we plan to do.
    We set to build what is now Flow blockchain.`,
  link: "https://jan-bernatik.medium.com/introduction-to-flow-blockchain-7532977c8af8",
  ctaText: "View Article",
}

const organizingCadenceArticle: TutorialCardProps = {
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

const introToFlowBlockchainTutorial: TutorialCardProps = {
  heading: "Introduction to Flow blockchain",
  tags: ["protocol", "network"],
  description: `When Dapper Labs built Crypto Kitties we learned a lot.
    Most importantly, we realized that the technology at the time was not ready for this kind of application.
    Being the visionaries we are, we set to build a better tech for what we plan to do.
    We set to build what is now Flow blockchain.`,
  link: "https://joshuahannan.medium.com/how-i-organize-my-cadence-projects-75b811b700d9",
  imageUri: "https://miro.medium.com/max/1400/1*WXAWBMemgaBaHvO-oXDrEA.png",
}

export {
  introToFlowBlockchainArticle,
  organizingCadenceArticle,
  introToFlowBlockchainTutorial,
}
