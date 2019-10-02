export const Currencies = {
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
};

export const formatter = (currency = "USD") => {
  const myCurr = Currencies[currency];
  console.log(myCurr);

  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    currency: myCurr.code,
    minimumFractionDigits: myCurr.decimal_digits
  });
};
