import * as React from "react"

const SvgScreenFull = (props) => (
  <svg
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.75 1.5a.25.25 0 0 0-.25.25v2.5a.75.75 0 0 1-1.5 0v-2.5C0 .783.783 0 1.75 0h2.5a.75.75 0 0 1 0 1.5h-2.5ZM9 .75A.75.75 0 0 1 9.75 0h2.5C13.216 0 14 .783 14 1.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.25.25 0 0 0-.25-.25h-2.5A.75.75 0 0 1 9 .75ZM.75 9a.75.75 0 0 1 .75.75v2.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 0 12.25v-2.5A.75.75 0 0 1 .75 9Zm12.5 0a.75.75 0 0 1 .75.75v2.5A1.75 1.75 0 0 1 12.25 14h-2.5a.75.75 0 0 1 0-1.5h2.5a.25.25 0 0 0 .25-.25v-2.5a.75.75 0 0 1 .75-.75Z"
      fill="currentColor"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgScreenFull
export default SvgScreenFull
