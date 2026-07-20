'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'IDR' | 'USD' | 'MYR' | 'SGD' | 'JPY' | 'CNY' | 'EUR' | 'BHD';

interface SettingsContextType {
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  rates: { idr: number; usd: number; myr: number; sgd: number; jpy: number; cny: number; eur: number; bhd: number; };
  ratesDate: string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ 
  children, 
  initialRates, 
  initialDate 
}: { 
  children: React.ReactNode;
  initialRates: { idr: number; usd: number; myr: number; sgd: number; jpy: number; cny: number; eur: number; bhd: number; };
  initialDate: string;
}) {
  const [currency, setCurrencyState] = useState<Currency>('IDR');
  
  useEffect(() => {
    // Load from localStorage on mount
    const savedCurrency = localStorage.getItem('royyan_currency') as Currency;
    if (savedCurrency && ['IDR', 'USD', 'MYR', 'SGD', 'JPY', 'CNY', 'EUR', 'BHD'].includes(savedCurrency)) {
      setCurrencyState(savedCurrency);
    }
  }, []);
  
  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('royyan_currency', curr);
  };

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, rates: initialRates, ratesDate: initialDate }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
