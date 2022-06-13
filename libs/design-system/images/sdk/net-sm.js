import * as React from "react"

const SvgNetSm = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#net-sm_svg__a)">
      <path
        d="M16 5.847h-1.645v5.043h-.95V5.847h-1.642V5.02H16v.827Zm-4.568 5.043H8.218V5.02h3.087v.827H9.168v1.662h1.969v.823H9.168v1.736h2.264v.822Zm-4.472 0H5.921L3.187 6.575a1.93 1.93 0 0 1-.172-.34H2.99c.021.126.032.395.032.807v3.848h-.918V5.02H3.21l2.643 4.213c.111.174.183.295.215.36h.016a5.339 5.339 0 0 1-.04-.79V5.02h.915v5.871Zm-5.802-.462a.532.532 0 0 1-.17.391.58.58 0 0 1-.41.162.6.6 0 0 1-.409-.162.551.551 0 0 1-.169-.392.54.54 0 0 1 .17-.39.593.593 0 0 1 .63-.12.581.581 0 0 1 .314.3c.029.066.044.138.044.211Z"
        fill="#000"
      />
    </g>
    <defs>
      <clipPath id="net-sm_svg__a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgNetSm
export default SvgNetSm
