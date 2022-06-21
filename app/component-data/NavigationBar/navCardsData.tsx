import { IntroCardProps } from "~/ui/design-system/src/lib/Components/NavigationBar/IntroCard"
import RadarIcon from "~/ui/design-system/images/misc/radar.png"
import AbstractImage6 from "~/ui/design-system/images/misc/Asset_6@3x.png"
import AbstractImage8 from "~/ui/design-system/images/misc/Asset_8@3x.png"

const learnCard: IntroCardProps = {
  href: "/coming-soon", // Replace with /learn
  ctaText: "View all",
  description:
    "We have aggregated and categorized the best content on building dapps on Flow across the ecosystem.",
  imageHref: RadarIcon,
  title: "Flow Resource Library",
}

const emeraldDaoCard: IntroCardProps = {
  href: "https://docs.onflow.org/cadence/tutorial/01-first-steps",
  ctaText: "View details",
  description:
    "Emerald DAO partners with Flow to produce educational material for Flow. Go from zero to a hero on Flow development with their live bootcamps.",
  imageHref: "https://academy.ecdao.org/thumb-beginner-cadence.png",
  title: "Flow Live Bootcamps",
}

const playgroundCard: IntroCardProps = {
  href: "https://docs.onflow.org/cadence/tutorial/01-first-steps",
  ctaText: "Go to tutorial",
  description:
    "No tools needed. Learn and experiment with Cadence and smart contracts on Flow in an isolated environment.",
  imageHref: AbstractImage6,
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
  ctaText: "Get Started",
  description: "New to Flow? Start here to understand and learn the basics.",
  imageHref: AbstractImage6,
  title: "Spork Process",
}

const networkStatusCard: IntroCardProps = {
  href: "https://docs.onflow.org/status/",
  ctaText: "View status",
  description: "New to Flow? Start here to understand and learn the basics.",
  imageHref: AbstractImage8,
  title: "Network Status",
}

const flowVerseCard: IntroCardProps = {
  href: "/getting-started",
  ctaText: "Get Started",
  description: "New to Flow? Start here to understand and learn the basics.",
  imageHref: AbstractImage6,
  title: "Discover Flow with Flowverse",
}

const kittyItemsCard: IntroCardProps = {
  href: "https://docs.onflow.org/kitty-items/",
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
  emeraldDaoCard,
  playgroundCard,
  gettingStartedCard,
  sporkProcessCard,
  networkStatusCard,
  flowVerseCard,
  kittyItemsCard,
  grantsCard,
}
