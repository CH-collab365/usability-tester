import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { TICKER_TAPE_DATA } from '../data/marketData';

interface TickerTapeProps {
  onSelectSymbol: (symbol: string) => void;
}

export const TickerTape: React.FC<TickerTapeProps> = ({ onSelectSymbol }) => {
  // We duplicate items to create a seamless infinite marquee
  const items = [...TICKER_TAPE_DATA, ...TICKER_TAPE_DATA];

  return (
    <section
      id="market-ticker-tape"
      className="border-y border-[#2a2e39] bg-[#131722] py-2 overflow-hidden select-none"
    >
      <div className="animate-marquee gap-8 items-center text-xs">
        {items.map((item, idx) => (
          <div
            key={`${item.symbol}-${idx}`}
            onClick={() => {
              // Clean symbol name to match our tickers (e.g., BTC/USD -> BTCUSD, GOLD -> XAUUSD)
              let clean = item.symbol.replace('/', '');
              if (clean === 'GOLD') clean = 'XAUUSD';
              if (clean === 'US OIL') clean = 'USOIL';
              onSelectSymbol(clean);
            }}
            className="flex items-center gap-3 font-mono cursor-pointer hover:opacity-80 transition-opacity shrink-0 px-2 py-0.5 rounded hover:bg-[#1e222d]/60"
            title={`View ${item.symbol} Superchart`}
          >
            <span className="font-bold text-white font-sans">{item.symbol}</span>
            <span className="text-white">{item.price}</span>
            <span
              className={`flex items-center gap-1 ${
                item.isPositive ? 'text-[#089981]' : 'text-[#f23645]'
              }`}
            >
              {item.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
