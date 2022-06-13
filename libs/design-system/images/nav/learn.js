import * as React from "react"

const SvgLearn = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10 2.5-9.167 5 3.334 1.817v5L10 17.5l5.834-3.183v-5l1.666-.909v5.759h1.667V7.5L10 2.5Zm5.684 5L10 10.6 4.317 7.5 10 4.4l5.684 3.1Zm-1.517 5.833L10 15.6l-4.167-2.267v-3.108L10 12.5l4.167-2.275v3.108Z"
      fill="#69717E"
      opacity={0.5}
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgLearn
export default SvgLearn
