import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Award, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const { partners } = useApp();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(partners.length / itemsPerPage) || 1;

  const currentPartners = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return partners.slice(start, start + itemsPerPage);
  }, [partners, currentPage]);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section id="partners" className="py-12 sm:py-20 bg-[#0D0E12] glass-section relative overflow-hidden section-gpu-optimize w-full max-w-full">
      
      {/* GPU-Native Ambient Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] rounded-full pointer-events-none glow-orb-gold opacity-40 max-w-full overflow-hidden" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10 relative z-10 w-full max-w-full overflow-hidden">
        
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
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
              <span>IS:710 Marine Ply</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400 font-medium">Century & Greenlam Guaranteed</div>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-0.5 sm:space-y-1">
            <div className="text-[11px] sm:text-xs font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
              <span>German Fittings</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400 font-medium">Hettich & Hafele Hardware</div>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-0.5 sm:space-y-1">
            <div className="text-[11px] sm:text-xs font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
              <span>Smart Home Tech</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400 font-medium">Legrand, Philips & Bosch</div>
          </div>

          <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-0.5 sm:space-y-1">
            <div className="text-[11px] sm:text-xs font-bold text-white flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
              <span>Civil Rebars & Cement</span>
            </div>
            <div className="text-[9px] sm:text-[10px] text-neutral-400 font-medium">Tata TMT & ACC Cement</div>
          </div>
        </div>

        {/* 9-Logo Gallery Grid (3 Columns x 3 Rows = 9 Items) */}
        <div className="max-w-4xl mx-auto w-full flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-5 w-full">
            {currentPartners.map((brand, idx) => (
              <div 
                key={brand.id || `partner-${currentPage}-${idx}`}
                className="group p-1.5 sm:p-2 rounded-xl sm:rounded-2xl glass-panel border border-white/15 hover:border-[#D4AF37] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(212,175,55,0.25)] flex items-center justify-center h-16 sm:h-20 md:h-24 cursor-pointer select-none overflow-hidden w-full relative"
              >
                {/* Clean, High-Contrast Crisp Logo Container without excess white space */}
                <div className="w-full h-full rounded-lg sm:rounded-xl bg-white/95 backdrop-blur-md p-2 sm:p-3 flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)] transition-colors duration-300 group-hover:bg-white">
                  <img 
                    src={brand.logoUrl} 
                    alt={brand.name || "Brand Partner"}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                      const parent = (e.target as HTMLElement).parentElement;
                      if (parent && !parent.querySelector('.logo-fallback')) {
                        const fallback = document.createElement('span');
                        fallback.className = 'logo-fallback font-bold text-xs sm:text-sm text-neutral-900 tracking-wider uppercase text-center px-1';
                        fallback.innerText = brand.name || 'Partner';
                        parent.appendChild(fallback);
                      }
                    }}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls for Next 9 / Previous 9 */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-3 pt-6 select-none">
              <button
                onClick={handlePrevPage}
                className="p-2 sm:px-4 sm:py-2 rounded-xl glass-panel border border-white/15 text-white hover:border-[#D4AF37] transition-all cursor-pointer flex items-center space-x-1 hover:scale-105 active:scale-95 text-xs font-semibold"
                aria-label="Previous 9 Logos"
              >
                <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
                <span className="hidden sm:inline">Previous 9</span>
              </button>

              {/* Page Indicator Pills */}
              <div className="flex items-center space-x-1.5 px-2 py-1 rounded-xl glass-panel border border-white/10">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer ${
                      currentPage === index
                        ? 'w-7 gold-gradient-bg shadow-sm shadow-[#D4AF37]'
                        : 'w-2.5 bg-white/20 hover:bg-white/50'
                    }`}
                    title={`Page ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                className="p-2 sm:px-4 sm:py-2 rounded-xl glass-panel border border-white/15 text-white hover:border-[#D4AF37] transition-all cursor-pointer flex items-center space-x-1 hover:scale-105 active:scale-95 text-xs font-semibold"
                aria-label="Next 9 Logos"
              >
                <span className="hidden sm:inline">Next 9</span>
                <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          )}
        </div>

        {/* Sourcing Promise note */}
        <div className="text-center text-[10px] sm:text-[11px] text-neutral-400 font-mono flex items-center justify-center space-x-2 pt-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span>All materials undergo 12-point batch quality testing & QR authentication upon site delivery.</span>
        </div>

      </div>
    </section>
  );
};
