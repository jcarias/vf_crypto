import { all } from "redux-saga/effects";
import { pollTaskWatcher } from "./dataUpdateWatcherSaga";

// import watchers from other files
export default function* rootSaga() {
  //More sagas can be added to the array ;-)
  yield all([pollTaskWatcher()]);
}
