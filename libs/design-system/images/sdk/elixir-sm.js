import * as React from "react"

const SvgElixirSm = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.9 4.295c1.04 2.293 3.82 3.25 3.57 6.238-.29 3.508-2.775 4.392-4.158 4.454a4.407 4.407 0 0 1-4.7-3.742C2.81 7.523 6.327 1.816 8.354 1A7.542 7.542 0 0 0 8.9 4.295Zm-.083 9.429a.212.212 0 0 0-.029-.164c-.296-.55-2.905-.822-3.453-.876.244.25.518.47.817.65.431.264.909.44 1.407.521.402.06 1.174.111 1.258-.132v.001Z"
      fill="#7C648F"
    />
    <path
      opacity={0.25}
      d="M9.124 5.309c2.235 2.411 3.222 2.49 3.118 5.239-.124 3.238-2.271 4.095-3.529 4.21-2.1.276-3.747-.764-4.179-2.843C3.656 8.531 6.49 3.011 8.318 2.18a7.662 7.662 0 0 0 .81 3.12l-.004.009Z"
      fill="#26003D"
    />
    <path
      opacity={0.75}
      d="M8.693 4.96C10.185 7 12.16 6.85 12.5 9.82c.047 3.462-1.8 4.642-3.118 4.974-2.25.64-4.257-.322-5.047-2.5C2.817 8.794 5.66 3.037 7.49 1.837a7.542 7.542 0 0 0 1.185 3.118l.018.005Z"
      fill="url(#elixir-sm_svg__a)"
    />
    <defs>
      <linearGradient
        id="elixir-sm_svg__a"
        x1={8.625}
        y1={14.799}
        x2={7.487}
        y2={1.997}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0} />
        <stop offset={0.01} stopColor="#F7F6F8" stopOpacity={0.04} />
        <stop offset={0.09} stopColor="#AA9CB3" stopOpacity={0.39} />
        <stop offset={0.2} stopColor="#6F567E" stopOpacity={0.66} />
        <stop offset={0.32} stopColor="#452459" stopOpacity={0.86} />
        <stop offset={0.5} stopColor="#2D0843" stopOpacity={0.97} />
        <stop offset={1} stopColor="#26003D" />
      </linearGradient>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgElixirSm
export default SvgElixirSm
