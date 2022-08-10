import { IntroCardProps } from "~/ui/design-system/src/lib/Components/NavigationBar/IntroCard"
import AbstractImage6 from "~/ui/design-system/images/misc/Asset_6@3x.png"
import AbstractImage8 from "~/ui/design-system/images/misc/Asset_8@3x.png"
import PlaygroundImage from "~/ui/design-system/images/misc/playground-nav.png"

const learnCard: IntroCardProps = {
  href: "/learn", // Replace with /learn
  ctaText: "View all",
  description:
    "We have aggregated and categorized the best content on building dapps on Flow across the ecosystem.",
  imageHref: AbstractImage6,
  title: "Flow Resource Library",
}

const communityCard: IntroCardProps = {
  href: "/community", // Replace with /learn
  ctaText: "See more of the flow community",
  description:
    "Check out initiatives, events, and more from the Flow community.",
  imageHref: AbstractImage6,
  title: "Flow Community",
}

const flowConceptsCard: IntroCardProps = {
  href: "/flow", // Replace with /learn
  ctaText: "View key concepts",
  description:
    "Learn about Flow concepts and how they work together to build dapps.",
  imageHref: AbstractImage6,
  title: "Flow Concepts",
}

const emeraldDaoCard: IntroCardProps = {
  href: "https://github.com/emerald-dao",
  ctaText: "View details",
  description:
    "Emerald DAO partners with Flow to produce educational material for Flow. Go from zero to a hero on Flow development with their live bootcamps.",
  imageHref: "https://academy.ecdao.org/thumb-beginner-cadence.png",
  title: "Flow Live Bootcamps",
}

const playgroundCard: IntroCardProps = {
  href: "/cadence/tutorial/01-first-steps",
  ctaText: "Go to tutorial",
  description:
    "No tools needed. Learn and experiment with Cadence and smart contracts on Flow in an isolated environment.",
  imageHref: PlaygroundImage,
  title: "Flow Playground",
}

const gettingStartedCard: IntroCardProps = {
  href: "/getting-started",
  ctaText: "Get started",
  description: "New to Flow? Start here to understand and learn the basics.",
  imageHref: AbstractImage6,
  title: "Get Started",
}

const sporkProcessCard: IntroCardProps = {
  href: "/getting-started",
  ctaText: "Learn more",
  description:
    "A spork is a coordinated network upgrade process where nodes upgrade their software. Typically this means there will be downtime in the network.",
  imageHref: AbstractImage6,
  title: "Spork Process",
}

const networkStatusCard: IntroCardProps = {
  href: "/nodes",
  ctaText: "Learn more",
  description:
    "Nodes are the backbone of the Flow network. Learn more about how they work and operate.",
  imageHref: AbstractImage8,
  title: "Flow Nodes",
}

const flowVerseCard: IntroCardProps = {
  href: "/getting-started",
  ctaText: "Get Started",
  description: "New to Flow? Start here to understand and learn the basics.",
  imageHref: AbstractImage6,
  title: "Discover Flow with Flowverse",
}

const kittyItemsCard: IntroCardProps = {
  href: "/learn/kitty-items/",
  ctaText: "Try it out",
  description:
    "A full stack example NFT storefront and marketplace built with the latest standards and tooling on Flow. Get it up and running in a few minutes.",
  imageHref:
    "https://kitty-items-flow-testnet-prod.herokuapp.com/images/kitty-items-logo.svg",
  title: "Kitty Items: Example Dapp",
}

const grantsCard: IntroCardProps = {
  href: "https://github.com/onflow/developer-grants",
  ctaText: "View details",
  description:
    "Get funded to build open source tools, services, and educational content for other Flow developers.",
  imageHref: AbstractImage8,
  title: "Developer Grants",
}

export {
  learnCard,
  communityCard,
  flowConceptsCard,
  emeraldDaoCard,
  playgroundCard,
  gettingStartedCard,
  sporkProcessCard,
  networkStatusCard,
  flowVerseCard,
  kittyItemsCard,
  grantsCard,
}
