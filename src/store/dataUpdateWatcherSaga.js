import axios from "axios";
import { take, race, call, put, delay } from "redux-saga/effects";

import {
  updateCryptoCurrencyData,
  requestCryptoCurrencyData
} from "./actionCreators";
import { dummyData } from "./DummyData";

/** Local constants:*/
//TODO: put these constants in a .env file prior to production
const CURRENCIES_LIMIT = 10;
const POLL_INTERVAL = 60000;

/** function that returns an axios call */
const fetchCryptoCurrencyData = selectedCurrency =>
  //TODO: put the endpoint constants in a .env file prior to production
  axios.request({
    method: "get",
    url: `https://api.coinmarketcap.com/v1/ticker/?limit=${CURRENCIES_LIMIT}&convert=${selectedCurrency}`
  });

/** saga worker that is responsible for the side effects */
function* fetchDataEffectSaga(payload) {
  while (true) {
    try {
      // data is obtained after axios call is resolved
      yield put(requestCryptoCurrencyData());
      let { data } = yield call(fetchCryptoCurrencyData, payload);
      yield put(updateCryptoCurrencyData(data));
      //Waits an amount of time...
      yield delay(POLL_INTERVAL);
    } catch (err) {
      //TODO: DELETE THIS BEFORE GOING LIVE!! (this is just mock data used to circumvent API usage limitations)
      console.error(err);
      yield put(updateCryptoCurrencyData(dummyData));
      yield put({
        type: "ON_FETCH_ERROR",
        message: err.message
      });

      // Once the polling has encountered an error,
      // it should be stopped immediately
      yield put({ type: "STOP_WATCHER_TASK", err });
    }
  }
}

/* Watcher Function */
export function* pollTaskWatcher() {
  while (true) {
    const action = yield take("START_WATCHER_TASK");
    yield race([
      call(fetchDataEffectSaga, action.payload),
      take("STOP_WATCHER_TASK")
    ]);
  }
}
