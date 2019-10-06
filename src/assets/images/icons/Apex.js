import React from "react";

const SvgApex = props => (
  <svg width="1em" height="1em" viewBox="0 0 32 32" {...props}>
    <g fill="none" fillRule="evenodd">
      <circle cx={16} cy={16} r={16} fill="#1F4C9F" />
      <path
        fill="#FFF"
        d="M6 19.25L16 6.5l10 12.75v4.25L16 10.75 6 23.5v-4.25zm10.5 1.25a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
      />
    </g>
  </svg>
);

export default SvgApex;
