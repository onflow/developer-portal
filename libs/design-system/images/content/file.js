import * as React from "react"

const SvgFile = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m19.74 8.33-5.44-6a1 1 0 0 0-.74-.33h-7A2.53 2.53 0 0 0 4 4.5v15A2.53 2.53 0 0 0 6.56 22h10.88A2.53 2.53 0 0 0 20 19.5V9a1 1 0 0 0-.26-.67ZM17.65 9h-3.94a.79.79 0 0 1-.71-.85V4h.11l4.54 5Zm-.21 11H6.56a.528.528 0 0 1-.56-.5v-15a.53.53 0 0 1 .56-.5H11v4.15A2.79 2.79 0 0 0 13.71 11H18v8.5a.53.53 0 0 1-.56.5Z"
      fill="#2F353F"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgFile
export default SvgFile
