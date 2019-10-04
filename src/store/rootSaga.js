import { all } from "redux-saga/effects";
import { pollTaskWatcher } from "./dataUpdateWatcherSaga";

// import watchers from other files
export default function* rootSaga() {
  yield all([pollTaskWatcher()]);
}
