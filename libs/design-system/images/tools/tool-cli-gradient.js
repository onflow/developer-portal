import * as React from "react"

const SvgToolCliGradient = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#tool-cli-gradient_svg__a)">
      <rect
        width={58}
        height={58}
        rx={8}
        fill="url(#tool-cli-gradient_svg__b)"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m12.889 33.04 3.701 3.662 11.105-10.986L16.59 14.729l-3.701 3.663 7.402 7.324-7.402 7.323Zm18.508 2.997h16.825v-4.91H31.397v4.91Z"
      fill="#fff"
    />
    <defs>
      <linearGradient
        id="tool-cli-gradient_svg__b"
        x1={45.674}
        y1={-55.873}
        x2={-28.819}
        y2={15.379}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FF12" />
        <stop offset={1} stopColor="#08C466" />
      </linearGradient>
      <filter
        id="tool-cli-gradient_svg__a"
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
          result="effect1_backgroundBlur_2_651"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_651"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_651" />
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
          in2="effect2_innerShadow_2_651"
          result="effect3_innerShadow_2_651"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolCliGradient
export default SvgToolCliGradient
