import * as React from "react"

const SvgToolCadenceSm = (props) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.392 6.586h-1.841V5.36c0-.54-.653-.823-1.037-.434L7.086 7.38a.619.619 0 0 0 0 .868l1.392 1.408-2.688 2.763c-.237.24.755-.42.992-.18s.621.24.859 0l2.125-2.149a.618.618 0 0 0 0-.868L8.374 7.814l.962-.973v.36a.61.61 0 0 0 .608.613h2.448A.61.61 0 0 0 13 7.2a.61.61 0 0 0-.608-.614Z"
      fill="url(#tool-cadence-sm_svg__a)"
    />
    <path
      d="M8.277 3.568a.6.6 0 0 0-.763.076L5.851 5.327a.617.617 0 0 0 0 .866.6.6 0 0 0 .855 0L8.02 4.864l.442.323.59-.598c.1-.1.216-.178.344-.238l-1.118-.783Z"
      fill="url(#tool-cadence-sm_svg__b)"
    />
    <path
      d="M6.646 8.672a1.23 1.23 0 0 1-.307-.556l-3.164 3.252a.628.628 0 0 0 0 .87c.234.24.613.24.847 0l3.047-3.13-.423-.436Z"
      fill="url(#tool-cadence-sm_svg__c)"
    />
    <circle
      cx={10.848}
      cy={3.872}
      r={0.872}
      fill="url(#tool-cadence-sm_svg__d)"
    />
    <defs>
      <linearGradient
        id="tool-cadence-sm_svg__a"
        x1={11.46}
        y1={-2.7}
        x2={1.583}
        y2={6.157}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FAFA" />
        <stop offset={1} stopColor="#7F00FF" />
      </linearGradient>
      <linearGradient
        id="tool-cadence-sm_svg__b"
        x1={8.604}
        y1={0.665}
        x2={4.942}
        y2={5.148}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FAFA" />
        <stop offset={1} stopColor="#7F00FF" />
      </linearGradient>
      <linearGradient
        id="tool-cadence-sm_svg__c"
        x1={6.204}
        y1={3.972}
        x2={0.701}
        y2={8.951}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FAFA" />
        <stop offset={1} stopColor="#7F00FF" />
      </linearGradient>
      <linearGradient
        id="tool-cadence-sm_svg__d"
        x1={11.35}
        y1={1.32}
        x2={9.109}
        y2={3.462}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#fff" stopOpacity={0.01} />
        <stop offset={0.128} stopColor="#00FAFA" />
        <stop offset={1} stopColor="#7F00FF" />
      </linearGradient>
    </defs>
  </svg>
) // for backwards-compat–

export const ReactComponent = SvgToolCadenceSm
export default SvgToolCadenceSm
