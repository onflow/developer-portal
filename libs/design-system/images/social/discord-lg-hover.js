import * as React from "react"

const SvgDiscordLgHover = (props) => (
  <svg
    width={46}
    height={46}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#discord-lg-hover_svg__a)">
      <path
        d="M37.578 9.68A34.604 34.604 0 0 0 28.913 7c-.373.664-.81 1.557-1.11 2.268a32.325 32.325 0 0 0-9.603 0c-.3-.71-.747-1.604-1.123-2.268-3 .51-5.916 1.414-8.672 2.687-5.483 8.156-6.97 16.11-6.227 23.95 3.637 2.673 7.162 4.297 10.628 5.36a25.94 25.94 0 0 0 2.276-3.69 22.537 22.537 0 0 1-3.585-1.717c.3-.219.594-.447.88-.684 6.91 3.182 14.419 3.182 21.247 0 .287.236.58.464.878.684a22.466 22.466 0 0 1-3.59 1.72A25.827 25.827 0 0 0 33.188 39c3.468-1.063 6.996-2.687 10.633-5.363.873-9.09-1.49-16.97-6.243-23.957ZM16.023 28.815c-2.075 0-3.776-1.906-3.776-4.228 0-2.32 1.665-4.23 3.776-4.23 2.111 0 3.812 1.906 3.776 4.23.003 2.322-1.665 4.228-3.776 4.228Zm13.954 0c-2.075 0-3.776-1.906-3.776-4.228 0-2.32 1.665-4.23 3.776-4.23 2.11 0 3.812 1.906 3.776 4.23 0 2.322-1.665 4.228-3.776 4.228Z"
        fill="#5865F2"
      />
    </g>
    <defs>
      <filter
        id="discord-lg-hover_svg__a"
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
          result="effect1_backgroundBlur_2_502"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_502"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_502" />
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
          in2="effect2_innerShadow_2_502"
          result="effect3_innerShadow_2_502"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgDiscordLgHover
export default SvgDiscordLgHover
