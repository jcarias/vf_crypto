import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import ArrowBack from "@material-ui/icons/ArrowBackRounded";
import CryptoCurrencyDetail from "./components/CryptoCurrencyDetail";
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

const CurrencyIconContainer = styled.div`
  font-size: ${props => props.iconSize || "36"}px;
  width: ${props => props.iconSize || "36"}px;
  height: ${props => props.iconSize || "36"}px;
  margin-right: 0.5rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Symbol = styled.div`
  margin-right: 0.1rem;
  font-size: 0.8em;
  font-weight: 600;
  opacity: 0.4;
  text-transform: uppercase;
`;

class CryptoCurrencyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { cryptoCurrency: {}, isLoading: false };
  }

  componentDidMount() {
    if (isEmpty(this.props.selectedCurrency)) {
      // Fallback if no currency has been selected in the details (e.g. if link is used directly)
      this.fetchNotFoundCurrency();
    }
  }

  fetchNotFoundCurrency = () => {
    //This endpoint must be defined in a .env file in production
    this.setState({ isLoading: true });
    Axios.get(
      `https://api.coinmarketcap.com/v1/ticker/${this.props.match.params.id}/`
    )
      .then(response => {
        this.setState({ cryptoCurrency: response.data[0], isLoading: false });
      })
      .catch(err => {
        //TODO: show an user friendly message when error occurs
        this.setState({ isLoading: false });
        console.error(err);
        this.props.history.push("/");
      });
  };

  handleBackButtonClick = () => {
    this.props.history.push("/");
  };

  render() {
    const currencyInfo = !isEmpty(this.props.selectedCurrency)
      ? this.props.selectedCurrency
      : this.state.cryptoCurrency;

    return (
      <React.Fragment>
        {this.state.isLoading && <Loader />}
        {isEmpty(currencyInfo) || (
          <React.Fragment>
            <HeaderContainer>
              <BackButton onClick={this.handleBackButtonClick}>
                <ArrowBack />
              </BackButton>
              <CurrencyContainer>
                <CurrencyIconContainer iconSize="40">
                  <CryptoCurrencyIcon symbol={currencyInfo.symbol} />
                </CurrencyIconContainer>
                <InfoContainer>
                  <span>{currencyInfo.name}</span>
                  <Symbol>{currencyInfo.symbol}</Symbol>
                </InfoContainer>
              </CurrencyContainer>
              <div>
                <HeaderPrice>
                  <CurrencyText currency="USD" value={currencyInfo.price_usd} />
                </HeaderPrice>
              </div>
            </HeaderContainer>

            <CryptoCurrencyDetail cryptoCurrency={currencyInfo} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    selectedCurrency: chosenCurrencySelector(state.CryptoReducer)
  };
};
export default connect(mapStateToProps)(withRouter(CryptoCurrencyDetails));
