import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  Quote, 
  Play, 
  X, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

// Replace with your real Google Business Profile review links
const GOOGLE_REVIEW_LINK = "https://share.google/3GNXUSyRz9GzGN8D9";
const GOOGLE_MAPS_LINK = "https://share.google/3GNXUSyRz9GzGN8D9";

export const Testimonials: React.FC = () => {
  const { testimonials } = useApp();
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextTestimonial = () => {
    setCurrentIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  const prevTestimonial = () => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  return (
    <section className="py-24 bg-[#0B0C0E] relative overflow-hidden border-t border-white/10">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-900/10 via-[#D4AF37]/10 to-amber-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Google Reviews Header Card */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-8 rounded-3xl bg-gradient-to-r from-neutral-900/90 via-[#0D0E12]/95 to-neutral-900/90 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl">
          
          <div className="flex items-center space-x-5">
            {/* Google Icon Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-4 bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              <GoogleIcon className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>

            {/* Google Rating Info */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center space-x-2">
                <span className="text-2xl sm:text-3xl font-bold text-white font-serif">4.9 / 5.0</span>
                <div className="flex text-amber-400 space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-medium flex items-center space-x-2">
                <span>Verified Google Business Reviews</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              </p>
              <p className="text-xs text-neutral-400 font-mono">
                Decor8India Architecture & Turnkey Interior Studio • Bengaluru & Mumbai
              </p>
            </div>
          </div>

          {/* Action CTAs: Direct Google Review Links */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <a 
              href={GOOGLE_REVIEW_LINK} 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-[#D4AF37]/20 transition-all hover:scale-[1.02]"
            >
              <GoogleIcon className="w-4 h-4" />
              <span>Write a Google Review</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a 
              href={GOOGLE_MAPS_LINK} 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-amber-400 font-semibold flex items-center justify-center space-x-2 transition-all"
            >
              <span>View All Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discerning Homeowners & Commercial Clients</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">
            Words From Our <span className="gold-gradient-text italic font-normal">Discerning Clients</span>
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg">
            Hear directly from penthouse owners, villa clients, and corporate leaders who reviewed Decor8India.
          </p>
        </div>

        {/* Video & Text Highlights */}
        {testimonials && testimonials.length > 0 && testimonials[currentIdx] && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Showcase Card */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 space-y-6 relative">
            <Quote className="w-12 h-12 text-[#D4AF37]/30 absolute top-6 right-6" />

            <div className="flex items-center justify-between">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(testimonials[currentIdx]?.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Verified Badge */}
              <a 
                href={GOOGLE_REVIEW_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] text-emerald-300 font-mono uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                <GoogleIcon className="w-3 h-3" />
                <span>Verified Google Review</span>
              </a>
            </div>

            <p className="text-lg sm:text-2xl font-serif italic text-white leading-relaxed">
              "{testimonials[currentIdx].comment}"
            </p>

            <div className="pt-6 border-t border-[#D4AF37]/20 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonials[currentIdx].avatar} 
                  alt={testimonials[currentIdx].clientName} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]"
                />
                <div>
                  <h4 className="font-serif font-bold text-xl text-white">{testimonials[currentIdx].clientName}</h4>
                  <div className="text-xs text-[#D4AF37]">{testimonials[currentIdx].location} • {testimonials[currentIdx].projectType}</div>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex space-x-2">
                <button 
                  onClick={prevTestimonial}
                  className="p-2.5 rounded-full bg-black/60 text-white hover:text-[#D4AF37] border border-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="p-2.5 rounded-full bg-black/60 text-white hover:text-[#D4AF37] border border-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Video Testimonial Card */}
          <div className="lg:col-span-4 glass-card rounded-2xl overflow-hidden border border-white/10 relative group">
            <div className="relative h-80">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                alt="Video Testimonial Preview" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center space-y-3">
                <button 
                  onClick={() => setActiveVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')}
                  className="w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center text-black shadow-2xl hover:scale-110 transition-transform"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </button>
                <div className="text-center px-4">
                  <div className="text-sm font-bold font-serif text-white">Watch Video Walkthrough</div>
                  <div className="text-[11px] text-[#D4AF37]">4BHK Penthouse Handover Story (4 min)</div>
                </div>
              </div>
            </div>
          </div>

        </div>
        )}

      </div>

      {/* Video Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden border border-white/20">
            <button 
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:text-red-400 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe 
                src={activeVideoUrl} 
                title="Client Video Testimonial" 
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
