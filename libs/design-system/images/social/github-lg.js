import * as React from "react"

const SvgGithubLg = (props) => (
  <svg
    width={46}
    height={46}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#github-lg_svg__a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.436 2C17.75 2 12.299 4.214 8.279 8.154S2.001 17.436 2 23.008c0 9.276 6.181 17.139 14.596 19.975 1.053.13 1.446-.516 1.446-1.032v-3.609c-5.916 1.291-7.23-2.834-7.23-2.834-.922-2.45-2.367-3.095-2.367-3.095-1.973-1.287.129-1.287.129-1.287 2.104.129 3.29 2.19 3.29 2.19 1.972 3.222 4.995 2.319 6.18 1.805.13-1.417.788-2.318 1.314-2.834-4.735-.516-9.73-2.32-9.73-10.44 0-2.319.787-4.125 2.235-5.671-.134-.388-.922-2.576.264-5.413 0 0 1.84-.516 5.915 2.191 1.709-.516 3.552-.645 5.393-.645 1.841 0 3.682.258 5.392.645 4.076-2.705 5.918-2.191 5.918-2.191 1.182 2.837.392 5.025.26 5.542a8.23 8.23 0 0 1 2.236 5.67c0 8.12-4.999 9.796-9.729 10.312.788.643 1.446 1.93 1.446 3.864v5.8c0 .516.393 1.159 1.446 1.032a21.43 21.43 0 0 0 10.584-7.681A20.744 20.744 0 0 0 45 23.008C44.868 11.408 35.27 2 23.436 2Z"
        fill="#000"
      />
    </g>
    <defs>
      <filter
        id="github-lg_svg__a"
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
          result="effect1_backgroundBlur_2_495"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_495"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_495" />
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
          in2="effect2_innerShadow_2_495"
          result="effect3_innerShadow_2_495"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgGithubLg
export default SvgGithubLg
