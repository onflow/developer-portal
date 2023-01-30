import { ReactComponent as CadenceLandingIcon } from "../../../../images/tools/tool-cadence-landing"
import { ReactComponent as FclIcon } from "../../../../images/tools/tool-fcl"
import { ReactComponent as MobileIcon } from "../../../../images/tools/tool-mobile"

export const LANDING_HEADER_ICONS = {
  cadence: CadenceLandingIcon,
  "fcl-js": FclIcon,
  mobile: MobileIcon,
} as const

export type InternaLandingHeaderIconType = keyof typeof LANDING_HEADER_ICONS
