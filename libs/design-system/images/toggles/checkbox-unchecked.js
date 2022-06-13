import * as React from "react"

const SvgCheckboxUnchecked = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19 5v14H5V5h14Zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Z"
      fill="#ABB3BF"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgCheckboxUnchecked
export default SvgCheckboxUnchecked
