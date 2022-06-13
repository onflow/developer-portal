import * as React from "react"

const SvgExternalLink = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 5.825a.9.9 0 0 0 0 1.8h5.102l-8.688 8.688a.9.9 0 1 0 1.272 1.273l8.863-8.863v5.452a.9.9 0 1 0 1.8 0v-7.45a.9.9 0 0 0-.9-.9H10Z"
      fill="currentColor"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgExternalLink
export default SvgExternalLink
