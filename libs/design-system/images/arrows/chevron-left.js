import * as React from "react"

const SvgChevronLeft = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    stroke="#2F353F"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m15 18-6-6 6-6"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgChevronLeft
export default SvgChevronLeft
