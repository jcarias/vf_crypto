import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ListHeader from "./components/ListHeader";
import CurrenciesTable from "./components/CurrenciesTable";
import { getLastUpdateTime, sortedDataSelector } from "./store/CryptoReducer";
import { Typography } from "@material-ui/core";
import { changeSort } from "./store/actionCreators";

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
    const {
      lastUpdate,
      cryptoCurrenciesData,
      changeSort,
      sortInfo
    } = this.props;

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
            handleSortClick={changeSort}
            sortInfo={sortInfo}
          />
        </Grid>
        <Grid item>
          <Typography variant="caption" color="textSecondary">
            Last update:{new Date(lastUpdate).toISOString()}
          </Typography>
          <span>{this.props.sortInfo.sortKey}</span>
          <span>{this.props.sortInfo.sortAsc.toString()}</span>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    sortInfo: state.CryptoReducer.sortInfo,
    cryptoCurrenciesData: sortedDataSelector(state.CryptoReducer),
    lastUpdate: getLastUpdateTime(state.CryptoReducer)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    start: currency =>
      dispatch({ type: "START_WATCHER_TASK", payload: currency }),
    stop: () => dispatch({ type: "STOP_WATCHER_TASK" }),
    changeSort: key => {
      dispatch(changeSort(key));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrenciesList);