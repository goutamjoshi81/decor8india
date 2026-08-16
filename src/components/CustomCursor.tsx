import React, { useEffect, useRef } from 'react';

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const [isEnabled, setIsEnabled] = React.useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const hoverText = useRef<string>('');

  useEffect(() => {
    // Strictly require a fine pointer (mouse/trackpad) and hover capability
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!hasFinePointer || isTouch) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;

    if (!canvas || !ring || !dot || !label) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particles: SparkleParticle[] = [];
    const colors = ['#FFF0D0', '#D4AF37', '#F5E6AD', '#AA7C11', '#E6C200'];

    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0px) translate(-50%, -50%)`;
      dot.style.opacity = '1';
      ring.style.opacity = '1';

      // Spawn 2 golden stardust particles per movement
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() * 6 - 3),
          y: e.clientY + (Math.random() * 6 - 3),
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 3 + 1,
          alpha: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      // Limit particle count for high performance
      if (particles.length > 40) {
        particles.splice(0, particles.length - 40);
      }

      // Check hover state & custom cursor label
      const target = e.target as HTMLElement;
      if (target) {
        const button = target.closest('button, [role="button"], .gold-btn-shine');
        const card = target.closest('.glass-card, .glass-card-interactive, .group');
        const link = target.closest('a');
        const img = target.closest('img');

        let text = '';
        if (button) text = 'CLICK';
        else if (card) text = 'EXPLORE';
        else if (link) text = 'VISIT';
        else if (img) text = 'ZOOM';

        const interactive = !!(button || card || link || img);

        if (interactive !== isHovered.current || text !== hoverText.current) {
          isHovered.current = interactive;
          hoverText.current = text;
          label.textContent = text;

          if (interactive) {
            ring.classList.add('w-16', 'h-16', 'bg-[#D4AF37]/20', 'border-[#D4AF37]', 'shadow-[0_0_30px_rgba(212,175,55,0.5)]', 'backdrop-blur-sm');
            ring.classList.remove('w-10', 'h-10', 'border-[#D4AF37]/50');
            label.style.opacity = text ? '1' : '0';
          } else {
            ring.classList.remove('w-16', 'h-16', 'bg-[#D4AF37]/20', 'border-[#D4AF37]', 'shadow-[0_0_30px_rgba(212,175,55,0.5)]', 'backdrop-blur-sm');
            ring.classList.add('w-10', 'h-10', 'border-[#D4AF37]/50');
            label.style.opacity = '0';
          }
        }
      }
    };

    const onMouseDown = () => {
      ring.style.transform += ' scale(0.85)';
    };

    const onMouseUp = () => {
      ring.style.transform = ring.style.transform.replace(' scale(0.85)', '');
    };

    const onMouseLeave = () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    // Render loop for stardust particles & smooth ring physics
    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stardust particle trail
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.03;
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Physics lerp for trailing ring
      const rx = ringPos.current.x;
      const ry = ringPos.current.y;
      const mx = mousePos.current.x;
      const my = mousePos.current.y;

      const nextX = rx + (mx - rx) * 0.32;
      const nextY = ry + (my - ry) * 0.32;

      ringPos.current = { x: nextX, y: nextY };
      ring.style.transform = `translate3d(${nextX}px, ${nextY}px, 0px) translate(-50%, -50%)`;

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave, { passive: true });

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Golden Stardust Physics Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9996] hidden md:block"
      />

      {/* Interactive Luxury Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#D4AF37]/50 rounded-full pointer-events-none z-[9998] transition-all duration-200 ease-out opacity-0 hidden md:flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.2)]"
        style={{ willChange: 'transform' }}
      >
        <span
          ref={labelRef}
          className="text-[9px] font-bold tracking-widest text-[#D4AF37] uppercase opacity-0 transition-opacity duration-200 pointer-events-none select-none font-mono"
        />
      </div>

      {/* Inner Precision Core Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full gold-gradient-bg pointer-events-none z-[9999] opacity-0 shadow-[0_0_12px_#D4AF37] transition-transform duration-150 hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
