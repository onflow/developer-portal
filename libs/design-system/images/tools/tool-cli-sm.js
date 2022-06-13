import * as React from "react"

const SvgToolCliSm = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m3 10.182 1.047 1.037 3.143-3.11L4.047 5 3 6.037l2.095 2.072L3 10.182Zm5.238.848H13V9.64H8.238v1.39Z"
      fill="url(#tool-cli-sm_svg__a)"
    />
    <defs>
      <linearGradient
        id="tool-cli-sm_svg__a"
        x1={10.874}
        y1={-0.991}
        x2={3.567}
        y2={10.249}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FF12" />
        <stop offset={1} stopColor="#08C466" />
      </linearGradient>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolCliSm
export default SvgToolCliSm
