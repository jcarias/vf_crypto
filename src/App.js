import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import CurrenciesList from "./CurrenciesList";
import CurrencyDetails from "./CurrencyDetails";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { sortedDataSelector, getLastUpdateTime } from "./store/CryptoReducer";
import {
  changeSort,
  selectCurrency,
  selectFiatCurrency
} from "./store/actionCreators";
import Loader from "./components/Loader";

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: 600,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800
  }
});
class App extends Component {
  componentDidMount() {
    //Start polling the API
    this.props.start(this.props.fiatCurrency);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.fiatCurrency !== this.props.fiatCurrency) {
      //Stop && Start polling the API when a new fiat currency is selected
      this.props.stop();
      this.props.start(this.props.fiatCurrency);
    }
  }

  componentWillUnmount() {
    //Stops poling when leaving the list component
    this.props.stop();
  }

  handleFiatCurrencyChange = ev => {
    this.props.selectFiatCurrency(ev.target.value);
  };

  render() {
    const {
      cryptoCurrenciesData,
      lastUpdateTimeStamp,
      sortInfo,
      changeSort,
      selectCurrency,
      isLoading,
      fiatCurrency
    } = this.props;
    return (
      <ThemeProvider theme={theme}>
        {isLoading && <Loader />}
        <Router>
          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/details/:id">
              <CurrencyDetails fiatCurrency={fiatCurrency} />
            </Route>
            <Route path="/">
              <CurrenciesList
                cryptoCurrenciesData={cryptoCurrenciesData}
                lastUpdateTimeStamp={lastUpdateTimeStamp}
                sortInfo={sortInfo}
                changeSortHandler={changeSort}
                selectCryptoCurrency={selectCurrency}
                fiatCurrencyChangeHandler={this.handleFiatCurrencyChange}
                currentFiatCurrency={fiatCurrency}
              />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sortInfo: state.CryptoReducer.sortInfo,
    isLoading: state.CryptoReducer.isLoading,
    fiatCurrency: state.CryptoReducer.fiatCurrency,
    cryptoCurrenciesData: sortedDataSelector(state.CryptoReducer),
    lastUpdateTimeStamp: getLastUpdateTime(state.CryptoReducer)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    start: currency =>
      dispatch({ type: "START_WATCHER_TASK", payload: currency }),
    stop: () => dispatch({ type: "STOP_WATCHER_TASK" }),
    changeSort: key => {
      dispatch(changeSort(key));
    },
    selectCurrency: id => {
      dispatch(selectCurrency(id));
    },
    selectFiatCurrency: fiatCurrency => {
      dispatch(selectFiatCurrency(fiatCurrency));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
