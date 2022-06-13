import * as React from "react"

const SvgTwitterLg = (props) => (
  <svg
    width={46}
    height={46}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#twitter-lg_svg__a)">
      <path
        d="M43 10.765a15.853 15.853 0 0 1-4.586 1.298 8.078 8.078 0 0 0 3.505-4.48 16.016 16.016 0 0 1-5.071 1.977C35.375 7.941 33.306 7 30.957 7c-4.381 0-7.96 3.614-7.96 8.075 0 .64.074 1.262.205 1.845-6.637-.339-12.547-3.558-16.48-8.433a8.049 8.049 0 0 0-1.081 4.047c0 2.805 1.398 5.29 3.56 6.701-1.323 0-2.554-.376-3.635-.94v.056c0 3.915 2.759 7.19 6.413 7.924a7.793 7.793 0 0 1-3.598.132 8.055 8.055 0 0 0 2.835 4.015 7.93 7.93 0 0 0 4.622 1.595 15.789 15.789 0 0 1-9.936 3.463c-.634 0-1.268-.038-1.902-.113A22.483 22.483 0 0 0 16.267 39c14.69 0 22.762-12.31 22.762-22.983 0-.358 0-.697-.019-1.055 1.567-1.13 2.909-2.56 3.99-4.197Z"
        fill="#000"
      />
    </g>
    <defs>
      <filter
        id="twitter-lg_svg__a"
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
          result="effect1_backgroundBlur_2_522"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_522"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_522" />
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
          in2="effect2_innerShadow_2_522"
          result="effect3_innerShadow_2_522"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgTwitterLg
export default SvgTwitterLg
