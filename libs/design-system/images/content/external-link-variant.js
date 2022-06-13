import * as React from "react"

const SvgExternalLinkVariant = (props) => (
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
      d="M6.666 3.583a.9.9 0 1 0 0 1.8h2.678l-5.28 5.28a.9.9 0 0 0 1.272 1.273l5.397-5.396v2.91a.9.9 0 1 0 1.8 0V4.483a.9.9 0 0 0-.9-.9H6.666Z"
      fill="currentColor"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgExternalLinkVariant
export default SvgExternalLinkVariant
