import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(email);
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#181b27] border border-[#2a2e39] rounded-2xl w-full max-w-md shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#787b86] hover:text-white p-1 rounded-lg hover:bg-[#2a2e39] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#089981] mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-white">Welcome to TradingView Pro</h3>
            <p className="text-xs text-[#787b86]">
              Your free account has been initialized. Live financial data streams unlocked!
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#2962ff] uppercase tracking-wider">
                Look first / Then leap
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">Get started for free</h3>
              <p className="text-xs text-[#787b86] mt-1">$0 forever, no credit card needed.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="trader@domain.com"
                  className="w-full bg-[#131722] border border-[#2a2e39] rounded-xl px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-[#2962ff] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2962ff] to-[#a855f7] hover:from-[#1e53e5] hover:to-[#9333ea] text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                <span>Continue with Email</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#2a2e39]" />
                </div>
                <span className="relative bg-[#181b27] px-3 text-[11px] text-[#787b86]">
                  or quick sign in
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('google.trader@gmail.com');
                    setSubmitted(true);
                    setTimeout(() => {
                      onSuccess('google.trader@gmail.com');
                      setSubmitted(false);
                      onClose();
                    }, 1000);
                  }}
                  className="bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] text-white text-xs font-medium py-2 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('apple.trader@icloud.com');
                    setSubmitted(true);
                    setTimeout(() => {
                      onSuccess('apple.trader@icloud.com');
                      setSubmitted(false);
                      onClose();
                    }, 1000);
                  }}
                  className="bg-[#1e222d] hover:bg-[#2a2e39] border border-[#2a2e39] text-white text-xs font-medium py-2 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Apple
                </button>
              </div>

              <p className="text-[10px] text-gray-400 text-center mt-4">
                By continuing, you agree to TradingView's Terms of Use and Privacy Policy.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
