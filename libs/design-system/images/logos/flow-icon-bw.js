import * as React from "react"

const SvgFlowIconBw = (props) => (
  <svg
    width={262}
    height={262}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={130.91} cy={130.91} r={130.91} fill="#000" />
    <path fill="#fff" d="M151.41 110.409h36.969v36.969H151.41z" />
    <path
      d="M114.441 161.228a13.876 13.876 0 1 1-13.85-13.85h13.85v-36.969h-13.85a50.846 50.846 0 0 0-35.979 86.799 50.845 50.845 0 0 0 55.423 11.016 50.843 50.843 0 0 0 31.375-46.996v-13.85h-36.969v13.85ZM165.26 91.925h41.577V54.982H165.26c-28.055.029-50.79 22.764-50.819 50.819v4.608h36.969v-4.608c.014-7.648 6.202-13.848 13.85-13.876Z"
      fill="#fff"
    />
    <path d="M114.441 147.378h36.969v-36.969h-36.969v36.969Z" fill="#000" />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgFlowIconBw
export default SvgFlowIconBw
