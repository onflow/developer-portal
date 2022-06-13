import * as React from "react"

const SvgReference = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.38 9.695a.761.761 0 0 0-1.075 0l-3.767 3.767a.761.761 0 0 0 0 1.076l3.767 3.767a.76.76 0 0 0 1.076-1.076L5.913 14.76h8.656a.76.76 0 0 0 .76-.761V5.122a.761.761 0 0 0-1.521 0v8.117H5.913l2.468-2.468a.761.761 0 0 0 0-1.076Z"
      fill="currentColor"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgReference
export default SvgReference
