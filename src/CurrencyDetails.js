import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import styled from "styled-components";
import ArrowBack from "@material-ui/icons/ArrowBackRounded";
import CryptoCurrencyDetail from "./components/CrytoCurrencyDetail";

const BackButton = styled.div`
  margin-left: 0.5rem;
  color: #66a7f2;
  background-color: rgba(66, 167, 242, 0.2);
  width: 24;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

class CurrencyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { currency: {} };
  }

  componentDidMount() {
    Axios.get(
      `https://api.coinmarketcap.com/v1/ticker/${this.props.match.params.id}/`
    )
      .then(response => {
        console.log(response);
        this.setState({ currency: response.data[0] });
      })
      .catch(err => {
        console.error(err);
        this.props.history.push("/");
      });
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <h1>Details</h1>
        <BackButton>
          <Link to="/">
            <ArrowBack />
          </Link>
        </BackButton>
        <hr />

        <CryptoCurrencyDetail currency={this.state.currency} />
      </div>
    );
  }
}

export default withRouter(CurrencyDetails);
