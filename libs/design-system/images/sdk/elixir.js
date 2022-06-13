import * as React from "react"

const SvgElixir = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#elixir_svg__a)">
      <rect
        width={58}
        height={58}
        rx={8}
        fill="url(#elixir_svg__b)"
        fillOpacity={0.33}
      />
    </g>
    <path
      d="M31.025 20.665c2.339 5.157 8.595 7.312 8.034 14.033-.655 7.894-6.245 9.882-9.356 10.023a9.917 9.917 0 0 1-10.575-8.42c-1.808-8.374 6.109-21.215 10.67-23.051-.15 2.532.269 5.066 1.227 7.415Zm-.187 21.214a.476.476 0 0 0-.064-.368c-.667-1.237-6.536-1.85-7.77-1.97a9.304 9.304 0 0 0 1.839 1.462c.97.592 2.044.99 3.166 1.17.903.137 2.641.252 2.83-.295v.001Z"
      fill="#7C648F"
    />
    <path
      opacity={0.25}
      d="M31.53 22.945c5.028 5.426 7.25 5.602 7.016 11.788-.28 7.286-5.111 9.215-7.94 9.473-4.725.62-8.432-1.72-9.403-6.397-1.977-7.613 4.398-20.033 8.514-21.904a17.236 17.236 0 0 0 1.824 7.02l-.012.02Z"
      fill="#26003D"
    />
    <path
      opacity={0.75}
      d="M30.558 22.161c3.357 4.589 7.801 4.252 8.567 10.935.106 7.789-4.05 10.444-7.017 11.192-5.062 1.439-9.578-.726-11.355-5.625-3.415-7.875 2.982-20.829 7.099-23.53a16.968 16.968 0 0 0 2.666 7.017l.04.011Z"
      fill="url(#elixir_svg__c)"
    />
    <defs>
      <linearGradient
        id="elixir_svg__b"
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
        id="elixir_svg__c"
        x1={30.405}
        y1={44.297}
        x2={27.845}
        y2={15.493}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0} />
        <stop offset={0.01} stopColor="#F7F6F8" stopOpacity={0.04} />
        <stop offset={0.09} stopColor="#AA9CB3" stopOpacity={0.39} />
        <stop offset={0.2} stopColor="#6F567E" stopOpacity={0.66} />
        <stop offset={0.32} stopColor="#452459" stopOpacity={0.86} />
        <stop offset={0.5} stopColor="#2D0843" stopOpacity={0.97} />
        <stop offset={1} stopColor="#26003D" />
      </linearGradient>
      <filter
        id="elixir_svg__a"
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
          result="effect1_backgroundBlur_2_203"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_203"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_203" />
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
          in2="effect2_innerShadow_2_203"
          result="effect3_innerShadow_2_203"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgElixir
export default SvgElixir
