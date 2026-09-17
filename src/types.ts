export type MarketCategory = 'Stocks' | 'Crypto' | 'Forex' | 'Indices' | 'Futures' | 'Bonds';

export type Timeframe = '1m' | '15m' | '1H' | '4H' | '1D' | '1W';

export type ChartStyle = 'candles' | 'line' | 'area' | 'heikin';

export type DrawingTool = 
  | 'crosshair' 
  | 'trendline' 
  | 'fib' 
  | 'brush' 
  | 'text' 
  | 'position' 
  | 'measure' 
  | 'zoom' 
  | 'magnet' 
  | 'trash';

export interface Candle {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TickerData {
  symbol: string;
  name: string;
  exchange: string;
  category: MarketCategory;
  price: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  precision: number;
}

export interface ChartDrawing {
  id: string;
  tool: 'trendline' | 'horizontal' | 'brush';
  startX: number;
  startY: number;
  endX?: number;
  endY?: number;
  points?: { x: number; y: number }[];
  color?: string;
}

export interface IndicatorSettings {
  ema20: boolean;
  ema50: boolean;
  ema200: boolean;
  bollinger: boolean;
  volume: boolean;
}
