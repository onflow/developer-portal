import * as React from "react"

const SvgPlayCircle = (props) => (
  <svg
    width={32}
    height={32}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 .25C7.302.25.25 7.302.25 16S7.302 31.75 16 31.75 31.75 24.698 31.75 16 24.698.25 16 .25Zm5.066 15.993-7.678 5.586a.282.282 0 0 1-.447-.229V10.435a.281.281 0 0 1 .447-.229l7.678 5.583a.277.277 0 0 1 0 .454Z"
      fill="#00EF8B"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgPlayCircle
export default SvgPlayCircle
