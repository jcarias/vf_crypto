import React from "react";
import Grid from "@material-ui/core/Grid";
import ListHeader from "./components/ListHeader";
import CurrenciesTable from "./components/CurrenciesTable";
import style from "styled-components";

const TimeStamp = style.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.6em;
  color: #0000007F;
  padding: 1em;
`;

const CurrenciesList = ({
  cryptoCurrenciesData,
  lastUpdateTimeStamp,
  sortInfo,
  changeSortHandler,
  fiatCurrencyChangeHandler,
  currentFiatCurrency = "USD",
  selectCryptoCurrency
}) => {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <ListHeader
            selCurrency={currentFiatCurrency}
            handleCurrencyChange={fiatCurrencyChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <CurrenciesTable
            cryptoCurrenciesList={cryptoCurrenciesData}
            fiatCurrencySelected={currentFiatCurrency}
            handleSortClick={changeSortHandler}
            sortInfo={sortInfo}
            handleRowSelect={selectCryptoCurrency}
          />
        </Grid>
        <Grid item xs={12}>
          <TimeStamp>
            <span>
              Last update:{" "}
              <strong>{new Date(lastUpdateTimeStamp).toISOString()}</strong>
            </span>
          </TimeStamp>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CurrenciesList;
