/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TickerTape } from './components/TickerTape';
import { Supercharts } from './components/Supercharts';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { SymbolSearchModal } from './components/SymbolSearchModal';
import { SpaceMissionModal } from './components/SpaceMissionModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSpaceModalOpen, setIsSpaceModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeSymbol, setActiveSymbol] = useState<string>('BTCUSD');

  const handleSelectSymbol = (symbol: string) => {
    setActiveSymbol(symbol);
    // Smooth scroll down to chart section if user clicked from top
    const chartEl = document.getElementById('chart-section');
    if (chartEl) {
      chartEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e15] text-[#d1d4dc] font-sans antialiased overflow-x-hidden selection:bg-[#2962ff] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onGetStarted={() => setIsAuthModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenSpaceMission={() => setIsSpaceModalOpen(true)}
        onGetStarted={() => setIsAuthModalOpen(true)}
      />

      {/* Real-time Ticker Tape Section */}
      <TickerTape onSelectSymbol={handleSelectSymbol} />

      {/* Flagship Supercharts Terminal Section */}
      <Supercharts
        onOpenSearch={() => setIsSearchOpen(true)}
        selectedSymbolFromParent={activeSymbol}
        onSymbolChange={(sym) => setActiveSymbol(sym)}
      />

      {/* Community & Features Section */}
      <Features />

      {/* Global Footer */}
      <Footer onOpenSpaceMission={() => setIsSpaceModalOpen(true)} />

      {/* Modals & Popups */}
      <SymbolSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSymbol={handleSelectSymbol}
      />

      <SpaceMissionModal
        isOpen={isSpaceModalOpen}
        onClose={() => setIsSpaceModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(email) => {
          // Handled in modal
        }}
      />
    </div>
  );
}
