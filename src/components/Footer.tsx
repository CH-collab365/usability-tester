import React from 'react';
import { Twitter, Youtube, Instagram, Send, MessageSquare } from 'lucide-react';

interface FooterProps {
  onOpenSpaceMission: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSpaceMission }) => {
  return (
    <footer
      id="site-footer"
      className="border-t border-[#2a2e39] bg-[#0c0e15] pt-16 pb-12 text-sm text-[#787b86]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <a href="#" className="flex items-center gap-2 text-white mb-4">
            <svg
              className="w-7 h-5 fill-current"
              fill="none"
              viewBox="0 0 36 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0H8.35L15.35 14L8.35 28H0L7 14L0 0Z" />
              <path d="M10 0H18.35L25.35 14L18.35 28H10L17 14L10 0Z" />
              <circle cx="29" cy="14" fill="currentColor" r="5" />
            </svg>
            <span className="font-bold tracking-tight text-lg">TradingView</span>
          </a>
          <p className="text-xs text-[#787b86] leading-relaxed mb-4">
            Look first / Then leap.
          </p>
          <div className="flex space-x-3 text-base text-gray-400">
            <a href="#" className="hover:text-white transition-colors" title="Twitter / X">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors" title="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors" title="Telegram">
              <Send className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-white transition-colors" title="Discord">
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links: Products */}
        <div>
          <h4 className="text-white font-semibold mb-3">Products</h4>
          <ul className="space-y-2 text-xs">
            <li><a className="hover:text-white transition-colors" href="#chart-section">Supercharts</a></li>
            <li><a className="hover:text-white transition-colors" href="#features-section">Pine Script®</a></li>
            <li><a className="hover:text-white transition-colors" href="#chart-section">Stock Screener</a></li>
            <li><a className="hover:text-white transition-colors" href="#chart-section">Crypto Screener</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Economic Calendar</a></li>
          </ul>
        </div>

        {/* Links: Company */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-xs">
            <li><a className="hover:text-white transition-colors" href="#">About Us</a></li>
            <li>
              <button
                onClick={onOpenSpaceMission}
                className="hover:text-white transition-colors text-left cursor-pointer flex items-center gap-1"
              >
                <span>Space Story</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.2 rounded">New</span>
              </button>
            </li>
            <li><a className="hover:text-white transition-colors" href="#">Careers</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Press & Media</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Manifesto</a></li>
          </ul>
        </div>

        {/* Links: Community */}
        <div id="community-section">
          <h4 className="text-white font-semibold mb-3">Community</h4>
          <ul className="space-y-2 text-xs">
            <li><a className="hover:text-white transition-colors" href="#">Refer a friend</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Ideas & Streams</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Scripts Library</a></li>
            <li><a className="hover:text-white transition-colors" href="#">House Rules</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Moderators</a></li>
          </ul>
        </div>

        {/* Links: For Business */}
        <div>
          <h4 className="text-white font-semibold mb-3">For Business</h4>
          <ul className="space-y-2 text-xs">
            <li><a className="hover:text-white transition-colors" href="#">Charting Solutions</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Lightweight Charts™</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Brokerage Integration</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Partner Program</a></li>
            <li><a className="hover:text-white transition-colors" href="#">Advertising</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 border-t border-[#2a2e39]/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <p>© 2024 TradingView, Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="hover:text-white transition-colors" href="#">Terms of use</a>
          <a className="hover:text-white transition-colors" href="#">Privacy policy</a>
          <a className="hover:text-white transition-colors" href="#">Cookies policy</a>
          <a className="hover:text-white transition-colors" href="#">Disclaimers</a>
        </div>
      </div>
    </footer>
  );
};
