import * as React from "react"

const SvgArrowRight = (props) => (
  <svg
    width={5}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.077 7.5v-7A.48.48 0 0 1 .226.148.48.48 0 0 1 .577 0 .48.48 0 0 1 .93.148l3.5 3.5A.48.48 0 0 1 4.577 4a.48.48 0 0 1-.148.352l-3.5 3.5A.48.48 0 0 1 .577 8a.48.48 0 0 1-.351-.148.48.48 0 0 1-.149-.352Z"
      fill="currentColor"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgArrowRight
export default SvgArrowRight
