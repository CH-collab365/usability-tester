import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, TrendingUp, TrendingDown } from 'lucide-react';
import { INITIAL_TICKERS } from '../data/marketData';
import { MarketCategory } from '../types';

interface SymbolSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const SymbolSearchModal: React.FC<SymbolSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
}) => {
  const [query, setQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState<string>('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle modal
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const tabs = ['All', 'Stocks', 'Crypto', 'Forex', 'Indices', 'Futures', 'Bonds'];

  const filtered = useMemo(() => {
    return INITIAL_TICKERS.filter((item) => {
      const matchesTab = selectedTab === 'All' || item.category === selectedTab;
      const matchesQuery =
        item.symbol.toLowerCase().includes(query.toLowerCase()) ||
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.exchange.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [query, selectedTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#181b27] border border-[#2a2e39] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#2a2e39] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#787b86]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, currency pair, company, or market..."
            autoFocus
            className="flex-1 bg-transparent border-none text-white text-base focus:outline-none placeholder-[#787b86]"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#787b86] hover:text-white hover:bg-[#2a2e39] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#2a2e39] overflow-x-auto text-xs font-semibold no-scrollbar bg-[#131722]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                selectedTab === tab
                  ? 'bg-[#2962ff] text-white'
                  : 'text-[#787b86] hover:text-white hover:bg-[#2a2e39]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#2a2e39]/50 p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-[#787b86] text-sm">
              No symbols found matching "{query}"
            </div>
          ) : (
            filtered.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    onSelectSymbol(item.symbol);
                    onClose();
                  }}
                  className="p-3 hover:bg-[#2a2e39]/60 rounded-xl cursor-pointer flex items-center justify-between transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#2a2e39] group-hover:bg-[#2962ff]/20 text-[#2962ff] flex items-center justify-center font-bold text-xs">
                      {item.symbol[0]}
                    </span>
                    <div>
                      <div className="font-bold text-white text-sm flex items-center gap-2">
                        {item.symbol}
                        <span className="text-[10px] text-[#787b86] font-mono px-1.5 py-0.5 bg-[#131722] rounded">
                          {item.exchange}
                        </span>
                      </div>
                      <div className="text-xs text-[#787b86]">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-white text-sm font-semibold">
                      {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: item.precision,
                        maximumFractionDigits: item.precision,
                      })}
                    </div>
                    <div
                      className={`text-xs flex items-center justify-end gap-1 ${
                        isPositive ? 'text-[#089981]' : 'text-[#f23645]'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {isPositive ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#131722] border-t border-[#2a2e39] text-[11px] text-[#787b86] flex items-center justify-between">
          <span>Tip: Use arrow keys to navigate, Enter to select</span>
          <span className="font-mono">Real-time Market Access</span>
        </div>
      </div>
    </div>
  );
};
