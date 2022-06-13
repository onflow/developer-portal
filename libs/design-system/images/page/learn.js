import * as React from "react"

const SvgLearn = (props) => (
  <svg
    width={46}
    height={46}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M23 5.75 1.916 17.25l7.667 4.178v11.5L23 40.25l13.416-7.322v-11.5l3.834-2.089v13.244h3.833V17.25L23 5.75Zm13.072 11.5L23 24.38 9.928 17.25 23 10.12l13.072 7.13Zm-3.489 13.417L23 35.88l-9.584-5.213v-7.15L23 28.75l9.583-5.233v7.15Z"
      fill="currentColor"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgLearn
export default SvgLearn
