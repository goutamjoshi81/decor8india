import React, { useState } from 'react';
import { ShieldCheck, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface PartnerBrand {
  id: string;
  name: string;
  category: 'Woodwork' | 'Civil' | 'Sanitary' | 'Electrical';
  badge: string;
  tagline: string;
  logoText: string;
  color: string;
}

export const PARTNER_BRANDS: PartnerBrand[] = [
  // Interior & Woodwork
  {
    id: 'greenlam',
    name: 'Greenlam Laminates',
    category: 'Woodwork',
    badge: 'Surface Laminates & Veneers',
    tagline: 'Anti-Bacterial Premium Decorative Laminates',
    logoText: 'GREENLAM',
    color: '#EAB308'
  },
  {
    id: 'century',
    name: 'CenturyPly',
    category: 'Woodwork',
    badge: 'Marine Grade IS 710 Plywood',
    tagline: 'ViroKill Tech Borer & Termite Proof Plywood',
    logoText: 'CENTURYPLY',
    color: '#EF4444'
  },
  {
    id: 'hettich',
    name: 'Hettich Germany',
    category: 'Woodwork',
    badge: 'German Fitting & Soft-Close',
    tagline: 'Technik für Möbel — Lifetime Warranty Hardware',
    logoText: 'Hettich',
    color: '#3B82F6'
  },
  {
    id: 'hafele',
    name: 'Häfele',
    category: 'Woodwork',
    badge: 'Architectural Hardware Systems',
    tagline: 'German Engineering & Smart Wardrobe Fittings',
    logoText: 'HÄFELE',
    color: '#DC2626'
  },
  {
    id: 'ebco',
    name: 'Ebco',
    category: 'Woodwork',
    badge: 'Modular Hardware & Slides',
    tagline: 'Simplifying Lives — Precision Hardware',
    logoText: 'ebco',
    color: '#10B981'
  },
  {
    id: 'decolam',
    name: 'Decolam',
    category: 'Woodwork',
    badge: 'High-Gloss Acrylic Sheets',
    tagline: 'Luxury Interior Laminates & Fluted Panels',
    logoText: 'DECOLAM',
    color: '#F59E0B'
  },

  // Bath & Sanitary
  {
    id: 'jaquar',
    name: 'Jaquar',
    category: 'Sanitary',
    badge: 'Luxury Bath Fittings',
    tagline: 'Complete Bathroom Solutions & Thermostatic Showers',
    logoText: 'jaquar',
    color: '#6366F1'
  },
  {
    id: 'pegler',
    name: 'Pegler Yorkshire',
    category: 'Sanitary',
    badge: 'Plumbing & Brass Valves',
    tagline: 'High-Pressure Hydro Engineering Fittings',
    logoText: 'PEGLER',
    color: '#06B6D4'
  },

  // Electrical & Smart Automation
  {
    id: 'legrand',
    name: 'Legrand France',
    category: 'Electrical',
    badge: 'Smart Touch Switches & IoT',
    tagline: 'Arteor & Living Now Smart Home Automation',
    logoText: 'legrand',
    color: '#EF4444'
  },
  {
    id: 'philips',
    name: 'Philips Hue & Lighting',
    category: 'Electrical',
    badge: 'Architectural LED & COB Lights',
    tagline: 'EyeComfort Anti-Glare Recessed Profile Lights',
    logoText: 'PHILIPS',
    color: '#0284C7'
  },
  {
    id: 'bosch',
    name: 'Bosch Home',
    category: 'Electrical',
    badge: 'Built-in Kitchen Appliances',
    tagline: 'Invented for Life — German Built-in Ovens & Hobs',
    logoText: 'BOSCH',
    color: '#2563EB'
  },
  {
    id: 'havells',
    name: 'Havells India',
    category: 'Electrical',
    badge: 'FR-LSH Fire-Resistant Cables',
    tagline: 'Smart Modular Wiring & Protection Systems',
    logoText: 'HAVELLS',
    color: '#E11D48'
  },

  // Civil & Structural Construction
  {
    id: 'tata-tmt',
    name: 'Tata Tiscon TMT',
    category: 'Civil',
    badge: '550D High-Yield Rebars',
    tagline: 'Earthquake-Resistant Primary Steel Structure',
    logoText: 'TATA TISCON',
    color: '#2563EB'
  },
  {
    id: 'acc-cement',
    name: 'ACC Cement',
    category: 'Civil',
    badge: '53 Grade Concrete & Concrete',
    tagline: 'Gold Water Shield Anti-Dampness Cement',
    logoText: 'ACC CEMENT',
    color: '#DC2626'
  },
  {
    id: 'saint-gobain',
    name: 'Saint-Gobain',
    category: 'Civil',
    badge: 'Acoustic & Low-E Glass',
    tagline: 'High-Performance Double Glazed Facades',
    logoText: 'SAINT-GOBAIN',
    color: '#10B981'
  },
  {
    id: 'asian-paints',
    name: 'Asian Paints Royale',
    category: 'Woodwork',
    badge: 'Luxury Velvet Touch Emulsions',
    tagline: 'Teflon Surface Protection & Health Shield Paints',
    logoText: 'asianpaints',
    color: '#F97316'
  }
];

export const PartnersSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Woodwork' | 'Civil' | 'Sanitary' | 'Electrical'>('All');

  const filteredBrands = activeCategory === 'All'
    ? PARTNER_BRANDS
    : PARTNER_BRANDS.filter(b => b.category === activeCategory);

  return (
    <section id="partners" className="py-24 bg-[#0B0C0E] relative overflow-hidden border-t border-white/10">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>OEM Material Standards</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-serif text-white">
            Trusted Procurement & <span className="gold-gradient-text italic font-normal">Brand Partners</span>
          </h2>
          
          <p className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed">
            We partner exclusively with world-class manufacturers for 100% authentic materials, factory-backed guarantees, and zero-compromise architectural quality.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-start sm:justify-center overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          <div className="p-1 sm:p-1.5 rounded-2xl glass-panel border border-white/10 flex space-x-1.5 sm:space-x-2 shrink-0">
            {(['All', 'Woodwork', 'Civil', 'Sanitary', 'Electrical'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat
                    ? 'gold-gradient-bg text-black shadow-lg font-bold shadow-[#D4AF37]/20'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat === 'All' ? 'All Partners (16)' : cat === 'Woodwork' ? 'Plywood & Hardware' : cat === 'Civil' ? 'Civil & Steel' : cat === 'Sanitary' ? 'Bath & Sanitary' : 'Electrical & Smart Tech'}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredBrands.map((brand) => (
            <div 
              key={brand.id}
              className="group glass-card rounded-2xl p-5 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              {/* Subtle top accent gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Brand Logo Box */}
              <div className="h-16 rounded-xl bg-black/60 border border-white/5 flex items-center justify-center p-3 group-hover:bg-white/10 transition-colors">
                <span 
                  className="font-black text-xl sm:text-2xl tracking-tighter uppercase font-mono transition-transform duration-300 group-hover:scale-105"
                  style={{ color: '#E5E3DF' }}
                >
                  {brand.logoText}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-1">
                <div className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                  <span>{brand.name}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                </div>
                <div className="text-[10px] text-[#D4AF37] font-mono font-medium">{brand.badge}</div>
                <div className="text-[11px] text-neutral-400 font-light line-clamp-1 pt-1">{brand.tagline}</div>
              </div>

            </div>
          ))}
        </div>

        {/* Guarantee Banner */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/30 grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">100% Genuine OEM Sourcing</div>
              <div className="text-xs text-neutral-300">Direct procurement from authorized manufacturers</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">10-Year Comprehensive Warranty</div>
              <div className="text-xs text-neutral-300">Backed by official brand replacement guarantees</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Transparent Batch Tracking</div>
              <div className="text-xs text-neutral-300">Invoice verification for ISI & IS 710 grades</div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
