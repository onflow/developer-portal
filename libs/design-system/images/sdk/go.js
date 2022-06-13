import * as React from "react"

const SvgGo = (props) => (
  <svg
    width={58}
    height={58}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#go_svg__a)">
      <rect
        width={58}
        height={58}
        rx={8}
        fill="url(#go_svg__b)"
        fillOpacity={0.33}
      />
    </g>
    <g clipPath="url(#go_svg__c)">
      <path
        d="m31.569 23.188.079.053c.929.616 1.595 1.46 2.033 2.48.105.16.035.247-.175.3l-.356.091c-.805.209-1.444.384-2.238.592l-.453.118c-.163.04-.208.024-.382-.175l-.024-.028c-.248-.281-.433-.47-.76-.637l-.064-.031c-1.104-.546-2.174-.387-3.173.264-1.192.774-1.805 1.917-1.788 3.342.018 1.408.982 2.569 2.367 2.762 1.192.159 2.19-.264 2.98-1.16.157-.194.298-.405.473-.652h-3.383c-.368 0-.456-.228-.333-.527l.06-.144c.226-.526.575-1.282.802-1.715l.05-.093a.466.466 0 0 1 .42-.248h5.64c.254-.805.665-1.567 1.213-2.287 1.28-1.689 2.822-2.569 4.908-2.938 1.788-.317 3.47-.14 4.996.897 1.384.95 2.243 2.235 2.471 3.924.298 2.375-.386 4.31-2.016 5.964-1.156 1.178-2.576 1.917-4.206 2.252-.474.088-.947.105-1.403.158-1.595-.035-3.05-.493-4.276-1.548-.863-.749-1.458-1.67-1.753-2.74a7.41 7.41 0 0 1-.736 1.192c-1.262 1.671-2.91 2.709-4.996 2.99-1.717.23-3.313-.105-4.715-1.16-1.297-.986-2.033-2.288-2.226-3.906-.228-1.918.333-3.642 1.49-5.155 1.245-1.636 2.892-2.674 4.908-3.044 1.617-.293 3.167-.112 4.566.81Zm8.338 2.521-.056.013c-1.63.37-2.682 1.407-3.068 3.061-.315 1.372.35 2.762 1.613 3.325.964.423 1.928.37 2.857-.105 1.385-.722 2.138-1.848 2.226-3.36-.018-.23-.018-.405-.053-.581-.312-1.722-1.875-2.705-3.52-2.353Zm-20.721 3.215c.07 0 .105.053.105.123l-.035.422c0 .07-.07.123-.123.123l-3.821-.017c-.07 0-.088-.053-.053-.106l.246-.44c.035-.052.105-.105.175-.105h3.506Zm.385-1.619c.07 0 .105.053.088.106l-.14.422c-.018.07-.088.106-.158.106l-8.29.017c-.071 0-.088-.035-.053-.088l.368-.475c.035-.053.122-.088.192-.088h7.993Zm.912-1.618c.07 0 .087.052.052.105l-.298.458c-.035.052-.123.105-.175.105l-6.345-.017c-.07 0-.088-.036-.053-.088l.368-.475c.035-.053.123-.088.193-.088h6.258Z"
        fill="#00ACD7"
      />
    </g>
    <defs>
      <linearGradient
        id="go_svg__b"
        x1={8.746}
        y1={-4.603}
        x2={58}
        y2={58}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" />
        <stop offset={1} stopColor="#fff" stopOpacity={0} />
      </linearGradient>
      <clipPath id="go_svg__c">
        <path fill="#fff" transform="translate(11 11)" d="M0 0h36v36H0z" />
      </clipPath>
      <filter
        id="go_svg__a"
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
          result="effect1_backgroundBlur_2_192"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_backgroundBlur_2_192"
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
        <feBlend in2="shape" result="effect2_innerShadow_2_192" />
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
          in2="effect2_innerShadow_2_192"
          result="effect3_innerShadow_2_192"
        />
      </filter>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgGo
export default SvgGo
