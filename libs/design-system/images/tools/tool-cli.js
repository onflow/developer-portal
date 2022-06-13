import * as React from "react"

const SvgToolCli = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#tool-cli_svg__a)">
      <rect
        width={58}
        height={58}
        rx={8}
        fill="url(#tool-cli_svg__b)"
        fillOpacity={0.33}
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m12.889 33.04 3.701 3.662 11.105-10.986L16.59 14.729l-3.701 3.663 7.402 7.324-7.402 7.323Zm18.508 2.997h16.825v-4.91H31.397v4.91Z"
      fill="url(#tool-cli_svg__c)"
    />
    <defs>
      <linearGradient
        id="tool-cli_svg__b"
        x1={8.746}
        y1={-4.603}
        x2={58}
        y2={58}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="tool-cli_svg__c"
        x1={40.713}
        y1={-6.437}
        x2={14.894}
        y2={33.274}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FF12" />
        <stop offset={1} stopColor="#08C466" />
      </linearGradient>
      <filter
        id="tool-cli_svg__a"
        x={-49.016}
        y={-49.016}
        width={156.032}
        height={156.032}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation={24.508} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_2_645"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_645"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={1.178} dy={1.178} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 0.928409 0 0 0 0 0.978523 0 0 0 0 1 0 0 0 0.26 0" />
        <feBlend in2="shape" result="effect2_innerShadow_2_645" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={-1.18} dy={-1.18} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
        <feBlend
          in2="effect2_innerShadow_2_645"
          result="effect3_innerShadow_2_645"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolCli
export default SvgToolCli
