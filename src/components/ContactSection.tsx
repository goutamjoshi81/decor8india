import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { submitBooking } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Residential',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    submitBooking({
      clientName: formData.name,
      clientEmail: formData.email,
      clientPhone: formData.phone,
      serviceType: formData.service as 'Residential' | 'Commercial',
      packageName: 'Custom Contact Inquiry',
      preferredDate: new Date().toISOString().split('T')[0],
      requirements: formData.message || 'General contact inquiry from website.'
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0B0C0E] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Our Architects</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">
            Let's Shape Your <span className="gold-gradient-text italic font-normal">Next Dream Space</span>
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg">
            Visit our flagship design studio in South Mumbai or schedule a private consultation with our principal team.
          </p>
        </div>

        {/* Grid: Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-2xl glass-panel border border-white/10 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white">Send Us a Direct Message</h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Your Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Vikram Singhania"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="vikram@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Project Scope</label>
                    <select 
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Residential">Residential Interior / Villa</option>
                      <option value="Commercial">Commercial / Office Fitout</option>
                      <option value="Construction">Ground-Up Turnkey Construction</option>
                      <option value="Hospitality">Restaurant & Hotel Interior</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Project Details / Requirements</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your property location, estimated carpet area, and design preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-xl shadow-[#D4AF37]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Consultation Request</span>
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <div className="text-lg font-bold text-white font-serif">Message Received!</div>
                <p className="text-xs text-neutral-300">
                  Thank you {formData.name}. Our senior architect will contact you on {formData.phone} within 2 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#D4AF37] underline pt-2 block mx-auto font-semibold"
                >
                  Send another message
                </button>
              </div>
            )}

          </div>

          {/* Contact Details & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Cards */}
            <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Flagship Experience Studio & Office</div>
                  <p className="text-xs text-neutral-300 pt-1">
                    #14, sy no 36/1, vasanth vallabnagar, vasanthpura, uttrahalli hobilli, bengaluru 560061
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-3 border-t border-white/10">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Direct Hotline</div>
                  <p className="text-xs text-neutral-300 font-mono pt-1"><a href="tel:+919380523743" className="hover:text-[#D4AF37] transition-colors">+91 93805 23743</a></p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-3 border-t border-white/10">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Design Inquiries</div>
                  <p className="text-xs text-neutral-300 font-mono pt-1"><a href="mailto:support@decor8india.com" className="hover:text-[#D4AF37] transition-colors">support@decor8india.com</a></p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-3 border-t border-white/10">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Studio Working Hours</div>
                  <p className="text-xs text-neutral-300 pt-1">Mon - Sat: 10:00 AM - 7:30 PM (Sunday by Appointment)</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp & Social CTAs */}
            <div className="space-y-3">
              <a 
                href="https://wa.me/919380523743?text=Hi%20Decor8India!%20I%20would%20like%20to%20inquire%20about%20interior%20design%20services."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-emerald-900/30 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Consultation</span>
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a 
                  href="https://share.google/3GNXUSyRz9GzGN8D9"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#D4AF37]/50 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all group"
                >
                  <span className="text-amber-400">⭐</span>
                  <span>Google Business Profile</span>
                </a>

                <a 
                  href="https://www.instagram.com/decor8_india_official/"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 hover:from-purple-800/50 hover:to-pink-800/50 border border-pink-500/30 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-all"
                >
                  <span>📸</span>
                  <span>@decor8_india_official</span>
                </a>
              </div>
            </div>

            {/* Map Frame Link */}
            <a 
              href="https://share.google/3GNXUSyRz9GzGN8D9"
              target="_blank"
              rel="noreferrer"
              title="Click to view Decor8India on Google Maps"
              className="h-48 rounded-2xl overflow-hidden border border-white/10 relative block group"
            >
              <iframe 
                title="Decor8India Studio Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.238472910005!2d72.8139!3d19.0024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAwJzA4LjYiTiA3MsKwNDgnNTAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="w-full h-full filter grayscale invert opacity-70 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                <span className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider shadow-lg">
                  Open Google Maps & Reviews
                </span>
              </div>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
