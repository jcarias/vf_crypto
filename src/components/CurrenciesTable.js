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

const CurrenciesTable = ({ currenciesList, currency, ...otherProps }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={3}>Crypto currency</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Market Cap</TableCell>
          <TableCell>24H Change</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isEmpty(currenciesList) &&
          currenciesList.map(cryptoCurr => (
            <TableRow
              hover
              key={cryptoCurr.id}
              onClick={() =>
                otherProps.history.push(`/details/${cryptoCurr.id}`)
              }
            >
              <TableCell>{cryptoCurr.rank}</TableCell>
              <TableCell>
                <Image
                  src={`https://cryptoicons.org/api/icon/${cryptoCurr.symbol.toLowerCase()}/32`}
                  fallBackSrc={`https://cryptoicons.org/api/icon/generic/32`}
                  alt={cryptoCurr.symbol}
                />
              </TableCell>
              <TableCell>{cryptoCurr.name}</TableCell>
              <TableCell>
                <CurrencyText
                  currency={currency}
                  value={cryptoCurr[`price_${currency.toLowerCase()}`]}
                ></CurrencyText>
              </TableCell>
              <TableCell>
                <CurrencyText
                  currency={currency}
                  value={cryptoCurr[`market_cap_${currency.toLowerCase()}`]}
                  style={{ fontSize: "1.5em" }}
                ></CurrencyText>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default withRouter(CurrenciesTable);
