import React, { useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const TouchRipple: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    // Only listen to touch events on mobile/tablet devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;

      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: touch.clientX,
        y: touch.clientY,
        size: Math.min(window.innerWidth, window.innerHeight) * 0.075
      };

      setRipples(prev => [...prev.slice(-6), newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 650);
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  if (ripples.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden">
      {ripples.map(r => (
        <div
          key={r.id}
          className="absolute rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-transparent shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-in fade-in zoom-in-50 duration-500 ease-out"
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`,
            width: `${r.size}px`,
            height: `${r.size}px`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      ))}
    </div>
  );
};
