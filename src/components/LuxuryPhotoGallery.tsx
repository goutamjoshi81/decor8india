import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Camera, 
  Sparkles,
  Maximize2
} from 'lucide-react';

export interface LuxuryPhotoGalleryProps {
  images: string[];
  title?: string;
  subtitle?: string;
  mode?: 'grid' | 'carousel';
  columns?: 2 | 3 | 4;
  showLightbox?: boolean;
  className?: string;
}

export const LuxuryPhotoGallery: React.FC<LuxuryPhotoGalleryProps> = ({
  images = [],
  title,
  subtitle,
  mode = 'grid',
  columns = 3,
  showLightbox = true,
  className = ''
}) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);

  const validImages = images.filter(Boolean);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIdx((prev) => (prev < validImages.length - 1 ? prev + 1 : 0));
  }, [validImages.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : validImages.length - 1));
  }, [validImages.length]);

  const handleLightboxNext = useCallback(() => {
    setDirection(1);
    setLightboxIdx((prev) => (prev !== null && prev < validImages.length - 1 ? prev + 1 : 0));
  }, [validImages.length]);

  const handleLightboxPrev = useCallback(() => {
    setDirection(-1);
    setLightboxIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : validImages.length - 1));
  }, [validImages.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIdx(null);
      } else if (e.key === 'ArrowRight') {
        handleLightboxNext();
      } else if (e.key === 'ArrowLeft') {
        handleLightboxPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIdx, handleLightboxNext, handleLightboxPrev]);

  // Touch Swipe Handlers for Mobile Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      touchStartX.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !e.changedTouches[0]) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleLightboxNext();
      } else {
        handleLightboxPrev();
      }
    }
    touchStartX.current = null;
  };

  if (validImages.length === 0) return null;

  const colClass = columns === 4 
    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
    : columns === 2 
      ? 'grid-cols-1 sm:grid-cols-2' 
      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';

  // Animation variants for smooth GPU transitions
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 350, damping: 32 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header if provided */}
      {(title || subtitle) && (
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            {title && (
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                <Camera className="w-4 h-4" />
                <span>{title}</span>
              </div>
            )}
            {subtitle && (
              <p className="text-xs text-neutral-400 font-light">{subtitle}</p>
            )}
          </div>

          <div className="text-[11px] text-neutral-400 font-mono flex items-center space-x-1.5">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>{validImages.length} Visuals</span>
          </div>
        </div>
      )}

      {/* CAROUSEL MODE */}
      {mode === 'carousel' && (
        <div className="space-y-4">
          {/* Main Hero Stage */}
          <div className="relative h-80 sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/80 group">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={activeIdx}
                src={validImages[activeIdx]}
                alt={title ? `${title} - Slide ${activeIdx + 1}` : `Visual ${activeIdx + 1}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full object-cover select-none"
                style={{ willChange: 'transform, opacity' }}
                loading="eager"
                decoding="async"
              />
            </AnimatePresence>

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

            {/* Top Counter & Lightbox Expand Button */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="px-3.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-bold text-[#D4AF37] font-mono shadow-lg">
                Photo {activeIdx + 1} / {validImages.length}
              </div>

              {showLightbox && (
                <button
                  onClick={() => setLightboxIdx(activeIdx)}
                  className="p-2.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-all cursor-pointer shadow-lg hover:scale-105"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Prev / Next Arrows */}
            {validImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white hover:text-black hover:bg-[#D4AF37] transition-all duration-300 z-10 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 shadow-xl"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white hover:text-black hover:bg-[#D4AF37] transition-all duration-300 z-10 cursor-pointer opacity-80 hover:opacity-100 hover:scale-110 shadow-xl"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Interactive Thumbnail Strip */}
          {validImages.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-thin">
              {validImages.map((img, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > activeIdx ? 1 : -1);
                      setActiveIdx(idx);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/25' 
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-[#D4AF37]/10 pointer-events-none" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* GRID MODE */}
      {mode === 'grid' && (
        <div className={`grid ${colClass} gap-5`}>
          {validImages.map((photoUrl, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ 
                duration: 0.35, 
                delay: Math.min(idx * 0.05, 0.35),
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ y: -4 }}
              onClick={() => showLightbox && setLightboxIdx(idx)}
              className="group relative h-60 sm:h-64 rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-black/60 cursor-pointer transition-all duration-500 hover:border-[#D4AF37]/60 hover:shadow-2xl hover:shadow-[#D4AF37]/20"
              style={{ willChange: 'transform' }}
            >
              {/* Photo with smooth zoom */}
              <img
                src={photoUrl}
                alt={title ? `${title} - Photo ${idx + 1}` : `Gallery Photo ${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                style={{ willChange: 'transform' }}
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Hover Badge with Zoom Icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="w-11 h-11 rounded-full gold-gradient-bg flex items-center justify-center text-black shadow-lg mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-wider">Enlarge Photo</span>
                <span className="text-[10px] text-neutral-300 mt-0.5 font-mono">Visual #{idx + 1}</span>
              </div>

              {/* Top Corner Index Badge */}
              <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-[#D4AF37] font-mono opacity-90 group-hover:opacity-0 transition-opacity">
                #{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIdx !== null && validImages[lightboxIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6"
            onClick={() => setLightboxIdx(null)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar: Title & Close */}
            <div 
              className="w-full max-w-6xl flex items-center justify-between z-50 pt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-300 font-serif">
                <Camera className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-white font-bold truncate max-w-xs sm:max-w-md">
                  {title || 'Architectural Photography Showcase'}
                </span>
                <span className="text-[#D4AF37] font-mono text-xs font-bold">
                  ({lightboxIdx + 1} of {validImages.length})
                </span>
              </div>

              <button
                onClick={() => setLightboxIdx(null)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-red-500 text-white transition-all duration-200 cursor-pointer shadow-lg hover:scale-110"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox Display Area */}
            <div 
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              {validImages.length > 1 && (
                <button
                  onClick={handleLightboxPrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/70 border border-white/20 text-white hover:text-black hover:bg-[#D4AF37] transition-all duration-200 z-50 cursor-pointer shadow-2xl hover:scale-110"
                  title="Previous (← Arrow)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Enlarged Photo with Motion Transition */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={lightboxIdx}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-black/90 flex items-center justify-center max-h-[72vh] max-w-full"
                >
                  <img
                    src={validImages[lightboxIdx]}
                    alt={`Enlarged ${lightboxIdx + 1}`}
                    className="max-h-[72vh] max-w-full object-contain select-none"
                    style={{ willChange: 'transform, opacity' }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next Button */}
              {validImages.length > 1 && (
                <button
                  onClick={handleLightboxNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/70 border border-white/20 text-white hover:text-black hover:bg-[#D4AF37] transition-all duration-200 z-50 cursor-pointer shadow-2xl hover:scale-110"
                  title="Next (→ Arrow)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Quick-Pick Thumbnails */}
            {validImages.length > 1 && (
              <div 
                className="w-full max-w-3xl flex justify-center space-x-2 overflow-x-auto py-2 z-50 scrollbar-none"
                onClick={(e) => e.stopPropagation()}
              >
                {validImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > lightboxIdx ? 1 : -1);
                      setLightboxIdx(idx);
                    }}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all duration-200 cursor-pointer ${
                      lightboxIdx === idx
                        ? 'border-[#D4AF37] scale-105 shadow-md shadow-[#D4AF37]/40'
                        : 'border-white/10 opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LuxuryPhotoGallery;
