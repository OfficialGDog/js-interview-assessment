import { render, screen } from "@testing-library/react";
import { CurrencySelect } from "./CurrencySelect";

describe("CurrencySelect", () => {
  it("renders the CurrencySelect component", () => {
    const currencyList = [
      {
        id: 49,
        name: "Pound Sterling",
        short_code: "GBP",
        code: "826",
        precision: 2,
        subunit: 100,
        symbol: "£",
        symbol_first: true,
        decimal_mark: ".",
        thousands_separator: ",",
      },
      {
        id: 70,
        name: "Yen",
        short_code: "JPY",
        code: "392",
        precision: 0,
        subunit: 1,
        symbol: "¥",
        symbol_first: true,
        decimal_mark: ".",
        thousands_separator: ",",
      },
    ];

    render(
      <CurrencySelect
        id="currency-select"
        label="Select Currency"
        value="USD"
        currencyList={currencyList}
        onChange={() => {}}
      />,
    );

    const selectElement = screen.getByLabelText(
      "Select Currency",
    ) as HTMLSelectElement;
    expect(selectElement).toBeInTheDocument();

    currencyList.forEach((currency) => {
      expect(screen.getByText(`${currency.short_code} ${currency.symbol} - ${currency.name}`)).toBeInTheDocument();
    });
  });
});
