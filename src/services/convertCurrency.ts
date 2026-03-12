import type { ConvertAPIResponse } from "../types/Currency";

type ConversionResult = {
  result: number;
};

const convertCurrency = async (
  from: string,
  to: string,
  amount: string | number,
  signal?: AbortSignal
): Promise<ConversionResult> => {
  try {
    const response = await fetch(
      `https://api.currencybeacon.com/v1/convert?from=${from}&to=${to}&amount=${amount}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
        signal
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: ConvertAPIResponse = await response.json();

    return { result: Number(data?.response?.value) || 0 };
  } catch (err: unknown) {
    console.error((err as Error).message || "Failed to fetch conversion");
    return { result: 0 };
  }
};

export default convertCurrency;