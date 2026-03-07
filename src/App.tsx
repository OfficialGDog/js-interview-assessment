import { SelectSkeleton } from "@carbon/react";
import { useState, useEffect, useRef } from "react";
import { CurrencySelect } from "./components/CurrencySelect/CurrencySelect";
import { CurrencyInput } from "./components/CurrencyInput/CurrencyInput";
import { SwapButton } from "./components/SwapButton/SwapButton";
import { useDebounce } from "./hooks/useDebounce";
import useFetchCurrencies from "./hooks/useFetchCurrencies";
import useCurrencyConversion from "./hooks/useConvert";
import type { ConverterState } from "./types/ConverterState";
import styles from "./App.module.css"; // Import the CSS module

function App() {
  const [converter, setConverter] = useState<ConverterState>({
    fromCurrency: "GBP",
    toCurrency: "JPY",
    fromAmount: 1,
    toAmount: 212,
  });

  const { currencies, loading } = useFetchCurrencies();

  const debouncedFilters = useDebounce(converter, 500);

  const prevFiltersRef = useRef(debouncedFilters);

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { id, value } = event.target;

    if ((id === "fromCurrency" && converter.toCurrency !== value) ||
      (id === "toCurrency" && converter.fromCurrency !== value)
    ) {
      setConverter((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleAmountChange = (id: string, value: number) => {
    setConverter((prev) => ({ ...prev, [id]: value }));
  };

  const handleSwap = () => {
    setConverter((prev) => ({
      ...prev,
      fromCurrency: prev.toCurrency,
      toCurrency: prev.fromCurrency
    }));
  };

  useEffect(() => {
    const { fromCurrency, toCurrency, fromAmount } = prevFiltersRef.current;
    const { fromCurrency: newFrom, toCurrency: newTo, fromAmount: newAmount } = debouncedFilters;

    if (!loading && fromCurrency === newFrom && toCurrency === newTo && fromAmount === newAmount) return;

    const fetchConversion = async () => {
      const { result } = await useCurrencyConversion(newFrom, newTo, newAmount);
      setConverter((prev) => ({ ...prev, toAmount: result.toFixed(2) }));
      prevFiltersRef.current = debouncedFilters;
    };

    fetchConversion();

  }, [debouncedFilters, loading]);

  return (
    <div className={styles.wrapper}>
      <div>
        {loading ? (
          <div className={styles.selectContainer}>
            <SelectSkeleton />
            <SelectSkeleton />
          </div>
        ) : (
          <div className={styles.selectContainer}>
            <CurrencySelect
              id="fromCurrency"
              label="From"
              value={converter.fromCurrency}
              currencyList={currencies}
              onChange={handleCurrencyChange}
            />
            <div className={styles.alignEnd}>
              <SwapButton onClick={handleSwap} />
            </div>
            <CurrencySelect
              id="toCurrency"
              label="To"
              value={converter.toCurrency}
              currencyList={currencies}
              onChange={handleCurrencyChange}
            />
          </div>
        )}

        <div className={styles.inputContainer}>
          <CurrencyInput
            id="fromAmount"
            label="Amount"
            value={converter.fromAmount}
            onChange={handleAmountChange}
          />
          <SwapButton hidden={true} />
          <CurrencyInput
            id="toAmount"
            label="Converted"
            value={converter.toAmount}
            onChange={handleAmountChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;