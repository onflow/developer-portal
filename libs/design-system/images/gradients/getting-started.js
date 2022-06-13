import * as React from "react"

const SvgGettingStarted = (props) => (
  <svg
    width={1616}
    height={1045}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.4} filter="url(#getting-started_svg__a)">
      <g filter="url(#getting-started_svg__b)">
        <path
          d="M253.478 717.928c-360.582-175.658 90.76-330.941 361.504-386.625 133.004-24.715 439.978-71.82 603.848-62.522 204.84 11.623-514.623 668.719-965.352 449.147Z"
          fill="#3BFFE7"
        />
      </g>
      <g filter="url(#getting-started_svg__c)">
        <path
          d="M1513.04 433.006c326.42 116.774-6.29 238.513-213.45 284.786-102.3 20.846-340.428 61.863-474.509 59.161-167.601-3.376 279.929-489.915 687.959-343.947Z"
          fill="#93D702"
        />
      </g>
    </g>
    <defs>
      <filter
        id="getting-started_svg__a"
        x={-231}
        y={-94}
        width={2186}
        height={1185}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={133.5}
          result="effect1_foregroundBlur_2_1227"
        />
      </filter>
      <filter
        id="getting-started_svg__b"
        x={53.397}
        y={201.583}
        width={1267.31}
        height={627.211}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={33}
          result="effect1_foregroundBlur_2_1227"
        />
      </filter>
      <filter
        id="getting-started_svg__c"
        x={704.966}
        y={321.695}
        width={1029.08}
        height={539.385}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          stdDeviation={42}
          result="effect1_foregroundBlur_2_1227"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgGettingStarted
export default SvgGettingStarted
