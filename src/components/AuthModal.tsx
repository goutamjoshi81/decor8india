import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  UserCheck, 
  ShieldAlert, 
  Lock, 
  Mail, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  onSuccessRedirect?: (tab: 'client' | 'admin') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onSuccessRedirect }) => {
  const { 
    isAuthOpen, 
    setIsAuthOpen, 
    login 
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    const success = login(email);
    if (success) {
      setIsAuthOpen(false);
      if (onSuccessRedirect) {
        if (email.toLowerCase().includes('admin')) {
          onSuccessRedirect('admin');
        } else {
          onSuccessRedirect('client');
        }
      }
    } else {
      setErrorMsg('Account not found or pending admin approval. Please use demo buttons or submit a booking request.');
    }
  };

  const handleQuickDemo = (role: 'ADMIN' | 'CLIENT') => {
    setErrorMsg('');
    const demoEmail = role === 'ADMIN' ? 'admin@decor8india.com' : 'ananya.reddy@example.com';
    setEmail(demoEmail);
    const success = login(demoEmail, role);
    if (success) {
      setIsAuthOpen(false);
      if (onSuccessRedirect) {
        onSuccessRedirect(role === 'ADMIN' ? 'admin' : 'client');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-md bg-[#0D0E12] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2.5 mx-auto">
            <img src="/logo_icon.png" alt="Decor8 India" className="h-9 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]" />
            <span className="text-xl font-serif tracking-wider text-white font-bold">
              DECOR8<span className="text-[#D4AF37]">INDIA</span>
            </span>
          </div>

          <h2 className="text-2xl font-serif font-bold text-white">
            Secure Portal Authentication
          </h2>
          <p className="text-xs text-neutral-400">
            Enter your credentials to access your project dashboard or admin control panel.
          </p>
        </div>

        {/* Quick Demo Shortcuts */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
          <div className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold text-center">
            ⚡ One-Click Demo Access
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('CLIENT')}
              className="py-2 px-3 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center space-x-1.5"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Client Demo</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('ADMIN')}
              className="py-2 px-3 rounded-lg bg-red-500/20 border border-red-500/40 text-xs font-bold text-red-300 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center space-x-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-neutral-300 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="email" 
                required
                placeholder="ananya.reddy@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-neutral-300 font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="password" 
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-2"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-neutral-500 pt-2 border-t border-white/10">
          Haven't booked a consultation yet? Submit a booking to request client portal access.
        </div>

      </div>
    </div>
  );
};
