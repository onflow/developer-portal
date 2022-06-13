import * as React from "react"

const SvgLocation = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      stroke="#14181F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 21s7-4.846 7-11.077a6.885 6.885 0 0 0-2.05-4.895A7.04 7.04 0 0 0 12 3a7.04 7.04 0 0 0-4.95 2.028A6.885 6.885 0 0 0 5 9.923C5 16.153 12 21 12 21Z"
      stroke="#14181F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgLocation
export default SvgLocation
