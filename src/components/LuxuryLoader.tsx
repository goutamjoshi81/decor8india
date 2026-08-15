import React, { useEffect, useState } from 'react';

export const LuxuryLoader: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Quick, classic load transition (approx 0.8s)
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setTimeout(() => setShouldRender(false), 500);
    }, 750);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-[10000] bg-[#0B0C0E] flex flex-col items-center justify-center p-4 transition-opacity duration-500 ease-out ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-4 text-center">
        {/* Clean Classic Monogram & Brand Name */}
        <div className="space-y-1">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-[0.25em] text-white uppercase">
            Decor<span className="gold-gradient-text">8</span>India
          </h2>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-light">
            Architecture & Interior Design
          </p>
        </div>

        {/* Ultra-thin Elegant Gold Accent Line */}
        <div className="w-24 h-[1px] bg-white/10 relative overflow-hidden">
          <div className="absolute inset-0 gold-gradient-bg animate-pulse" />
        </div>
      </div>
    </div>
  );
};
