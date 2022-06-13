import * as React from "react"

const SvgToolPortGradient = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#tool-port-gradient_svg__a)">
      <rect
        width={58}
        height={58}
        rx={8}
        fill="url(#tool-port-gradient_svg__b)"
      />
    </g>
    <path
      d="M37.654 43.524c-2.275.799-5.774 1.294-8.345 1.294-2.57 0-6.07-.495-8.345-1.294a17.04 17.04 0 0 1-5.409 3.144.174.174 0 0 0 .08.339c1.8-.215 3.582-.563 5.331-1.043 1.995.78 5.79 1.207 8.343 1.207 2.554 0 6.435-.33 8.346-1.207 1.763.494 3.564.845 5.383 1.051a.175.175 0 0 0 .08-.339 18.49 18.49 0 0 1-5.464-3.152ZM45.792 29.717l-16.17-7.425a.682.682 0 0 0-.581 0l-16.16 7.425a1.569 1.569 0 0 0-.8 2.006l4.75 11.801c2.388 0 4.924-1.91 4.924-1.91 1.563.78 4.61 1.485 6.887 1.615.242.017.477.017.694.017.218 0 .452-.008.695-.017 2.275-.13 5.323-.825 6.886-1.615 0 0 2.536 1.91 4.924 1.91l4.751-11.801a1.568 1.568 0 0 0-.8-2.006Zm-20.277 2.171c-.573 0-1.042-.85-1.042-1.91s.47-1.911 1.042-1.911c.572 0 1.042.85 1.042 1.91s-.469 1.911-1.042 1.911Zm7.642 0c-.573 0-1.042-.85-1.042-1.91s.469-1.91 1.042-1.91c.573 0 1.042.85 1.042 1.91s-.469 1.91-1.042 1.91Z"
      fill="#fff"
    />
    <path
      d="M41.137 17.907V17.9c-.486-2.31-1.52-4.073-3.465-4.073h-3.005l-.173-.695a2.78 2.78 0 0 0-2.692-2.084h-4.95a2.777 2.777 0 0 0-2.692 2.093l-.174.685H21c-1.989 0-3.048 1.797-3.456 4.082l-1.58 8.406a.349.349 0 0 0 .486.382l2.197-1.007a.35.35 0 0 0 .2-.252l1.406-7.433c.217-.93.634-1.39 1.398-1.39h15.38c.772 0 1.137.435 1.397 1.39l1.407 7.433a.33.33 0 0 0 .2.252l2.206 1.016a.347.347 0 0 0 .486-.382l-1.59-8.415Z"
      fill="#fff"
    />
    <defs>
      <linearGradient
        id="tool-port-gradient_svg__b"
        x1={29}
        y1={0}
        x2={29}
        y2={58}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B4FFDF" />
        <stop offset={1} stopColor="#00227E" />
      </linearGradient>
      <filter
        id="tool-port-gradient_svg__a"
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
          result="effect1_backgroundBlur_2_622"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_622"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_622" />
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
          in2="effect2_innerShadow_2_622"
          result="effect3_innerShadow_2_622"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolPortGradient
export default SvgToolPortGradient
