import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { getCurrenciesList } from "../store/CurrenciesReducer";

import styled from "styled-components";

const BrandTitle = styled.span`
  font-size: 2em;
  color: rgba(0, 0, 0, 0.5);
`;

const ListHeader = ({ selCurrency, handleCurrencyChange, ...otherProps }) => {
  const { currenciesList } = otherProps;
  return (
    <Grid container>
      <Grid item xs>
        <BrandTitle>VF Crypto</BrandTitle>
      </Grid>
      <Grid item xs></Grid>
      <Grid item>
        <FormControl>
          <Select
            value={selCurrency}
            onChange={handleCurrencyChange}
            style={{ minWidth: 200 }}
          >
            {currenciesList.map((currency, index) => (
              <MenuItem key={index} value={currency.code}>
                {currency.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currenciesMap: state.CurrenciesReducer,
    currenciesList: getCurrenciesList(state.CurrenciesReducer)
  };
};

export default connect(mapStateToProps)(ListHeader);
