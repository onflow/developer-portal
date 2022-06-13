import * as React from "react"

const SvgNetwork = (props) => (
  <svg
    width={1616}
    height={1139}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.6} filter="url(#network_svg__a)">
      <g filter="url(#network_svg__b)">
        <path
          d="M209.129 755.129C-127.662 564.9 293.9 396.737 546.78 336.434c124.229-26.765 410.95-77.778 564.01-67.708 191.32 12.587-480.672 724.189-901.661 486.403Z"
          fill="#F2BE03"
        />
      </g>
      <g filter="url(#network_svg__c)">
        <path
          d="M1352.31 380.152c402.26 166.854-7.76 340.8-263.05 406.917-126.072 29.786-419.524 88.394-584.759 84.534-206.544-4.825 344.976-700.018 847.809-491.451Z"
          fill="#FDC3FE"
        />
      </g>
      <g filter="url(#network_svg__d)">
        <path
          d="M417.128 541.248c194.05 80.49-3.741 164.401-126.893 196.295-60.816 14.369-202.377 42.641-282.085 40.778-99.636-2.327 166.415-337.684 408.978-237.073Z"
          fill="#FDC3FE"
        />
      </g>
      <g filter="url(#network_svg__e)">
        <path
          d="M345.219 833.79c-145.123-49.244 3.543-77.061 96.016-84.814 45.66-3.179 151.918-8.146 211.669-2.585 74.689 6.952-126.281 148.956-307.685 87.399Z"
          fill="#F2BE03"
        />
      </g>
    </g>
    <defs>
      <filter
        id="network_svg__a"
        x={-280.32}
        y={-102}
        width={2096.32}
        height={1240.78}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={133.5}
          result="effect1_foregroundBlur_2_1239"
        />
      </filter>
      <filter
        id="network_svg__b"
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
          result="effect1_foregroundBlur_2_1239"
        />
      </filter>
      <filter
        id="network_svg__c"
        x={375.994}
        y={257.129}
        width={1229.15}
        height={698.655}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={42}
          result="effect1_foregroundBlur_2_1239"
        />
      </filter>
      <filter
        id="network_svg__d"
        x={-97.32}
        y={438.424}
        width={679.893}
        height={423.985}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={42}
          result="effect1_foregroundBlur_2_1239"
        />
      </filter>
      <filter
        id="network_svg__e"
        x={282.481}
        y={741.882}
        width={388.428}
        height={109.34}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={1}
          result="effect1_foregroundBlur_2_1239"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgNetwork
export default SvgNetwork
