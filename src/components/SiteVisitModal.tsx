import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  Eye
} from 'lucide-react';

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectTitle?: string;
}

export const SiteVisitModal: React.FC<SiteVisitModalProps> = ({ isOpen, onClose, initialProjectTitle }) => {
  const { projects, submitSiteVisit } = useApp();

  const activeProjects = projects.filter(p => p.status === 'Ongoing' || p.status === 'Completed');

  const [selectedProject, setSelectedProject] = useState<string>(
    initialProjectTitle || (activeProjects[0]?.title || 'The Royal Penthouse — Indiranagar, Bengaluru')
  );
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState<'Morning (10:00 AM - 1:00 PM)' | 'Afternoon (2:00 PM - 5:00 PM)' | 'Evening (5:00 PM - 7:00 PM)'>('Morning (10:00 AM - 1:00 PM)');
  const [notes, setNotes] = useState('');
  const [isEmiRequested, setIsEmiRequested] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !clientEmail) {
      alert('Please fill in your name and contact details.');
      return;
    }

    submitSiteVisit({
      clientName,
      clientEmail,
      clientPhone,
      projectTitle: selectedProject,
      preferredDate: preferredDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      timeSlot,
      notes,
      isEmiRequested
    });

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0D0E12] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button 
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white hover:bg-white/20 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative ambient background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            {/* Modal Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/40 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                <Eye className="w-3.5 h-3.5" />
                <span>Guided Live Site Inspection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
                See Our Live Work <span className="gold-gradient-text italic font-normal">In Person</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Inspect ongoing craftsmanship, woodwork finishing, and civil structural quality at an active site near you.
              </p>
            </div>

            {/* Step 1: Select Project to Visit */}
            <div className="space-y-2 p-4 rounded-xl bg-white/5 border border-white/10">
              <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>1. Select Active Site / Project to Visit *</span>
              </label>
              
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3 py-3 rounded-lg bg-black/80 border border-white/20 text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37] font-medium"
              >
                {activeProjects.map(p => (
                  <option key={p.id} value={p.title} className="bg-neutral-900 text-white py-2">
                    {p.title} — {p.location} ({p.category})
                  </option>
                ))}
              </select>
              <div className="text-[10px] text-neutral-400 flex items-center space-x-1 pt-1 font-mono">
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                <span>Site Address & Gate Pass pass code will be sent to your phone number.</span>
              </div>
            </div>

            {/* Step 2: Client Contact Information */}
            <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>2. Your Contact Information *</span>
              </label>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-neutral-300 block mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                    <input 
                      type="text" 
                      placeholder="e.g. Mr. Rajesh Kumar" 
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-neutral-300 block mb-1">Phone / WhatsApp *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210 *" 
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-300 block mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                      <input 
                        type="email" 
                        placeholder="rajesh@example.com *" 
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Preferred Visit Date & Time Slot */}
            <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>3. Preferred Visit Schedule</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-neutral-300 block mb-1">Preferred Date</label>
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-neutral-300 block mb-1">Time Slot</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 7:00 PM)">Evening (5:00 PM - 7:00 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-neutral-300 block mb-1">Specific Inspection Requests (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Want to inspect modular kitchen acrylic finish & electrical wiring..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* EMI Interest Checkbox */}
            <label className="flex items-center space-x-2.5 p-3 rounded-xl bg-black/50 border border-white/10 cursor-pointer hover:border-[#D4AF37]/50 transition-colors select-none">
              <input 
                type="checkbox" 
                checked={isEmiRequested} 
                onChange={(e) => setIsEmiRequested(e.target.checked)} 
                className="w-4 h-4 rounded accent-[#D4AF37] cursor-pointer" 
              />
              <span className="text-xs text-neutral-200">
                I am interested in discussing <strong className="text-[#D4AF37]">0% Interest Easy EMI Financing</strong> during the site tour
              </span>
            </label>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs sm:text-sm uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-xl shadow-[#D4AF37]/20"
            >
              <Eye className="w-4 h-4" />
              <span>Confirm & Request Live Site Tour</span>
            </button>

          </form>
        ) : (
          /* Confirmation State */
          <div className="py-8 px-4 text-center space-y-4 animate-in fade-in relative z-10">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-white">Live Site Visit Requested!</h3>
            
            <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Thank you <strong className="text-white">{clientName}</strong>. Your request to inspect <strong className="text-[#D4AF37]">{selectedProject}</strong> has been registered.
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 max-w-md mx-auto space-y-1.5 font-mono text-left">
              <div><strong className="text-white">Selected Site:</strong> {selectedProject}</div>
              <div><strong className="text-white">Contact Phone:</strong> {clientPhone}</div>
              <div><strong className="text-white">Scheduled Slot:</strong> {timeSlot}</div>
              {isEmiRequested && <div className="text-[#D4AF37] font-bold">💳 0% EMI Financing Information Requested</div>}
            </div>

            <p className="text-xs text-neutral-400 italic">
              Our site manager will call your phone number (<span className="text-white font-mono">{clientPhone}</span>) within 2 hours to confirm your gate pass & exact GPS location map.
            </p>

            <button 
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
