import * as React from "react"

const SvgTools = (props) => (
  <svg
    width={1616}
    height={1087}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.4} filter="url(#tools_svg__a)">
      <g filter="url(#tools_svg__b)">
        <path
          d="M209.129 755.129C-127.662 564.9 293.9 396.737 546.78 336.434c124.229-26.765 410.95-77.778 564.01-67.708 191.32 12.587-480.672 724.189-901.661 486.403Z"
          fill="#6EFF3B"
        />
      </g>
      <g filter="url(#tools_svg__c)">
        <path
          d="M1385.58 446.573c304.89 126.461-5.87 258.298-199.36 308.409-95.56 22.575-317.968 66.995-443.203 64.069-156.542-3.657 261.463-530.554 642.563-372.478Z"
          fill="#D78E02"
        />
      </g>
    </g>
    <defs>
      <filter
        id="tools_svg__a"
        x={-261}
        y={-102}
        width={2077}
        height={1239}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={133.5}
          result="effect1_foregroundBlur_2_1231"
        />
      </filter>
      <filter
        id="tools_svg__b"
        x={17.894}
        y={201.428}
        width={1192.4}
        height={668.289}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={33}
          result="effect1_foregroundBlur_2_1231"
        />
      </filter>
      <filter
        id="tools_svg__c"
        x={625.285}
        y={332.997}
        width={972.262}
        height={570.192}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={42}
          result="effect1_foregroundBlur_2_1231"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgTools
export default SvgTools
