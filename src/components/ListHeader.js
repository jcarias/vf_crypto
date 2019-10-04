import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const ListHeader = ({ selCurrency, handleCurrencyChange, ...otherProps }) => {
  const { currenciesMap } = otherProps;
  console.log(currenciesMap);
  return (
    <Grid container>
      <Grid item>
        <Typography>VF Crypto</Typography>
      </Grid>
      <Grid item xs></Grid>
      <Grid item>
        <FormControl>
          <Select
            value={selCurrency}
            onChange={handleCurrencyChange}
            style={{ minWidth: 200 }}
          >
            {Object.keys(currenciesMap).map((currKey, index) => {
              const currency = currenciesMap[currKey];
              return (
                <MenuItem key={index} value={currency.code}>
                  {currency.code}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currenciesMap: state.CurrenciesReducer
  };
};

export default connect(mapStateToProps)(ListHeader);
