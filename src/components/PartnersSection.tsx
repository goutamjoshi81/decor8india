import React from 'react';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

interface PartnerBrand {
  name: string;
  category: string;
  logoUrl: string;
}

export const PartnersSection: React.FC = () => {
  const brandPartners: PartnerBrand[] = [
    { name: 'GREENLAM', category: 'Laminates & Veneers', logoUrl: '/partners/greenlam.png' },
    { name: 'CENTURY PLY', category: 'IS:710 Marine Plywood', logoUrl: '/partners/century.png' },
    { name: 'JAQUAR', category: 'Luxury Bath & Sanitaryware', logoUrl: '/partners/jaquar.png' },
    { name: 'EBCO', category: 'Architectural Hardware', logoUrl: '/partners/ebco.png' },
    { name: 'HETTICH', category: 'German Soft-Close Fittings', logoUrl: '/partners/hettich.png' },
    { name: 'HAFELE', category: 'German Kitchen Hardware', logoUrl: '/partners/hafele.png' },
    { name: 'PEGLAR', category: 'High-Pressure Valves & Piping', logoUrl: '/partners/peglar.png' },
    { name: 'SUNTOUCH', category: 'Radiant Thermal Comfort', logoUrl: '/partners/suntouch.png' },
    { name: 'DECOLAM', category: 'Decorative Surface Finishes', logoUrl: '/partners/decolam.png' },
    { name: 'LEGRAND', category: 'Smart Home Automation', logoUrl: '/partners/legrand.png' },
    { name: 'PHILIPS', category: 'Architectural LED Lighting', logoUrl: '/partners/philips.png' },
    { name: 'BOSCH', category: 'German Kitchen Appliances', logoUrl: '/partners/bosch.png' },
    { name: 'HAVELLS', category: 'Modular Wires & Lighting', logoUrl: '/partners/havells.png' },
    { name: 'TATA TMT', category: 'Tiscon 550SD Civil Rebars', logoUrl: '/partners/tatatmt.png' },
    { name: 'ACC CEMENT', category: 'High-Strength Concrete', logoUrl: '/partners/acccement.png' }
  ];

  // Duplicate for seamless infinite marquee loop
  const marqueeList = [...brandPartners, ...brandPartners];

  return (
    <section id="partners" className="py-20 bg-[#0B0C0E] border-y border-white/10 relative overflow-hidden">
      
      {/* Decorative radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37]">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto text-center">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>IS:710 Marine Ply</span>
            </div>
            <div className="text-[10px] text-neutral-400">Century & Greenlam Guaranteed</div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>German Fittings</span>
            </div>
            <div className="text-[10px] text-neutral-400">Hettich & Hafele Hardware</div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Smart Home Tech</span>
            </div>
            <div className="text-[10px] text-neutral-400">Legrand, Philips & Bosch</div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Civil Rebars & Cement</span>
            </div>
            <div className="text-[10px] text-neutral-400">Tata TMT & ACC Cement</div>
          </div>
        </div>

        {/* Infinite Scrolling Logo Marquee Container */}
        <div className="relative py-4 overflow-hidden">
          
          {/* Gradient fade edges */}
          <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#0B0C0E] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#0B0C0E] to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="animate-marquee space-x-4 sm:space-x-6 py-2">
            {marqueeList.map((brand, idx) => (
              <div 
                key={`${brand.name}-${idx}`}
                className="group px-4 py-3 rounded-2xl bg-white/90 border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/20 flex flex-col justify-center items-center space-y-1.5 min-w-[170px] sm:min-w-[200px] cursor-pointer select-none"
              >
                <div className="h-12 flex items-center justify-center">
                  <img 
                    src={brand.logoUrl} 
                    alt={brand.name}
                    className="max-h-full max-w-[150px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="text-[10px] text-neutral-800 font-bold tracking-wide text-center border-t border-neutral-200 pt-1 w-full">
                  {brand.category}
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
