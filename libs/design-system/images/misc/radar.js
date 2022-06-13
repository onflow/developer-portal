import * as React from "react"

const SvgRadar = (props) => (
  <svg
    width={108}
    height={108}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M108 54c0 29.823-24.177 54-54 54S0 83.823 0 54 24.177 0 54 0s54 24.177 54 54Z"
      fill="url(#radar_svg__a)"
    />
    <path
      d="M72.878 54.438c0 10.669-8.648 19.317-19.317 19.317-10.668 0-19.317-8.648-19.317-19.317 0-10.668 8.649-19.317 19.317-19.317 10.669 0 19.317 8.649 19.317 19.317Z"
      fill="url(#radar_svg__b)"
    />
    <defs>
      <radialGradient
        id="radar_svg__a"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(90 0 54) scale(49.1786)"
      >
        <stop stopColor="#fff" stopOpacity={0.9} />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="radar_svg__b"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="rotate(-135 38.055 16.126) scale(17.074)"
      >
        <stop stopColor="#fff" stopOpacity={0.9} />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgRadar
export default SvgRadar
