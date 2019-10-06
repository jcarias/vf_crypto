import {
  UPDATE_CRYPTO_CURR_DATA,
  CHANGE_SORT,
  SELECT_CURRENCY
} from "./actionConstants";

export function updateCryptoCurrencyData(data) {
  return { type: UPDATE_CRYPTO_CURR_DATA, data };
}

export function changeSort(sortKey) {
  return { type: CHANGE_SORT, sortKey };
}

export function selectCurrency(id) {
  return { type: SELECT_CURRENCY, id };
}
