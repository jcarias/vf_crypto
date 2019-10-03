import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ListHeader from "./components/ListHeader";
import CurrenciesTable from "./components/CurrenciesTable";
import Axios from "axios";

const CURRENCIES_LIMIT = 10;

class CurrenciesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      timeStamp: null,
      currentCurrency: "USD"
    };
  }

  componentDidMount() {
    this.fetchData();
    this.intervalId = setInterval(this.fetchData.bind(this), 6000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  fetchData = () => {
    this.setState({ loading: true });
    Axios.get(
      `https://api.coinmarketcap.com/v1/ticker/?limit=${CURRENCIES_LIMIT}&convert=${this.state.currentCurrency}`
    ).then(response => {
      console.log(response);
      this.setState({
        loading: false,
        data: response.data,
        timeStamp: new Date().getTime()
      });
    });
  };
  handleCurrencyChange = newCurrency => {
    if (newCurrency !== this.state.currentCurrency) {
      this.setState({ currentCurrency: newCurrency.target.value }, () =>
        this.fetchData()
      );
    }
  };

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <ListHeader
            selCurrency={this.state.currentCurrency}
            handleCurrencyChange={this.handleCurrencyChange}
          />
        </Grid>

        <Grid item xs={12}>
          <CurrenciesTable
            currenciesList={this.state.data}
            currency={this.state.currentCurrency}
          />
        </Grid>
      </Grid>
    );
  }
}

export default CurrenciesList;
