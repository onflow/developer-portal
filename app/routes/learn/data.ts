import { TutorialCardProps } from "~/ui/design-system/src/lib/Components/TutorialCard"
import { LargeVideoCardProps } from "~/ui/design-system/src/lib/Components/VideoCard/LargeVideoCard"
import { SmallVideoCardProps } from "~/ui/design-system/src/lib/Components/VideoCard/SmallVideoCard"
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
} from "../../component-data/Articles"

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

export const data = {
  videos,
  nftTutorials,
  cadenceTutorials,
  allTutorials,
  youtubeHref: "https://www.youtube.com/c/FlowBlockchain",
  cadenceHref: "https://example.com",
  architectureTutorials,
}
