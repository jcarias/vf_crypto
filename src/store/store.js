/** store.js */

import createSagaMiddleware from "redux-saga";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import rootSaga from "./rootSaga";
import CryptoReducer from "./CryptoReducer";
import FiatCurrenciesReducer from "./FiatCurrenciesReducer";

/** Saga Middleware */
const sagaMiddleware = createSagaMiddleware();

/** Create middle-wares for redux */
let middleWares = applyMiddleware(sagaMiddleware);

/** Create redux store */
const store = createStore(
  combineReducers({ CryptoReducer, FiatCurrenciesReducer }),
  compose(middleWares)
);

/** run saga watchers */
sagaMiddleware.run(rootSaga);
export default store;
