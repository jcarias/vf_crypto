import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import ArrowBack from "@material-ui/icons/ArrowBackRounded";
import CryptoCurrencyDetail from "./components/CryptoCurrencyDetail";
import Label from "./components/Label";
import CurrencyText from "./components/CurrencyText";

import CryptoCurrencyIcon from "./assets/images";

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
  font-size: 1.2 rem;
`;

class CryptoCurrencyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { cryptoCurrency: {} };
  }

  componentDidMount() {
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
  }

  handleBackButtonClick = () => {
    this.props.history.push("/");
  };

  render() {
    const { cryptoCurrency } = this.state;
    if (isEmpty(cryptoCurrency)) {
      return <span>Loading...</span>;
    }

    return (
      <div>
        <HeaderContainer>
          <BackButton onClick={this.handleBackButtonClick}>
            <ArrowBack />
          </BackButton>
          <div>
            <CryptoCurrencyIcon symbol={cryptoCurrency.symbol} />
            <span>{cryptoCurrency.name}</span>
            <Label>{cryptoCurrency.symbol}</Label>
          </div>
          <div>
            <HeaderPrice>
              <CurrencyText currency="USD" value={cryptoCurrency.price_usd} />
            </HeaderPrice>
          </div>
        </HeaderContainer>

        <CryptoCurrencyDetail cryptoCurrency={cryptoCurrency} />
      </div>
    );
  }
}

export default withRouter(CryptoCurrencyDetails);
