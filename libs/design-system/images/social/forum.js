import * as React from "react"

const SvgForum = (props) => (
  <svg
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 8.5a8.5 8.5 0 0 1-12.431 7.538l-4.435.934a.1.1 0 0 1-.12-.109l.558-5.293A8.5 8.5 0 1 1 17 8.5Zm-4.25 0a4.25 4.25 0 0 1-6.216 3.77l-2.284.48.286-2.715A4.25 4.25 0 1 1 12.75 8.5Z"
      fill="currentColor"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgForum
export default SvgForum
