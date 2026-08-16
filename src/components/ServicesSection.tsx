import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { ServiceItem } from '../types';
import { 
  Home, 
  Building2, 
  Crown, 
  Castle, 
  Compass, 
  Briefcase, 
  ShoppingBag, 
  Utensils, 
  Hotel, 
  Stethoscope, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Calculator,
  HardHat,
  Hammer
} from 'lucide-react';
import { TiltContainer } from './TiltContainer';

const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Building: Building2,
  Crown,
  Castle,
  Compass,
  Briefcase,
  ShoppingBag,
  Utensils,
  Hotel,
  Stethoscope,
  Sparkles,
  HardHat,
  Hammer
};

export const ServicesSection: React.FC = () => {
  const { services, setIsBookingOpen, setSelectedServiceForBooking, setIsEstimatorOpen } = useApp();
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState<'All' | 'Residential' | 'Commercial' | 'Construction'>('All');

  const filteredServices = activeType === 'All' 
    ? services.filter(s => s.isActive)
    : services.filter(s => s.type === activeType && s.isActive);

  const handleBookService = (service: ServiceItem) => {
    setSelectedServiceForBooking(service);
    setIsBookingOpen(true);
  };

  return (
    <section id="services" className="py-24 bg-[#0D0E12] glass-section relative overflow-hidden section-gpu-optimize">
      
      {/* GPU-Native Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full pointer-events-none glow-orb-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bespoke Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">
            Architectural Services & <span className="gold-gradient-text italic font-normal">Turnkey Fitouts</span>
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg">
            Residential apartments, commercial headquarters, and ground-up turnkey civil construction — engineered to perfection.
          </p>
        </div>

        {/* Tab Switcher: All, Residential, Commercial, Construction */}
        <div className="flex justify-start sm:justify-center overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          <div className="p-1 sm:p-1.5 rounded-2xl glass-panel border border-white/10 flex space-x-1.5 sm:space-x-2 shrink-0">
            <button
              onClick={() => setActiveType('All')}
              className={`flex items-center space-x-1.5 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                activeType === 'All'
                  ? 'gold-gradient-bg text-black font-bold shadow-lg shadow-[#D4AF37]/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>All ({services.filter(s => s.isActive).length})</span>
            </button>

            <button
              onClick={() => setActiveType('Residential')}
              className={`flex items-center space-x-1.5 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                activeType === 'Residential'
                  ? 'gold-gradient-bg text-black font-bold shadow-lg shadow-[#D4AF37]/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Residential ({services.filter(s => s.type === 'Residential' && s.isActive).length})</span>
            </button>

            <button
              onClick={() => setActiveType('Commercial')}
              className={`flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                activeType === 'Commercial'
                  ? 'gold-gradient-bg text-black font-bold shadow-lg shadow-[#D4AF37]/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Commercial ({services.filter(s => s.type === 'Commercial' && s.isActive).length})</span>
            </button>

            <button
              onClick={() => setActiveType('Construction')}
              className={`flex items-center space-x-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                activeType === 'Construction'
                  ? 'gold-gradient-bg text-black font-bold shadow-lg shadow-[#D4AF37]/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <HardHat className="w-4 h-4" />
              <span>Construction ({services.filter(s => s.type === 'Construction' && s.isActive).length})</span>
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl glass-panel border border-white/10 space-y-4">
            <Sparkles className="w-12 h-12 text-[#D4AF37]/50 mx-auto" />
            <h3 className="text-xl font-serif text-white font-medium">No Active Services Found</h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto">
              There are currently no active services in the database. Services added to the database will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const IconComponent = ICON_MAP[service.iconName] || Home;

              return (
                <TiltContainer key={service.id}>
                  <div 
                    onClick={() => navigate(`/services/${service.id}`)}
                    className="group glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-[#D4AF37]/40 transition-all duration-500 cursor-pointer h-full"
                  >
                    
                    {/* Card Cover Image with Overlay */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/40 to-transparent" />
                      
                      {/* Top Type Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-[#D4AF37] flex items-center space-x-1.5">
                        <IconComponent className="w-3.5 h-3.5" />
                        <span>{service.type}</span>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[11px] text-neutral-300 flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                        <span>{service.estimatedDuration}</span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">Key Highlights:</div>
                        {service.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start space-x-2 text-xs text-neutral-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Card Footer: Starting Price & Book CTA */}
                    <div className="p-6 pt-0 space-y-4">
                      <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                        <div>
                          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Starting From</span>
                          <span className="text-xl font-bold font-serif text-[#D4AF37]">
                            ₹ {(service.startingPrice / 100000).toFixed(2)} Lakhs
                          </span>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsEstimatorOpen(true);
                          }}
                          className="text-[11px] text-neutral-400 hover:text-white flex items-center space-x-1 transition-colors"
                          title="Calculate custom estimate"
                        >
                          <Calculator className="w-3 h-3 text-[#D4AF37]" />
                          <span>Calculate</span>
                        </button>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/services/${service.id}`);
                          }}
                          className="w-1/2 py-3 rounded-xl bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider text-center transition-all hover:opacity-90 gold-btn-shine"
                        >
                          View Package Details
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookService(service);
                          }}
                          className="w-1/2 py-3 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-200 font-bold text-xs uppercase tracking-wider text-center transition-all border border-white/10"
                        >
                          Book Consultation
                        </button>
                      </div>
                    </div>

                  </div>
                </TiltContainer>
              );
            })}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="p-8 rounded-2xl glass-panel border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-2xl font-bold text-white">Need a Completely Custom Architectural Solution?</h4>
            <p className="text-xs text-neutral-400">Our principal architects are available for bespoke design-to-build consultation across India.</p>
          </div>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider shrink-0 hover:scale-105 transition-transform"
          >
            Request Bespoke Architect Meeting
          </button>
        </div>

      </div>
    </section>
  );
};
