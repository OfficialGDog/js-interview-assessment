import { SelectSkeleton } from "@carbon/react";
import { useState, useEffect, useMemo } from "react";
import { CurrencySelect } from "./components/CurrencySelect/CurrencySelect";
import { CurrencyInput } from "./components/CurrencyInput/CurrencyInput";
import { SwapButton } from "./components/SwapButton/SwapButton";
import { useDebounce } from "./hooks/useDebounce";
import useFetchCurrencies from "./hooks/useFetchCurrencies";
import convertCurrency from "./services/convertCurrency";
import { getName } from "./utils/getName";
import type { ConverterState } from "./types/ConverterState";
import styles from "./App.module.css";

function App() {
  const [converter, setConverter] = useState<ConverterState>({
    fromCurrency: import.meta.env.VITE_FROM_CURRENCY || "GBP",
    toCurrency: import.meta.env.VITE_TO_CURRENCY || "JPY",
    fromAmount: 1,
    toAmount: 212,
  });

  const { currencies, loading } = useFetchCurrencies();

  const filters = useMemo(() => ({
    fromCurrency: converter.fromCurrency,
    toCurrency: converter.toCurrency,
    fromAmount: converter.fromAmount
  }), [converter.fromCurrency, converter.toCurrency, converter.fromAmount]);

  const debouncedFilters = useDebounce(filters, 500);

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { id, value } = event.target;
    if ((id === "fromCurrency" && converter.toCurrency !== value) ||
      (id === "toCurrency" && converter.fromCurrency !== value)) {
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
    if(loading) return;

    const controller = new AbortController();

    const fetchConversion = async () => {
      const { fromCurrency, toCurrency, fromAmount } = debouncedFilters;
      const { result } = await convertCurrency(fromCurrency, toCurrency, fromAmount, controller.signal);
      setConverter((prev) => ({ ...prev, toAmount: result.toFixed(2) }));
    };

    fetchConversion();
    
    return () => controller.abort();

  }, [debouncedFilters, loading]);

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.alignLeft}>
          <h1>{converter.fromAmount} {getName(currencies, converter.fromCurrency)} =</h1>
          <h2>{converter.toAmount} {getName(currencies, converter.toCurrency)}</h2>
        </div>
        <div className={styles.selectContainer}>
        {loading ? (
          <>
            <SelectSkeleton />
            <SelectSkeleton />
          </>
        ) : (
          <>
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
          </>
        )}
        </div>
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