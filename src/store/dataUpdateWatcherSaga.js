import axios from "axios";
import { take, race, call, put, delay } from "redux-saga/effects";

import { updateCryptoCurrencyData } from "./actionCreators";
import { dummyData } from "./DummyData";

/** Local constants*/
const CURRENCIES_LIMIT = 10;
const POLL_INTERVAL = 60000;

/** function that returns an axios call */
const fetchCryptoCurrencyData = selectedCurrency =>
  axios.request({
    method: "get",
    url: `https://api.coinmarketcap.com/v1/ticker/?limit=${CURRENCIES_LIMIT}&convert=${selectedCurrency}`
  });

/** saga worker that is responsible for the side effects */
function* fetchDataEffectSaga(payload) {
  console.log(payload);
  while (true) {
    try {
      // data is obtained after axios call is resolved
      let { data } = yield call(fetchCryptoCurrencyData, payload);
      yield put(updateCryptoCurrencyData(data));
      yield delay(POLL_INTERVAL);
    } catch (err) {
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
