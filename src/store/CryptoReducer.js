import { createSelector } from "reselect";
import isEmpty from "lodash/isEmpty";
import {
  START_WATCHER_TASK,
  STOP_WATCHER_TASK,
  UPDATE_CRYPTO_CURR_DATA,
  CHANGE_SORT,
  SELECT_CURRENCY,
  REQUEST_CRYPTO_CURR_DATA,
  UPDATE_FIAT_CURRENCY
} from "./actionConstants";

/* Reducer */
export default (
  state = {
    fiatCurrency: "USD",
    status: "Stopped",
    seconds: 0,
    timeStamp: new Date().getTime(),
    error: null,
    data: [],
    sortInfo: {
      sortKey: "rank",
      sortAsc: true
    },
    selectedId: null,
    isLoading: false
  },
  action
) => {
  switch (action.type) {
    case REQUEST_CRYPTO_CURR_DATA:
      return { ...state, isLoading: true };
    case START_WATCHER_TASK:
      return { ...state, status: "Running", isLoading: false };
    case STOP_WATCHER_TASK:
      return { ...state, status: "Stopped", isLoading: false };
    case UPDATE_CRYPTO_CURR_DATA:
      const timeStamp = new Date().getTime();
      return { ...state, data: action.data, timeStamp, isLoading: false };
    case CHANGE_SORT:
      let newSortInfo = {
        sortKey: action.sortKey,
        sortAsc:
          action.sortKey === state.sortInfo.sortKey
            ? !state.sortInfo.sortAsc
            : true
      };
      return { ...state, sortInfo: newSortInfo };
    case SELECT_CURRENCY:
      return { ...state, selectedId: action.id };
    case UPDATE_FIAT_CURRENCY:
      return { ...state, fiatCurrency: action.fiatCurrency };
    default:
      return state;
  }
};

/**
 * Selectors
 */
export const getStatus = state => state.status;

export const getLastUpdateTime = state => state.timeStamp;

const sortInfoSelector = state => state.sortInfo;

const dataSelector = state => {
  return state.data.map(currency => ({
    ...currency,
    rank: Number(currency.rank),
    price_usd: Number(currency.price_usd),
    market_cap_usd: Number(currency.market_cap_usd),
    percent_change_24h: Number(currency.percent_change_24h)
  }));
};

export const sortedDataSelector = createSelector(
  [dataSelector, sortInfoSelector],
  (data, sortInfo) => {
    return data.sort(function(a, b) {
      if (a[sortInfo.sortKey] < b[sortInfo.sortKey])
        return sortInfo.sortAsc ? -1 : 1;
      if (a[sortInfo.sortKey] > b[sortInfo.sortKey])
        return sortInfo.sortAsc ? 1 : -1;
      return 0;
    });
  }
);

const getSelectedCurrencyId = state => state.selectedId;

export const chosenCurrencySelector = createSelector(
  [dataSelector, getSelectedCurrencyId],
  (data, selectedCurrencyId) => {
    const filtered = data.filter(
      currency => currency.id === selectedCurrencyId
    );
    if (!isEmpty(filtered)) return filtered[0];
    else return {};
  }
);
