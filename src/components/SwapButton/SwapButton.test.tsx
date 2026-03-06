import { render, screen } from "@testing-library/react";
import { SwapButton } from "./SwapButton";

describe("SwapButton", () => {
  it("renders SwapButton component", () => {
    render(<SwapButton />);

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeInTheDocument();
  });
});