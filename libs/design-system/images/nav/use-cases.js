import * as React from "react"

const SvgUseCases = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 1.667A5.833 5.833 0 0 1 15.833 7.5a5.83 5.83 0 0 1-2.5 4.783v1.884A.833.833 0 0 1 12.5 15h-5a.833.833 0 0 1-.833-.833v-1.884A5.83 5.83 0 0 1 10 1.667ZM7.5 17.5v-.833h5v.833a.833.833 0 0 1-.834.833H8.333A.833.833 0 0 1 7.5 17.5ZM10 3.333a4.167 4.167 0 0 0-1.667 7.984v2.016h3.333v-2.016A4.167 4.167 0 0 0 10 3.334Z"
      fill="#69717E"
      opacity={0.5}
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgUseCases
export default SvgUseCases
