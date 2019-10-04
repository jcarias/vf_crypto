import React from "react";
import styled from "styled-components";
import { Grid } from "@material-ui/core";

import CurrencyText from "./CurrencyText";
import { numberFormatter } from "../utils";

const Container = styled.div`
  min-height: calc(100vh - 88px);
  background-color: #1a2f4e;
  color: white;
  font-family: "Montserrat", sans-serif;
  padding: 48px;
  font-size: 12px;
`;

const DetailInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;

const DetailInfoContainerRows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 24px;
  & > div {
    margin-top: 8px;
    display: flex;
    align-items: center;
  }
`;

const StyleCurrencyText = styled(CurrencyText)`
  font-size: 1.2em;
`;

const LabelText = styled.span`
  margin-right: 0.1rem;
  font-size: 0.8em;
  font-weight: 600;
  opacity: 0.3;
  text-transform: uppercase;
`;

const ValueText = styled.div`
  font-size: 1.2em;
`;
const LabelCurrency = styled.span`
  margin-left: 0.5rem;
  font-size: 0.6em;
  font-weight: 600;
  color: #27d483;
  text-transform: uppercase;
`;

const RankIndicator = styled.div`
  margin-left: 0.5rem;
  color: #66a7f2;
  background-color: rgba(66, 167, 242, 0.2);
  font-weight: 600;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const CryptoCurrencyDetail = ({ currency, ...otherProps }) => {
  return (
    <Container>
      {currency && (
        <Grid container direction="row">
          <Grid item xs={4}>
            <DetailInfoContainer>
              <LabelText>Rank</LabelText>
              <RankIndicator>{currency.rank}</RankIndicator>
            </DetailInfoContainer>
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={6}>
                <DetailInfoContainerRows>
                  <LabelText>Market Cap</LabelText>
                  <StyleCurrencyText
                    value={currency.market_cap_usd}
                    currency="USD"
                  ></StyleCurrencyText>
                </DetailInfoContainerRows>
              </Grid>
              <Grid item xs={6}>
                <DetailInfoContainerRows>
                  <LabelText>24h Volume</LabelText>
                  <StyleCurrencyText
                    value={currency["24h_volume_usd"]}
                    currency="USD"
                  ></StyleCurrencyText>
                </DetailInfoContainerRows>
              </Grid>
              <Grid item xs={6}>
                <DetailInfoContainerRows>
                  <LabelText>Circulating Supply</LabelText>
                  <ValueText>
                    {numberFormatter.format(currency.available_supply)}
                    <LabelCurrency>{currency.symbol}</LabelCurrency>
                  </ValueText>
                </DetailInfoContainerRows>
              </Grid>
              <Grid item xs={6}>
                <DetailInfoContainerRows>
                  <LabelText>Total Supply</LabelText>
                  <ValueText>
                    {numberFormatter.format(currency.max_supply)}
                    <LabelCurrency>{currency.symbol}</LabelCurrency>
                  </ValueText>
                </DetailInfoContainerRows>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CryptoCurrencyDetail;
