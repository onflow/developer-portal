import * as React from "react"

const SvgPlay = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="play_svg__a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={4}
      y={2}
      width={16}
      height={20}
    >
      <path
        d="m5 3 14 9-14 9V3Z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </mask>
    <g mask="url(#play_svg__a)">
      <path fill="#2F353F" d="M.207 0h24v24h-24z" />
    </g>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgPlay
export default SvgPlay
