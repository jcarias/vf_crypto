import React from "react";
import { Currencies, currencyFormatter } from "../utils";
import styled, { css } from "styled-components";

const Text = styled.span`
  ${props =>
    props.currency &&
    css`
      opacity: 0.5;
      margin-right: 0.2rem;
    `};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CurrencyText = ({ currency = "EUR", value = 0, ...otherProps }) => {
  return (
    <Container {...otherProps}>
      <Text currency className="currency">
        {Currencies[currency].symbol}
      </Text>
      <Text className>{currencyFormatter(currency).format(value)}</Text>
    </Container>
  );
};

export default CurrencyText;
