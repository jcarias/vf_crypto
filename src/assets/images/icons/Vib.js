import React from "react";

const SvgVib = props => (
  <svg height="1em" viewBox="0 0 32 32" width="1em" {...props}>
    <g fill="none">
      <circle cx={16} cy={16} fill="#ff1f43" r={16} />
      <path d="M7 7h4.2l7.2 12.775V7H22v18h-4.8z" fill="#fff" />
    </g>
  </svg>
);

export default SvgVib;
