import React from 'react';
import { ShieldCheck, Award, Sparkles } from 'lucide-react';

interface PartnerBrand {
  name: string;
  category: string;
  tag: string;
  logoBg: string;
  textColor: string;
  accentBorder: string;
}

export const PartnersSection: React.FC = () => {
  const brandPartners: PartnerBrand[] = [
    { name: 'GREENLAM', category: 'Laminates & Veneers', tag: 'High-Pressure Veneers', logoBg: 'from-emerald-950/80 to-black', textColor: 'text-emerald-400', accentBorder: 'border-emerald-500/30' },
    { name: 'CENTURY PLY', category: 'Plywood & Boards', tag: 'IS:710 Marine Grade', logoBg: 'from-amber-950/80 to-black', textColor: 'text-amber-400', accentBorder: 'border-amber-500/30' },
    { name: 'JAQUAR', category: 'Bath & Sanitaryware', tag: 'Premium Fittings', logoBg: 'from-sky-950/80 to-black', textColor: 'text-sky-400', accentBorder: 'border-sky-500/30' },
    { name: 'HETTICH', category: 'German Hardware', tag: 'Soft-Close Hinges', logoBg: 'from-red-950/80 to-black', textColor: 'text-red-400', accentBorder: 'border-red-500/30' },
    { name: 'HAFELE', category: 'German Architectural', tag: 'Kitchen Hardware', logoBg: 'from-rose-950/80 to-black', textColor: 'text-rose-400', accentBorder: 'border-rose-500/30' },
    { name: 'EBCO', category: 'Furniture Hardware', tag: 'Architectural Fittings', logoBg: 'from-blue-950/80 to-black', textColor: 'text-blue-400', accentBorder: 'border-blue-500/30' },
    { name: 'PEGLER', category: 'Plumbing & Valves', tag: 'High-Pressure Piping', logoBg: 'from-cyan-950/80 to-black', textColor: 'text-cyan-400', accentBorder: 'border-cyan-500/30' },
    { name: 'SUNTOUCH', category: 'Radiant Flooring', tag: 'Thermal Comfort', logoBg: 'from-orange-950/80 to-black', textColor: 'text-orange-400', accentBorder: 'border-orange-500/30' },
    { name: 'DECOLAM', category: 'Decorative Laminates', tag: 'Surface Finishes', logoBg: 'from-purple-950/80 to-black', textColor: 'text-purple-400', accentBorder: 'border-purple-500/30' },
    { name: 'LEGRAND', category: 'Smart Switches', tag: 'Home Automation', logoBg: 'from-[#2C220E] to-black', textColor: 'text-[#D4AF37]', accentBorder: 'border-[#D4AF37]/40' },
    { name: 'PHILIPS', category: 'Architectural Lighting', tag: 'COB & LED Systems', logoBg: 'from-indigo-950/80 to-black', textColor: 'text-indigo-400', accentBorder: 'border-indigo-500/30' },
    { name: 'BOSCH', category: 'Built-in Appliances', tag: 'German Engineering', logoBg: 'from-neutral-900 to-black', textColor: 'text-neutral-200', accentBorder: 'border-neutral-500/30' },
    { name: 'HAVELLS', category: 'Electrical & Wires', tag: 'FRHR Copper Cables', logoBg: 'from-amber-950/80 to-black', textColor: 'text-amber-300', accentBorder: 'border-amber-500/30' },
    { name: 'TATA TMT', category: 'Structural Steel', tag: 'Tiscon 550SD Rebars', logoBg: 'from-slate-900 to-black', textColor: 'text-slate-200', accentBorder: 'border-slate-500/30' },
    { name: 'ACC CEMENT', category: 'Civil Concrete', tag: 'High-Strength Concrete', logoBg: 'from-red-950/80 to-black', textColor: 'text-red-300', accentBorder: 'border-red-500/30' },
    { name: 'ASIAN PAINTS', category: 'Luxury Emulsions', tag: 'Royale Velvet Touch', logoBg: 'from-teal-950/80 to-black', textColor: 'text-teal-400', accentBorder: 'border-teal-500/30' },
    { name: 'KALINGASTONE', category: 'Quartz & Marble', tag: 'Engineered Stone', logoBg: 'from-stone-900 to-black', textColor: 'text-[#D4AF37]', accentBorder: 'border-[#D4AF37]/30' },
    { name: 'SCHNEIDER', category: 'Smart Automation', tag: 'KNX Automation', logoBg: 'from-emerald-950/80 to-black', textColor: 'text-emerald-300', accentBorder: 'border-emerald-500/30' },
    { name: 'ULTRATECH', category: 'Civil Concrete', tag: 'Super Structural Cement', logoBg: 'from-yellow-950/80 to-black', textColor: 'text-yellow-400', accentBorder: 'border-yellow-500/30' },
    { name: 'SAINT-GOBAIN', category: 'Toughened Glass', tag: 'Acoustic Glazing', logoBg: 'from-blue-950/80 to-black', textColor: 'text-sky-300', accentBorder: 'border-sky-500/30' }
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
            We partner exclusively with world-class manufacturers to guarantee factory-certified plywood, German soft-close hardware, industrial TMT steel, and luxury sanitaryware.
          </p>
        </div>

        {/* Category Trust Highlights */}
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
            <div className="text-[10px] text-neutral-400">Legrand, Philips & Schneider</div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Civil Grade Rebars</span>
            </div>
            <div className="text-[10px] text-neutral-400">Tata Tiscon & ACC Cement</div>
          </div>
        </div>

        {/* Infinite Scrolling Logo Marquee Container */}
        <div className="relative py-4 overflow-hidden mask-gradient">
          
          {/* Gradient fade edges */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#0B0C0E] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#0B0C0E] to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="animate-marquee space-x-4 sm:space-x-6 py-2">
            {marqueeList.map((brand, idx) => (
              <div 
                key={`${brand.name}-${idx}`}
                className={`group px-5 py-3.5 sm:px-6 sm:py-4 rounded-xl bg-gradient-to-b ${brand.logoBg} border ${brand.accentBorder} transition-all duration-300 hover:scale-105 hover:border-[#D4AF37] hover:shadow-xl hover:shadow-[#D4AF37]/10 flex flex-col justify-center items-center space-y-1 min-w-[160px] sm:min-w-[190px] cursor-pointer select-none`}
              >
                <div className="flex items-center space-x-1.5">
                  <Sparkles className="w-3 h-3 text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className={`font-serif font-extrabold text-base sm:text-lg tracking-wider ${brand.textColor} group-hover:text-white transition-colors`}>
                    {brand.name}
                  </span>
                </div>
                <div className="text-[10px] text-neutral-300 font-semibold tracking-wide">
                  {brand.category}
                </div>
                <div className="text-[9px] text-[#D4AF37] font-mono opacity-80 group-hover:opacity-100">
                  {brand.tag}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Sourcing Promise note */}
        <div className="text-center text-[11px] text-neutral-400 font-mono flex items-center justify-center space-x-2 pt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>All materials undergo 12-point batch quality testing & QR authentication upon site delivery.</span>
        </div>

      </div>
    </section>
  );
};
