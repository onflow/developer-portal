import * as React from "react"

const SvgCalendar = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.833 15.833H4.167V6.667h11.666v9.166Zm-2.5-15V2.5H6.667V.833H5V2.5h-.833A1.66 1.66 0 0 0 2.5 4.167v11.666A1.667 1.667 0 0 0 4.167 17.5h11.666a1.667 1.667 0 0 0 1.667-1.667V4.167A1.667 1.667 0 0 0 15.833 2.5H15V.833"
      fill="currentColor"
      opacity={0.5}
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgCalendar
export default SvgCalendar
