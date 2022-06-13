import * as React from "react"

const SvgSdk = (props) => (
  <svg
    width={36}
    height={41}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 9.643 18 20.25V40.5L0 30.214V9.643Z" fill="#69717E" />
    <path
      d="m35.5 29.924-17 9.714V19.964l-.246-.145L1.02 9.664 18 .567l17.5 9.375v19.982Z"
      stroke="#69717E"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgSdk
export default SvgSdk
