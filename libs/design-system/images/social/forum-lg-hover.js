import * as React from "react"

const SvgForumLgHover = (props) => (
  <svg
    width={46}
    height={46}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#forum-lg-hover_svg__a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44 23c0 11.598-9.402 21-21 21a20.91 20.91 0 0 1-9.713-2.376L2.134 43.972a.1.1 0 0 1-.12-.109l1.398-13.277A20.949 20.949 0 0 1 2 23C2 11.402 11.402 2 23 2s21 9.402 21 21Zm-10.5 0c0 5.799-4.701 10.5-10.5 10.5-1.752 0-3.404-.43-4.856-1.188L12.5 33.5l.706-6.707A10.475 10.475 0 0 1 12.5 23c0-5.799 4.701-10.5 10.5-10.5S33.5 17.201 33.5 23Z"
        fill="#00EF8B"
      />
    </g>
    <defs>
      <filter
        id="forum-lg-hover_svg__a"
        x={-49.016}
        y={-49.016}
        width={144.032}
        height={144.032}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation={24.508} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_2_513"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_513"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_513" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx={-1.18} dy={-1.18} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="arithmetic" k2={-1} k3={1} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend
          in2="effect2_innerShadow_2_513"
          result="effect3_innerShadow_2_513"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgForumLgHover
export default SvgForumLgHover
