import EcosystemIcon from "~/ui/design-system/images/content/ecosystem"
import { Section } from "~/ui/design-system/src/lib/Components/NavigationBar/types"
import { flowVerseCard, emeraldDaoCard, grantsCard } from "./navCardsData"
// Connect Tab
export const eventsSection: Section = {
  links: [
    {
      title: "View more of the Flow community",
      href: "/community",
    },
  ],
  title: "Flow Ecosystem",
  subSections: [
    {
      title: "Flow Dapps",
      href: "https://www.flowverse.co/rankings",
    },
    {
      title: "Emerald Dao Bootcamp",
      href: "https://github.com/onflow/fcl-js",
    },
    {
      title: "FLOATs: Participation NFTs",
      href: "https://github.com/onflow/flow-jvm-sdk",
    },
    {
      title: "FNS: Flow Name Service",
      href: "https://github.com/Outblock/flow-swift",
    },
    {
      title: ".find: Flow Name Service",
      href: "https://github.com/Outblock/flow-swift",
    },
    {
      title: "Jobs on Flow",
      href: "https://github.com/onflow/flow-go-sdk",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

export const socialsSection: Section = {
  links: [
    {
      title: "Chat with Flow developers now on Discord",
      href: "https://discord.gg/mDvccFPx",
    },
  ],
  title: "Socials & Platforms",
  subSections: [
    {
      title: "Github",
      href: "https://github.com/onflow",
    },
    {
      title: "Forum",
      href: "https://forum.onflow.org/",
    },
    {
      title: "Blog",
      href: "http://blog.onflow.com/",
    },
    {
      title: "Youtube",
      href: "https://www.youtube.com/channel/UCs9r5lqmYQsKCpLB9jKwocg",
    },
    {
      title: "Discord",
      href: "https://discord.gg/mDvccFPx",
    },
    {
      title: "Twitter",
      href: "https://twitter.com/flow_blockchain",
    },
    {
      title: "Telegram",
      href: "https://t.me/flow_blockchain",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

// Setup Section

export const grantsSection: Section = {
  links: [
    {
      title: "View Developer Grants",
      href: "https://github.com/emerald-dao/0-hello-world",
    },
  ],
  title: "Grants & Bounties",
  subSections: [
    {
      title: "Ecosystem Fund Overview",
      href: "https://flow.com/ecosystemsupport",
    },
    {
      title: "Developer Grants",
      href: "https://github.com/onflow/developer-grants",
    },
    {
      title: "Bug Bounty Program",
      href: "https://docs.onflow.org/bounties",
    },
    {
      title: "FLIP Fest (past)",
      href: "https://github.com/onflow/flip-fest",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

export const governanceSection: Section = {
  links: [
    {
      title: "View current proposals",
      href: "https://cast.fyi/#/community/1?tab=proposals",
    },
  ],
  title: "Governance",
  subSections: [
    {
      title: "CAST: Voting on Flow",
      href: "https://cast.fyi/#/about",
    },
    {
      title: "Flow Improvement Proposals (FLIPs)",
      href: "https://github.com/onflow/flips",
    },
    {
      title: "Variable Transaction Fees",
      href: "https://docs.onflow.org/concepts/variable-transaction-fees/",
    },
    {
      title: "Road to Permissionless Deployment",
      href: "https://permissionless.onflow.org/",
    },
  ],
  icon: <EcosystemIcon height="1em" width="1em" />,
}

const ConnectTabData = {
  title: "Connect",
  description: "Discover and join the Flow ecosystem.",
  cards: [flowVerseCard, emeraldDaoCard],
  sections: [socialsSection, eventsSection],
}

const ContributeTabData = {
  title: "Contribute",
  description: "Participate in the community and become a leader on Flow.",
  cards: [grantsCard],
  sections: [grantsSection, governanceSection],
}

export { ConnectTabData, ContributeTabData }
