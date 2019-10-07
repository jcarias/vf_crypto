import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getFiatCurrenciesList } from "../store/CurrenciesReducer";

import styled from "styled-components";

const Container = styled.div`
  padding: 1em 2em;
`;
const BrandTitle = styled.span`
  font-size: 1.5em;
  color: rgba(0, 0, 0, 0.5);
`;

const ListHeader = ({ selCurrency, handleCurrencyChange, ...otherProps }) => {
  const { currenciesList } = otherProps;
  return (
    <Container>
      <Grid container>
        <Grid item xs>
          <BrandTitle>VF Crypto</BrandTitle>
        </Grid>
        <Grid item xs={1}>
          <FormControl fullWidth>
            <Select value={selCurrency} onChange={handleCurrencyChange}>
              {currenciesList.map((currency, index) => (
                <MenuItem key={index} value={currency.code}>
                  {currency.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currenciesMap: state.CurrenciesReducer,
    currenciesList: getFiatCurrenciesList(state.CurrenciesReducer)
  };
};

export default connect(mapStateToProps)(ListHeader);
