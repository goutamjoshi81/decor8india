import React, { useRef, useEffect } from 'react';

interface TiltContainerProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  onClick?: () => void;
}

export const TiltContainer: React.FC<TiltContainerProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  onClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const targetX = useRef<number>(0);
  const targetY = useRef<number>(0);
  const currentX = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isInteracting = useRef<boolean>(false);
  const isRunning = useRef<boolean>(false);
  const rectRef = useRef<DOMRect | null>(null);

  const startLoop = () => {
    if (isRunning.current) return;
    isRunning.current = true;

    const animate = () => {
      if (!containerRef.current) {
        isRunning.current = false;
        return;
      }

      // Smooth linear interpolation (lerp) for 60-120fps buttery physics
      const lerpFactor = isInteracting.current ? 0.16 : 0.1;
      currentX.current += (targetX.current - currentX.current) * lerpFactor;
      currentY.current += (targetY.current - currentY.current) * lerpFactor;

      const diffX = Math.abs(targetX.current - currentX.current);
      const diffY = Math.abs(targetY.current - currentY.current);

      if (isInteracting.current || diffX > 0.015 || diffY > 0.015) {
        const currentScale = isInteracting.current ? scale : 1;
        containerRef.current.style.transform = `perspective(900px) rotateX(${currentX.current.toFixed(2)}deg) rotateY(${currentY.current.toFixed(2)}deg) scale3d(${currentScale}, ${currentScale}, 1) translateZ(0)`;
        rafId.current = requestAnimationFrame(animate);
      } else {
        containerRef.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)';
        currentX.current = 0;
        currentY.current = 0;
        isRunning.current = false;
      }
    };

    rafId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Desktop mouse handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    isInteracting.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    targetX.current = -y * maxTilt;
    targetY.current = x * maxTilt;
    startLoop();
  };

  const handleMouseLeave = () => {
    isInteracting.current = false;
    targetX.current = 0;
    targetY.current = 0;
    startLoop();
  };

  // Mobile Touch handlers (Lightweight, passive cached bounds, zero jank)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    isInteracting.current = true;
    rectRef.current = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const rect = rectRef.current;
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;

    const mobileTilt = Math.min(maxTilt, 6);
    targetX.current = -y * mobileTilt;
    targetY.current = x * mobileTilt;
    startLoop();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!rectRef.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = rectRef.current;
    const x = (touch.clientX - rect.left) / rect.width - 0.5;
    const y = (touch.clientY - rect.top) / rect.height - 0.5;

    const mobileTilt = Math.min(maxTilt, 6);
    targetX.current = -y * mobileTilt;
    targetY.current = x * mobileTilt;
    startLoop();
  };

  const handleTouchEnd = () => {
    isInteracting.current = false;
    rectRef.current = null;
    targetX.current = 0;
    targetY.current = 0;
    startLoop();
  };

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className={`transition-shadow duration-300 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
};
