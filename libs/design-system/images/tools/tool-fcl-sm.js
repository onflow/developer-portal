import * as React from "react"

const SvgToolFclSm = (props) => (
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
      d="M10.776 10.574c-.793 0-1.241-.413-1.586-.975l-1.306.758C8.356 11.289 9.32 12 10.814 12c1.526 0 2.662-.793 2.662-2.239 0-1.342-.77-1.938-2.136-2.524l-.402-.172c-.69-.298-.988-.493-.988-.975 0-.39.298-.689.769-.689.461 0 .759.195 1.034.689l1.252-.804C12.475 4.356 11.74 4 10.719 4c-1.436 0-2.354.917-2.354 2.122 0 1.308.77 1.927 1.93 2.42l.402.173c.733.32 1.17.516 1.17 1.067 0 .46-.425.792-1.091.792Zm-6.23-.01c-.551 0-.781-.379-1.034-.827l-1.308.792c.38.802 1.124 1.468 2.411 1.468 1.425 0 2.4-.757 2.4-2.421V4.091H5.408v5.463c0 .803-.333 1.01-.861 1.01Z"
      fill="url(#tool-fcl-sm_svg__a)"
    />
    <defs>
      <linearGradient
        id="tool-fcl-sm_svg__a"
        x1={11.081}
        y1={-3.706}
        x2={1.238}
        y2={9.56}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#F0B24F" />
        <stop offset={1} stopColor="#F0DB4F" />
      </linearGradient>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolFclSm
export default SvgToolFclSm
