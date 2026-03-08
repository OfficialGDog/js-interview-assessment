import type { Currency } from "../types/Currency";

export const getName = (currencies: Currency[], code:  string) =>
    currencies.find(({ short_code }) => short_code === code)?.name;