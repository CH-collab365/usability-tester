import React from 'react';
import { Rocket } from 'lucide-react';

interface HeroProps {
  onOpenSpaceMission: () => void;
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSpaceMission, onGetStarted }) => {
  return (
    <section
      id="hero-banner"
      className="relative min-h-[92vh] sm:min-h-screen pt-20 flex flex-col justify-between overflow-hidden space-horizon-bg"
    >
      {/* Soundwave Equalizer Aurora Stream */}
      <div className="aurora-bars">
        <div className="aurora-stream">
          <div className="aurora-col" style={{ animationDelay: '0.1s', height: '75%', background: 'linear-gradient(180deg, #ec4899, #6366f1)' }} />
          <div className="aurora-col" style={{ animationDelay: '0.4s', height: '95%', background: 'linear-gradient(180deg, #f43f5e, #a855f7)' }} />
          <div className="aurora-col" style={{ animationDelay: '0.8s', height: '60%', background: 'linear-gradient(180deg, #d946ef, #3b82f6)' }} />
          <div className="aurora-col" style={{ animationDelay: '0.2s', height: '85%', background: 'linear-gradient(180deg, #ec4899, #8b5cf6)' }} />
          <div className="aurora-col" style={{ animationDelay: '1.1s', height: '90%', background: 'linear-gradient(180deg, #ec4899, #06b6d4)' }} />
          <div className="aurora-col" style={{ animationDelay: '0.6s', height: '70%', background: 'linear-gradient(180deg, #a855f7, #38bdf8)' }} />
          <div className="aurora-col" style={{ animationDelay: '0.9s', height: '98%', background: 'linear-gradient(180deg, #f43f5e, #d946ef)' }} />
          <div className="aurora-col" style={{ animationDelay: '0.3s', height: '65%', background: 'linear-gradient(180deg, #ec4899, #6366f1)' }} />
          <div className="aurora-col" style={{ animationDelay: '1.3s', height: '82%', background: 'linear-gradient(180deg, #c084fc, #0ea5e9)' }} />
          <div className="aurora-col" style={{ animationDelay: '0.5s', height: '88%', background: 'linear-gradient(180deg, #f43f5e, #9333ea)' }} />
          <div className="aurora-col" style={{ animationDelay: '0.7s', height: '60%', background: 'linear-gradient(180deg, #ec4899, #3b82f6)' }} />
          <div className="aurora-col" style={{ animationDelay: '1.2s', height: '92%', background: 'linear-gradient(180deg, #a855f7, #06b6d4)' }} />
          <div className="aurora-col" style={{ animationDelay: '0.4s', height: '78%', background: 'linear-gradient(180deg, #ec4899, #8b5cf6)' }} />
          <div className="aurora-col" style={{ animationDelay: '1.0s', height: '85%', background: 'linear-gradient(180deg, #f43f5e, #6366f1)' }} />
        </div>
      </div>

      {/* Earth Horizon Curvature Simulation */}
      <div className="earth-curvature" />
      <div className="city-glow-1" />
      <div className="city-glow-2" />

      {/* Decorative Constellation Stars */}
      <div className="absolute inset-0 pointer-events-none opacity-45">
        <div className="absolute top-[18%] left-[22%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_#fff]" />
        <div className="absolute top-[32%] left-[12%] w-1.5 h-1.5 bg-blue-200 rounded-full shadow-[0_0_10px_#93c5fd]" />
        <div className="absolute top-[28%] right-[18%] w-1 h-1 bg-white rounded-full shadow-[0_0_6px_#fff]" />
        <div className="absolute top-[45%] right-[32%] w-1.5 h-1.5 bg-amber-100 rounded-full shadow-[0_0_8px_#fef3c7]" />
        <div className="absolute top-[52%] left-[45%] w-1 h-1 bg-white rounded-full opacity-60" />
      </div>

      {/* Main Center Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 text-center flex flex-col items-center">
        {/* Prominent Trademark Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight">
          Look first <span className="text-gray-300 font-light mx-1">/</span> Then leap.
        </h1>

        {/* Supporting Subheading */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl md:text-2xl text-gray-200 font-normal tracking-normal max-w-2xl">
          The best trades require research, then commitment.
        </p>

        {/* White Pill CTA Button */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center">
          <button
            id="hero-get-started-btn"
            onClick={onGetStarted}
            className="inline-flex items-center justify-center bg-white hover:bg-slate-100 text-[#0c0e15] font-semibold text-base sm:text-lg px-8 py-3 rounded-full shadow-2xl hover:scale-105 transition duration-200 ease-out cursor-pointer"
          >
            Get started for free
          </button>
          <span className="mt-3 text-xs sm:text-sm text-gray-300 font-normal tracking-wide">
            $0 forever, no credit card needed
          </span>
        </div>
      </div>

      {/* Space Story Pill (Bottom Right Corner as seen in reference image) */}
      <div className="relative z-10 p-6 sm:p-10 flex justify-end">
        <div className="text-right max-w-xs flex flex-col items-end">
          <h2 className="text-white font-semibold text-sm sm:text-base tracking-wide">See our space story</h2>
          <p className="text-xs text-gray-300 mt-0.5">With astronaut Scott "Kidd" Poteet</p>
          <button
            id="space-mission-btn"
            onClick={onOpenSpaceMission}
            className="mt-2.5 inline-flex items-center gap-2 bg-[#1e222d]/80 hover:bg-[#2a2e39] border border-[#2a2e39] text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full backdrop-blur-md transition-all cursor-pointer hover:border-blue-500/40"
          >
            <Rocket className="w-3.5 h-3.5 text-orange-400" />
            <span>Space mission</span>
          </button>
        </div>
      </div>
    </section>
  );
};
