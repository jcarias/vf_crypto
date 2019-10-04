import {
  START_WATCHER_TASK,
  STOP_WATCHER_TASK,
  UPDATE_CRYPTO_CURR_DATA
} from "./actionConstants";

/* Reducer */
export default (
  state = {
    status: "Stopped",
    seconds: 0,
    timeStamp: new Date().getTime(),
    error: null,
    data: []
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
    case "RESET":
      return { ...state, seconds: 0 };
    default:
      return state;
  }
};

/**
 * Selectors
 */
export const getStatus = state => state.status;

export const getLastUpdateTime = state => state.timeStamp;
