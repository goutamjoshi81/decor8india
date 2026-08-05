import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  Quote, 
  Play, 
  X, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

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
    <section className="py-24 bg-[#0B0C0E] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Client Acclaim</span>
            </div>
            <a 
              href="https://share.google/3GNXUSyRz9GzGN8D9" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-amber-400 font-semibold transition-all"
            >
              <span>⭐ 5.0 on Google Reviews</span>
            </a>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">
            Words From Our <span className="gold-gradient-text italic font-normal">Discerning Homeowners</span>
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg">
            Hear directly from penthouse owners, corporate leaders, and hospital directors about their journey with Decor8India.
          </p>
        </div>

        {/* Video & Text Highlights */}
        {testimonials && testimonials.length > 0 && testimonials[currentIdx] && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Showcase Card */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 space-y-6 relative">
            <Quote className="w-12 h-12 text-[#D4AF37]/30 absolute top-6 right-6" />

            <div className="flex text-amber-400 space-x-1">
              {[...Array(testimonials[currentIdx]?.rating || 5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
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
