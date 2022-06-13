import * as React from "react"

const SvgConcepts = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.5 12.5v3.333a1.666 1.666 0 0 1-1.667 1.667H4.167A1.667 1.667 0 0 1 2.5 15.833V9.167A1.667 1.667 0 0 1 4.167 7.5H7.5V4.167A1.667 1.667 0 0 1 9.167 2.5h6.666A1.666 1.666 0 0 1 17.5 4.167v6.666a1.666 1.666 0 0 1-1.667 1.667H12.5Zm-3.333-5H12.5v3.333h3.333V4.167H9.167V7.5Zm-5 1.667v6.666h6.666V12.5H7.5V9.167H4.167Z"
      fill="#69717E"
      opacity={0.5}
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgConcepts
export default SvgConcepts
