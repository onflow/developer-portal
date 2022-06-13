import * as React from "react"

const SvgDatabase = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 8c4.97 0 9-1.343 9-3s-4.03-3-9-3-9 1.343-9 3 4.03 3 9 3ZM21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
      stroke="#2F353F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
      stroke="#2F353F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgDatabase
export default SvgDatabase
