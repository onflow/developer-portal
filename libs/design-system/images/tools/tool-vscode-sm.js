import * as React from "react"

const SvgToolVscodeSm = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.511 1.237c.12 0 .24.026.353.08l2.677 1.295c.281.136.46.422.46.736v8.779c0 .313-.179.6-.46.736l-2.677 1.294A.805.805 0 0 1 9.94 14L4.816 9.3l-2.232 1.703a.54.54 0 0 1-.691-.03l-.716-.655a.547.547 0 0 1 0-.806l1.935-1.775-1.935-1.775a.547.547 0 0 1 0-.805l.716-.655a.539.539 0 0 1 .691-.03l2.232 1.702L9.94 1.475a.807.807 0 0 1 .571-.238Zm.242 3.533L6.864 7.737l3.889 2.967V4.77Z"
      fill="url(#tool-vscode-sm_svg__a)"
    />
    <defs>
      <linearGradient
        id="tool-vscode-sm_svg__a"
        x1={11.238}
        y1={-11.287}
        x2={-5.46}
        y2={4.684}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#2677B8" />
        <stop offset={1} stopColor="#3BAEF3" />
      </linearGradient>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolVscodeSm
export default SvgToolVscodeSm
