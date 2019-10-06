import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import isEmpty from "lodash/isEmpty";
import isEqual from "lodash/isEqual";
import styled from "styled-components";
import ArrowBack from "@material-ui/icons/ArrowBackRounded";
import CryptoCurrencyDetail from "./components/CryptoCurrencyDetail";
import Label from "./components/Label";
import CurrencyText from "./components/CurrencyText";
import Loader from "./components/Loader";
import { connect } from "react-redux";

import CryptoCurrencyIcon from "./assets/images";
import { chosenCurrencySelector } from "./store/CryptoReducer";

const HeaderContainer = styled.div`
  height: 88px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: "Montserrat", sans-serif;
  & > div {
    flex: 0 1 auto;
    margin: 16px;
  }
`;

const BackButton = styled.div`
  margin-left: 0.5rem;
  color: #66a7f2;
  background-color: rgba(66, 167, 242, 0.2);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: rgba(66, 167, 242, 0.3);
  }
`;

const HeaderPrice = styled.div`
  font-size: 1.3em;
`;

const CurrencyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const iconSize = 36;
const CurrencyIconContainer = styled.div`
  font-size: ${iconSize}px;
  width: ${iconSize}px;
  height: ${iconSize}px;
  margin-right: 0.5rem;
`;

const InfoContainer = styled.div``;

class CryptoCurrencyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { cryptoCurrency: {} };
  }

  componentDidMount() {
    if (isEmpty(this.props.selectedCurrency)) {
      this.fetchNotFoundCurrency();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.selectedCurrency, this.props.selectedCurrency)) {
      if (isEmpty(this.props.selectedCurrency)) {
        this.fetchNotFoundCurrency();
      }
    }
  }

  fetchNotFoundCurrency = () => {
    Axios.get(
      `https://api.coinmarketcap.com/v1/ticker/${this.props.match.params.id}/`
    )
      .then(response => {
        console.log(response);
        this.setState({ cryptoCurrency: response.data[0] });
      })
      .catch(err => {
        console.error(err);
        this.props.history.push("/");
      });
  };

  handleBackButtonClick = () => {
    this.props.history.push("/");
  };

  render() {
    let currencyInfo = this.props.selectedCurrency;

    if (isEmpty(currencyInfo)) {
      currencyInfo = this.state.cryptoCurrency;
    }

    if (isEmpty(currencyInfo)) {
      return <Loader />;
    }

    return (
      <div>
        <HeaderContainer>
          <BackButton onClick={this.handleBackButtonClick}>
            <ArrowBack />
          </BackButton>
          <CurrencyContainer>
            <CurrencyIconContainer>
              <CryptoCurrencyIcon symbol={currencyInfo.symbol} />
            </CurrencyIconContainer>
            <InfoContainer>
              <div>
                <span>{currencyInfo.name}</span>
              </div>
              <div>
                <Label>{currencyInfo.symbol}</Label>
              </div>
            </InfoContainer>
          </CurrencyContainer>
          <div>
            <HeaderPrice>
              <CurrencyText currency="USD" value={currencyInfo.price_usd} />
            </HeaderPrice>
          </div>
        </HeaderContainer>

        <CryptoCurrencyDetail cryptoCurrency={currencyInfo} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedCurrency: chosenCurrencySelector(state.CryptoReducer)
  };
};
export default connect(mapStateToProps)(withRouter(CryptoCurrencyDetails));
