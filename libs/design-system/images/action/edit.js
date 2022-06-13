import * as React from "react"

const SvgEdit = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17 3a2.827 2.827 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z"
      stroke="#2F353F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgEdit
export default SvgEdit
