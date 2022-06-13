import * as React from "react"

const SvgSun = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM11 2h2v3h-2V2Zm-9 9h3v2H2v-2Zm17 0h3v2h-3v-2Zm-8 8h2v3h-2v-3Zm7.621-15 1.415 1.414-2.122 2.122L16.5 6.12 18.621 4ZM16.5 17.414 17.914 16l2.122 2.121-1.415 1.415-2.121-2.122ZM6.121 16l1.415 1.414-2.122 2.122L4 18.12 6.121 16ZM4 5.414 5.414 4l2.122 2.121L6.12 7.536 4 5.414Z"
      fill="#000"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgSun
export default SvgSun
