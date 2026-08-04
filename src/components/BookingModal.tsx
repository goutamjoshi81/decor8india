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
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isEmiRequested, setIsEmiRequested] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  useEffect(() => {
    if (selectedServiceForBooking) {
      setServiceType(selectedServiceForBooking.type as any);
      setSelectedPackage(selectedServiceForBooking.title);
    }
  }, [selectedServiceForBooking]);

  if (!isBookingOpen) return null;

  const filteredServices = services.filter(s => s.type === serviceType && s.isActive);

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone || !preferredDate) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    const bookingId = `D8I-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedBookingId(bookingId);

    submitBooking({
      clientName,
      clientEmail,
      clientPhone,
      serviceType,
      packageName: `${selectedPackage} (${selectedStandard} Standard)`,
      preferredDate,
      floorPlanUrl: uploadedFileName ? `https://decor8india.com/uploads/${uploadedFileName}` : undefined,
      requirements: `${requirements} | Material Standard: ${selectedStandard}${isEmiRequested ? ' | 0% EMI Plan Requested' : ''}`,
      carpetArea: 1500,
      estimatedCost: 650000,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D0E12] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-6 shadow-2xl animate-in zoom-in-95">
        
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center space-x-2.5 mx-auto mb-1">
                <img src="/logo_icon.png" alt="Decor8 India" className="h-9 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]" />
                <span className="text-xl font-serif tracking-wider text-white font-bold">
                  DECOR8<span className="text-[#D4AF37]">INDIA</span>
                </span>
              </div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] block w-max mx-auto">
                <Sparkles className="w-3.5 h-3.5" />
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
              <div className="space-y-5 pt-2">
                <div className="flex rounded-xl bg-black/60 p-1 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setServiceType('Residential')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
                      serviceType === 'Residential' ? 'gold-gradient-bg text-black shadow-md' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Residential</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('Commercial')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
                      serviceType === 'Commercial' ? 'gold-gradient-bg text-black shadow-md' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Commercial</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceType('Construction')}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all ${
                      serviceType === 'Construction' ? 'gold-gradient-bg text-black shadow-md' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <HardHat className="w-4 h-4" />
                    <span>Construction</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block">
                    Material & Hardware Standard
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {MATERIAL_STANDARDS.map((std) => {
                      const rate = STANDARD_PRICING[serviceType][std.id];
                      return (
                        <div
                          key={std.id}
                          onClick={() => setSelectedStandard(std.id as any)}
                          className={`p-2.5 rounded-xl border cursor-pointer text-center transition-all ${
                            selectedStandard === std.id 
                              ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-md ring-1 ring-[#D4AF37]/50'
                              : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-bold text-white">{std.badge}</div>
                          <div className="text-[10px] text-[#D4AF37] font-mono mt-0.5 font-bold">₹ {rate}/sq.ft</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block">
                    Choose Desired Package
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                    {filteredServices.map(srv => (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedPackage(srv.title)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedPackage === srv.title
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg'
                            : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/30 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-bold text-white">{srv.title}</div>
                        <div className="text-[10px] text-[#D4AF37] font-mono mt-0.5">
                          Starting ₹ {(srv.startingPrice / 100000).toFixed(2)} Lakhs
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Step Button */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Contact & Schedule</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            )}

            {/* Step 2: Contact, Date & Floor Plan */}
            {step === 2 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4 pt-2">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    Opt for <strong className="text-[#D4AF37]">Easy 0% Interest EMI Financing</strong> (Up to 36 Months)
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
