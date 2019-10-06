/**
 * Initial state
 */
const initialState = {
  currencies: {
    USD: {
      symbol: "$",
      name: "US Dollar",
      symbol_native: "$",
      decimal_digits: 2,
      rounding: 0,
      code: "USD",
      name_plural: "US dollars"
    },
    GBP: {
      symbol: "£",
      name: "British Pound Sterling",
      symbol_native: "£",
      decimal_digits: 2,
      rounding: 0,
      code: "GBP",
      name_plural: "British pounds sterling"
    },
    EUR: {
      symbol: "€",
      name: "Euro",
      symbol_native: "€",
      decimal_digits: 2,
      rounding: 0,
      code: "EUR",
      name_plural: "euros"
    },
    JPY: {
      symbol: "¥",
      name: "Japanese Yen",
      symbol_native: "￥",
      decimal_digits: 0,
      rounding: 0,
      code: "JPY",
      name_plural: "Japanese yen"
    },
    KRW: {
      symbol: "₩",
      name: "South Korean Won",
      symbol_native: "₩",
      decimal_digits: 0,
      rounding: 0,
      code: "KRW",
      name_plural: "South Korean won"
    }
  }
};

/* Reducer */
export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/**
 * Selectors
 */
export const getFiatCurrencyByCode = (state, fiatCurrencyCode) =>
  state[fiatCurrencyCode];

export const getFiatCurrenciesList = state => {
  return Object.keys(state.currencies).map(key => state.currencies[key]);
};
