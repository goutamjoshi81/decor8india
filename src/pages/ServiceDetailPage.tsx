import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Check, 
  PhoneCall, 
  ChevronRight,
  Building2
} from 'lucide-react';
import { ContactSection } from '../components/ContactSection';
import { FAQ } from '../components/FAQ';

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { services, setIsBookingOpen } = useApp();

  const decodedId = id ? decodeURIComponent(id).toLowerCase().trim() : '';

  const service = services.find(s => {
    if (!id) return false;
    const sId = s.id.toLowerCase();
    const sTitle = s.title.toLowerCase();
    const sSlug = sTitle.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const cleanId = decodedId.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return (
      s.id === id || 
      s.id === decodedId || 
      sId === decodedId || 
      sTitle === decodedId ||
      sSlug === cleanId ||
      sId === cleanId
    );
  });

  const [selectedStandard, setSelectedStandard] = useState<'Eco' | 'Urban' | 'Luxe'>('Luxe');

  if (!service) {
    return (
      <div className="min-h-screen bg-[#0B0C0E] text-white pt-32 pb-20 px-4 text-center space-y-6">
        <Building2 className="w-16 h-16 text-[#D4AF37] mx-auto opacity-60" />
        <h1 className="text-3xl font-serif font-bold">Service Package Not Found</h1>
        <p className="text-neutral-400 text-sm max-w-md mx-auto">
          The requested service offering could not be found or has been updated.
        </p>
        <Link 
          to="/services" 
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  // Price multiplier based on standard option
  const priceMultiplier = selectedStandard === 'Eco' ? 0.85 : selectedStandard === 'Urban' ? 1.0 : 1.25;
  const calculatedPrice = Math.round(service.startingPrice * priceMultiplier);

  return (
    <main className="pt-28 pb-20 bg-[#0B0C0E] text-[#E5E3DF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-neutral-400">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <Link to="/services" className="hover:text-[#D4AF37] transition-colors">Services</Link>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <span className="text-[#D4AF37] truncate max-w-xs">{service.title}</span>
        </div>

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full gold-gradient-bg text-black text-xs font-bold uppercase tracking-wider">
              <span>{service.type} Interior Solution</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {service.title}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              {service.description}
            </p>

            {/* Price & Duration Badge */}
            <div className="p-6 rounded-2xl glass-panel-gold border border-[#D4AF37]/30 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] text-neutral-400 uppercase font-mono tracking-wider">Starting Package Investment</div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-400">
                  ₹ {(calculatedPrice / 100000).toFixed(2)} Lakhs
                </div>
                <div className="text-[10px] text-neutral-400">Est. Timeline: {service.estimatedDuration}</div>
              </div>

              <button 
                onClick={() => setIsBookingOpen(true)}
                className="px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider shrink-0 shadow-lg shadow-[#D4AF37]/20 flex items-center space-x-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 h-80 sm:h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>

        {/* Quality Standard Selector */}
        <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-white">Select Material & Hardware Grade</h3>
            <p className="text-xs text-neutral-400">Customize plywood, veneer, and German soft-close fittings to match your budget.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: 'Eco', name: 'Eco Essential', desc: 'Commercial Plywood + Merino Laminate + Ozone Fittings', badge: 'Budget Friendly' },
              { key: 'Urban', name: 'Urban Premium', desc: 'BWP Marine Ply + High-Gloss Acrylic + Hettich Soft-Close', badge: 'Most Popular' },
              { key: 'Luxe', name: 'Royal Luxe', desc: 'Boiling Water Proof Ply + Natural Italian Veneer + Hafele German Hardware', badge: '100% Luxury' },
            ].map((std) => (
              <div 
                key={std.key}
                onClick={() => setSelectedStandard(std.key as any)}
                className={`p-5 rounded-xl border cursor-pointer transition-all space-y-2 ${
                  selectedStandard === std.key 
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg' 
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">{std.name}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded bg-[#D4AF37]/30 text-[#D4AF37] font-semibold">{std.badge}</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-light">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables & Features List */}
        <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-white">Included Scope of Work & Deliverables</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3">
                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div className="text-xs font-semibold text-white leading-relaxed">{feat}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="pt-20">
        <FAQ />
        <ContactSection />
      </div>
    </main>
  );
};
