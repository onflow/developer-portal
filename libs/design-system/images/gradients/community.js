import * as React from "react"

const SvgCommunity = (props) => (
  <svg
    width={1616}
    height={1013}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.4} filter="url(#community_svg__a)">
      <g filter="url(#community_svg__b)">
        <path
          d="M239.129 718.129C-97.662 527.9 323.9 359.737 576.78 299.434c124.229-26.765 410.95-77.778 564.01-67.708 191.32 12.587-480.672 724.189-901.661 486.403Z"
          fill="#FFD43B"
        />
      </g>
      <g filter="url(#community_svg__c)">
        <path
          d="M1415.58 409.573c304.89 126.461-5.87 258.298-199.36 308.409-95.56 22.575-317.968 66.995-443.203 64.069-156.542-3.657 261.463-530.554 642.563-372.478Z"
          fill="#3B3CFF"
        />
      </g>
    </g>
    <defs>
      <filter
        id="community_svg__a"
        x={-194}
        y={-102}
        width={2003}
        height={1165}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={115}
          result="effect1_foregroundBlur_2_1223"
        />
      </filter>
      <filter
        id="community_svg__b"
        x={47.894}
        y={164.428}
        width={1192.4}
        height={668.289}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={33}
          result="effect1_foregroundBlur_2_1223"
        />
      </filter>
      <filter
        id="community_svg__c"
        x={655.285}
        y={295.997}
        width={972.262}
        height={570.192}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={42}
          result="effect1_foregroundBlur_2_1223"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgCommunity
export default SvgCommunity
