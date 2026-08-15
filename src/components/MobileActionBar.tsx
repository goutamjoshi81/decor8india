import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, MessageCircle, Calculator, Calendar } from 'lucide-react';

export const MobileActionBar: React.FC = () => {
  const { setIsBookingOpen, setIsEstimatorOpen } = useApp();

  return (
    <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 animate-in slide-in-from-bottom-6 duration-500">
      <div className="glass-panel-gold rounded-2xl p-2 border border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-between gap-1.5">
        
        {/* Call Us */}
        <a 
          href="tel:+919876543210"
          className="flex-1 py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-center flex flex-col items-center justify-center space-y-1 border border-white/10"
        >
          <Phone className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Call</span>
        </a>

        {/* WhatsApp */}
        <a 
          href="https://wa.me/919876543210?text=Hi%20Decor8India,%20I%20would%20like%20to%20inquire%20about%20interior%20design%20and%20construction%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 active:scale-95 transition-all text-center flex flex-col items-center justify-center space-y-1 border border-emerald-500/30"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Cost Estimator */}
        <button
          onClick={() => setIsEstimatorOpen(true)}
          className="flex-1 py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-center flex flex-col items-center justify-center space-y-1 border border-white/10"
        >
          <Calculator className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Estimate</span>
        </button>

        {/* Book Consultation */}
        <button
          onClick={() => setIsBookingOpen(true)}
          className="flex-1.2 py-2.5 px-2.5 rounded-xl gold-gradient-bg text-black active:scale-95 transition-all text-center flex flex-col items-center justify-center space-y-1 shadow-lg shadow-[#D4AF37]/30 gold-btn-shine"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Book Free</span>
        </button>

      </div>
    </div>
  );
};
