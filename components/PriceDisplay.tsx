'use client';

import React from 'react';
import { useSettings } from './providers/SettingsProvider';
import { formatPrice } from '@/lib/data';

interface PriceDisplayProps {
  price: number;
  className?: string;
}

export function PriceDisplay({ price, className = '' }: PriceDisplayProps) {
  const { currency, rates } = useSettings();
  
  const rate = currency === 'IDR' ? 1 : rates[currency.toLowerCase() as keyof typeof rates] || 1;
  const formattedPrice = formatPrice(price, currency, rate);

  return (
    <span className={className}>{formattedPrice}</span>
  );
}
