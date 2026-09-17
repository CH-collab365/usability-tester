import React from 'react';
import { X, Rocket, Globe2, Compass, ShieldCheck } from 'lucide-react';

interface SpaceMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpaceMissionModal: React.FC<SpaceMissionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#131722] border border-[#2a2e39] rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header with space horizon gradient */}
        <div className="relative p-6 sm:p-8 space-horizon-bg border-b border-[#2a2e39] overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#1e222d]/80 text-[#787b86] hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-2">
            <Rocket className="w-4 h-4" />
            <span>POLARIS DAWN ORBITAL MISSION</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            TradingView In Low Earth Orbit
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-xl">
            Astronaut Scott "Kidd" Poteet and the Polaris Dawn crew carried TradingView charts into orbital spaceflight, testing real-time connectivity at 1,400 km above Earth.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#787b86] leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#181b27] border border-[#2a2e39] rounded-xl p-4">
              <div className="text-white font-mono text-2xl font-bold">1,400 km</div>
              <div className="text-xs text-gray-400 mt-1">Apogee Altitude</div>
              <p className="text-[11px] text-[#787b86] mt-2">Highest Earth orbit flown by humans since Apollo 17.</p>
            </div>

            <div className="bg-[#181b27] border border-[#2a2e39] rounded-xl p-4">
              <div className="text-white font-mono text-2xl font-bold">28,000 km/h</div>
              <div className="text-xs text-gray-400 mt-1">Orbital Velocity</div>
              <p className="text-[11px] text-[#787b86] mt-2">Real-time charting tested during high-speed laser link passes.</p>
            </div>

            <div className="bg-[#181b27] border border-[#2a2e39] rounded-xl p-4">
              <div className="text-white font-mono text-2xl font-bold">1st Space EVA</div>
              <div className="text-xs text-gray-400 mt-1">Commercial Spacewalk</div>
              <p className="text-[11px] text-[#787b86] mt-2">Pioneering spacesuit pressurized testing in the vacuum of space.</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-blue-400" />
              Look first, then leap into the cosmos
            </h3>
            <p>
              "The same calculated conviction that fuels our global community of 50 million traders also propels humanity into the stars. Whether you're analyzing a 4-hour candlestick breakout or entering orbit at Mach 22, the ethos remains identical: complete your research, assess your risk, and leap with unwavering commitment."
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1e222d] border border-[#2a2e39] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#089981]" />
              <div>
                <div className="text-white font-semibold text-xs">Mission Certified Technology</div>
                <div className="text-[11px] text-gray-400">Zero-latency canvas engine validated under extreme conditions.</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-[#2962ff] hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-colors"
            >
              Return to Terminal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
