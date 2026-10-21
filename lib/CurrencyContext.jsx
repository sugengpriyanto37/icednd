"use client";
import { createContext, useContext, useMemo, useState } from 'react';

const CURRENCIES = {
  NOK: { rate: 1, locale: 'nb-NO' },
  EUR: { rate: 0.086, locale: 'de-DE' },
  GBP: { rate: 0.074, locale: 'en-GB' },
  USD: { rate: 0.093, locale: 'en-US' },
};

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [code, setCode] = useState('NOK');

  const value = useMemo(() => {
    const currency = CURRENCIES[code] || CURRENCIES.NOK;

    return {
      code,
      setCode: (nextCode) => {
        if (CURRENCIES[nextCode]) setCode(nextCode);
      },
      list: Object.keys(CURRENCIES),
      fmt: (amount) =>
        new Intl.NumberFormat(currency.locale, {
          style: 'currency',
          currency: code,
          maximumFractionDigits: 0,
        }).format(Math.round(amount * currency.rate)),
    };
  }, [code]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
}
