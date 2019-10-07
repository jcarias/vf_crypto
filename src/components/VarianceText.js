import React from "react";
import styled, { css } from "styled-components";
import { percentFormatter } from "../utils";
import ArrowUp from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDown from "@material-ui/icons/ArrowDownwardRounded";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: green;
  font-size: 0.8em;
  font-weight: 600;
  ${props =>
    props.negative &&
    css`
      color: red;
    `};
`;

const Text = styled.span`
  margin-right: 0.05rem;
`;
const StyledVarianceIcon = styled.div`
  height: 1em;
  width: 1em;
  & > svg {
    max-height: 12px;
    max-width: 12px;
  }
`;

const VarianceText = ({ value = 0, ...otherProps }) => {
  return (
    <Container negative={value < 0} {...otherProps}>
      <Text>{percentFormatter(value)}</Text>
      <StyledVarianceIcon>
        {value > 0 && <ArrowUp />}
        {value < 0 && <ArrowDown />}
      </StyledVarianceIcon>
    </Container>
  );
};

export default VarianceText;
