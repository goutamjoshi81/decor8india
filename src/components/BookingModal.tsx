import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  Home, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  HardHat
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MATERIAL_STANDARDS, STANDARD_PRICING } from '../data/initialData';
import type { ServiceItem } from '../types';

export const BookingModal: React.FC = () => {
  const { 
    isBookingOpen, 
    setIsBookingOpen, 
    selectedServiceForBooking, 
    setSelectedServiceForBooking,
    services,
    submitBooking 
  } = useApp();

  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<'Residential' | 'Commercial' | 'Construction'>('Residential');
  const [selectedStandard, setSelectedStandard] = useState<'Eco' | 'Urban' | 'Luxe'>('Urban');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [carpetArea, setCarpetArea] = useState<number>(1000);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isEmiRequested, setIsEmiRequested] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  const isCustomArchitectureService = (srv?: ServiceItem | null) => {
    if (!srv) return false;
    const title = (srv.title || '').toLowerCase();
    const id = (srv.id || '').toLowerCase();
    return id === 'res-custom' || 
           title.includes('custom residential architecture') || 
           (title.includes('custom') && title.includes('architecture')) ||
           title === 'residential architecture';
  };

  const handleServiceTypeChange = (type: 'Residential' | 'Commercial' | 'Construction') => {
    setServiceType(type);
    if (type === 'Construction') setCarpetArea(1500);
    else setCarpetArea(1000);
  };

  useEffect(() => {
    if (selectedServiceForBooking) {
      setServiceType(selectedServiceForBooking.type as any);
      setSelectedPackage(selectedServiceForBooking.title);
      setCarpetArea(selectedServiceForBooking.type === 'Construction' ? 1500 : 1000);
    }
  }, [selectedServiceForBooking]);

  if (!isBookingOpen) return null;

  const currentRate = STANDARD_PRICING[serviceType]?.[selectedStandard] || 1450;
  const filteredServices = services.filter(s => s.type === serviceType && s.isActive);
  const selectedSrv = services.find(s => s.title === selectedPackage) || filteredServices[0];
  const isCustomSelected = isCustomArchitectureService(selectedSrv);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !preferredDate) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    const bookingId = `D8I-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedBookingId(bookingId);

    const finalEstCost = isCustomSelected ? 0 : Math.round(carpetArea * currentRate);
    const budgetRange = isCustomSelected 
      ? 'Custom Architecture Consultation / Bespoke Proposal'
      : `₹ ${(finalEstCost / 100000).toFixed(2)} Lakhs (${carpetArea.toLocaleString()} sq.ft @ ₹${currentRate}/sq.ft)`;

    submitBooking({
      clientName,
      clientEmail,
      clientPhone,
      serviceType,
      packageName: isCustomSelected 
        ? `${selectedPackage || 'Custom Residential Architecture'} (Bespoke Scope)` 
        : `${selectedPackage || `${serviceType} Package`} (${selectedStandard} Standard)`,
      preferredDate,
      floorPlanUrl: uploadedFileName ? `https://decor8india.com/uploads/${uploadedFileName}` : undefined,
      requirements: isCustomSelected
        ? `Custom Architecture Consultation Request. Package: ${selectedPackage} | Material Tier: ${selectedStandard} Standard | Target Area: ${carpetArea.toLocaleString()} Sq. Ft.${requirements ? ` | Notes: ${requirements}` : ''}${isEmiRequested ? ' | Stage-Wise Financing Requested' : ''}`
        : `${requirements ? `${requirements} | ` : ''}Material Standard: ${selectedStandard} Standard (₹ ${currentRate}/sq.ft) | Carpet Area: ${carpetArea.toLocaleString()} Sq. Ft. | Calculated Estimate: ₹ ${(finalEstCost / 100000).toFixed(2)} Lakhs${isEmiRequested ? ' | 0% EMI Plan Requested' : ''}`,
      carpetArea: carpetArea,
      budgetRange,
      estimatedCost: finalEstCost,
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
    setCarpetArea(serviceType === 'Construction' ? 1500 : 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D0E12] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-5 shadow-2xl animate-in zoom-in-95">
        
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            <div className="space-y-1.5 text-center">
              <div className="flex items-center justify-center space-x-2.5 mx-auto mb-1">
                <img src="/logo_icon.png" alt="Decor8 India" className="h-8 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]" />
                <span className="text-lg font-serif tracking-wider text-white font-bold">
                  DECOR8<span className="text-[#D4AF37]">INDIA</span>
                </span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full glass-panel border border-[#D4AF37]/30 text-[11px] font-semibold uppercase tracking-widest text-[#D4AF37] block w-max mx-auto">
                <Sparkles className="w-3 h-3" />
                <span>Consultation & Project Booking</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Schedule Your Architectural Consultation
              </h2>
              <p className="text-xs text-neutral-400">
                Step {step} of 2 — Choose from Residential, Commercial, or Ground-up Construction.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4 text-xs font-mono">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-[#D4AF37]' : 'text-neutral-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-[#D4AF37] text-black' : 'bg-neutral-800'}`}>1</span>
                <span>Category & Standards</span>
              </div>
              <div className="w-8 h-px bg-white/20"></div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-[#D4AF37]' : 'text-neutral-500'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-[#D4AF37] text-black' : 'bg-neutral-800'}`}>2</span>
                <span>Date & Details</span>
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-4 pt-1">
                {/* Service Type Selector */}
                <div className="flex rounded-xl bg-black/60 p-1 border border-white/10">
                  <button
                    type="button"
                    onClick={() => handleServiceTypeChange('Residential')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
                      serviceType === 'Residential' ? 'gold-gradient-bg text-black shadow-md' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Residential</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleServiceTypeChange('Commercial')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
                      serviceType === 'Commercial' ? 'gold-gradient-bg text-black shadow-md' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Commercial</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleServiceTypeChange('Construction')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
                      serviceType === 'Construction' ? 'gold-gradient-bg text-black shadow-md' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <HardHat className="w-3.5 h-3.5" />
                    <span>Construction</span>
                  </button>
                </div>

                {/* Carpet Area Slider */}
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-neutral-300 uppercase tracking-wider flex items-center space-x-1.5">
                      <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Property Carpet / Built-Up Area</span>
                    </span>
                    <span className="text-[#D4AF37] font-bold text-sm font-mono bg-white/5 px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
                      {carpetArea.toLocaleString()} Sq. Ft.
                    </span>
                  </div>

                  <input 
                    type="range"
                    min={serviceType === 'Construction' ? 1000 : serviceType === 'Commercial' ? 500 : 300}
                    max={serviceType === 'Construction' ? 30000 : serviceType === 'Commercial' ? 20000 : 5000}
                    step={serviceType === 'Construction' ? 100 : serviceType === 'Commercial' ? 100 : 50}
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                  />

                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>{serviceType === 'Construction' ? '1,000' : serviceType === 'Commercial' ? '500' : '300'} Sq. Ft.</span>
                    <span>{serviceType === 'Construction' ? '15,000' : serviceType === 'Commercial' ? '10,000' : '2,500'} Sq. Ft.</span>
                    <span>{serviceType === 'Construction' ? '30,000' : serviceType === 'Commercial' ? '20,000' : '5,000'} Sq. Ft.</span>
                  </div>
                </div>

                {/* Material & Hardware Standards with per sq ft rate and total price for selected carpet area */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
                      Material & Hardware Standard
                    </label>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      Calculated for {carpetArea.toLocaleString()} Sq. Ft.
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {MATERIAL_STANDARDS.map((std) => {
                      const rate = STANDARD_PRICING[serviceType][std.id];
                      const stdTotal = rate * carpetArea;
                      const isSelected = selectedStandard === std.id;

                      return (
                        <div
                          key={std.id}
                          onClick={() => setSelectedStandard(std.id as any)}
                          className={`p-2.5 rounded-xl border cursor-pointer text-center transition-all flex flex-col justify-between ${
                            isSelected 
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-md ring-1 ring-[#D4AF37]/50'
                              : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">{std.badge}</div>
                          <div className="mt-1 pt-1 border-t border-white/10 space-y-0.5">
                            <div className="text-[10px] text-neutral-300 font-mono">₹ {rate}/sq.ft</div>
                            <div className="text-xs text-[#D4AF37] font-serif font-bold">
                              ₹ {(stdTotal / 100000).toFixed(2)} Lakhs
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Service Package Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                      Choose Desired Package
                    </label>
                    <span className="text-[10px] text-[#D4AF37] font-mono font-bold">
                      {selectedStandard} Standard (₹ {currentRate}/sq.ft for {carpetArea.toLocaleString()} sq.ft)
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 overflow-y-auto pr-1">
                    {filteredServices.map(srv => {
                      const isCustomArch = isCustomArchitectureService(srv);
                      const isSelected = (selectedPackage === srv.title);
                      const packagePrice = Math.round(carpetArea * currentRate);

                      return (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedPackage(srv.title)}
                          className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg ring-1 ring-[#D4AF37]/50'
                              : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-bold text-white leading-snug">{srv.title}</div>
                          {isCustomArch ? (
                            <div className="text-[10px] text-amber-400 font-mono mt-1 font-bold flex items-center justify-between pt-1 border-t border-white/10">
                              <span className="flex items-center space-x-1">
                                <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                                <span>Bespoke Scope</span>
                              </span>
                              <span className="text-[#D4AF37]">Custom Quote</span>
                            </div>
                          ) : (
                            <div className="text-[10px] text-[#D4AF37] font-mono mt-1 font-bold flex items-center justify-between pt-1 border-t border-white/10">
                              <span className="text-xs text-[#D4AF37] font-serif font-bold">
                                ₹ {(packagePrice / 100000).toFixed(2)} Lakhs
                              </span>
                              <span className="text-[9px] text-neutral-400 font-normal font-mono">
                                {carpetArea.toLocaleString()} sq.ft @ ₹{currentRate}/sq.ft
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Next Step Button */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>Proceed to Contact & Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}

            {/* Step 2: Contact, Date & Floor Plan */}
            {step === 2 && (
              <form onSubmit={handleFinalSubmit} className="space-y-3.5 pt-1">
                
                {/* Configured Package & Budget Summary Badge */}
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#201D13] via-[#2D2411] to-[#201D13] border border-[#D4AF37]/40 flex items-center justify-between text-xs shadow-md">
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Configured Package</div>
                    <div className="font-bold text-white text-xs">{selectedPackage || `${serviceType} Package`}</div>
                    <div className="text-[10px] text-[#D4AF37] font-mono">
                      {selectedStandard} Standard • {carpetArea.toLocaleString()} Sq. Ft.
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">Estimated Budget</div>
                    <div className="font-serif font-bold text-sm text-emerald-400">
                      {isCustomSelected ? 'Bespoke Quote' : `₹ ${((carpetArea * currentRate) / 100000).toFixed(2)} Lakhs`}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Your Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Smita & Kabir Verma"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Phone Number *</label>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Email Address (For Client Portal) *</label>
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
                    <label className="text-xs text-neutral-300 font-medium">Preferred Consultation Date</label>
                    <input 
                      type="date" 
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Floor Plan Uploader (Optional) */}
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Upload Floor Plan or Layout (Optional)</label>
                  <div className="relative border-2 border-dashed border-white/15 hover:border-[#D4AF37] rounded-xl p-4 text-center bg-black/40 transition-colors">
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg,.jpeg,.dwg"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-6 h-6 text-[#D4AF37] mx-auto mb-1" />
                    <div className="text-xs text-neutral-300 font-medium">
                      {uploadedFileName ? (
                        <span className="text-[#D4AF37] font-bold">{uploadedFileName} uploaded</span>
                      ) : (
                        <span>Drag & drop or click to upload PDF/CAD layout</span>
                      )}
                    </div>
                    <div className="text-[10px] text-neutral-500">Max file size 25MB</div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Project Notes & Style Preferences</label>
                  <textarea 
                    rows={3}
                    placeholder="Provide details about your carpet area, preferred colors, or deadline requirements..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* EMI Selection Checkbox */}
                <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 cursor-pointer hover:bg-[#D4AF37]/20 transition-colors select-none">
                  <input 
                    type="checkbox" 
                    checked={isEmiRequested} 
                    onChange={(e) => setIsEmiRequested(e.target.checked)} 
                    className="w-4 h-4 rounded accent-[#D4AF37] cursor-pointer" 
                  />
                  <span className="text-xs text-white font-medium">
                    Opt for <strong className="text-[#D4AF37]">Easy EMI Financing</strong> (Up to 60 Months)
                  </span>
                </label>

                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-xl bg-white/10 text-neutral-300 font-semibold text-xs hover:text-white"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="w-2/3 py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Consultation Booking</span>
                  </button>
                </div>

              </form>
            )}
          </>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-6 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">Booking Request #{generatedBookingId}</span>
              <h2 className="text-3xl font-serif font-bold text-white">Booking Submitted Successfully!</h2>
              <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                Your request is currently marked <span className="text-amber-400 font-semibold">Pending Approval</span>. Once our admin team verifies your project requirements, your Client Portal login credentials will be activated.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left text-xs text-neutral-300 space-y-2 max-w-md mx-auto">
              <div className="flex items-center space-x-2 text-[#D4AF37] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>What Happens Next?</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-neutral-400 text-[11px]">
                <li>Our senior architect reviews your floor plan within 4 hours.</li>
                <li>You receive a confirmation call on {clientPhone}.</li>
                <li>Upon admin approval, login access is granted for your email ({clientEmail}).</li>
                <li className="pt-1 text-[#D4AF37]">Need urgent assistance? Call Admin: <a href="tel:+919380523743" className="underline font-mono">+91 93805 23743</a> or Email: <a href="mailto:support@decor8india.com" className="underline font-mono">support@decor8india.com</a></li>
              </ul>
            </div>

            <button 
              onClick={handleClose}
              className="px-8 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider"
            >
              Done & Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
