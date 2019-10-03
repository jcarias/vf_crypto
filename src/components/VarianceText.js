import React from "react";
import styled, { css } from "styled-components";
import { percentFormatter } from "../utils";
import ArrowUp from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDown from "@material-ui/icons/ArrowDownwardRounded";

const Text = styled.span`
  margin-right: 0.1rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  color: green;
  ${props =>
    props.negative &&
    css`
      color: red;
    `};
`;

const StyledIncreaseIcon = styled(ArrowUp)`
  max-height: 12px;
`;
const StyledDecreaseIcon = styled.div`
  & > svg {
    max-height: 12px;
  }
`;

const VarianceText = ({ value = 0, ...otherProps }) => {
  return (
    <Container negative={value < 0} {...otherProps}>
      <Text>{percentFormatter(value)}</Text>
      <StyledDecreaseIcon>
        {value > 0 && <ArrowUp />}
        {value < 0 && <ArrowDown />}
      </StyledDecreaseIcon>
    </Container>
  );
};

export default VarianceText;
