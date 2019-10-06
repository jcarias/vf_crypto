import {
  START_WATCHER_TASK,
  STOP_WATCHER_TASK,
  UPDATE_CRYPTO_CURR_DATA,
  CHANGE_SORT
} from "./actionConstants";
import { createSelector } from "reselect";

/* Reducer */
export default (
  state = {
    status: "Stopped",
    seconds: 0,
    timeStamp: new Date().getTime(),
    error: null,
    data: [],
    sortInfo: {
      sortKey: "rank",
      sortAsc: true
    }
  },
  action
) => {
  switch (action.type) {
    case START_WATCHER_TASK:
      return { ...state, status: "Running" };
    case STOP_WATCHER_TASK:
      return { ...state, status: "Stopped" };
    case UPDATE_CRYPTO_CURR_DATA:
      const timeStamp = new Date().getTime();
      return { ...state, data: action.data, timeStamp };
    case CHANGE_SORT:
      let newSortInfo = {
        sortKey: action.sortKey,
        sortAsc:
          action.sortKey === state.sortInfo.sortKey
            ? !state.sortInfo.sortAsc
            : true
      };
      return { ...state, sortInfo: newSortInfo };
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
    console.log(sortInfo);
    return data.sort(function(a, b) {
      if (a[sortInfo.sortKey] < b[sortInfo.sortKey])
        return sortInfo.sortAsc ? -1 : 1;
      if (a[sortInfo.sortKey] > b[sortInfo.sortKey])
        return sortInfo.sortAsc ? 1 : -1;
      return 0;
    });
  }
);
