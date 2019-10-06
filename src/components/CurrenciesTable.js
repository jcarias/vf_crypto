import React from "react";
import isEmpty from "lodash/isEmpty";
import { withRouter } from "react-router-dom";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CurrencyText from "./CurrencyText";
import VarianceText from "./VarianceText";
import SortUp from "@material-ui/icons/ArrowDropUp";
import SortDown from "@material-ui/icons/ArrowDropDown";

import CryptoCurrencyIcon from "../assets/images";
import styled from "styled-components";
import Label from "./Label";

const Table = styled.table`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  margin-top: 1em;
`;

const CurrencyContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  font-size: 24px;
  height: 24px;
  margin-right: 1rem;
  margin-left: 1em;
`;

const HeaderCell = styled.th`
  background-color: #ebf0f4;
  border-top: 1px solid #d5e1ea;
  border-bottom: 1px solid #d5e1ea;
  font-size: 0.9em;
  text-align: left;
  padding: 8px 16px;
`;

const ClickableHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ClickableHeader = ({ label, columnKey, handleSortClick, sortInfo }) => (
  <HeaderCell onClick={() => handleSortClick(columnKey)}>
    <ClickableHeaderContainer>
      <Label>{label}</Label>
      {sortInfo.sortKey === columnKey &&
        (sortInfo.sortAsc ? <SortUp /> : <SortDown />)}
    </ClickableHeaderContainer>
  </HeaderCell>
);

const CurrenciesTable = ({
  cryptoCurrenciesList,
  selCurrency,
  handleSortClick,
  sortInfo,
  ...otherProps
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <ClickableHeader
            label="Cryptocurrency"
            columnKey={"rank"}
            handleSortClick={handleSortClick}
            sortInfo={sortInfo}
          />
          <ClickableHeader
            label="Price"
            columnKey={"price_usd"}
            handleSortClick={handleSortClick}
            sortInfo={sortInfo}
          />
          <ClickableHeader
            label="Market Cap"
            columnKey={"market_cap_usd"}
            handleSortClick={handleSortClick}
            sortInfo={sortInfo}
          />
          <ClickableHeader
            label="24H Change"
            columnKey={"percent_change_24h"}
            handleSortClick={handleSortClick}
            sortInfo={sortInfo}
          />
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
              <TableCell>
                <CurrencyContainer>
                  <Label>{cryptoCurr.rank}</Label>
                  <IconContainer>
                    <CryptoCurrencyIcon symbol={cryptoCurr.symbol} />
                  </IconContainer>
                  <div>{cryptoCurr.name}</div>
                </CurrencyContainer>
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
