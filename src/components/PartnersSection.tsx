import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const { partners } = useApp();

  // Duplicate for seamless infinite marquee loop
  const marqueeList = partners.length > 0 ? [...partners, ...partners] : [];

  return (
    <section id="partners" className="py-20 bg-[#0D0E12] glass-section relative overflow-hidden">
      
      {/* Decorative radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/40 text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] shadow-lg">
            <Award className="w-3.5 h-3.5" />
            <span>Certified Material Excellence</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-serif text-white">
            Our Trusted <span className="gold-gradient-text italic font-normal">Brand & Material Partners</span>
          </h2>
          
          <p className="text-neutral-400 font-light text-xs sm:text-sm max-w-2xl mx-auto">
            We source only 100% genuine factory-certified materials, German hardware, and industrial structural steel from world-renowned partners.
          </p>
        </div>

        {/* Category Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-center">
          <div className="p-3.5 rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>IS:710 Marine Ply</span>
            </div>
            <div className="text-[10px] text-neutral-400 font-medium">Century & Greenlam Guaranteed</div>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>German Fittings</span>
            </div>
            <div className="text-[10px] text-neutral-400 font-medium">Hettich & Hafele Hardware</div>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Smart Home Tech</span>
            </div>
            <div className="text-[10px] text-neutral-400 font-medium">Legrand, Philips & Bosch</div>
          </div>

          <div className="p-3.5 rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Civil Rebars & Cement</span>
            </div>
            <div className="text-[10px] text-neutral-400 font-medium">Tata TMT & ACC Cement</div>
          </div>
        </div>

        {/* Infinite Scrolling Logo Marquee Container */}
        <div className="relative py-4 overflow-hidden">
          
          {/* Gradient fade edges */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#0D0E12] via-[#0D0E12]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#0D0E12] via-[#0D0E12]/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="animate-marquee space-x-5 sm:space-x-7 py-3">
            {marqueeList.map((brand, idx) => (
              <div 
                key={`${brand.id || brand.name}-${idx}`}
                className="group p-2.5 rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] flex items-center justify-center min-w-[210px] sm:min-w-[250px] h-28 sm:h-32 cursor-pointer select-none overflow-hidden"
              >
                <div className="w-full h-full rounded-xl bg-white/95 backdrop-blur-md p-3.5 flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] transition-transform duration-300 group-hover:bg-white">
                  <img 
                    src={brand.logoUrl} 
                    alt={brand.name || "Brand Partner"}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Sourcing Promise note */}
        <div className="text-center text-[11px] text-neutral-400 font-mono flex items-center justify-center space-x-2 pt-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>All materials undergo 12-point batch quality testing & QR authentication upon site delivery.</span>
        </div>

      </div>
    </section>
  );
};
