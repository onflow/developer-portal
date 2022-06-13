import * as React from "react"

const SvgLocal = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5 16.667a.834.834 0 0 0-.834-.834h-.833v-1.666h3.333a1.666 1.666 0 0 0 1.667-1.667V4.167A1.667 1.667 0 0 0 14.166 2.5H5.833a1.667 1.667 0 0 0-1.667 1.667V12.5a1.667 1.667 0 0 0 1.667 1.667h3.333v1.666h-.833a.833.833 0 0 0-.833.834H1.667v1.666H7.5a.833.833 0 0 0 .833.834h3.333a.833.833 0 0 0 .834-.834h5.833v-1.666H12.5ZM5.833 12.5V4.167h8.334V12.5H5.832Z"
      fill="#69717E"
      opacity={0.5}
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgLocal
export default SvgLocal
