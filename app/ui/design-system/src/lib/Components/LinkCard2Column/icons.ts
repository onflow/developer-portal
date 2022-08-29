import PlaygroundIcon from "~/ui/design-system/images/misc/playground-default.png"
import FCLIcon from "~/ui/design-system/images/tools/tool-fcl.svg"
import CadenceIcon from "~/ui/design-system/images/tools/tool-cadence.svg"

export const LINK_CARD_ICONS = {
  cadence: CadenceIcon,
  fcl: FCLIcon,
  playground: PlaygroundIcon,
} as const

export type LinkCardIconType = keyof typeof LINK_CARD_ICONS
