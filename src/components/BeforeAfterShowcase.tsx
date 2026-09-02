import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Layers, 
  Columns, 
  Play, 
  Pause, 
  RotateCcw,
  Eye,
  Sliders,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface BeforeAfterShowcaseProps {
  beforeImage?: string | null;
  afterImage?: string | null;
  fallbackImage?: string | null;
  projectTitle?: string;
  projectCategory?: string;
  projectStyle?: string;
  className?: string;
}

export const BeforeAfterShowcase: React.FC<BeforeAfterShowcaseProps> = ({
  beforeImage,
  afterImage,
  fallbackImage,
  projectTitle = 'Interior Transformation',
  projectCategory = 'Turnkey',
  projectStyle = 'Luxury',
  className = ''
}) => {
  const beforeSrc = beforeImage || fallbackImage || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80';
  const afterSrc = afterImage || fallbackImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';

  // Active View Tab: 'slider' | 'side-by-side' | 'morph'
  const [activeTab, setActiveTab] = useState<'slider' | 'side-by-side' | 'morph'>('slider');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [morphOpacity, setMorphOpacity] = useState<number>(100); // 0 = Before, 100 = After
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);
  const directionRef = useRef<number>(1); // 1 = right, -1 = left

  // Auto-play animation for interactive slider
  useEffect(() => {
    if (!isPlaying || activeTab !== 'slider') {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    let current = sliderPos;
    let speed = 0.35; // smooth pace

    const step = () => {
      current += speed * directionRef.current;
      if (current >= 92) {
        current = 92;
        directionRef.current = -1;
      } else if (current <= 8) {
        current = 8;
        directionRef.current = 1;
      }
      setSliderPos(current);
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, activeTab]);

  const handleReset = () => {
    setIsPlaying(false);
    setSliderPos(50);
    setMorphOpacity(100);
  };

  return (
    <div className={`rounded-3xl p-6 sm:p-10 glass-panel border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden space-y-8 ${className}`}>
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Title & Animated Mode Switcher */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#D4AF37] tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span>Turnkey Execution Transformation</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Before & After Architectural Makeover
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-light">
            {projectTitle ? `${projectTitle}: ` : ''}Compare the raw original site state with our fully executed turnkey luxury architectural interior.
          </p>
        </div>

        {/* Animated Tabs */}
        <div className="flex items-center p-1.5 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-md shadow-inner">
          <button
            type="button"
            onClick={() => { setActiveTab('slider'); }}
            className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'slider' ? 'text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {activeTab === 'slider' && (
              <motion.div
                layoutId="activeBeforeAfterTab"
                className="absolute inset-0 gold-gradient-bg rounded-xl shadow-lg"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <Sliders className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Interactive Slider</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('side-by-side'); setIsPlaying(false); }}
            className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'side-by-side' ? 'text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {activeTab === 'side-by-side' && (
              <motion.div
                layoutId="activeBeforeAfterTab"
                className="absolute inset-0 gold-gradient-bg rounded-xl shadow-lg"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <Columns className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Side-by-Side</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('morph'); setIsPlaying(false); }}
            className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'morph' ? 'text-black' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {activeTab === 'morph' && (
              <motion.div
                layoutId="activeBeforeAfterTab"
                className="absolute inset-0 gold-gradient-bg rounded-xl shadow-lg"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <Layers className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Fade Morph</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {/* TAB 1: INTERACTIVE SPLIT SLIDER */}
        {activeTab === 'slider' && (
          <motion.div
            key="slider"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Top Toolbar with Auto-Play and Quick Jumps */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md ${
                    isPlaying 
                      ? 'bg-amber-500 text-black animate-pulse' 
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause Auto Tour' : '▶ Auto-Sweep Tour'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-medium flex items-center space-x-1 transition-colors"
                  title="Reset to 50% split"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>50:50 Center</span>
                </button>
              </div>

              <div className="flex items-center space-x-2 text-[11px] font-mono text-neutral-400">
                <span className="text-red-400 font-bold">{(100 - sliderPos).toFixed(0)}% Before</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold">{sliderPos.toFixed(0)}% After</span>
              </div>
            </div>

            {/* Interactive Frame */}
            <div className="relative h-80 sm:h-[500px] md:h-[560px] rounded-2xl overflow-hidden select-none border border-white/15 shadow-2xl group">
              {/* After Image (Full Base) */}
              <img 
                src={afterSrc} 
                alt="After Transformation" 
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* After Badge */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-5 right-5 bg-emerald-500/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-extrabold text-black uppercase tracking-wider shadow-2xl flex items-center space-x-1.5 ring-1 ring-emerald-300"
              >
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>AFTER TRANSFORMATION</span>
              </motion.div>

              {/* Before Image (Clipped Overlay) */}
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ width: `${sliderPos}%` }}
              >
                <img 
                  src={beforeSrc} 
                  alt="Before Renovation" 
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '100%' }}
                />

                {/* Before Badge */}
                <div className="absolute top-5 left-5 bg-red-500/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-extrabold text-white uppercase tracking-wider shadow-2xl flex items-center space-x-1.5 ring-1 ring-red-300">
                  <AlertCircle className="w-4 h-4 text-white" />
                  <span>BEFORE RENOVATION</span>
                </div>
              </div>

              {/* Divider Line & Golden Control Dial */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] cursor-ew-resize z-20 shadow-[0_0_20px_#D4AF37]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full gold-gradient-bg flex items-center justify-center text-black font-extrabold shadow-2xl ring-4 ring-black/80 hover:scale-110 transition-transform">
                  <span className="text-sm">↔</span>
                </div>
              </div>

              {/* Invisible Range Slider Overlay for Mouse/Touch scrub */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderPos} 
                onChange={(e) => {
                  if (isPlaying) setIsPlaying(false);
                  setSliderPos(Number(e.target.value));
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                aria-label="Before and after comparison slider"
              />

              {/* Bottom helper hint banner */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-medium text-neutral-300 pointer-events-none shadow-lg flex items-center space-x-1.5">
                <span className="text-[#D4AF37]">◀ Drag Dial Left / Right ▶</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: SIDE-BY-SIDE DUAL VIEW */}
        {activeTab === 'side-by-side' && (
          <motion.div
            key="side-by-side"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Before Card */}
            <div className="p-5 rounded-2xl glass-card border border-red-500/30 space-y-3 relative group overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-red-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span>BEFORE RENOVATION</span>
                </div>
                <span className="text-[10px] text-neutral-400 font-mono">Original Site Condition</span>
              </div>

              <div className="h-72 sm:h-96 rounded-xl overflow-hidden border border-red-500/20 relative group-hover:border-red-400/50 transition-colors">
                <img 
                  src={beforeSrc} 
                  alt="Before renovation condition" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 text-xs text-neutral-300 font-mono">
                  • Raw civil masonry & baseline state
                </div>
              </div>
            </div>

            {/* After Card */}
            <div className="p-5 rounded-2xl glass-card border border-emerald-500/30 space-y-3 relative group overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>AFTER TRANSFORMATION</span>
                </div>
                <span className="text-[10px] text-[#D4AF37] font-mono">Decor8 Luxury Finish</span>
              </div>

              <div className="h-72 sm:h-96 rounded-xl overflow-hidden border border-emerald-500/20 relative group-hover:border-emerald-400/50 transition-colors">
                <img 
                  src={afterSrc} 
                  alt="After transformation masterpiece" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 text-xs text-neutral-200 font-mono font-semibold">
                  • {projectCategory} • {projectStyle} Masterpiece Handover
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: CROSS-DISSOLVE FADE MORPH */}
        {activeTab === 'morph' && (
          <motion.div
            key="morph"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-white flex items-center justify-center sm:justify-start space-x-2">
                  <Eye className="w-4 h-4 text-[#D4AF37]" />
                  <span>Live Opacity Cross-Fade Dissolve</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Slide smoothly to dissolve between the original structure and the final interior design.
                </p>
              </div>

              <div className="w-full sm:w-64 space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono font-bold">
                  <span className="text-red-400">Before (0%)</span>
                  <span className="text-emerald-400">After (100%)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={morphOpacity}
                  onChange={(e) => setMorphOpacity(Number(e.target.value))}
                  className="w-full h-2.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>
            </div>

            {/* Morph Viewport */}
            <div className="relative h-80 sm:h-[480px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              {/* Base Before Image */}
              <img 
                src={beforeSrc} 
                alt="Before" 
                className="absolute inset-0 w-full h-full object-cover" 
              />

              {/* Overlaid After Image with dynamic opacity */}
              <div 
                className="absolute inset-0 transition-opacity duration-75"
                style={{ opacity: morphOpacity / 100 }}
              >
                <img 
                  src={afterSrc} 
                  alt="After" 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Floating dynamic percentage indicator */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono font-bold text-white">
                {morphOpacity === 100 ? (
                  <span className="text-emerald-400">✓ 100% Finished Interior</span>
                ) : morphOpacity === 0 ? (
                  <span className="text-red-400">⚠ 100% Raw Site</span>
                ) : (
                  <span>Blending: <span className="text-[#D4AF37]">{morphOpacity}%</span> Finished</span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
