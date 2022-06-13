import * as React from "react"

const SvgToolEmulator = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#tool-emulator_svg__a)">
      <rect
        width={58}
        height={58}
        rx={8}
        fill="url(#tool-emulator_svg__b)"
        fillOpacity={0.33}
      />
    </g>
    <path
      d="M28.102 22.347c-3.159 0-5.719-2.53-5.719-5.65 0-3.12 2.56-5.65 5.72-5.65 3.158 0 5.718 2.53 5.718 5.65 0 3.12-2.56 5.65-5.719 5.65Z"
      fill="url(#tool-emulator_svg__c)"
    />
    <path
      d="M28.102 47.876c-3.159 0-5.719-2.53-5.719-5.65 0-3.12 2.56-5.649 5.72-5.649 3.158 0 5.718 2.53 5.718 5.65 0 3.12-2.56 5.649-5.719 5.649Z"
      fill="url(#tool-emulator_svg__d)"
    />
    <path
      d="M15.845 35.155c-3.158 0-5.719-2.529-5.719-5.65 0-3.12 2.56-5.649 5.72-5.649 3.158 0 5.718 2.53 5.718 5.65 0 3.12-2.56 5.65-5.719 5.65Z"
      fill="url(#tool-emulator_svg__e)"
    />
    <path
      d="M41.234 34.902c-3.159 0-5.719-2.529-5.719-5.65 0-3.12 2.56-5.648 5.719-5.648 3.158 0 5.719 2.529 5.719 5.649s-2.56 5.65-5.72 5.65Z"
      fill="url(#tool-emulator_svg__f)"
    />
    <defs>
      <linearGradient
        id="tool-emulator_svg__b"
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
        id="tool-emulator_svg__c"
        x1={31.39}
        y1={0.164}
        x2={16.872}
        y2={14.221}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.341} stopColor="#FF92FE" />
        <stop offset={1} stopColor="#FF0072" />
      </linearGradient>
      <linearGradient
        id="tool-emulator_svg__d"
        x1={31.39}
        y1={25.693}
        x2={16.872}
        y2={39.75}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.341} stopColor="#FF92FE" />
        <stop offset={1} stopColor="#FF0072" />
      </linearGradient>
      <linearGradient
        id="tool-emulator_svg__e"
        x1={19.133}
        y1={12.972}
        x2={4.615}
        y2={27.029}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.341} stopColor="#FF92FE" />
        <stop offset={1} stopColor="#FF0072" />
      </linearGradient>
      <linearGradient
        id="tool-emulator_svg__f"
        x1={44.522}
        y1={12.719}
        x2={30.003}
        y2={26.777}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.341} stopColor="#FF92FE" />
        <stop offset={1} stopColor="#FF0072" />
      </linearGradient>
      <filter
        id="tool-emulator_svg__a"
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
          result="effect1_backgroundBlur_2_571"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_571"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_571" />
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
          in2="effect2_innerShadow_2_571"
          result="effect3_innerShadow_2_571"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolEmulator
export default SvgToolEmulator
