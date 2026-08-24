import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const { partners } = useApp();

  // Distribute partners into 3 balanced rows
  const row1 = partners.filter((_, idx) => idx % 3 === 0);
  const row2 = partners.filter((_, idx) => idx % 3 === 1);
  const row3 = partners.filter((_, idx) => idx % 3 === 2);

  // Fallback in case list is short: duplicate each row to guarantee smooth continuous loop
  const marqueeRow1 = row1.length > 0 ? [...row1, ...row1, ...row1, ...row1] : [];
  const marqueeRow2 = row2.length > 0 ? [...row2, ...row2, ...row2, ...row2] : [];
  const marqueeRow3 = row3.length > 0 ? [...row3, ...row3, ...row3, ...row3] : [];

  const renderPartnerCard = (brand: any, key: string) => (
    <div 
      key={key}
      className="group p-1.5 sm:p-2.5 rounded-xl sm:rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] flex items-center justify-center min-w-[110px] sm:min-w-[170px] md:min-w-[210px] lg:min-w-[230px] h-14 sm:h-20 md:h-24 cursor-pointer select-none overflow-hidden shrink-0"
    >
      <div className="w-full h-full rounded-lg sm:rounded-xl bg-white/95 backdrop-blur-md p-1.5 sm:p-3 flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] transition-transform duration-300 group-hover:bg-white">
        <img 
          src={brand.logoUrl} 
          alt={brand.name || "Brand Partner"}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
  );

  return (
    <section id="partners" className="py-14 sm:py-20 bg-[#0D0E12] glass-section relative overflow-hidden section-gpu-optimize">
      
      {/* GPU-Native Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full pointer-events-none glow-orb-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/40 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] shadow-lg">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-5xl mx-auto text-center">
          <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-0.5 sm:space-y-1">
            <div className="text-[11px] sm:text-xs font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
              <span>IS:710 Marine Ply</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400 font-medium">Century & Greenlam Guaranteed</div>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-0.5 sm:space-y-1">
            <div className="text-[11px] sm:text-xs font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
              <span>German Fittings</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400 font-medium">Hettich & Hafele Hardware</div>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-0.5 sm:space-y-1">
            <div className="text-[11px] sm:text-xs font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
              <span>Smart Home Tech</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400 font-medium">Legrand, Philips & Bosch</div>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-0.5 sm:space-y-1">
            <div className="text-[11px] sm:text-xs font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
              <span>Civil Rebars & Cement</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400 font-medium">Tata TMT & ACC Cement</div>
          </div>
        </div>

        {/* 3-Row Infinite Scrolling Logo Marquee Container */}
        <div className="relative py-2 sm:py-4 overflow-hidden space-y-2.5 sm:space-y-4 md:space-y-5">
          
          {/* Left & Right Gradient Fade Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-24 md:w-36 bg-gradient-to-r from-[#0D0E12] via-[#0D0E12]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-24 md:w-36 bg-gradient-to-l from-[#0D0E12] via-[#0D0E12]/80 to-transparent z-10 pointer-events-none" />

          {/* Row 1: Forward Marquee (Top) */}
          <div className="animate-marquee animate-marquee-fast space-x-2.5 sm:space-x-4 md:space-x-6 py-0.5 sm:py-1">
            {marqueeRow1.map((brand, idx) => renderPartnerCard(brand, `row1-${brand.id || brand.name}-${idx}`))}
          </div>

          {/* Row 2: Reverse Marquee (Middle) */}
          <div className="animate-marquee-reverse space-x-2.5 sm:space-x-4 md:space-x-6 py-0.5 sm:py-1">
            {marqueeRow2.map((brand, idx) => renderPartnerCard(brand, `row2-${brand.id || brand.name}-${idx}`))}
          </div>

          {/* Row 3: Forward Marquee (Bottom) */}
          <div className="animate-marquee animate-marquee-slow space-x-2.5 sm:space-x-4 md:space-x-6 py-0.5 sm:py-1">
            {marqueeRow3.map((brand, idx) => renderPartnerCard(brand, `row3-${brand.id || brand.name}-${idx}`))}
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
