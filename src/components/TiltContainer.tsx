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
  maxTilt = 10,
  scale = 1.02,
  onClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const targetX = useRef<number>(0);
  const targetY = useRef<number>(0);
  const currentX = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isHovered = useRef<boolean>(false);

  useEffect(() => {
    let active = true;

    const animate = () => {
      if (!active) return;

      if (containerRef.current) {
        // Smooth linear interpolation (lerp) for 60-120fps buttery motion
        const lerpFactor = isHovered.current ? 0.15 : 0.1;
        currentX.current += (targetX.current - currentX.current) * lerpFactor;
        currentY.current += (targetY.current - currentY.current) * lerpFactor;

        const currentScale = isHovered.current ? 1 + (scale - 1) * (Math.abs(currentX.current) / maxTilt + 0.5) : 1;

        if (Math.abs(currentX.current) > 0.01 || Math.abs(currentY.current) > 0.01 || isHovered.current) {
          containerRef.current.style.transform = `perspective(1000px) rotateX(${currentX.current.toFixed(2)}deg) rotateY(${currentY.current.toFixed(2)}deg) scale3d(${currentScale.toFixed(3)}, ${currentScale.toFixed(3)}, 1) translateZ(0)`;
        } else {
          containerRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)';
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [maxTilt, scale]);

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    isHovered.current = true;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;

    targetX.current = -y * maxTilt;
    targetY.current = x * maxTilt;
  };

  const handleReset = () => {
    isHovered.current = false;
    targetX.current = 0;
    targetY.current = 0;
  };

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseLeave={handleReset}
      onTouchMove={(e) => {
        if (e.touches[0]) {
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchEnd={handleReset}
      className={`will-change-transform ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
};
