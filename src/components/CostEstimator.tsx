import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MATERIAL_STANDARDS, CONSTRUCTION_STANDARDS, STANDARD_PRICING } from '../data/initialData';
import type { MaterialStandardDetail, ConstructionStandardDetail } from '../data/initialData';
import type { ServiceItem } from '../types';
import { 
  Calculator, 
  Home, 
  Building2, 
  CheckCircle2, 
  X, 
  FileText, 
  HardHat, 
  ShieldCheck, 
  CreditCard,
  Sparkles,
  Tag,
  Clock,
  ExternalLink
} from 'lucide-react';


interface CostEstimatorProps {
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const isCustomArchitectureService = (service?: ServiceItem | null) => {
  if (!service) return false;
  const title = (service.title || '').toLowerCase();
  const id = (service.id || '').toLowerCase();
  return id === 'res-custom' || 
         title.includes('custom residential architecture') || 
         (title.includes('custom') && title.includes('architecture')) ||
         title === 'residential architecture';
};

export const CostEstimator: React.FC<CostEstimatorProps> = ({ isModal = false, onCloseModal }) => {
  const { services, submitBooking } = useApp();

  const [serviceCategory, setServiceCategory] = useState<'Residential' | 'Commercial' | 'Construction'>('Residential');
  
  // Material & Hardware Standard Tier (Default: Eco Essential)
  const [materialStandard, setMaterialStandard] = useState<'Eco' | 'Urban' | 'Luxe'>('Eco');

  // DB-Connected Service Selection
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

  const selectedService: ServiceItem | undefined = useMemo(() => {
    return activeCategoryServices.find(s => s.id === selectedServiceId) || activeCategoryServices[0];
  }, [activeCategoryServices, selectedServiceId]);

  const isCustomArchitecture = useMemo(() => {
    return isCustomArchitectureService(selectedService);
  }, [selectedService]);

  // Sliders State (Default set to 1,500 Sq. Ft. for Construction, 1,000 for Residential/Commercial)
  const [carpetArea, setCarpetArea] = useState<number>(1000);
  const [commCarpetArea, setCommCarpetArea] = useState<number>(1000);
  const [constPlotArea, setConstPlotArea] = useState<number>(1500);

  // Lead Submission State & EMI Option
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isEmiRequested, setIsEmiRequested] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedStandardDetail = useMemo(() => {
    if (serviceCategory === 'Construction') {
      return CONSTRUCTION_STANDARDS.find(m => m.id === materialStandard) || CONSTRUCTION_STANDARDS[0];
    }
    return MATERIAL_STANDARDS.find(m => m.id === materialStandard) || MATERIAL_STANDARDS[0];
  }, [materialStandard, serviceCategory]);

  // Standard Multiplier derived directly from official STANDARD_PRICING for the active category
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

  // Dynamic Calculation Logic: Direct alignment with selected service package & slider area
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

