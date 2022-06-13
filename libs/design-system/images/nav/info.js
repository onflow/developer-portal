import * as React from "react"

const SvgInfo = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.166 7.5h1.667V5.833H9.166V7.5ZM10 16.667A6.675 6.675 0 0 1 3.333 10 6.676 6.676 0 0 1 10 3.333 6.676 6.676 0 0 1 16.666 10 6.675 6.675 0 0 1 10 16.667Zm0-15a8.333 8.333 0 1 0 0 16.666 8.333 8.333 0 0 0 0-16.666Zm-.834 12.5h1.667v-5H9.166v5Z"
      fill="#69717E"
      opacity={0.5}
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgInfo
export default SvgInfo
