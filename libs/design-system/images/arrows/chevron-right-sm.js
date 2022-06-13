import * as React from "react"

const SvgChevronRightSm = (props) => (
  <svg
    width={7}
    height={10}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m1.5 9 4-4-4-4"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgChevronRightSm
export default SvgChevronRightSm
