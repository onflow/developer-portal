import * as React from "react"

const SvgAmbassadors = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5 3.333a3.333 3.333 0 1 1 0 6.667 3.333 3.333 0 0 1 0-6.667Zm0 1.584a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5Zm0 5.916c2.225 0 6.667 1.109 6.667 3.334v2.5H5.833v-2.5c0-2.225 4.442-3.334 6.667-3.334Zm0 1.584c-2.5 0-5.083 1.216-5.083 1.75v.916h10.166v-.916c0-.534-2.608-1.75-5.083-1.75Zm-8.333-1.35-2.083 1.241.566-2.341L.833 8.4l2.392-.208.942-2.2.925 2.2L7.5 8.4 5.667 9.967l.542 2.341-2.042-1.241Z"
      fill="#69717E"
      opacity={0.5}
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgAmbassadors
export default SvgAmbassadors
