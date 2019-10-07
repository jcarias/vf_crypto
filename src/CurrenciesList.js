import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import ListHeader from "./components/ListHeader";
import CurrenciesTable from "./components/CurrenciesTable";
import { getLastUpdateTime, sortedDataSelector } from "./store/CryptoReducer";
import { changeSort, selectCurrency } from "./store/actionCreators";
import Loader from "./components/Loader";
import style from "styled-components";

const TimeStamp = style.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.6em;
  color: #0000007F;
  padding: 1em;
`;

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
      sortInfo,
      selectCurrency,
      isLoading
    } = this.props;

    return (
      <React.Fragment>
        {isLoading && <Loader />}
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
              handelRowSelect={selectCurrency}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <TimeStamp>
              <span>
                Last update:{" "}
                <strong>{new Date(lastUpdate).toISOString()}</strong>
              </span>
            </TimeStamp>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sortInfo: state.CryptoReducer.sortInfo,
    isLoading: state.CryptoReducer.isLoading,
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
    },
    selectCurrency: id => {
      dispatch(selectCurrency(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrenciesList);
