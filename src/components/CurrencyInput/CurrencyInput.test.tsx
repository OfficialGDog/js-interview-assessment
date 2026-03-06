import { render, screen } from "@testing-library/react";
import { CurrencyInput } from "./CurrencyInput";

describe("CurrencyInput", () => {
  it("renders the Currency Input component", () => {
    render(<CurrencyInput id="test-currency" label="Amount" value={100} onChange={() => {}} />);

    const inputElement = screen.getByLabelText("Amount") as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();

    expect(inputElement.value).toBe("100");
  });
});
