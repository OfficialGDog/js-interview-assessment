import { useCallback, useEffect, useState } from "react";
import type { Currency } from "../types/Currency";

type CurrencyAPIResponse = {
  meta: {
    code: number;
    disclaimer: string;
  };
  response: Currency[];
};

export default function useFetchCurrencies() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFetchCurrencies = useCallback(async (signal: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.currencybeacon.com/v1/currencies",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
          signal,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data: CurrencyAPIResponse = await response.json();
      setCurrencies(data.response);
    } catch (err: unknown) {
      setError((err as Error).message || "Failed to fetch currencies");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
/*  To prevent unneccesary API calls AbortController was added to cancel additional calls being made 
    due to re-renders of this component in <StrictMode> */
    const controller = new AbortController();
    handleFetchCurrencies(controller.signal);
    return () => controller.abort();
  }, [handleFetchCurrencies]);

  return { currencies, loading, error };
}
