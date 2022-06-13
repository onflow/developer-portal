import * as React from "react"

const SvgToolCadence = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#tool-cadence_svg__a)">
      <rect
        width={58}
        height={58}
        rx={4}
        fill="url(#tool-cadence_svg__b)"
        fillOpacity={0.33}
      />
    </g>
    <path
      d="M42.117 25.118h-5.709v-3.806c0-1.672-2.022-2.552-3.213-1.345l-7.528 7.612a1.917 1.917 0 0 0 0 2.69l4.315 4.365-8.331 8.564c-.735.743 2.34-1.301 3.075-.558a1.867 1.867 0 0 0 2.661 0l6.588-6.66a1.917 1.917 0 0 0 0-2.692l-4.316-4.364 2.985-3.018v1.115c0 1.051.843 1.903 1.882 1.903h7.591c1.04 0 1.883-.852 1.883-1.903a1.893 1.893 0 0 0-1.883-1.903Z"
      fill="url(#tool-cadence_svg__c)"
    />
    <path
      d="M29.362 15.76a1.859 1.859 0 0 0-2.366.237l-5.156 5.218a1.913 1.913 0 0 0 0 2.683 1.859 1.859 0 0 0 2.652 0l4.069-4.118 1.37 1 1.832-1.854c.306-.31.668-.551 1.063-.739l-3.464-2.427Z"
      fill="url(#tool-cadence_svg__d)"
    />
    <path
      d="M24.303 31.583a3.812 3.812 0 0 1-.95-1.723l-9.809 10.08a1.945 1.945 0 0 0 0 2.699c.726.745 1.9.745 2.626 0l9.446-9.707-1.313-1.35Z"
      fill="url(#tool-cadence_svg__e)"
    />
    <circle
      cx={37.331}
      cy={16.703}
      r={2.703}
      fill="url(#tool-cadence_svg__f)"
    />
    <defs>
      <linearGradient
        id="tool-cadence_svg__b"
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
        id="tool-cadence_svg__c"
        x1={39.226}
        y1={-3.671}
        x2={8.609}
        y2={23.787}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FAFA" />
        <stop offset={1} stopColor="#7F00FF" />
      </linearGradient>
      <linearGradient
        id="tool-cadence_svg__d"
        x1={30.375}
        y1={6.761}
        x2={19.022}
        y2={20.66}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FAFA" />
        <stop offset={1} stopColor="#7F00FF" />
      </linearGradient>
      <linearGradient
        id="tool-cadence_svg__e"
        x1={22.935}
        y1={17.012}
        x2={5.874}
        y2={32.449}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FAFA" />
        <stop offset={1} stopColor="#7F00FF" />
      </linearGradient>
      <linearGradient
        id="tool-cadence_svg__f"
        x1={38.886}
        y1={8.791}
        x2={31.941}
        y2={15.434}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FAFA" />
        <stop offset={1} stopColor="#7F00FF" />
      </linearGradient>
      <filter
        id="tool-cadence_svg__a"
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
          result="effect1_backgroundBlur_2_684"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_684"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_684" />
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
          in2="effect2_innerShadow_2_684"
          result="effect3_innerShadow_2_684"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolCadence
export default SvgToolCadence
