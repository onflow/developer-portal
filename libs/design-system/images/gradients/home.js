import * as React from "react"

const SvgHome = (props) => (
  <svg
    width={1616}
    height={967}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.5} filter="url(#home_svg__a)">
      <g filter="url(#home_svg__b)">
        <path
          d="M277.569 685.506C-36.74 504.181 356.682 343.89 592.681 286.409c115.936-25.512 383.518-74.137 526.359-64.538 178.55 11.998-448.584 690.29-841.471 463.635Z"
          fill="#3B3CFF"
          fillOpacity={0.8}
        />
      </g>
      <g filter="url(#home_svg__c)">
        <path
          d="M1375.49 391.393c284.53 120.541-5.48 246.207-186.06 293.972-89.17 21.519-296.736 63.86-413.611 61.071-146.093-3.486 244.011-505.719 599.671-355.043Z"
          fill="#00EF8B"
        />
      </g>
    </g>
    <defs>
      <filter
        id="home_svg__a"
        x={-132}
        y={-97}
        width={1880}
        height={1112}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={110}
          result="effect1_foregroundBlur_2_1219"
        />
      </filter>
      <filter
        id="home_svg__b"
        x={94.695}
        y={154.634}
        width={1121.62}
        height={643.186}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={33}
          result="effect1_foregroundBlur_2_1219"
        />
      </filter>
      <filter
        id="home_svg__c"
        x={660.338}
        y={279.201}
        width={918.576}
        height={551.366}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={42}
          result="effect1_foregroundBlur_2_1219"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgHome
export default SvgHome