  const handleSubmitEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert('Please fill in all required contact details.');
      return;
    }

    const serviceTitle = selectedService ? selectedService.title : `${serviceCategory} Package`;
    const selectedArea = serviceCategory === 'Residential' ? carpetArea : serviceCategory === 'Commercial' ? commCarpetArea : constPlotArea;

    const budgetRange = isCustomArchitecture
      ? 'Bespoke / Custom Architecture Quote'
      : `₹ ${(calculation.totalCost / 100000).toFixed(2)} Lakhs`;

    const requirements = isCustomArchitecture
      ? `Custom Residential Architecture Consultation Request. Package: ${serviceTitle} | Material Tier: ${materialStandard} Standard | Target Area: ${selectedArea.toLocaleString()} Sq. Ft. | Client requested bespoke architectural design & elevation consultation.${isEmiRequested ? ' | Easy EMI Plan (Up to 60 Months) Requested' : ''}`
      : `Calculated Estimate from Live DB Services. Selected Package: ${serviceTitle} | Material Tier: ${materialStandard} Standard | Area: ${selectedArea.toLocaleString()} Sq. Ft.${hasDbDiscount ? ` | Discount Applied: ${discountPercentage}% OFF (Original: ₹ ${(calculation.originalTotal / 100000).toFixed(2)}L -> Final: ₹ ${(calculation.totalCost / 100000).toFixed(2)}L)` : ''}${isEmiRequested ? ' | Easy EMI Plan (Up to 60 Months) Requested' : ''}`;

    submitBooking({
      clientName,
      clientEmail,
      clientPhone,
      serviceType: serviceCategory,
      packageName: isCustomArchitecture ? `${serviceTitle} (Bespoke Architectural Consultation)` : `${serviceTitle} (${materialStandard} Standard)`,
      propertyType: serviceCategory,
      carpetArea: selectedArea,
      budgetRange,
      preferredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      requirements,
      estimatedCost: isCustomArchitecture ? 0 : calculation.totalCost,
      isEmiRequested
    });

    setIsSubmitted(true);
  };

  const standardLabel = materialStandard === 'Eco' ? 'Eco' : materialStandard === 'Urban' ? 'Urban' : 'Luxe';

  const Content = (
    <div className="space-y-8">
      
      {/* Header inside estimator */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Cost Estimator</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white">
          Calculate Your Instant <span className="gold-gradient-text italic font-normal">Interior Project Budget</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Real-time dynamic cost calculation powered directly by official database service packages, live discounts, and material standard specifications.
        </p>
      </div>

      {/* Main Estimator Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-6">
          
          {/* Category Selector */}
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-black/60 p-1 border border-white/10">
            <button
              onClick={() => setServiceCategory('Residential')}
              className={`py-2 sm:py-2.5 px-1 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 transition-all ${
                serviceCategory === 'Residential' ? 'gold-gradient-bg text-black shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">Residential</span>
            </button>

            <button
              onClick={() => setServiceCategory('Commercial')}
              className={`py-2 sm:py-2.5 px-1 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 transition-all ${
                serviceCategory === 'Commercial' ? 'gold-gradient-bg text-black shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">Commercial</span>
            </button>

            <button
              onClick={() => setServiceCategory('Construction')}
              className={`py-2 sm:py-2.5 px-1 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-1.5 transition-all ${
                serviceCategory === 'Construction' ? 'gold-gradient-bg text-black shadow-md' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <HardHat className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate">Construction</span>
            </button>
          </div>

          {/* Database Service Package Selector - Prices dynamically update with selected material standard */}
          {activeCategoryServices.length > 0 && (
            <div className="space-y-2.5 p-3.5 rounded-xl bg-black/40 border border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-[11px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Choose Service Package</span>
                </label>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {activeCategoryServices.length} {serviceCategory} Packages
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeCategoryServices.map((srv) => {
                  const isSelected = (selectedService?.id === srv.id);
                  const hasDiscount = Boolean(srv.discountPrice && srv.discountPrice > 0 && srv.discountPrice < srv.startingPrice);
                  
                  // Dynamic price calculated according to the currently selected materialStandard
                  const effectiveOriginalPrice = srv.startingPrice * standardMultiplier;
                  const effectiveDiscountedPrice = (hasDiscount ? srv.discountPrice! : srv.startingPrice) * standardMultiplier;
                  const discountPct = srv.discountPercentage || (hasDiscount ? Math.round(((srv.startingPrice - srv.discountPrice!) / srv.startingPrice) * 100) : 0);

                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-2.5 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#D4AF37]/15 border-[#D4AF37] ring-1 ring-[#D4AF37]/50 shadow-md'
                          : 'bg-white/5 border-white/10 hover:border-white/25 text-neutral-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-xs text-white line-clamp-1">{srv.title}</div>
                        {hasDiscount && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold border border-emerald-500/40 shrink-0">
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
          )}

          {/* Material & Hardware Standard Selector (Eco / Urban / Luxe) - Cleaned of per sq ft labels */}
          <div className="space-y-3 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <label className="text-[11px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                Material & Hardware Standard
              </label>
              <span className="text-[9px] sm:text-[10px] text-neutral-400 font-mono font-medium">Specification Tier</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {MATERIAL_STANDARDS.map((std) => (
                <button
                  key={std.id}
                  type="button"
                  onClick={() => setMaterialStandard(std.id)}
                  className={`p-2.5 sm:p-3.5 rounded-xl text-center border transition-all flex flex-col items-center justify-center space-y-1 ${
                    materialStandard === std.id 
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg ring-1 ring-[#D4AF37]/50' 
                      : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">{std.badge}</div>
                  <div className="text-[9px] sm:text-[10px] text-neutral-400 line-clamp-1">{std.title}</div>
                </button>
              ))}
            </div>

            {/* Standard Specs Drawer */}
            <div className="p-2.5 sm:p-3 rounded-lg bg-black/60 border border-white/10 text-xs space-y-2 text-neutral-300 font-light">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[#D4AF37] font-semibold text-xs pb-1.5 border-b border-white/10">
                <div className="flex items-center space-x-1.5 min-w-0">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate text-[11px] sm:text-xs">{selectedStandardDetail.badge} — Specifications</span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] text-neutral-300 font-medium bg-white/5 px-2 py-0.5 rounded border border-white/10 shrink-0 self-start sm:self-auto">
                  {selectedStandardDetail.title}
                </span>
              </div>
              {serviceCategory === 'Construction' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[10px] sm:text-[11px]">
                  <div><strong className="text-white">Steel Rebars:</strong> {(selectedStandardDetail as ConstructionStandardDetail).steelGrade}</div>
                  <div><strong className="text-white">Cement Grade:</strong> {(selectedStandardDetail as ConstructionStandardDetail).cementBrand}</div>
                  <div><strong className="text-white">Bricks/Blocks:</strong> {(selectedStandardDetail as ConstructionStandardDetail).bricksBlocks}</div>
                  <div><strong className="text-white">Concrete Mix:</strong> {(selectedStandardDetail as ConstructionStandardDetail).concreteMix}</div>
                  <div><strong className="text-white">Waterproofing:</strong> {(selectedStandardDetail as ConstructionStandardDetail).waterproofing}</div>
                  <div><strong className="text-white">Plumbing/Piping:</strong> {(selectedStandardDetail as ConstructionStandardDetail).plumbingPiping}</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[10px] sm:text-[11px]">
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
          <div className="space-y-6 pt-2">
            {serviceCategory === 'Residential' ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-neutral-300 uppercase tracking-wider">
                    Residential Carpet Area (250 – 10,000 Sq. Ft.)
                  </span>
                  <span className="text-[#D4AF37] font-bold text-sm">{carpetArea.toLocaleString()} Sq. Ft.</span>
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
                  <span className="font-semibold text-neutral-300 uppercase tracking-wider">
                    Commercial Carpet Area (500 – 20,000 Sq. Ft.)
                  </span>
                  <span className="text-[#D4AF37] font-bold text-sm">{commCarpetArea.toLocaleString()} Sq. Ft.</span>
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
                  <span className="font-semibold text-neutral-300 uppercase tracking-wider">
                    Construction Carpet / Built-Up Area (1,000 – 30,000 Sq. Ft.)
                  </span>
                  <span className="text-[#D4AF37] font-bold text-sm">{constPlotArea.toLocaleString()} Sq. Ft.</span>
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

        {/* Calculation Output & Lead Form Column */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

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

              {isCustomArchitecture ? (
                <div className="space-y-2 pt-1">
                  <div className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-serif font-bold text-[#D4AF37] leading-tight">
                      Custom Architectural Design
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-emerald-400 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Bespoke Proposal Based on Site & Elevation Scope</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/10">
                    Every bespoke residence is unique. Architectural layouts, 3D elevations, structural engineering blueprints, and MEP drawings are tailored to your specific plot dimensions, soil contours, Vasthu preferences, and design vision.
                  </p>

                  {selectedService && (
                    <div className="text-[11px] text-[#D4AF37] font-medium truncate pt-0.5">
                      Selected Service: <strong className="text-white">{selectedService.title}</strong> ({materialStandard} Standard)
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-0.5">
                  <div className="flex items-baseline space-x-3">
                    <div className="text-4xl sm:text-5xl font-serif font-bold text-emerald-400">
                      ₹ {(calculation.totalCost / 100000).toFixed(2)}* <span className="text-2xl font-serif text-[#D4AF37]">Lakhs</span>
                    </div>
                    {hasDbDiscount && (
                      <div className="text-base sm:text-lg text-neutral-500 line-through font-mono font-bold">
                        ₹ {(calculation.originalTotal / 100000).toFixed(2)} L
                      </div>
                    )}
                  </div>

                  {selectedService && (
                    <div className="text-[11px] text-[#D4AF37] font-medium truncate pt-1">
                      Selected Package: <strong className="text-white">{selectedService.title}</strong> ({materialStandard} Standard)
                    </div>
                  )}
                </div>
              )}

              <div className="text-xs text-neutral-400 font-mono pt-1 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>
                  Estimated Turnkey Timeline: <strong className="text-white font-semibold">{selectedService?.estimatedDuration || `${calculation.estDays} Days`}</strong>
                </span>
              </div>

              {/* Terms & Conditions Applied Footnote */}
              <div className="text-[10px] text-neutral-400 italic pt-1.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span>
                  {isCustomArchitecture
                    ? '* Architectural scope and turnkey deliverables are finalized following primary site survey.'
                    : '* This is just a primary estimation. After consultation and site inspection, prices may vary.'}
                </span>
                <a 
                  href="/terms-and-conditions" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="underline text-neutral-300 hover:text-[#D4AF37] transition-colors inline-flex items-center space-x-0.5 font-medium shrink-0"
                >
                  <span>Terms & conditions apply</span>
                  <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" />
                </a>
              </div>
            </div>

            {/* EMI Available Highlighting Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#201D13] via-[#2D2411] to-[#201D13] border border-[#D4AF37]/50 flex items-center space-x-3 text-xs shadow-lg">
              <div className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="font-bold text-white flex items-center space-x-2">
                  <span>{isCustomArchitecture ? 'Stage-Wise Architectural Payment Milestones' : 'Easy EMI Financing Available'}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#D4AF37] text-black font-extrabold uppercase font-mono">
                    {isCustomArchitecture ? 'Stage Wise' : 'Up to 60 Months'}
                  </span>
                </div>
                <div className="text-neutral-300 text-[11px]">
                  {isCustomArchitecture 
                    ? 'Transparent payments aligned with 2D concepts, 3D structural drawings, sanction assistance, and civil milestones.' 
                    : 'Pay in flexible monthly installments up to 60 months through partner banking networks with minimal documentation.'}
                </div>
              </div>
            </div>

            {/* Turnkey Scope & Inclusions Included in this Estimate */}
            <div className="space-y-2.5 pt-2 border-t border-[#D4AF37]/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">
                  {isCustomArchitecture ? 'Architectural Inclusions:' : 'Turnkey Package Inclusions:'}
                </span>
                <span className="text-[10px] text-[#D4AF37] font-mono font-semibold">
                  {materialStandard} Standard
                </span>
              </div>
              
              {isCustomArchitecture ? (
                <div className="grid grid-cols-1 gap-1.5 text-xs text-neutral-300">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Free In-Person Site Inspection & Plot Contour Analysis</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Free</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Custom 3D Elevation Modeling & VR Walkthrough</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Free</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Comprehensive Structural, Civil & MEP Drawings</span>
                    </span>
                    <span className="text-[10px] text-[#D4AF37] font-mono font-semibold">Included</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Vasthu-Compliant & Climate-Responsive Space Planning</span>
                    </span>
                    <span className="text-[10px] text-[#D4AF37] font-mono font-semibold">Included</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Dedicated Principal Architect & Senior Project Lead</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-semibold">Assigned</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>End-to-End Turnkey Execution & 15-Year Structural Warranty</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">15 Years Assured</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-1.5 text-xs text-neutral-300">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Free Technical Site Visit & Consultation</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Free</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>3D Architectural Design & Virtual Walkthrough</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Free</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Factory-Crafted Modular Woodwork & Hardware</span>
                    </span>
                    <span className="text-[10px] text-[#D4AF37] font-mono font-semibold">Included</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Dedicated Project Manager & On-Site Audits</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-semibold">Included</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>1 Year Free Service & Maintenance Support</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">100% Free</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                    <span className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>15-Year Warranty & Zero Hidden Cost Guarantee</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">15 Years Assured</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Request Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmitEstimate} className="space-y-3 pt-4 border-t border-[#D4AF37]/20">
                <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  {isCustomArchitecture ? 'Request Architectural Consultation & BOQ' : 'Save Estimate & Get Official Quotation'}
                </div>

                <input 
                  type="text" 
                  placeholder="Your Full Name *" 
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input 
                    type="email" 
                    placeholder="Email Address *" 
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <input 
                    type="tel" 
                    placeholder="Phone Number *" 
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* EMI Checkbox */}
                <label className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-black/50 border border-white/10 cursor-pointer hover:border-[#D4AF37]/50 transition-colors select-none">
                  <input 
                    type="checkbox" 
                    checked={isEmiRequested} 
                    onChange={(e) => setIsEmiRequested(e.target.checked)} 
                    className="w-4 h-4 rounded accent-[#D4AF37] cursor-pointer" 
                  />
                  <span className="text-[11px] text-neutral-200 font-medium">
                    I am interested in <strong className="text-[#D4AF37]">Easy EMI Financing</strong> (Up to 60 Months) for this project
                  </span>
                </label>

                {/* Terms & Conditions Notice Mention above Submit Button */}
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[10.5px] text-amber-300/90 leading-snug">
                  <span className="font-bold text-amber-300">ℹ️ Important Notice:</span> This is just a primary estimation. After consultation, site measurements, and scope finalization, prices may vary. Please read our{' '}
                  <a 
                    href="/terms-and-conditions" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline font-bold text-amber-200 hover:text-white transition-colors cursor-pointer inline-flex items-center space-x-0.5"
                  >
                    <span>Terms & Conditions</span>
                    <ExternalLink className="w-2.5 h-2.5 inline ml-0.5" />
                  </a>{' '}
                  properly before submitting.
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-lg shadow-[#D4AF37]/10"
                >
                  <FileText className="w-4 h-4" />
                  <span>{isCustomArchitecture ? 'Request Architectural Consultation & BOQ' : 'Submit Estimate Request'}</span>
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="text-sm font-bold text-white">Estimate Submitted Successfully!</div>
                <p className="text-xs text-neutral-300">
                  Our principal architect will review your configuration and email the detailed itemized BOQ PDF within 2 hours.
                </p>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    if (onCloseModal) onCloseModal();
                  }}
                  className="text-xs text-[#D4AF37] underline pt-1 font-semibold block mx-auto"
                >
                  Calculate Another Estimate
                </button>
              </div>
            )}


          </div>

        </div>

      </div>

    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <div className="relative w-full max-w-5xl bg-[#0D0E12] border border-white/10 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
          <button 
            onClick={onCloseModal} 
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          {Content}
        </div>
      </div>
    );
  }

  return (
    <section id="estimator" className="py-24 bg-[#0B0C0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {Content}
      </div>
    </section>
  );
};
