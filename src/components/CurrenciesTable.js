import React from "react";
import { withRouter } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import Image from "../Image";
import CurrencyText from "./CurrencyText";
import VarianceText from "./VarianceText";
import { Grid } from "@material-ui/core";

const CurrenciesTable = ({
  cryptoCurrenciesList,
  selCurrency,
  ...otherProps
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2}>Crypto currency</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Market Cap</TableCell>
          <TableCell>24H Change</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isEmpty(cryptoCurrenciesList) &&
          cryptoCurrenciesList.map(cryptoCurr => (
            <TableRow
              hover
              key={cryptoCurr.id}
              onClick={() =>
                otherProps.history.push(`/details/${cryptoCurr.id}`)
              }
            >
              <TableCell>{cryptoCurr.rank}</TableCell>
              <TableCell>
                <Grid container alignItems="center" spacing={1}>
                  <Grid item>
                    <Image
                      src={`https://cryptoicons.org/api/icon/${cryptoCurr.symbol.toLowerCase()}/32`}
                      fallBackSrc={`https://cryptoicons.org/api/icon/generic/32`}
                      alt={cryptoCurr.symbol}
                      size={24}
                    />
                  </Grid>
                  <Grid item xs>
                    {cryptoCurr.name}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell>
                <CurrencyText
                  currency={selCurrency}
                  value={cryptoCurr[`price_${selCurrency.toLowerCase()}`]}
                  style={{ fontSize: "1.1em" }}
                ></CurrencyText>
              </TableCell>
              <TableCell>
                <CurrencyText
                  currency={selCurrency}
                  value={cryptoCurr[`market_cap_${selCurrency.toLowerCase()}`]}
                ></CurrencyText>
              </TableCell>
              <TableCell>
                <VarianceText value={cryptoCurr.percent_change_24h} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default withRouter(CurrenciesTable);
