import { Select, SelectItem } from "@carbon/react";
import type { Currency } from "../../types/Currency";

type CurrencySelectProps = {
  id: string;
  label: string;
  value: string;
  currencyList: Currency[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export function CurrencySelect({
  id,
  label,
  value,
  currencyList,
  onChange
}: CurrencySelectProps) {
  return (
    <Select id={id} labelText={label} value={value} onChange={onChange}>
      {currencyList.map((currency) => (
        <SelectItem
          key={currency.id}
          value={currency.short_code}
          text={`${currency.short_code} ${currency.symbol} - ${currency.name}`}
        />
      ))}
    </Select>
  );
}
