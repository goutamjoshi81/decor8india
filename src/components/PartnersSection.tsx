import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

interface PartnerBrand {
  name: string;
  imgName: string;
  category: string;
  tag: string;
}

export const PartnersSection: React.FC = () => {
  const brandPartners: PartnerBrand[] = [
    { name: 'Greenlam', imgName: 'greenlam', category: 'Laminates & Veneers', tag: 'High-Pressure Veneers' },
    { name: 'Century Ply', imgName: 'century', category: 'Plywood & Boards', tag: 'IS:710 Marine Grade' },
    { name: 'Jaquar', imgName: 'jaquar', category: 'Bath & Sanitaryware', tag: 'Premium Fittings' },
    { name: 'Ebco', imgName: 'ebco', category: 'Furniture Hardware', tag: 'Architectural Fittings' },
    { name: 'Hettich', imgName: 'hettich', category: 'German Hardware', tag: 'Soft-Close Hinges' },
    { name: 'Häfele', imgName: 'hafele', category: 'German Architectural', tag: 'Kitchen Hardware' },
    { name: 'Pegler', imgName: 'peglar', category: 'Plumbing & Valves', tag: 'High-Pressure Piping' },
    { name: 'SunTouch', imgName: 'suntouch', category: 'Radiant Flooring', tag: 'Thermal Comfort' },
    { name: 'Decolam', imgName: 'decolam', category: 'Decorative Laminates', tag: 'Surface Finishes' },
    { name: 'Legrand', imgName: 'legrand', category: 'Smart Switches', tag: 'Home Automation' },
    { name: 'Philips', imgName: 'philips', category: 'Architectural Lighting', tag: 'COB & LED Systems' },
    { name: 'Bosch', imgName: 'bosch', category: 'Built-in Appliances', tag: 'German Engineering' },
    { name: 'Havells', imgName: 'havells', category: 'Electrical & Wires', tag: 'FRHR Copper Cables' },
    { name: 'Tata TMT', imgName: 'tatatmt', category: 'Structural Steel', tag: 'Tiscon 550SD Rebars' },
    { name: 'ACC Cement', imgName: 'acccement', category: 'Civil Concrete', tag: 'High-Strength Concrete' }
  ];

  // Duplicate for seamless infinite marquee loop
  const marqueeList = [...brandPartners, ...brandPartners];

  return (
    <section id="partners" className="py-20 bg-[#0B0C0E] border-y border-white/10 relative overflow-hidden">
      
      {/* Decorative radial background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Award className="w-3.5 h-3.5" />
            <span>Certified Material Excellence</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-serif text-white uppercase tracking-wider font-bold">
            OUR <span className="text-emerald-400 italic font-normal">TRUSTED</span> PARTNERS
          </h2>
          
          <p className="text-neutral-400 font-light text-xs sm:text-sm max-w-2xl mx-auto">
            We partner exclusively with world-class manufacturers to guarantee factory-certified marine plywood, German soft-close hardware, industrial TMT steel, and luxury bathware.
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
            <div className="text-[10px] text-neutral-400">Hettich & Häfele Hardware</div>
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

        {/* Glass Showcase Grid (Matching User Image) */}
        <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-white/20 shadow-2xl relative max-w-5xl mx-auto overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 relative z-10">
            {brandPartners.map((brand) => (
              <div 
                key={brand.name}
                className="group p-2 bg-white rounded-2xl border border-white/30 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center space-y-1 h-20 sm:h-24 cursor-pointer"
              >
                <img 
                  src={`/partners/${brand.imgName}.png`} 
                  alt={`${brand.name} Logo`}
                  className="max-h-12 sm:max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Infinite Scrolling Logo Marquee Container */}
        <div className="space-y-3 pt-4">
          <div className="text-center text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
            ✦ Continuous Live Partner Ticker ✦
          </div>

          <div className="relative py-4 overflow-hidden mask-gradient">
            
            {/* Gradient fade edges */}
            <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-[#0B0C0E] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-[#0B0C0E] to-transparent z-10 pointer-events-none" />

            {/* Marquee Track */}
            <div className="animate-marquee space-x-4 sm:space-x-6 py-2">
              {marqueeList.map((brand, idx) => (
                <div 
                  key={`${brand.name}-${idx}`}
                  className="group px-4 py-2 bg-white rounded-2xl border border-white/20 shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center min-w-[150px] sm:min-w-[180px] h-16 cursor-pointer select-none"
                >
                  <img 
                    src={`/partners/${brand.imgName}.png`} 
                    alt={`${brand.name} Logo`}
                    className="max-h-10 sm:max-h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>

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
