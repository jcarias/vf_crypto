import {
  UPDATE_CRYPTO_CURR_DATA,
  CHANGE_SORT,
  SELECT_CURRENCY,
  REQUEST_CRYPTO_CURR_DATA,
  UPDATE_FIAT_CURRENCY
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

export function requestCryptoCurrencyData() {
  return { type: REQUEST_CRYPTO_CURR_DATA };
}

export function selectFiatCurrency(fiatCurrency) {
  return { type: UPDATE_FIAT_CURRENCY, fiatCurrency };
}
