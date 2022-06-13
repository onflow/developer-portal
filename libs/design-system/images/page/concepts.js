import * as React from "react"

const SvgConcepts = (props) => (
  <svg
    width={46}
    height={46}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.75 28.75v7.667a3.833 3.833 0 0 1-3.833 3.833H9.583a3.833 3.833 0 0 1-3.833-3.833V21.083a3.833 3.833 0 0 1 3.833-3.833h7.667V9.583a3.833 3.833 0 0 1 3.833-3.833h15.334a3.833 3.833 0 0 1 3.833 3.833v15.334a3.833 3.833 0 0 1-3.833 3.833H28.75Zm-7.667-11.5h7.667v7.667h7.667V9.583H21.083v7.667Zm-11.5 3.833v15.334h15.334V28.75H17.25v-7.667H9.583Z"
      fill="currentColor"
    />
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgConcepts
export default SvgConcepts
