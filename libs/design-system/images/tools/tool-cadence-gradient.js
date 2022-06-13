import * as React from "react"

const SvgToolCadenceGradient = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#tool-cadence-gradient_svg__a)">
      <rect
        width={58}
        height={58}
        rx={4}
        fill="url(#tool-cadence-gradient_svg__b)"
      />
    </g>
    <path
      d="M42.117 25.118h-5.709v-3.806c0-1.672-2.022-2.552-3.213-1.345l-7.528 7.612a1.917 1.917 0 0 0 0 2.69l4.315 4.365-8.331 8.564c-.735.743 2.34-1.301 3.075-.558a1.867 1.867 0 0 0 2.661 0l6.588-6.66a1.917 1.917 0 0 0 0-2.692l-4.316-4.364 2.985-3.018v1.115c0 1.051.843 1.903 1.882 1.903h7.591c1.04 0 1.883-.852 1.883-1.903a1.893 1.893 0 0 0-1.883-1.903ZM29.362 15.76a1.859 1.859 0 0 0-2.366.237l-5.156 5.218a1.913 1.913 0 0 0 0 2.683 1.859 1.859 0 0 0 2.652 0l4.069-4.118 1.37 1 1.832-1.854c.306-.31.668-.551 1.063-.739l-3.464-2.427Z"
      fill="#fff"
    />
    <path
      d="M24.303 31.583a3.812 3.812 0 0 1-.95-1.723l-9.809 10.08a1.945 1.945 0 0 0 0 2.699c.726.745 1.9.745 2.626 0l9.446-9.707-1.313-1.35Z"
      fill="#fff"
    />
    <circle cx={37.331} cy={16.703} r={2.703} fill="#fff" />
    <defs>
      <linearGradient
        id="tool-cadence-gradient_svg__b"
        x1={45.674}
        y1={-55.873}
        x2={-28.819}
        y2={15.379}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FAFA" />
        <stop offset={1} stopColor="#7F00FF" />
      </linearGradient>
      <filter
        id="tool-cadence-gradient_svg__a"
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
          result="effect1_backgroundBlur_2_692"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_692"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_692" />
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
          in2="effect2_innerShadow_2_692"
          result="effect3_innerShadow_2_692"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolCadenceGradient
export default SvgToolCadenceGradient
