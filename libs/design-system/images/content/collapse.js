import * as React from "react"

const SvgCollapse = (props) => (
  <svg
    width={12}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.5 7.5h3v3M4.5 7.5 1 11M10.5 4.5h-3v-3M7.5 4.5 11 1"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgCollapse
export default SvgCollapse
