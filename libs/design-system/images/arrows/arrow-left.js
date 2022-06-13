import * as React from "react"

const SvgArrowLeft = (props) => (
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
      d="M4.5.5v7a.48.48 0 0 1-.148.352A.48.48 0 0 1 4 8a.48.48 0 0 1-.352-.148l-3.5-3.5A.48.48 0 0 1 0 4a.48.48 0 0 1 .148-.352l3.5-3.5A.48.48 0 0 1 4 0a.48.48 0 0 1 .352.148A.48.48 0 0 1 4.5.5Z"
      fill="currentColor"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgArrowLeft
export default SvgArrowLeft
