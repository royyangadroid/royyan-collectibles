export type Rates = {
  idr: number;
  usd: number;
  myr: number;
  sgd: number;
  jpy: number;
  cny: number;
  eur: number;
  bhd: number;
};

export type ExchangeData = {
  date: string;
  rates: Rates;
};

export async function getExchangeRates(): Promise<ExchangeData> {
  try {
    // Fetch IDR exchange rates
    // Revalidates every 1 hour (3600 seconds)
    const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/idr.json', {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch exchange rates');
    }
    
    const data = await res.json();
    
    return {
      date: data.date,
      rates: {
        idr: 1, // base
        usd: data.idr.usd || 0.000062,
        myr: data.idr.myr || 0.00029,
        sgd: data.idr.sgd || 0.000084,
        jpy: data.idr.jpy || 0.0093,
        cny: data.idr.cny || 0.00045,
        eur: data.idr.eur || 0.000057,
        bhd: data.idr.bhd || 0.000023,
      }
    };
  } catch (error) {
    console.error("Exchange rate fetch error:", error);
    // Fallback static rates if API fails
    return {
      date: new Date().toISOString().split('T')[0],
      rates: {
        idr: 1,
        usd: 0.000062,
        myr: 0.00029,
        sgd: 0.000084,
        jpy: 0.0093,
        cny: 0.00045,
        eur: 0.000057,
        bhd: 0.000023,
      }
    };
  }
}
