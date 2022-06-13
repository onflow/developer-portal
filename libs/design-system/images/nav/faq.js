import * as React from "react"

const SvgFaq = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.167 15h1.667v-1.667H9.167V15ZM10 1.667a8.333 8.333 0 1 0 0 16.666 8.333 8.333 0 0 0 0-16.666Zm0 15A6.675 6.675 0 0 1 3.334 10 6.676 6.676 0 0 1 10 3.333 6.676 6.676 0 0 1 16.667 10 6.675 6.675 0 0 1 10 16.667ZM10 5a3.333 3.333 0 0 0-3.333 3.333h1.667a1.667 1.667 0 1 1 3.333 0c0 1.667-2.5 1.459-2.5 4.167h1.667c0-1.875 2.5-2.083 2.5-4.167A3.333 3.333 0 0 0 10 5Z"
      fill="#69717E"
      opacity={0.5}
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgFaq
export default SvgFaq
