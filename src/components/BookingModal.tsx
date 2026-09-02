import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MATERIAL_STANDARDS, 
  CONSTRUCTION_STANDARDS, 
  STANDARD_PRICING 
} from '../data/initialData';
import type { 
  MaterialStandardDetail, 
  ConstructionStandardDetail 
} from '../data/initialData';
import type { ServiceItem } from '../types';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  Home, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  HardHat, 
  Tag, 
  CreditCard, 
  Clock, 
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const isCustomArchitectureService = (service?: ServiceItem | null) => {
  if (!service) return false;
  const title = (service.title || '').toLowerCase();
  const id = (service.id || '').toLowerCase();
  return id === 'res-custom' || 
         title.includes('custom residential architecture') || 
         (title.includes('custom') && title.includes('architecture')) ||
         title === 'residential architecture';
};

export const BookingModal: React.FC = () => {
  const { 
    isBookingOpen, 
    setIsBookingOpen, 
    selectedServiceForBooking, 
    setSelectedServiceForBooking,
    services,
    submitBooking 
  } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [serviceCategory, setServiceCategory] = useState<'Residential' | 'Commercial' | 'Construction'>('Residential');
  
  // Material & Hardware Standard Tier (Default: Eco)
  const [materialStandard, setMaterialStandard] = useState<'Eco' | 'Urban' | 'Luxe'>('Eco');

  // Sliders State (Default: 1,000 for Residential/Commercial, 1,500 for Construction)
  const [carpetArea, setCarpetArea] = useState<number>(1000);
  const [commCarpetArea, setCommCarpetArea] = useState<number>(1000);
  const [constPlotArea, setConstPlotArea] = useState<number>(1500);

  // Active Category DB Services
  const activeCategoryServices = useMemo(() => {
    return services.filter(s => s.type === serviceCategory && s.isActive);
  }, [services, serviceCategory]);

  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  // Auto-sync selectedServiceId when category or services list changes
  useEffect(() => {
    if (activeCategoryServices.length > 0) {
      if (!selectedServiceId || !activeCategoryServices.some(s => s.id === selectedServiceId)) {
        setSelectedServiceId(activeCategoryServices[0].id);
      }
    } else {
      setSelectedServiceId('');
    }
  }, [activeCategoryServices, selectedServiceId]);

  // Sync if opened with a pre-selected service
  useEffect(() => {
    if (selectedServiceForBooking) {
      setServiceCategory(selectedServiceForBooking.type as any);
      setSelectedServiceId(selectedServiceForBooking.id);
      if (selectedServiceForBooking.type === 'Construction') {
        setConstPlotArea(1500);
      } else if (selectedServiceForBooking.type === 'Commercial') {
        setCommCarpetArea(1000);
      } else {
        setCarpetArea(1000);
      }
    }
  }, [selectedServiceForBooking]);

  const selectedService: ServiceItem | undefined = useMemo(() => {
    return activeCategoryServices.find(s => s.id === selectedServiceId) || activeCategoryServices[0];
  }, [activeCategoryServices, selectedServiceId]);

  const isCustomArchitecture = useMemo(() => {
    return isCustomArchitectureService(selectedService);
  }, [selectedService]);

  const selectedStandardDetail = useMemo(() => {
    if (serviceCategory === 'Construction') {
      return CONSTRUCTION_STANDARDS.find(m => m.id === materialStandard) || CONSTRUCTION_STANDARDS[0];
    }
    return MATERIAL_STANDARDS.find(m => m.id === materialStandard) || MATERIAL_STANDARDS[0];
  }, [materialStandard, serviceCategory]);

  // Standard Multiplier derived directly from official STANDARD_PRICING
  const standardMultiplier = useMemo(() => {
    const ecoRate = STANDARD_PRICING[serviceCategory]?.Eco || 1250;
    const urbanRate = STANDARD_PRICING[serviceCategory]?.Urban || 1450;
    const luxeRate = STANDARD_PRICING[serviceCategory]?.Luxe || 1950;

    if (materialStandard === 'Eco') {
      return ecoRate / urbanRate;
    }
    if (materialStandard === 'Luxe') {
      return luxeRate / urbanRate;
    }
    return 1.0;
  }, [materialStandard, serviceCategory]);

  // Check if active DB service has a promotional discount
  const hasDbDiscount = Boolean(
    selectedService?.discountPrice && 
    selectedService.discountPrice > 0 && 
    selectedService.discountPrice < selectedService.startingPrice
  );

  const discountPercentage = useMemo(() => {
    if (!selectedService) return 0;
    if (selectedService.discountPercentage && selectedService.discountPercentage > 0) {
      return selectedService.discountPercentage;
    }
    if (hasDbDiscount && selectedService.discountPrice) {
      return Math.round(((selectedService.startingPrice - selectedService.discountPrice) / selectedService.startingPrice) * 100);
    }
    return 0;
  }, [selectedService, hasDbDiscount]);

  // Dynamic Calculation Logic
  const calculation = useMemo(() => {
    const baseStartingPrice = selectedService ? selectedService.startingPrice : 500000;
    const baseDiscountPrice = (hasDbDiscount && selectedService?.discountPrice) ? selectedService.discountPrice : baseStartingPrice;

    const nominalArea = serviceCategory === 'Construction' ? 1500 : 1000;
    const currentArea = serviceCategory === 'Residential' 
      ? carpetArea 
      : serviceCategory === 'Commercial' 
      ? commCarpetArea 
      : constPlotArea;
    const areaMultiplier = currentArea / nominalArea;

    const originalTotal = Math.round(baseStartingPrice * standardMultiplier * areaMultiplier);
    const finalTotal = Math.round(baseDiscountPrice * standardMultiplier * areaMultiplier);

    const estDays = serviceCategory === 'Construction' 
      ? Math.max(90, Math.round(constPlotArea / 25) + (materialStandard === 'Luxe' ? 40 : 20))
      : serviceCategory === 'Commercial'
      ? Math.max(35, Math.round(commCarpetArea / 60) + (materialStandard === 'Luxe' ? 20 : 10))
      : Math.max(30, Math.round(carpetArea / 40) + (materialStandard === 'Luxe' ? 15 : 5));

    return {
      originalTotal,
      totalCost: finalTotal,
      hasDiscount: hasDbDiscount,
      discountPercentage,
      estDays,
      civilCost: Math.round(finalTotal * (serviceCategory === 'Construction' ? 0.50 : serviceCategory === 'Commercial' ? 0.25 : 0.20)),
      carpentryCost: Math.round(finalTotal * (serviceCategory === 'Construction' ? 0.20 : serviceCategory === 'Commercial' ? 0.40 : 0.45)),
      electricalCost: Math.round(finalTotal * (serviceCategory === 'Construction' ? 0.12 : serviceCategory === 'Commercial' ? 0.18 : 0.15)),
      ceilingCost: Math.round(finalTotal * (serviceCategory === 'Construction' ? 0.08 : serviceCategory === 'Commercial' ? 0.07 : 0.10)),
      furnishingCost: Math.round(finalTotal * (serviceCategory === 'Construction' ? 0.10 : serviceCategory === 'Commercial' ? 0.10 : 0.10))
    };
  }, [
    serviceCategory, 
    materialStandard,
    standardMultiplier,
    carpetArea,
    commCarpetArea,
    constPlotArea,
    hasDbDiscount,
    selectedService,
    discountPercentage
  ]);

  // Lead Submission & Scheduling State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isEmiRequested, setIsEmiRequested] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  if (!isBookingOpen) return null;

  const currentActiveArea = serviceCategory === 'Residential' 
    ? carpetArea 
    : serviceCategory === 'Commercial' 
    ? commCarpetArea 
    : constPlotArea;

  const handleCategoryChange = (cat: 'Residential' | 'Commercial' | 'Construction') => {
    setServiceCategory(cat);
    if (cat === 'Construction') {
      setConstPlotArea(1500);
    } else if (cat === 'Commercial') {
      setCommCarpetArea(1000);
    } else {
      setCarpetArea(1000);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !preferredDate) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    const bookingId = `D8I-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedBookingId(bookingId);

    const serviceTitle = selectedService ? selectedService.title : `${serviceCategory} Package`;
    const budgetRange = isCustomArchitecture
      ? 'Custom Architecture Consultation / Bespoke Proposal'
      : `₹ ${(calculation.totalCost / 100000).toFixed(2)} Lakhs (${currentActiveArea.toLocaleString()} sq.ft • ${materialStandard} Standard)`;

    const reqNotes = isCustomArchitecture
      ? `Custom Architecture Consultation Request. Package: ${serviceTitle} | Material Tier: ${materialStandard} Standard | Target Area: ${currentActiveArea.toLocaleString()} Sq. Ft.${requirements ? ` | Notes: ${requirements}` : ''}${isEmiRequested ? ' | Stage-Wise Financing Requested' : ''}`
      : `${requirements ? `${requirements} | ` : ''}Selected Package: ${serviceTitle} | Material Standard: ${materialStandard} Standard | Target Area: ${currentActiveArea.toLocaleString()} Sq. Ft. | Calculated Estimate: ₹ ${(calculation.totalCost / 100000).toFixed(2)} Lakhs${hasDbDiscount ? ` (${discountPercentage}% Promotional Discount Applied)` : ''}${isEmiRequested ? ' | 0% EMI Financing (Up to 60 Mos) Requested' : ''}`;

    submitBooking({
      clientName,
      clientEmail,
      clientPhone,
      serviceType: serviceCategory,
      packageName: isCustomArchitecture 
        ? `${serviceTitle} (Bespoke Scope)` 
        : `${serviceTitle} (${materialStandard} Standard)`,
      preferredDate,
      floorPlanUrl: uploadedFileName ? `https://decor8india.com/uploads/${uploadedFileName}` : undefined,
      requirements: reqNotes,
      carpetArea: currentActiveArea,
      budgetRange,
      estimatedCost: isCustomArchitecture ? 0 : calculation.totalCost,
      isEmiRequested
    });

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsBookingOpen(false);
    setSelectedServiceForBooking(null);
    setIsSuccess(false);
    setStep(1);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#0D0E12] border border-[#D4AF37]/40 rounded-3xl p-5 sm:p-8 max-h-[94vh] overflow-y-auto space-y-6 shadow-2xl animate-in zoom-in-95">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            {/* Header */}
            <div className="space-y-1.5 text-center relative z-10">
              <div className="flex items-center justify-center space-x-2.5 mx-auto mb-1">
                <img src="/logo_icon.png" alt="Decor8 India" className="h-8 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]" />
                <span className="text-lg font-serif tracking-wider text-white font-bold">
                  DECOR8<span className="text-[#D4AF37]">INDIA</span>
                </span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full glass-panel border border-[#D4AF37]/30 text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] block w-max mx-auto">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Cost Estimator & Consultation Booking</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Turnkey Architectural Cost Estimator
              </h2>
              <p className="text-xs text-neutral-400 max-w-2xl mx-auto font-light">
                Configure your service package, carpet area, and material specifications for an accurate instant budget estimate before scheduling your consultation.
              </p>
            </div>

            {/* Step Progress Bar */}
            <div className="flex items-center justify-center space-x-4 text-xs font-mono pt-1">
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className={`flex items-center space-x-2 transition-colors ${step >= 1 ? 'text-[#D4AF37]' : 'text-neutral-500'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-[#D4AF37] text-black' : 'bg-neutral-800'}`}>1</span>
                <span>1. Estimate & Package Scope</span>
              </button>
              <div className="w-8 h-px bg-white/20"></div>
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className={`flex items-center space-x-2 transition-colors ${step >= 2 ? 'text-[#D4AF37]' : 'text-neutral-500'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-[#D4AF37] text-black' : 'bg-neutral-800'}`}>2</span>
                <span>2. Contact & Schedule Date</span>
              </button>
            </div>

            {/* STEP 1: Full-featured Cost Estimator */}
            {step === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 animate-in fade-in">
                
                {/* Left Column: Category Tabs, Service Packages, Material Standards, Carpet Area Slider */}
                <div className="lg:col-span-7 space-y-5">
                  
                  {/* Category Switcher Tabs */}
                  <div className="flex rounded-2xl bg-black/60 p-1.5 border border-white/10 shadow-inner">
                    <button
                      type="button"
                      onClick={() => handleCategoryChange('Residential')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                        serviceCategory === 'Residential' ? 'gold-gradient-bg text-black shadow-lg font-extrabold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Home className="w-4 h-4" />
                      <span>Residential</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange('Commercial')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                        serviceCategory === 'Commercial' ? 'gold-gradient-bg text-black shadow-lg font-extrabold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Commercial</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCategoryChange('Construction')}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                        serviceCategory === 'Construction' ? 'gold-gradient-bg text-black shadow-lg font-extrabold' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <HardHat className="w-4 h-4" />
                      <span>Construction</span>
                    </button>
                  </div>

                  {/* Choose Service Package Grid */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center space-x-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Choose Service Package</span>
                      </label>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {activeCategoryServices.length} {serviceCategory} Packages
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeCategoryServices.map((srv) => {
                        const isSelected = selectedServiceId === srv.id;
                        const hasDiscount = Boolean(srv.discountPrice && srv.discountPrice > 0 && srv.discountPrice < srv.startingPrice);
                        const discountPct = srv.discountPercentage || (hasDiscount ? Math.round(((srv.startingPrice - (srv.discountPrice || 0)) / srv.startingPrice) * 100) : 0);
                        
                        // Effective calculated starting prices for the standard tier
                        const effectiveOriginalPrice = Math.round(srv.startingPrice * standardMultiplier);
                        const effectiveDiscountedPrice = Math.round((hasDiscount && srv.discountPrice ? srv.discountPrice : srv.startingPrice) * standardMultiplier);
                        const standardLabel = materialStandard;

                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setSelectedServiceId(srv.id)}
                            className={`p-3 rounded-xl border text-left transition-all relative cursor-pointer ${
                              isSelected
                                ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-xl ring-1 ring-[#D4AF37]/60'
                                : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1.5">
                              <div className="font-bold text-xs text-white leading-snug">{srv.title}</div>
                              {hasDiscount && (
                                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold border border-emerald-500/40 shrink-0">
                                  {discountPct}% OFF
                                </span>
                              )}
                            </div>

                            {isCustomArchitectureService(srv) ? (
                              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/10">
                                <span className="text-[9px] text-[#D4AF37] font-mono font-semibold flex items-center space-x-1">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  <span>Bespoke Scope</span>
                                </span>
                                <span className="text-[11px] font-bold text-amber-400 font-sans">
                                  Custom Quote on Consultation
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-baseline justify-between mt-2 pt-1.5 border-t border-white/10">
                                <span className="text-[9px] text-neutral-400 font-mono">From ({standardLabel}):</span>
                                <div className="flex items-baseline space-x-1.5">
                                  {hasDiscount && (
                                    <span className="text-[9px] text-neutral-500 line-through font-mono">
                                      ₹ {(effectiveOriginalPrice / 100000).toFixed(2)}L
                                    </span>
                                  )}
                                  <span className="text-xs font-bold font-serif text-[#D4AF37]">
                                    ₹ {(effectiveDiscountedPrice / 100000).toFixed(2)} Lakhs
                                  </span>
                                </div>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Material & Hardware Standard Selector (Eco / Urban / Luxe) */}
                  <div className="space-y-3 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                        Material & Hardware Standard
                      </label>
                      <span className="text-[10px] text-neutral-400 font-mono font-medium">Specification Tier</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {MATERIAL_STANDARDS.map((std) => (
                        <button
                          key={std.id}
                          type="button"
                          onClick={() => setMaterialStandard(std.id)}
                          className={`p-3 rounded-xl text-center border transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer ${
                            materialStandard === std.id 
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg ring-1 ring-[#D4AF37]/50' 
                              : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-bold text-white leading-tight">{std.badge}</div>
                          <div className="text-[10px] text-neutral-400 line-clamp-1">{std.title}</div>
                        </button>
                      ))}
                    </div>

                    {/* Standard Specifications Summary Box */}
                    <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs space-y-2 text-neutral-300 font-light">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#D4AF37] font-semibold text-xs pb-1.5 border-b border-white/10">
                        <div className="flex items-center space-x-1.5 min-w-0">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate text-xs">{selectedStandardDetail.badge} — Specifications</span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-300 font-medium bg-white/5 px-2 py-0.5 rounded border border-white/10 shrink-0">
                          {selectedStandardDetail.title}
                        </span>
                      </div>
                      {serviceCategory === 'Construction' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                          <div><strong className="text-white">Steel Rebars:</strong> {(selectedStandardDetail as ConstructionStandardDetail).steelGrade}</div>
                          <div><strong className="text-white">Cement Grade:</strong> {(selectedStandardDetail as ConstructionStandardDetail).cementBrand}</div>
                          <div><strong className="text-white">Bricks/Blocks:</strong> {(selectedStandardDetail as ConstructionStandardDetail).bricksBlocks}</div>
                          <div><strong className="text-white">Concrete Mix:</strong> {(selectedStandardDetail as ConstructionStandardDetail).concreteMix}</div>
                          <div><strong className="text-white">Waterproofing:</strong> {(selectedStandardDetail as ConstructionStandardDetail).waterproofing}</div>
                          <div><strong className="text-white">Plumbing/Piping:</strong> {(selectedStandardDetail as ConstructionStandardDetail).plumbingPiping}</div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                          <div><strong className="text-white">Plywood:</strong> {(selectedStandardDetail as MaterialStandardDetail).plywoodGrade}</div>
                          <div><strong className="text-white">Hardware:</strong> {(selectedStandardDetail as MaterialStandardDetail).hardwareBrand}</div>
                          <div><strong className="text-white">Finish:</strong> {(selectedStandardDetail as MaterialStandardDetail).laminateFinish}</div>
                          <div><strong className="text-white">Countertop:</strong> {(selectedStandardDetail as MaterialStandardDetail).countertop}</div>
                          <div><strong className="text-white">Paints:</strong> {(selectedStandardDetail as MaterialStandardDetail).paint}</div>
                          <div><strong className="text-white">Electricals:</strong> {(selectedStandardDetail as MaterialStandardDetail).electrical}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Carpet Area Slider */}
                  <div className="space-y-3 p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/10">
                    {serviceCategory === 'Residential' ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-neutral-300 uppercase tracking-wider flex items-center space-x-1.5">
                            <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Residential Carpet Area (250 – 10,000 Sq. Ft.)</span>
                          </span>
                          <span className="text-[#D4AF37] font-bold text-sm font-mono bg-white/5 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                            {carpetArea.toLocaleString()} Sq. Ft.
                          </span>
                        </div>
                        <input 
                          type="range" 
                          min="250" 
                          max="10000" 
                          step="50" 
                          value={carpetArea} 
                          onChange={(e) => setCarpetArea(Number(e.target.value))}
                          className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                        />
                        <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                          <span>250 Sq. Ft.</span>
                          <span>5,000 Sq. Ft.</span>
                          <span>10,000 Sq. Ft.</span>
                        </div>
                      </div>
                    ) : serviceCategory === 'Commercial' ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-neutral-300 uppercase tracking-wider flex items-center space-x-1.5">
                            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Commercial Carpet Area (500 – 20,000 Sq. Ft.)</span>
                          </span>
                          <span className="text-[#D4AF37] font-bold text-sm font-mono bg-white/5 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                            {commCarpetArea.toLocaleString()} Sq. Ft.
                          </span>
                        </div>
                        <input 
                          type="range" 
                          min="500" 
                          max="20000" 
                          step="250" 
                          value={commCarpetArea} 
                          onChange={(e) => setCommCarpetArea(Number(e.target.value))}
                          className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                        />
                        <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                          <span>500 Sq. Ft.</span>
                          <span>10,000 Sq. Ft.</span>
                          <span>20,000 Sq. Ft.</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-neutral-300 uppercase tracking-wider flex items-center space-x-1.5">
                            <HardHat className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Construction Carpet / Built-Up Area (1,000 – 30,000 Sq. Ft.)</span>
                          </span>
                          <span className="text-[#D4AF37] font-bold text-sm font-mono bg-white/5 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                            {constPlotArea.toLocaleString()} Sq. Ft.
                          </span>
                        </div>
                        <input 
                          type="range" 
                          min="1000" 
                          max="30000" 
                          step="100" 
                          value={constPlotArea} 
                          onChange={(e) => setConstPlotArea(Number(e.target.value))}
                          className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                        />
                        <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                          <span>1,000 Sq. Ft.</span>
                          <span>15,000 Sq. Ft.</span>
                          <span>30,000 Sq. Ft.</span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Right Column: Instant Estimate Summary Card */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-6 sm:p-7 rounded-3xl glass-panel-gold border border-[#D4AF37]/40 space-y-5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

                    {/* Summary Card Header */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                          {isCustomArchitecture ? 'Bespoke Architecture Scope' : 'Instant Estimate Summary'}
                        </span>
                        {!isCustomArchitecture && hasDbDiscount && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/40 flex items-center space-x-1">
                            <Tag className="w-3 h-3" />
                            <span>{discountPercentage}% OFF APPLIED</span>
                          </span>
                        )}
                        {isCustomArchitecture && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/40 flex items-center space-x-1">
                            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                            <span>CONSULTATION BASED</span>
                          </span>
                        )}
                      </div>

                      {/* Main Price Headline */}
                      {isCustomArchitecture ? (
                        <div className="space-y-1">
                          <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">
                            Custom Proposal
                          </div>
                          <div className="text-xs text-neutral-400 font-light">
                            Architectural drawing, structural engineering & BOQ scope quoted post site visit.
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-baseline space-x-2">
                          <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-400">
                            ₹ {(calculation.totalCost / 100000).toFixed(2)}
                            <span className="text-emerald-400 text-lg align-top">*</span>
                          </span>
                          <span className="text-lg font-serif text-[#D4AF37]">Lakhs</span>
                          {hasDbDiscount && (
                            <span className="text-sm font-mono text-neutral-500 line-through ml-1">
                              ₹ {(calculation.originalTotal / 100000).toFixed(2)} L
                            </span>
                          )}
                        </div>
                      )}

                      {/* Selected Package Details */}
                      <div className="text-xs text-neutral-300 font-medium">
                        Selected Package: <strong className="text-white">{selectedService?.title || `${serviceCategory} Package`}</strong> ({materialStandard} Standard)
                      </div>

                      {/* Turnkey Timeline */}
                      <div className="flex items-center space-x-2 text-xs text-neutral-300 font-mono pt-1">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Estimated Turnkey Timeline: <strong className="text-white">{calculation.estDays} Days</strong></span>
                      </div>

                      <div className="text-[10px] text-neutral-400 font-light italic flex items-center justify-between pt-1">
                        <span>* Primary estimation. Prices finalized post site inspection.</span>
                        <span className="text-[#D4AF37] not-italic flex items-center space-x-0.5">
                          <span>T&C Apply</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>

                    {/* Easy EMI Card */}
                    <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 flex items-center space-x-3 text-xs">
                      <div className="p-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37]">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white">Easy EMI Financing Available</span>
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold font-mono">
                            UP TO 60 MONTHS
                          </span>
                        </div>
                        <div className="text-[10px] text-neutral-400 leading-tight">
                          Pay in flexible monthly installments through partner banking networks with zero pre-closure charges.
                        </div>
                      </div>
                    </div>

                    {/* Turnkey Inclusions Checklist */}
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-300">
                        Turnkey Package Inclusions:
                      </div>
                      <div className="space-y-1.5 text-xs text-neutral-300 font-light">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Free Technical Site Visit & Consultation</span>
                          </span>
                          <span className="text-emerald-400 font-mono text-[10px] font-bold">100% Free</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>3D Architectural Design & Virtual Walkthrough</span>
                          </span>
                          <span className="text-emerald-400 font-mono text-[10px] font-bold">100% Free</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Factory-Crafted Modular Woodwork & Hardware</span>
                          </span>
                          <span className="text-[#D4AF37] font-mono text-[10px] font-bold">Included</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Dedicated On-Site Project Architect</span>
                          </span>
                          <span className="text-[#D4AF37] font-mono text-[10px] font-bold">Included</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>10-Year Comprehensive Warranty</span>
                          </span>
                          <span className="text-[#D4AF37] font-mono text-[10px] font-bold">10 Years</span>
                        </div>
                      </div>
                    </div>

                    {/* Step 1 Action Button */}
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3.5 rounded-2xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center space-x-2 shadow-xl cursor-pointer"
                    >
                      <span>Proceed to Schedule Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                  </div>
                </div>

              </div>
            )}

            {/* STEP 2: Contact Details, Preferred Date & Floor Plan */}
            {step === 2 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4 pt-1 max-w-2xl mx-auto animate-in fade-in">
                
                {/* Configured Package & Budget Summary Badge */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#201D13] via-[#2D2411] to-[#201D13] border border-[#D4AF37]/50 flex items-center justify-between text-xs shadow-lg">
                  <div className="space-y-0.5">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Configured Package Scope</div>
                    <div className="font-bold text-white text-sm">{selectedService?.title || `${serviceCategory} Package`}</div>
                    <div className="text-xs text-[#D4AF37] font-mono font-medium">
                      {materialStandard} Standard • {currentActiveArea.toLocaleString()} Sq. Ft. • {calculation.estDays} Days Est.
                    </div>
                  </div>
                  <div className="text-right space-y-0.5">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Estimated Budget</div>
                    <div className="font-serif font-bold text-base text-emerald-400">
                      {isCustomArchitecture ? 'Bespoke Quote' : `₹ ${(calculation.totalCost / 100000).toFixed(2)} Lakhs`}
                    </div>
                    {hasDbDiscount && !isCustomArchitecture && (
                      <div className="text-[10px] text-neutral-500 line-through font-mono">
                        ₹ {(calculation.originalTotal / 100000).toFixed(2)} L
                      </div>
                    )}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Smita & Kabir Verma"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Phone Number (For WhatsApp Updates) *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98200 11223"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Email & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Email Address (For Client Portal & Estimate) *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="kabir.verma@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Preferred Consultation Date *</label>
                    <input 
                      type="date" 
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Floor Plan Upload (Optional) */}
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Upload Floor Plan or Layout (Optional)</label>
                  <div className="relative border-2 border-dashed border-white/15 hover:border-[#D4AF37] rounded-2xl p-4 text-center bg-black/40 transition-colors">
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg,.dwg"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                    <div className="text-xs text-neutral-300 font-medium">
                      {uploadedFileName ? (
                        <span className="text-[#D4AF37] font-bold">{uploadedFileName} uploaded</span>
                      ) : (
                        <span>Drag & drop or click to upload PDF/CAD layout</span>
                      )}
                    </div>
                    <div className="text-[10px] text-neutral-500">Supported: PDF, JPG, PNG, CAD Layouts (Max 25MB)</div>
                  </div>
                </div>

                {/* Project Notes */}
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Project Notes & Specific Requirements</label>
                  <textarea 
                    rows={3}
                    placeholder="Provide details about your carpet area, preferred interior styles, modular requirements, or timeline..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* EMI Selection Checkbox */}
                <label className="flex items-center space-x-2.5 p-3.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 cursor-pointer hover:bg-[#D4AF37]/20 transition-colors select-none">
                  <input 
                    type="checkbox" 
                    checked={isEmiRequested} 
                    onChange={(e) => setIsEmiRequested(e.target.checked)} 
                    className="w-4 h-4 rounded accent-[#D4AF37] cursor-pointer" 
                  />
                  <span className="text-xs text-white font-medium">
                    Opt for <strong className="text-[#D4AF37]">Easy EMI Financing</strong> (Up to 60 Months with Partner Banks)
                  </span>
                </label>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3.5 rounded-2xl bg-white/10 text-neutral-300 font-semibold text-xs hover:text-white cursor-pointer transition-colors"
                  >
                    Back to Estimate
                  </button>

                  <button
                    type="submit"
                    className="w-2/3 py-3.5 rounded-2xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-xl cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Consultation Booking</span>
                  </button>
                </div>

              </form>
            )}
          </>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-8 space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest font-bold">Booking Request #{generatedBookingId}</span>
              <h2 className="text-3xl font-serif font-bold text-white">Consultation Scheduled Successfully!</h2>
              <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                Your consultation request for <strong className="text-white">{selectedService?.title || `${serviceCategory} Package`}</strong> is received. Our senior architect will review your project requirements and confirm your appointment.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 text-left text-xs text-neutral-300 space-y-2.5 max-w-lg mx-auto shadow-lg">
              <div className="flex items-center space-x-2 text-[#D4AF37] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Next Steps:</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-neutral-400 text-[11px]">
                <li>Our senior architect will review your layout and carpet area within 4 hours.</li>
                <li>You will receive a confirmation call on <strong className="text-white font-mono">{clientPhone}</strong>.</li>
                <li>Upon admin approval, login access to the Client Portal will be issued to <strong className="text-white font-mono">{clientEmail}</strong>.</li>
                <li className="pt-1 text-[#D4AF37]">Need immediate assistance? Call: <a href="tel:+919380523743" className="underline font-mono">+91 93805 23743</a> or Email: <a href="mailto:support@decor8india.com" className="underline font-mono">support@decor8india.com</a></li>
              </ul>
            </div>

            <button 
              onClick={handleClose}
              className="px-8 py-3.5 rounded-2xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider cursor-pointer shadow-xl hover:opacity-90"
            >
              Done & Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
