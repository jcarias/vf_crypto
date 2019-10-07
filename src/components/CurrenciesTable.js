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
import styled, { css } from "styled-components";
import Label from "./Label";

const Table = styled.table`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  margin-top: 1em;
  filter: blur(0px);
  ${props =>
    props.isLoading &&
    css`
      filter: blur(4px);
    `};
`;

const CurrencyContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  font-size: 24px;
  height: 24px;
  margin-right: 1rem;
`;

const NameContainer = styled.div`
  white-space: nowrap;
  font-weight: 500;
`;

const HeaderCell = styled.th`
  white-space: nowrap;
  background-color: #ebf0f4;
  border-top: 1px solid #d5e1ea;
  border-bottom: 1px solid #d5e1ea;
  font-size: 0.9em;
  text-align: left;
  padding: 6px 16px;
`;

const ClickableHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  justify-content: ${props => props.alignment || "inherit"};

  &:hover {
    color: rgba(0, 0, 0, 0.9);
  }
`;

const NoIconPlaceHolder = styled.div`
  font-size: 24px;
  height: 24px;
  width: 24px;
`;

const ClickableHeader = ({
  label,
  columnKey,
  handleSortClick,
  sortInfo,
  alignment,
  ...rest
}) => (
  <HeaderCell {...rest}>
    <ClickableHeaderContainer
      alignment={alignment}
      onClick={() => handleSortClick(columnKey)}
    >
      <Label>{label}</Label>
      {sortInfo.sortKey === columnKey ? (
        sortInfo.sortAsc ? (
          <SortUp color="inherit" />
        ) : (
          <SortDown color="inherit" />
        )
      ) : (
        <NoIconPlaceHolder />
      )}
    </ClickableHeaderContainer>
  </HeaderCell>
);

const CurrenciesTable = ({
  cryptoCurrenciesList,
  selCurrency,
  handleSortClick,
  sortInfo,
  handelRowSelect,
  isLoading,
  ...otherProps
}) => {
  return (
    <Table isLoading={isLoading}>
      <TableHead>
        <TableRow>
          <HeaderCell width="15%"></HeaderCell>
          <ClickableHeader
            alignment="flex-end"
            label="#"
            columnKey={"rank"}
            handleSortClick={handleSortClick}
            sortInfo={sortInfo}
          />
          <ClickableHeader
            label="Cryptocurrency"
            columnKey={"name"}
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
            alignment="flex-end"
            label="24H Change"
            columnKey={"percent_change_24h"}
            handleSortClick={handleSortClick}
            sortInfo={sortInfo}
          />
          <HeaderCell width="15%"></HeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!isEmpty(cryptoCurrenciesList) &&
          cryptoCurrenciesList.map(cryptoCurr => (
            <TableRow
              style={{ cursor: "pointer" }}
              hover
              key={cryptoCurr.id}
              onClick={() => {
                handelRowSelect(cryptoCurr.id);
                return otherProps.history.push(`/details/${cryptoCurr.id}`);
              }}
            >
              <TableCell></TableCell>
              <TableCell align="right">
                <Label>{cryptoCurr.rank}</Label>
              </TableCell>
              <TableCell>
                <CurrencyContainer>
                  <IconContainer>
                    <CryptoCurrencyIcon symbol={cryptoCurr.symbol} />
                  </IconContainer>
                  <NameContainer>{cryptoCurr.name}</NameContainer>
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
              <TableCell align="right">
                <VarianceText value={cryptoCurr.percent_change_24h} />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default withRouter(CurrenciesTable);
