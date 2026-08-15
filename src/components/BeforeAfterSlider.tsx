import React, { useState, useRef, useCallback } from 'react';
import { MoveHorizontal, Sparkles } from 'lucide-react';

interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterProps> = ({
  beforeImage = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
  afterImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  beforeLabel = "Raw Site / Before",
  afterLabel = "Decor8 Luxury Turnkey Finish",
  title = "Interactive Turnkey Transformations",
  subtitle = "Drag or swipe the slider left & right to experience our site transformation craftsmanship."
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      updatePos(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      updatePos(e.clientX);
    }
  };

  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Touch Showcase</span>
          </div>
          {title && <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">{title}</h3>}
          {subtitle && <p className="text-xs sm:text-sm text-neutral-400 font-light">{subtitle}</p>}
        </div>
      )}

      <div 
        ref={containerRef}
        onMouseDown={(e) => { setIsDragging(true); updatePos(e.clientX); }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => { if (e.touches[0]) updatePos(e.touches[0].clientX); }}
        onTouchMove={handleTouchMove}
        className="relative h-80 sm:h-[480px] w-full rounded-2xl overflow-hidden border border-white/15 shadow-2xl select-none cursor-ew-resize touch-pan-y group bg-black"
      >
        {/* AFTER IMAGE (Base background) */}
        <img 
          src={afterImage} 
          alt={afterLabel} 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* AFTER BADGE */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/50 text-[10px] sm:text-xs font-bold text-[#D4AF37] uppercase tracking-wider shadow-lg">
          ✨ {afterLabel}
        </div>

        {/* BEFORE IMAGE (Clipped overlay) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img 
            src={beforeImage} 
            alt={beforeLabel} 
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />

          {/* BEFORE BADGE */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold text-neutral-300 uppercase tracking-wider shadow-lg">
            🏗️ {beforeLabel}
          </div>
        </div>

        {/* GOLD SLIDER DIVIDER LINE */}
        <div 
          className="absolute top-0 bottom-0 w-1 gold-gradient-bg z-20 shadow-[0_0_15px_#D4AF37]"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          {/* Touch Knobs with Arrows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full gold-gradient-bg text-black shadow-[0_0_25px_#D4AF37] flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
            <MoveHorizontal className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
