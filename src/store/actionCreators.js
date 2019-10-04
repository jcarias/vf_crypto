import { UPDATE_CRYPTO_CURR_DATA } from "./actionConstants";

export function updateCryptoCurrencyData(data) {
  return { type: UPDATE_CRYPTO_CURR_DATA, data };
}
