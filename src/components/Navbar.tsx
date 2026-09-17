import React, { useState } from 'react';
import { Search, ChevronDown, Globe, User, TrendingUp, Radio, Newspaper, Smartphone } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onGetStarted: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onGetStarted }) => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = ['EN', 'DE', 'FR', 'ES', 'JA', 'ZH'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c0e15]/90 backdrop-blur-md border-b border-[#2a2e39]/50 h-16 transition-all duration-200">
      <div className="max-w-[1920px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: TV Monogram & Search */}
        <div className="flex items-center space-x-6 shrink-0">
          <a
            href="#"
            id="nav-logo"
            aria-label="TradingView Home"
            className="flex items-center gap-1 group text-white cursor-pointer"
          >
            {/* Signature TradingView geometry logo */}
            <svg
              className="w-9 h-7 fill-current transition-transform group-hover:scale-105"
              fill="none"
              viewBox="0 0 36 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0H8.35L15.35 14L8.35 28H0L7 14L0 0Z" />
              <path d="M10 0H18.35L25.35 14L18.35 28H10L17 14L10 0Z" />
              <circle cx="29" cy="14" fill="currentColor" r="5" />
            </svg>
          </a>

          {/* Universal Search Input button with shortcut */}
          <div className="relative hidden sm:block w-56 md:w-64 lg:w-72">
            <button
              id="global-search-btn"
              onClick={onOpenSearch}
              className="w-full flex items-center justify-between bg-[#1e222d]/80 hover:bg-[#2a2e39]/80 border border-[#2a2e39] text-[#787b86] hover:text-[#d1d4dc] text-sm rounded-full py-1.5 px-3.5 transition-all text-left group"
              type="button"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-3.5 h-3.5 text-[#787b86] group-hover:text-white transition-colors" />
                <span className="text-xs lg:text-sm">Search (Ctrl+K)</span>
              </div>
              <kbd className="hidden md:inline-block text-[11px] bg-[#2a2e39] text-[#9db2c6] px-1.5 py-0.5 rounded border border-[#363a45] font-mono">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* Center: Main Navigation */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-1 font-medium text-sm text-[#d1d4dc]">
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              id="products-dropdown-btn"
              className="px-3 py-2 rounded-lg hover:text-white hover:bg-[#1e222d] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              Products
              <ChevronDown
                className={`w-3 h-3 text-[#787b86] transition-transform duration-200 ${
                  productsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {productsOpen && (
              <div className="absolute top-full left-0 pt-2 w-60 shadow-2xl z-50">
                <div className="bg-[#1e222d] border border-[#2a2e39] rounded-xl p-2 text-sm shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-1 duration-150">
                  <a
                    href="#chart-section"
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#2a2e39] rounded-lg text-white group"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#2962ff]/20 text-[#2962ff] flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white">Supercharts</div>
                      <div className="text-[11px] text-[#787b86]">Multi-asset trading engine</div>
                    </div>
                  </a>
                  <a
                    href="#chart-section"
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#2a2e39] rounded-lg text-gray-300 group"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#089981]/20 text-[#089981] flex items-center justify-center">
                      <Radio className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white">Screeners</div>
                      <div className="text-[11px] text-[#787b86]">Stocks, crypto & forex scan</div>
                    </div>
                  </a>
                  <a
                    href="#chart-section"
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#2a2e39] rounded-lg text-gray-300 group"
                  >
                    <div className="w-7 h-7 rounded-md bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Newspaper className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white">Financial News</div>
                      <div className="text-[11px] text-[#787b86]">Global live market coverage</div>
                    </div>
                  </a>
                  <a
                    href="#chart-section"
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#2a2e39] rounded-lg text-gray-300 group"
                  >
                    <div className="w-7 h-7 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white">Mobile Apps</div>
                      <div className="text-[11px] text-[#787b86]">iOS and Android charts</div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          <a href="#community-section" className="px-3 py-2 rounded-lg hover:text-white hover:bg-[#1e222d] transition-colors">
            Community
          </a>
          <a href="#chart-section" className="px-3 py-2 rounded-lg hover:text-white hover:bg-[#1e222d] transition-colors">
            Markets
          </a>
          <a href="#chart-section" className="px-3 py-2 rounded-lg hover:text-white hover:bg-[#1e222d] transition-colors">
            Brokers
          </a>
          <a href="#features-section" className="px-3 py-2 rounded-lg hover:text-white hover:bg-[#1e222d] transition-colors">
            More
          </a>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Mobile search trigger */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2 text-[#787b86] hover:text-white hover:bg-[#1e222d] rounded-lg"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              id="lang-switcher-btn"
              onClick={() => setShowLangMenu(!showLangMenu)}
              aria-label="Change Language"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#d1d4dc] hover:text-white hover:bg-[#1e222d] transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang}</span>
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-1 bg-[#1e222d] border border-[#2a2e39] rounded-lg py-1 w-20 shadow-xl z-50">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1 text-xs hover:bg-[#2a2e39] ${
                      lang === l ? 'text-[#2962ff] font-bold' : 'text-gray-300'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar Icon */}
          <button
            id="user-profile-btn"
            aria-label="User Account"
            onClick={onGetStarted}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#d1d4dc] hover:text-white hover:bg-[#1e222d] border border-transparent hover:border-[#2a2e39] transition-all cursor-pointer"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Dynamic Purple/Blue Gradient Get Started Button */}
          <button
            id="nav-get-started-btn"
            onClick={onGetStarted}
            className="bg-gradient-to-r from-[#2962ff] to-[#a855f7] hover:from-[#1e53e5] hover:to-[#9333ea] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
