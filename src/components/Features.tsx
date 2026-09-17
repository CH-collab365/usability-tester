import React from 'react';
import { PieChart, Code2, Users2 } from 'lucide-react';

export const Features: React.FC = () => {
  return (
    <section
      id="features-section"
      className="py-20 px-4 sm:px-6 max-w-7xl mx-auto"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Love in every trade.
        </h2>
        <p className="mt-4 text-lg text-[#787b86]">
          Over 50 million traders and investors use TradingView to identify top market opportunities across the globe.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature Card 1 */}
        <div className="bg-[#181b27] border border-[#2a2e39] rounded-2xl p-6 hover:border-blue-500/50 transition duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">
            <PieChart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Unrivaled Market Data</h3>
          <p className="text-[#787b86] text-sm leading-relaxed">
            Direct market access to stocks, crypto, futures, indices, forex, and bonds with tick-level fidelity and real-time order books.
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="bg-[#181b27] border border-[#2a2e39] rounded-2xl p-6 hover:border-purple-500/50 transition duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Pine Script® Language</h3>
          <p className="text-[#787b86] text-sm leading-relaxed">
            Create, backtest, and automate custom algorithms using our purpose-built financial scripting programming language.
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="bg-[#181b27] border border-[#2a2e39] rounded-2xl p-6 hover:border-emerald-500/50 transition duration-300 group">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform">
            <Users2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Global Social Network</h3>
          <p className="text-[#787b86] text-sm leading-relaxed">
            Share your trade ideas, stream live technical breakdowns, and collaborate with verified market analysts 24/7.
          </p>
        </div>
      </div>
    </section>
  );
};
