import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ListHeader from "./components/ListHeader";
import CurrenciesTable from "./components/CurrenciesTable";
import { getLastUpdateTime } from "./store/CryptoReducer";
import { Typography } from "@material-ui/core";

class CurrenciesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCurrency: "USD"
    };
  }

  componentDidMount() {
    this.props.start(this.state.currentCurrency);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCurrency !== this.state.currentCurrency) {
      this.props.stop();
      this.props.start(this.state.currentCurrency);
    }
  }

  componentWillUnmount() {
    this.props.stop();
  }

  handleCurrencyChange = newCurrency => {
    if (newCurrency !== this.state.currentCurrency) {
      this.setState({ currentCurrency: newCurrency.target.value });
    }
  };

  render() {
    const { lastUpdate, cryptoCurrenciesData } = this.props;

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
            cryptoCurrenciesList={cryptoCurrenciesData}
            selCurrency={this.state.currentCurrency}
            currency={this.state.currentCurrency}
          />
        </Grid>
        <Grid item>
          <Typography variant="caption" color="textSecondary">
            Last update:{lastUpdate}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    cryptoCurrenciesData: state.CryptoReducer.data,
    lastUpdate: getLastUpdateTime(state.CryptoReducer)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    start: currency =>
      dispatch({ type: "START_WATCHER_TASK", payload: currency }),
    stop: () => dispatch({ type: "STOP_WATCHER_TASK" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrenciesList);
