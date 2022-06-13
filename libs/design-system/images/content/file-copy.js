import * as React from "react"

const SvgFileCopy = (props) => (
  <svg
    width={12}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.75 0A.75.75 0 0 0 3 .75v3c0 .414.336.75.75.75h4.5A.75.75 0 0 0 9 3.75v-3A.75.75 0 0 0 8.25 0h-4.5Zm.75 3V1.5h3V3h-3Zm-2.874-.467a.75.75 0 0 0-.752-1.298A1.75 1.75 0 0 0 0 2.75v9.5C0 13.216.783 14 1.75 14h8.5A1.75 1.75 0 0 0 12 12.25v-9.5a1.75 1.75 0 0 0-.874-1.515.75.75 0 1 0-.752 1.298.25.25 0 0 1 .126.217v9.5a.25.25 0 0 1-.25.25h-8.5a.25.25 0 0 1-.25-.25v-9.5a.25.25 0 0 1 .126-.217Z"
      fill="currentColor"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgFileCopy
export default SvgFileCopy
