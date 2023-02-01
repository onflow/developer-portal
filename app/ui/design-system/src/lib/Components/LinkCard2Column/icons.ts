import LearnIcon from "~/ui/design-system/images/page/flow-learn-icon.svg"
import QuickstartIcon from "~/ui/design-system/images/page/flow-quickstart-icon.svg"
import DocumentationIcon from "~/ui/design-system/images/page/flow-documentation-icon.svg"

export const LINK_CARD_ICONS = {
  learn: LearnIcon,
  quickstart: QuickstartIcon,
  documentation: DocumentationIcon,
} as const

export type LinkCardIconType = string
