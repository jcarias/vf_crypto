import React from "react";

const SvgWaves = props => (
  <svg height="1em" width="1em" {...props}>
    <g fill="none" fillRule="evenodd">
      <circle cx={16} cy={16} fill="#0155ff" r={16} />
      <path d="M16 6l10 10-10 10L6 16z" fill="#fff" />
    </g>
  </svg>
);

export default SvgWaves;
