import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  Award, 
  Building2, 
  CheckCircle2,
  ChevronDown,
  Play,
  X
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { setIsBookingOpen, setIsEstimatorOpen } = useApp();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const [counter, setCounter] = useState({
    projects: 0,
    clients: 0,
    years: 0,
    designers: 0
  });

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1800;
    let animId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Smooth easeOutQuad
      const ease = 1 - (1 - progress) * (1 - progress);

      setCounter({
        projects: Math.floor(450 * ease),
        clients: Math.floor(98 * ease),
        years: Math.floor(14 * ease),
        designers: Math.floor(25 * ease)
      });

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleScrollDown = () => {
    const aboutElem = document.getElementById('about');
    if (aboutElem) aboutElem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      
      {/* Premium Background Image & Multi-layer Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90" 
          alt="Luxury Interior Living Room" 
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/85 to-[#0B0C0E]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-[#0B0C0E]/70" />
        
        {/* GPU-Native Ambient Gold Glow Orbs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none glow-orb-gold animate-orb" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none glow-orb-amber animate-orb" style={{ animationDelay: '-7s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Top Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-[#D4AF37]/40 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] animate-border-pulse shadow-lg">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>India's Premier Luxury Interior, Construction & Architectural Studio</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white leading-[1.1] tracking-tight">
              Crafting Timeless <br />
              <span className="shimmer-gold-text italic font-normal">Sanctuaries of Luxury</span> & Precision.
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-neutral-300 font-light max-w-2xl leading-relaxed">
              Decor8India transforms high-end residential penthouses, grand villas, turnkey civil construction projects, and visionary commercial spaces into architectural masterpieces with turnkey precision and unmatched craftsmanship.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4 pt-2">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="group w-full sm:w-auto justify-center px-8 py-4 rounded-xl gold-gradient-bg text-black font-bold text-sm tracking-wider uppercase flex items-center space-x-3 shadow-xl shadow-[#D4AF37]/25 hover:shadow-[#D4AF37]/50 transition-all transform hover:-translate-y-1 gold-btn-shine cursor-pointer"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button 
                onClick={() => setIsEstimatorOpen(true)}
                className="w-full sm:w-auto justify-center px-7 py-4 rounded-xl glass-panel border border-white/20 hover:border-[#D4AF37] text-white font-semibold text-sm tracking-wider flex items-center space-x-3 transition-all hover:bg-white/10 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#D4AF37]" />
                <span>Get Free Estimate</span>
              </button>

              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto justify-center px-6 py-4 rounded-xl glass-panel border border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 text-[#D4AF37] font-semibold text-sm tracking-wider flex items-center space-x-2.5 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Tour</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-neutral-400 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>100% On-Time Turnkey Execution</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>10-Year Modular Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Transparent Live Project Portal</span>
              </div>
            </div>

          </div>

          {/* Floating Stats Panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl relative">
              <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-12 h-12 bg-[#D4AF37]/20 rounded-full blur-xl pointer-events-none"></div>

              <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-6 flex items-center justify-between">
                <span>Excellence in Numbers</span>
                <Award className="w-4 h-4" />
              </h3>

              <div className="grid grid-cols-2 gap-6">
                
                {/* Stat 1 */}
                <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-3xl font-serif font-bold text-white">
                    {counter.projects}<span className="text-[#D4AF37]">+</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-medium">Projects Completed</div>
                </div>

                {/* Stat 2 */}
                <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-3xl font-serif font-bold text-white">
                    {counter.clients}<span className="text-[#D4AF37]">%</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-medium">Client Satisfaction</div>
                </div>

                {/* Stat 3 */}
                <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-3xl font-serif font-bold text-white">
                    {counter.years}<span className="text-[#D4AF37]">+</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-medium">Years of Legacy</div>
                </div>

                {/* Stat 4 */}
                <div className="space-y-1 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-3xl font-serif font-bold text-white">
                    {counter.designers}<span className="text-[#D4AF37]">+</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-medium">Expert Architects</div>
                </div>

              </div>

              {/* Award highlight */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center space-x-3 text-xs text-neutral-300">
                <Building2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <p>Awarded <span className="text-white font-semibold">Best Luxury Interior Firm 2025</span> by Architecture Digest.</p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <div 
        onClick={handleScrollDown} 
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-1 font-medium">Discover More</span>
        <ChevronDown className="w-5 h-5 text-[#D4AF37] animate-bounce" />
      </div>

      {/* Hero YouTube Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-4xl glass-card rounded-2xl border border-white/20 p-2 sm:p-4 space-y-3">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-2 text-xs text-[#D4AF37] font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Decor8India Studio & Walkthrough Tour</span>
              </div>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
              <iframe 
                src="https://www.youtube.com/embed/XyjkP5ENGHk?autoplay=1&rel=0"
                title="Decor8India YouTube Showcase"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
