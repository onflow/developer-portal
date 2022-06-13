import * as React from "react"

const SvgToolCadenceLanding = (props) => (
  <svg
    width={158}
    height={157}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#tool-cadence-landing_svg__a)">
      <rect
        x={0.5}
        width={157}
        height={157}
        rx={8}
        fill="url(#tool-cadence-landing_svg__b)"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M102.038 45.66c4.881 0 8.837-4.177 8.837-9.33 0-5.153-3.956-9.33-8.837-9.33S93.2 31.177 93.2 36.33c0 5.153 3.957 9.33 8.838 9.33ZM68.252 33.894c2.065-2.206 5.297-2.548 7.733-.819l11.324 8.376c-1.292.648-2.473 1.479-3.474 2.548l-5.987 6.397-4.481-3.449-13.302 14.211c-2.394 2.558-6.273 2.558-8.667 0-2.394-2.557-2.394-6.7 0-9.258l16.854-18.006ZM99.02 65.369h18.663c3.398 0 6.153 2.94 6.153 6.568 0 3.627-2.755 6.568-6.153 6.568H92.867c-3.398 0-6.153-2.941-6.153-6.568v-3.849l-9.758 10.417 14.108 15.06c2.404 2.565 2.404 6.722 0 9.287L69.53 125.84c-2.404 2.566-6.297 2.565-8.7 0-1.483-1.583-5.876.496-8.46 1.718-1.605.76-2.512 1.189-1.591.206l27.235-29.555-14.108-15.06c-2.404-2.566-2.404-6.722 0-9.288l24.609-26.27c3.894-4.163 10.504-1.126 10.504 4.642V65.37Zm-39.57 22.31c-1.538-1.668-2.565-3.722-3.106-5.943l-32.064 34.785c-2.372 2.573-2.372 6.741 0 9.314 2.371 2.572 6.213 2.573 8.585 0l30.878-33.498-4.293-4.657Z"
      fill="url(#tool-cadence-landing_svg__c)"
    />
    <defs>
      <linearGradient
        id="tool-cadence-landing_svg__b"
        x1={24.175}
        y1={-12.46}
        x2={157.5}
        y2={157}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="tool-cadence-landing_svg__c"
        x1={102.3}
        y1={-70.618}
        x2={-27.852}
        y2={53.87}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FAFA" />
        <stop offset={1} stopColor="#7F00FF" />
      </linearGradient>
      <filter
        id="tool-cadence-landing_svg__a"
        x={-48.516}
        y={-49.016}
        width={255.032}
        height={255.032}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImage" stdDeviation={24.508} />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_2057_3424"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2057_3424"
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
        <feBlend in2="shape" result="effect2_innerShadow_2057_3424" />
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
          in2="effect2_innerShadow_2057_3424"
          result="effect3_innerShadow_2057_3424"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolCadenceLanding
export default SvgToolCadenceLanding
