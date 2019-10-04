import React from "react";

import styled from "styled-components";

const LabelText = styled.span`
  margin-right: 0.1rem;
  font-size: 0.8em;
  font-weight: 600;
  opacity: 0.4;
  text-transform: uppercase;
`;

const Label = props => {
  return <LabelText>{props.children}</LabelText>;
};

export default Label;
