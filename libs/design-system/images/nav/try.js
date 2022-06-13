import * as React from "react"

const SvgTry = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.333 5h13.334v8.333H3.333V5Zm13.334 10a1.667 1.667 0 0 0 1.666-1.667V5a1.667 1.667 0 0 0-1.666-1.667H3.333A1.66 1.66 0 0 0 1.667 5v8.333A1.667 1.667 0 0 0 3.333 15H0v1.667h20V15h-3.333Z"
      fill="#69717E"
      opacity={0.5}
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgTry
export default SvgTry
