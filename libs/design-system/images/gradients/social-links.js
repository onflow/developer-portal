import * as React from "react"

const SvgSocialLinks = (props) => (
  <svg
    width={1850}
    height={993}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.5} filter="url(#social-links_svg__a)">
      <g filter="url(#social-links_svg__b)">
        <path
          d="M325.129 708.129C-11.662 517.9 409.9 349.737 662.78 289.434c124.229-26.765 410.95-77.778 564.01-67.708 191.32 12.587-480.672 724.189-901.661 486.403Z"
          fill="#00EF8B"
        />
      </g>
      <g filter="url(#social-links_svg__c)">
        <path
          d="M1501.58 399.573c304.89 126.461-5.87 258.298-199.36 308.409-95.56 22.575-317.969 66.995-443.203 64.069-156.542-3.657 261.463-530.554 642.563-372.478Z"
          fill="#347BB2"
        />
      </g>
    </g>
    <defs>
      <filter
        id="social-links_svg__a"
        x={-98}
        y={-102}
        width={1983}
        height={1145}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={110}
          result="effect1_foregroundBlur_2_2529"
        />
      </filter>
      <filter
        id="social-links_svg__b"
        x={133.894}
        y={154.429}
        width={1192.4}
        height={668.289}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={33}
          result="effect1_foregroundBlur_2_2529"
        />
      </filter>
      <filter
        id="social-links_svg__c"
        x={741.285}
        y={285.997}
        width={972.262}
        height={570.191}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={42}
          result="effect1_foregroundBlur_2_2529"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgSocialLinks
export default SvgSocialLinks
