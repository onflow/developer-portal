import * as React from "react"

const SvgSwift = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#swift_svg__a)">
      <rect
        width={58}
        height={58}
        rx={8}
        fill="url(#swift_svg__b)"
        fillOpacity={0.33}
      />
    </g>
    <path
      d="M32.85 15.508s6.994 3.998 8.824 10.35c1.65 5.737.329 8.476.329 8.476a10.031 10.031 0 0 1 1.96 3.15 5.428 5.428 0 0 1 .326 5.01s-.113-2.34-3.6-2.826c-3.196-.45-4.358 2.662-10.463 2.511a20.738 20.738 0 0 1-16.976-9.406c2.982 1.627 6.89 4.153 11.755 3.764 4.866-.388 5.882-1.883 5.882-1.883a75.261 75.261 0 0 1-14.385-15.056c3.825 3.201 13.3 9.57 13.08 9.409a85.3 85.3 0 0 1-9.479-10.987s14.216 11.688 15.36 11.613c.47-.968 2.901-5.982-2.614-14.126Z"
      fill="url(#swift_svg__c)"
    />
    <defs>
      <linearGradient
        id="swift_svg__b"
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
        id="swift_svg__c"
        x1={29.495}
        y1={26.308}
        x2={28.9}
        y2={42.507}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F88535" />
        <stop offset={1} stopColor="#FD2221" />
      </linearGradient>
      <filter
        id="swift_svg__a"
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
          result="effect1_backgroundBlur_2_171"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_171"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_171" />
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
          in2="effect2_innerShadow_2_171"
          result="effect3_innerShadow_2_171"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgSwift
export default SvgSwift
