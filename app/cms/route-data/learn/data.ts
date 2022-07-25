import { TutorialCardProps } from "~/ui/design-system/src/lib/Components/TutorialCard"
import { LargeVideoCardProps } from "~/ui/design-system/src/lib/Components/VideoCard/LargeVideoCard"
import { SmallVideoCardProps } from "~/ui/design-system/src/lib/Components/VideoCard/SmallVideoCard"
import { InternalLandingHeaderProps } from "~/ui/design-system/src/lib/Components/InternalLandingHeader"

import {
  getTheFlowDown,
  organizingCadenceTutorial,
  introToFlow,
  redSquirrelGetStartedArticle,
  guideToFlowForEthereumUsers,
  FCLQuickstartNextJs,
  FCLQuickstartNuxtJs,
  FCLQuickstartSvelteKit,
  flowNFTPetStore,
  learnCadenceVideoSeries,
  flowMetaDataStandard,
  NBATopShotExample,
  flowMultiNodeArchitecture,
  zeroToJacobFlow,
  revolutionizeSmartContractProgramming,
  cadenceAtAGlance,
  firstStepsWithCadence,
  accessControlCadence,
} from "~/ui/component-data/Articles"

const cadenceTutorials: TutorialCardProps[] = [
  cadenceAtAGlance,
  organizingCadenceTutorial,
  learnCadenceVideoSeries,
  zeroToJacobFlow,
  firstStepsWithCadence,
  FCLQuickstartNextJs,
  FCLQuickstartNuxtJs,
  FCLQuickstartSvelteKit,
]

const nftTutorials: TutorialCardProps[] = [
  NBATopShotExample,
  redSquirrelGetStartedArticle,
  flowNFTPetStore,
  flowMetaDataStandard,
]

const architectureTutorials: TutorialCardProps[] = [
  introToFlow,
  flowMultiNodeArchitecture,
  getTheFlowDown,
  guideToFlowForEthereumUsers,
  revolutionizeSmartContractProgramming,
  accessControlCadence,
]

type VideoProps = {
  primary: LargeVideoCardProps
  secondary: SmallVideoCardProps[]
}

const videos: VideoProps = {
  primary: {
    link: "https://www.youtube.com/watch?v=pRz7EzrWchs",
    title: "Learn Cadence - Hello World on Flow",
    length: 1396,
  },
  secondary: [
    {
      link: "https://www.youtube.com/watch?v=DInibYmxUsc",
      title: "Fungible Token Smart Contracts on Flow",
      length: 1993,
      tags: ["Guide"],
    },
    {
      link: "https://www.youtube.com/watch?v=uEoh9SnjqCk",
      title: "How to build a basic web3 app on Flow",
      length: 1878,
      tags: ["Guide"],
    },
  ],
}

const allTutorials: TutorialCardProps[] = [
  ...nftTutorials,
  ...cadenceTutorials,
  ...architectureTutorials,
]

export const landingHeaders: Partial<Record<any, InternalLandingHeaderProps>> =
  {
    "fcl-js": {
      toolName: "fcl-js",
      description:
        "Cadence is a resource-oriented programming language that introduces new features to smart contract programming that help developers ensure that their code is safe, secure, clear, and approachable. Some of these features are:",
      headerCards: [
        {
          title: "Hello World!",
          tags: ["tutorial", "playground"],
          description:
            "Write and deploy your first smart contract within minutes on our Playground.",
          href: "/cadence/tutorial/02-hello-world/",
        },
        {
          title: "FCL",
          tags: ["reference", "syntax"],
          description:
            "Learn the functionality, terminology and syntax of the Cadence language.",
          href: "/cadence/language/",
        },
        {
          title: "Solidity to Cadence Intro",
          tags: ["guide", "patterns"],
          description:
            "Learn the key differences in the account models between Solidity and Cadence.",
          href: "/cadence/msg-sender/",
        },
      ],
    },
  }

export const data = {
  videos,
  nftTutorials,
  cadenceTutorials,
  allTutorials,
  youtubeHref: "https://www.youtube.com/c/FlowBlockchain",
  cadenceHref: "/cadence/",
  architectureTutorials,
  landingHeaders,
}
