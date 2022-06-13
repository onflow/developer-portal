import * as React from "react"

const SvgSwiftSm = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.711 2.003s3.108 1.777 3.922 4.6c.733 2.55.146 3.768.146 3.768.375.408.67.883.871 1.4a2.413 2.413 0 0 1 .145 2.226s-.05-1.04-1.6-1.255c-1.42-.2-1.937 1.182-4.65 1.115A9.219 9.219 0 0 1 1 9.678c1.325.723 3.062 1.846 5.224 1.673 2.163-.172 2.614-.837 2.614-.837a33.45 33.45 0 0 1-6.392-6.692c1.7 1.423 5.91 4.254 5.813 4.182A37.913 37.913 0 0 1 4.045 3.12s6.318 5.194 6.827 5.161c.209-.43 1.289-2.659-1.162-6.278Z"
      fill="url(#swift-sm_svg__a)"
    />
    <defs>
      <linearGradient
        id="swift-sm_svg__a"
        x1={8.22}
        y1={6.803}
        x2={7.956}
        y2={14.003}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F88535" />
        <stop offset={1} stopColor="#FD2221" />
      </linearGradient>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgSwiftSm
export default SvgSwiftSm
