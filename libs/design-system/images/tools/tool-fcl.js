import * as React from "react"

const SvgToolFcl = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#tool-fcl_svg__a)">
      <rect
        width={58}
        height={58}
        rx={4}
        fill="url(#tool-fcl_svg__b)"
        fillOpacity={0.33}
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M37.716 35.838c-2.213 0-3.464-1.154-4.425-2.723l-3.645 2.117c1.317 2.6 4.008 4.585 8.173 4.585 4.26 0 7.433-2.212 7.433-6.248 0-3.744-2.152-5.41-5.963-7.043l-1.121-.48c-1.925-.833-2.758-1.378-2.758-2.723 0-1.088.833-1.92 2.146-1.92 1.288 0 2.118.542 2.887 1.92l3.493-2.241c-1.477-2.598-3.528-3.59-6.38-3.59-4.005 0-6.568 2.56-6.568 5.922 0 3.65 2.15 5.377 5.386 6.755l1.122.481c2.045.895 3.265 1.44 3.265 2.976 0 1.283-1.187 2.212-3.045 2.212Zm-17.383-.029c-1.54 0-2.182-1.056-2.886-2.306l-3.652 2.21c1.058 2.237 3.138 4.095 6.73 4.095 3.974 0 6.697-2.113 6.697-6.755V17.748h-4.486v15.244c0 2.24-.93 2.817-2.403 2.817Z"
      fill="url(#tool-fcl_svg__c)"
    />
    <defs>
      <linearGradient
        id="tool-fcl_svg__b"
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
        id="tool-fcl_svg__c"
        x1={38.567}
        y1={-4.013}
        x2={11.098}
        y2={33.008}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#F0B24F" />
        <stop offset={1} stopColor="#F0DB4F" />
      </linearGradient>
      <filter
        id="tool-fcl_svg__a"
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
          result="effect1_backgroundBlur_2_671"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_671"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_671" />
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
          in2="effect2_innerShadow_2_671"
          result="effect3_innerShadow_2_671"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolFcl
export default SvgToolFcl
