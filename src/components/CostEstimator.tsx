import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MATERIAL_STANDARDS, CONSTRUCTION_STANDARDS, STANDARD_PRICING } from '../data/initialData';
import type { MaterialStandardDetail, ConstructionStandardDetail } from '../data/initialData';
import { 
  Calculator, 
  Home, 
  Building2, 
  CheckCircle2, 
  X,
  FileText,
  HardHat,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

interface CostEstimatorProps {
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ isModal = false, onCloseModal }) => {
  const { submitBooking } = useApp();

  const [serviceCategory, setServiceCategory] = useState<'Residential' | 'Commercial' | 'Construction'>('Residential');
  
  // Material & Hardware Standard Tier
  const [materialStandard, setMaterialStandard] = useState<'Eco' | 'Urban' | 'Luxe'>('Urban');

  // Residential State
  const [propertyType, setPropertyType] = useState<'Apartment' | 'Villa' | 'Penthouse' | 'Duplex'>('Apartment');
  const [bhkSize, setBhkSize] = useState<'1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | 'Grand Villa'>('3 BHK');
  const [carpetArea, setCarpetArea] = useState<number>(1600);

  // Commercial State
  const [commercialType, setCommercialType] = useState<'Office' | 'Retail' | 'Restaurant' | 'Hotel' | 'Clinic' | 'Showroom'>('Office');
  const [commCarpetArea, setCommCarpetArea] = useState<number>(3500);

  // Construction State
  const [constructionType, setConstructionType] = useState<'Turnkey Villa' | 'Commercial Structure' | 'Floor Extension'>('Turnkey Villa');
  const [constPlotArea, setConstPlotArea] = useState<number>(2400);

  // Lead Submission State & EMI Option
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [isEmiRequested, setIsEmiRequested] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedStandardDetail = useMemo(() => {
    if (serviceCategory === 'Construction') {
      return CONSTRUCTION_STANDARDS.find(m => m.id === materialStandard) || CONSTRUCTION_STANDARDS[1];
    }
    return MATERIAL_STANDARDS.find(m => m.id === materialStandard) || MATERIAL_STANDARDS[1];
  }, [materialStandard, serviceCategory]);

  // Current Rate per sq ft based on Category + Standard
  const currentRatePerSqFt = useMemo(() => {
    return STANDARD_PRICING[serviceCategory][materialStandard];
  }, [serviceCategory, materialStandard]);

  // Calculation Logic
  const calculation = useMemo(() => {
    const rate = currentRatePerSqFt;

    if (serviceCategory === 'Residential') {
      let baseRatePerSqFt = rate;

      if (bhkSize === '1 BHK') baseRatePerSqFt *= 0.95;
      if (bhkSize === '2 BHK') baseRatePerSqFt *= 1.0;
      if (bhkSize === '3 BHK') baseRatePerSqFt *= 1.08;
      if (bhkSize === '4 BHK') baseRatePerSqFt *= 1.15;
      if (bhkSize === 'Grand Villa') baseRatePerSqFt *= 1.25;

      let propMultiplier = 1.0;
      if (propertyType === 'Villa') propMultiplier = 1.1;
      if (propertyType === 'Penthouse') propMultiplier = 1.18;
      if (propertyType === 'Duplex') propMultiplier = 1.12;

      const totalCost = Math.round(carpetArea * baseRatePerSqFt * propMultiplier);
      const estDays = Math.max(30, Math.round(carpetArea / 40) + (materialStandard === 'Luxe' ? 20 : 10));

      return {
        totalCost,
        estDays,
        civilCost: Math.round(totalCost * 0.20),
        carpentryCost: Math.round(totalCost * 0.45),
        electricalCost: Math.round(totalCost * 0.15),
        ceilingCost: Math.round(totalCost * 0.10),
        furnishingCost: Math.round(totalCost * 0.10)
      };
    } else if (serviceCategory === 'Commercial') {
      let baseRate = rate;
      if (commercialType === 'Office') baseRate *= 1.0;
      if (commercialType === 'Retail') baseRate *= 1.08;
      if (commercialType === 'Restaurant') baseRate *= 1.2;
      if (commercialType === 'Hotel') baseRate *= 1.3;
      if (commercialType === 'Clinic') baseRate *= 1.05;
      if (commercialType === 'Showroom') baseRate *= 1.15;

      const totalCost = Math.round(commCarpetArea * baseRate);
      const estDays = Math.max(35, Math.round(commCarpetArea / 60) + 15);

      return {
        totalCost,
        estDays,
        civilCost: Math.round(totalCost * 0.25),
        carpentryCost: Math.round(totalCost * 0.40),
        electricalCost: Math.round(totalCost * 0.18),
        ceilingCost: Math.round(totalCost * 0.07),
        furnishingCost: Math.round(totalCost * 0.10)
      };
    } else {
      // Construction Category
      let constRate = rate;
      if (constructionType === 'Turnkey Villa') constRate *= 1.0;
      if (constructionType === 'Commercial Structure') constRate *= 1.15;
      if (constructionType === 'Floor Extension') constRate *= 0.9;

      const totalCost = Math.round(constPlotArea * constRate);
      const estDays = Math.max(90, Math.round(constPlotArea / 25) + 30);

      return {
        totalCost,
        estDays,
        civilCost: Math.round(totalCost * 0.50),
        carpentryCost: Math.round(totalCost * 0.20),
        electricalCost: Math.round(totalCost * 0.12),
        ceilingCost: Math.round(totalCost * 0.08),
        furnishingCost: Math.round(totalCost * 0.10)
      };
    }
  }, [serviceCategory, currentRatePerSqFt, bhkSize, propertyType, carpetArea, commercialType, commCarpetArea, constructionType, constPlotArea, materialStandard]);

  const handleSubmitEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert('Please fill in all required contact details.');
      return;
    }

    submitBooking({
      clientName,
      clientEmail,
      clientPhone,
      serviceType: serviceCategory,
      packageName: serviceCategory === 'Residential' ? `${bhkSize} (${propertyType})` : `${commercialType} Fitout`,
      propertyType: serviceCategory === 'Residential' ? propertyType : commercialType,
      bhkSize: serviceCategory === 'Residential' ? bhkSize : undefined,
      carpetArea: serviceCategory === 'Residential' ? carpetArea : commCarpetArea,
      budgetRange: `₹ ${(calculation.totalCost / 100000).toFixed(2)} Lakhs`,
      preferredDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      requirements: `Instant Cost Estimate Request for ${serviceCategory} (${materialStandard} Standard). Total Estimated: ₹ ${calculation.totalCost.toLocaleString('en-IN')}${isEmiRequested ? ' | Easy EMI Plan (Up to 60 Months) Requested' : ''}`,
      estimatedCost: calculation.totalCost,
      isEmiRequested
    });

    setIsSubmitted(true);
  };

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
          Get an accurate cost breakdown and timeline estimate tailored to your exact carpet area and material standards.
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

          {/* Material & Hardware Standard Selector (Eco / Urban / Luxe) */}
          <div className="space-y-3 p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between">
              <label className="text-[11px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                Material & Hardware Standard
              </label>
              <span className="text-[9px] sm:text-[10px] text-neutral-400 font-mono font-medium">Specification Tier</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {MATERIAL_STANDARDS.map((std) => {
                const rate = STANDARD_PRICING[serviceCategory][std.id];
                return (
                  <button
                    key={std.id}
                    onClick={() => setMaterialStandard(std.id)}
                    className={`p-2 sm:p-3 rounded-xl text-center border transition-all flex flex-col justify-between ${
                      materialStandard === std.id 
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg ring-1 ring-[#D4AF37]/50' 
                        : 'bg-black/40 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] sm:text-xs font-bold text-white leading-tight">{std.badge}</div>
                      <div className="text-[9px] sm:text-[10px] text-[#D4AF37] font-mono mt-0.5 font-bold whitespace-nowrap">₹ {rate}/sq.ft</div>
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-neutral-400 mt-1 line-clamp-1">{std.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Standard Specs Drawer */}
            <div className="p-2.5 sm:p-3 rounded-lg bg-black/60 border border-white/10 text-xs space-y-2 text-neutral-300 font-light">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[#D4AF37] font-semibold text-xs pb-1.5 border-b border-white/10">
                <div className="flex items-center space-x-1.5 min-w-0">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate text-[11px] sm:text-xs">{selectedStandardDetail.badge} — Specifications</span>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] text-white font-bold bg-[#D4AF37]/20 px-2 py-0.5 rounded border border-[#D4AF37]/40 shrink-0 self-start sm:self-auto">
                  ₹ {currentRatePerSqFt} / sq. ft. ({serviceCategory})
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

          {serviceCategory === 'Residential' ? (
            /* Residential Inputs */
            <div className="space-y-6">
              
              {/* BHK Size */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">1. Property BHK Size</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {(['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Grand Villa'] as const).map(bhk => (
                    <button
                      key={bhk}
                      onClick={() => setBhkSize(bhk)}
                      className={`py-2 px-1 rounded-lg text-xs font-semibold border transition-all ${
                        bhkSize === bhk 
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' 
                          : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {bhk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">2. Property Architecture</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Apartment', 'Villa', 'Penthouse', 'Duplex'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setPropertyType(type)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        propertyType === type 
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' 
                          : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Carpet Area Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-neutral-300 uppercase tracking-wider">3. Residential Carpet Area (250 – 10,000 Sq. Ft.)</span>
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
            </div>
          ) : serviceCategory === 'Commercial' ? (
            /* Commercial Inputs */
            <div className="space-y-6">
              
              {/* Commercial Space Type */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">1. Commercial Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Office', 'Retail', 'Restaurant', 'Hotel', 'Clinic', 'Showroom'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setCommercialType(type)}
                      className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        commercialType === type 
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' 
                          : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Commercial Carpet Area */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-neutral-300 uppercase tracking-wider">2. Commercial Carpet Area (500 – 20,000 Sq. Ft.)</span>
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

            </div>
          ) : (
            /* Construction Inputs */
            <div className="space-y-6">
              
              {/* Construction Scope */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">1. Construction Project Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(['Turnkey Villa', 'Commercial Structure', 'Floor Extension'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setConstructionType(type)}
                      className={`py-2.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        constructionType === type 
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37]' 
                          : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plot / Built-Up Area */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-neutral-300 uppercase tracking-wider">2. Construction Carpet / Built-Up Area (1,000 – 30,000 Sq. Ft.)</span>
                  <span className="text-[#D4AF37] font-bold text-sm">{constPlotArea.toLocaleString()} Sq. Ft.</span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="30000" 
                  step="500" 
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

            </div>
          )}

        </div>

        {/* Calculation Output & Lead Form Column */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="p-6 sm:p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">Instant Estimate Summary</span>
              <div className="text-4xl sm:text-5xl font-serif font-bold text-white">
                ₹ {(calculation.totalCost / 100000).toFixed(2)} <span className="text-2xl font-serif text-[#D4AF37]">Lakhs</span>
              </div>
              <div className="text-xs text-neutral-400 font-mono pt-1">
                Estimated Turnkey Completion: <span className="text-white font-semibold">{calculation.estDays} Days</span>
              </div>
            </div>

            {/* EMI Available Highlighting Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#201D13] via-[#2D2411] to-[#201D13] border border-[#D4AF37]/50 flex items-center space-x-3 text-xs shadow-lg">
              <div className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] shrink-0">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="font-bold text-white flex items-center space-x-2">
                  <span>Easy EMI Financing Available</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#D4AF37] text-black font-extrabold uppercase font-mono">Up to 60 Months</span>
                </div>
                <div className="text-neutral-300 text-[11px]">
                  Pay in flexible monthly installments up to 60 months through partner banking networks with minimal documentation.
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="space-y-2 pt-2 border-t border-[#D4AF37]/20">
              <div className="text-xs font-semibold text-white uppercase tracking-wider mb-2">Estimated Expense Distribution:</div>
              
              <div className="flex justify-between text-xs text-neutral-300">
                <span>Civil & Base Prep (20-25%)</span>
                <span className="font-mono text-white font-medium">₹ {(calculation.civilCost / 100000).toFixed(2)} L</span>
              </div>

              <div className="flex justify-between text-xs text-neutral-300">
                <span>Modular Woodwork & Carpentry (40-45%)</span>
                <span className="font-mono text-white font-medium">₹ {(calculation.carpentryCost / 100000).toFixed(2)} L</span>
              </div>

              <div className="flex justify-between text-xs text-neutral-300">
                <span>Electrical & Smart Automation (15%)</span>
                <span className="font-mono text-white font-medium">₹ {(calculation.electricalCost / 100000).toFixed(2)} L</span>
              </div>

              <div className="flex justify-between text-xs text-neutral-300">
                <span>False Ceiling & Architectural Lights (10%)</span>
                <span className="font-mono text-white font-medium">₹ {(calculation.ceilingCost / 100000).toFixed(2)} L</span>
              </div>

              <div className="flex justify-between text-xs text-neutral-300">
                <span>Soft Furnishings & Paint (10%)</span>
                <span className="font-mono text-white font-medium">₹ {(calculation.furnishingCost / 100000).toFixed(2)} L</span>
              </div>
            </div>

            {/* Submit Request Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmitEstimate} className="space-y-3 pt-4 border-t border-[#D4AF37]/20">
                <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                  Save Estimate & Get Official Quotation
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

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Submit Estimate Request</span>
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
