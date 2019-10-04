/** store.js */

import createSagaMiddleware from "redux-saga";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import rootSaga from "./rootSaga";
import CryptoReducer from "./CryptoReducer";
import CurrenciesReducer from "./CurrenciesReducer";

/** Saga Middleware */
const sagaMiddleware = createSagaMiddleware();

/** Create middle-wares for redux */
let middleWares = applyMiddleware(sagaMiddleware);

/** Create redux store */
const store = createStore(
  combineReducers({ CryptoReducer, CurrenciesReducer }),
  compose(middleWares)
);

/** run saga watchers */
sagaMiddleware.run(rootSaga);
export default store;
