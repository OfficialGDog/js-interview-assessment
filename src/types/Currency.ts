export type Currency = {
  id: number;
  name: string;
  short_code: string;
  code: string;
  precision: number;
  subunit: number;
  symbol: string;
  symbol_first: boolean;
  decimal_mark: string;
  thousands_separator: string;
};

export type CurrencyMeta = {
  code: number;
  disclaimer: string;
};

export type CurrencyAPIResponse = {
  meta: CurrencyMeta;
  response: Currency[];
};

export type ConvertAPIResponse = {
  meta: CurrencyMeta;
  response: {
    timestamp: number;
    date: string;
    from: string;
    to: string;
    amount: number;
    value: number;
  };
};