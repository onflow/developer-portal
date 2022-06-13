import * as React from "react"

const SvgLanguage = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10.725 12.558-2.117-2.091.025-.025A14.6 14.6 0 0 0 11.725 5h2.441V3.333H8.333V1.667H6.666v1.666H.833V5h9.308A13.137 13.137 0 0 1 7.5 9.458a13.038 13.038 0 0 1-1.925-2.791H3.908a14.634 14.634 0 0 0 2.483 3.8L2.15 14.65l1.183 1.183L7.5 11.667l2.591 2.591.634-1.7Zm4.691-4.225H13.75l-3.75 10h1.666l.934-2.5h3.958l.942 2.5h1.666l-3.75-10Zm-2.183 5.834 1.35-3.609 1.35 3.609h-2.7Z"
      fill="#69717E"
      opacity={0.5}
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgLanguage
export default SvgLanguage
