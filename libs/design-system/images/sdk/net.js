import * as React from "react"

const SvgNet = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#net_svg__a)">
      <rect
        width={58}
        height={58}
        rx={8}
        fill="url(#net_svg__b)"
        fillOpacity={0.33}
      />
    </g>
    <g clipPath="url(#net_svg__c)">
      <path
        d="M47 24.155h-3.702v11.347H41.16V24.155h-3.692v-1.86H47v1.86ZM36.722 35.502H29.49V22.295h6.945v1.86h-4.807v3.741h4.43v1.851h-4.43v3.906h5.094v1.85Zm-10.062 0h-2.337l-6.153-9.708a4.352 4.352 0 0 1-.387-.765h-.054c.048.284.072.889.072 1.816v8.657h-2.065V22.295h2.488l5.948 9.48c.25.392.412.663.484.81h.036c-.06-.35-.09-.944-.09-1.777v-8.514h2.058v13.208Zm-13.055-1.039c0 .163-.033.325-.099.476-.065.151-.161.288-.282.404a1.308 1.308 0 0 1-.423.27 1.357 1.357 0 0 1-1.42-.271 1.24 1.24 0 0 1-.282-.404A1.194 1.194 0 0 1 11 34.46c0-.33.138-.645.382-.878a1.355 1.355 0 0 1 1.419-.27c.158.063.302.155.423.27.12.116.217.253.282.404.066.15.1.313.1.476Z"
        fill="#000"
      />
    </g>
    <defs>
      <linearGradient
        id="net_svg__b"
        x1={8.746}
        y1={-4.603}
        x2={58}
        y2={58}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <clipPath id="net_svg__c">
        <path fill="#fff" transform="translate(11 11)" d="M0 0h36v36H0z" />
      </clipPath>
      <filter
        id="net_svg__a"
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
          result="effect1_backgroundBlur_2_181"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_181"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_181" />
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
          in2="effect2_innerShadow_2_181"
          result="effect3_innerShadow_2_181"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgNet
export default SvgNet
