import * as React from "react"

const SvgToolVscode = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#tool-vscode_svg__a)">
      <rect
        width={58}
        height={58}
        rx={8}
        fill="url(#tool-vscode_svg__b)"
        fillOpacity={0.33}
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33.03 13.81c.287 0 .576.063.845.194l6.445 3.117a1.967 1.967 0 0 1 1.108 1.772V40.03c0 .755-.431 1.444-1.108 1.772l-6.445 3.117a1.938 1.938 0 0 1-2.224-.38L19.314 33.223l-5.374 4.1c-.5.381-1.2.35-1.664-.075l-1.724-1.576a1.316 1.316 0 0 1-.001-1.939l4.66-4.273-4.66-4.274a1.316 1.316 0 0 1 .001-1.939l1.724-1.576a1.298 1.298 0 0 1 1.664-.074l5.374 4.1L31.65 14.384a1.942 1.942 0 0 1 1.38-.574Zm.577 8.507-9.362 7.144 9.362 7.143V22.317Z"
      fill="url(#tool-vscode_svg__c)"
    />
    <defs>
      <linearGradient
        id="tool-vscode_svg__b"
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
        id="tool-vscode_svg__c"
        x1={34.776}
        y1={-16.343}
        x2={-5.427}
        y2={22.111}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#2677B8" />
        <stop offset={1} stopColor="#3BAEF3" />
      </linearGradient>
      <filter
        id="tool-vscode_svg__a"
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
          result="effect1_backgroundBlur_2_630"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_630"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_630" />
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
          in2="effect2_innerShadow_2_630"
          result="effect3_innerShadow_2_630"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolVscode
export default SvgToolVscode
