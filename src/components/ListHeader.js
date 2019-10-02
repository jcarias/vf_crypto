import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const ListHeader = ({ selCurrency, handleCurrencyChange, ...otherProps }) => {
  return (
    <Grid container>
      <Grid item>
        <Typography>VF Crypto</Typography>
      </Grid>
      <Grid item xs></Grid>
      <Grid item>
        <FormControl>
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select value={selCurrency} onChange={handleCurrencyChange}>
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"GBP"}>GBP</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ListHeader;
