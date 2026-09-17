import { MarketCategory, TickerData, Candle } from '../types';

export const INITIAL_TICKERS: TickerData[] = [
  {
    symbol: 'BTCUSD',
    name: 'Bitcoin / US Dollar',
    exchange: 'BITSTAMP',
    category: 'Crypto',
    price: 68432.10,
    change: 2284.50,
    changePercent: 3.45,
    high24h: 68950.00,
    low24h: 67410.00,
    volume24h: '14.825K',
    precision: 2,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    category: 'Stocks',
    price: 875.28,
    change: 34.65,
    changePercent: 4.12,
    high24h: 882.40,
    low24h: 849.10,
    volume24h: '48.3M',
    precision: 2,
  },
  {
    symbol: 'SPX',
    name: 'S&P 500 Index',
    exchange: 'CBOE',
    category: 'Indices',
    price: 5069.75,
    change: 32.25,
    changePercent: 0.64,
    high24h: 5078.20,
    low24h: 5045.10,
    volume24h: '2.8B',
    precision: 2,
  },
  {
    symbol: 'NDX',
    name: 'Nasdaq 100 Index',
    exchange: 'NASDAQ',
    category: 'Indices',
    price: 18124.50,
    change: 200.70,
    changePercent: 1.12,
    high24h: 18180.00,
    low24h: 17990.20,
    volume24h: '1.4B',
    precision: 2,
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    category: 'Stocks',
    price: 182.40,
    change: 0.87,
    changePercent: 0.48,
    high24h: 183.90,
    low24h: 181.20,
    volume24h: '35.6M',
    precision: 2,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    category: 'Stocks',
    price: 177.30,
    change: -4.20,
    changePercent: -2.31,
    high24h: 183.50,
    low24h: 176.10,
    volume24h: '68.2M',
    precision: 2,
  },
  {
    symbol: 'ETHUSD',
    name: 'Ethereum / US Dollar',
    exchange: 'COINBASE',
    category: 'Crypto',
    price: 3540.20,
    change: -30.40,
    changePercent: -0.85,
    high24h: 3610.00,
    low24h: 3495.00,
    volume24h: '240.5K',
    precision: 2,
  },
  {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    exchange: 'FX_IDC',
    category: 'Forex',
    price: 1.08852,
    change: 0.00163,
    changePercent: 0.15,
    high24h: 1.09100,
    low24h: 1.08620,
    volume24h: '118.4K',
    precision: 5,
  },
  {
    symbol: 'GBPUSD',
    name: 'British Pound / US Dollar',
    exchange: 'FX_IDC',
    category: 'Forex',
    price: 1.27410,
    change: 0.00320,
    changePercent: 0.25,
    high24h: 1.27680,
    low24h: 1.26950,
    volume24h: '94.2K',
    precision: 5,
  },
  {
    symbol: 'XAUUSD',
    name: 'Gold Spot',
    exchange: 'OANDA',
    category: 'Futures',
    price: 2165.80,
    change: 19.80,
    changePercent: 0.92,
    high24h: 2172.50,
    low24h: 2148.00,
    volume24h: '85.1K',
    precision: 2,
  },
  {
    symbol: 'USOIL',
    name: 'Crude Oil WTI Futures',
    exchange: 'NYMEX',
    category: 'Futures',
    price: 78.14,
    change: -0.33,
    changePercent: -0.42,
    high24h: 79.20,
    low24h: 77.80,
    volume24h: '310.8K',
    precision: 2,
  },
  {
    symbol: 'US10Y',
    name: 'US 10 Year Treasury Yield',
    exchange: 'TVC',
    category: 'Bonds',
    price: 4.285,
    change: -0.042,
    changePercent: -0.97,
    high24h: 4.331,
    low24h: 4.270,
    volume24h: '12.4K',
    precision: 3,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    category: 'Stocks',
    price: 418.50,
    change: 4.20,
    changePercent: 1.01,
    high24h: 421.10,
    low24h: 415.80,
    volume24h: '22.1M',
    precision: 2,
  },
  {
    symbol: 'SOLUSD',
    name: 'Solana / US Dollar',
    exchange: 'BINANCE',
    category: 'Crypto',
    price: 184.60,
    change: 12.30,
    changePercent: 7.14,
    high24h: 189.00,
    low24h: 171.50,
    volume24h: '3.1M',
    precision: 2,
  },
];

export function generateCandleHistory(currentPrice: number, count: number = 44): Candle[] {
  const candles: Candle[] = [];
  const now = Date.now();
  const intervalMs = 4 * 60 * 60 * 1000; // 4H default

  // Work backwards from current price or synthesize forwards
  const stepVolatility = currentPrice * 0.008;
  let price = currentPrice * (1 - (Math.random() * 0.04 - 0.015));

  for (let i = 0; i < count; i++) {
    const isLast = i === count - 1;
    const timeOffset = (count - 1 - i) * intervalMs;
    const timeDate = new Date(now - timeOffset);
    const timeStr = timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const open = price;
    // For last candle, end near currentPrice
    const delta = isLast 
      ? (currentPrice - open) 
      : (Math.random() - 0.47) * stepVolatility * 2;
    
    const close = isLast ? currentPrice : Math.max(open + delta, open * 0.8);
    const wickHigh = Math.random() * stepVolatility * 1.2;
    const wickLow = Math.random() * stepVolatility * 1.2;
    const high = Math.max(open, close) + wickHigh;
    const low = Math.max(Math.min(open, close) - wickLow, currentPrice * 0.01);
    const volume = Math.floor(Math.random() * 85) + 15;

    candles.push({
      time: timeStr,
      timestamp: timeDate.getTime(),
      open,
      high,
      low,
      close,
      volume,
    });

    price = close;
  }

  return candles;
}

export const TICKER_TAPE_DATA = [
  { symbol: 'S&P 500', price: '5,069.75', change: '+0.64%', isPositive: true },
  { symbol: 'NDX', price: '18,124.50', change: '+1.12%', isPositive: true },
  { symbol: 'BTC/USD', price: '68,430.00', change: '+3.45%', isPositive: true },
  { symbol: 'ETH/USD', price: '3,540.20', change: '-0.85%', isPositive: false },
  { symbol: 'AAPL', price: '182.40', change: '+0.48%', isPositive: true },
  { symbol: 'TSLA', price: '177.30', change: '-2.31%', isPositive: false },
  { symbol: 'GOLD', price: '2,165.80', change: '+0.92%', isPositive: true },
  { symbol: 'EUR/USD', price: '1.0885', change: '+0.15%', isPositive: true },
  { symbol: 'US OIL', price: '78.14', change: '-0.42%', isPositive: false },
  { symbol: 'NVDA', price: '875.28', change: '+4.12%', isPositive: true },
  { symbol: 'MSFT', price: '418.50', change: '+1.01%', isPositive: true },
  { symbol: 'SOL/USD', price: '184.60', change: '+7.14%', isPositive: true },
];

export const MARKET_NEWS = [
  {
    title: 'Federal Reserve holds interest rates steady as global economic markers show sustained momentum.',
    time: '2m ago',
    source: 'Bloomberg Financial',
  },
  {
    title: 'Semiconductor rally expands across global exchanges as AI infrastructure demand accelerates.',
    time: '14m ago',
    source: 'Reuters Markets',
  },
  {
    title: 'Bitcoin breaks past consolidation resistance amid surging institutional spot ETF inflows.',
    time: '32m ago',
    source: 'CoinDesk',
  },
  {
    title: 'Crude oil stabilizes after OPEC+ reinforces existing voluntary production restrictions.',
    time: '1h ago',
    source: 'Financial Times',
  },
];
