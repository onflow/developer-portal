import * as React from "react"

const SvgRss = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 5v2.546c6.325 0 11.454 5.129 11.454 11.454H19c0-7.729-6.271-14-14-14Zm1.961 10.077a1.961 1.961 0 1 0 0 3.923 1.961 1.961 0 0 0 0-3.923ZM5 12.64v-2.546A8.905 8.905 0 0 1 13.908 19H11.36A6.367 6.367 0 0 0 5 12.639Z"
      fill="currentColor"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgRss
export default SvgRss
