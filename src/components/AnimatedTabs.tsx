import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './AnimatedList.css';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

export interface AnimatedTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  layoutId?: string;
}

export const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
  layoutId = 'activeDashboardTab'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [leftGradientOpacity, setLeftGradientOpacity] = useState(0);
  const [rightGradientOpacity, setRightGradientOpacity] = useState(1);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setLeftGradientOpacity(Math.min(scrollLeft / 40, 1));
    const rightDistance = scrollWidth - (scrollLeft + clientWidth);
    setRightGradientOpacity(scrollWidth <= clientWidth ? 0 : Math.min(rightDistance / 40, 1));
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [handleScroll, tabs]);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
        return;
      }

      const currentIndex = tabs.findIndex(t => t.id === activeTab);
      if (currentIndex === -1) return;

      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % tabs.length;
        onChange(tabs[nextIndex].id);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        onChange(tabs[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tabs, activeTab, onChange]);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector(`[data-tab-id="${activeTab}"]`) as HTMLElement;
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  return (
    <div className={`scroll-tabs-container ${className}`}>
      {/* Left scroll fade gradient */}
      <div className="left-gradient" style={{ opacity: leftGradientOpacity }} />

      {/* Tabs list */}
      <div 
        ref={containerRef} 
        className="scroll-tabs no-scrollbar"
        onScroll={handleScroll}
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <motion.button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => onChange(tab.id)}
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: Math.min(index * 0.035, 0.3),
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center space-x-2.5 px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors duration-200 shrink-0 cursor-pointer ${
                isActive 
                  ? 'text-black' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 bg-white/[0.03] border border-white/10'
              }`}
            >
              {/* Active Golden Background Indicator */}
              {isActive && (
                <motion.div
                  layoutId={layoutId}
                  className="absolute inset-0 gold-gradient-bg rounded-xl shadow-lg shadow-[#D4AF37]/25"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Tab Icon and Label */}
              <span className="relative z-10 flex items-center space-x-2">
                {Icon && <Icon className="w-4 h-4 shrink-0" />}
                <span>{tab.label}</span>
              </span>

              {/* Badge if present */}
              {tab.badge !== undefined && (
                <span className={`relative z-10 px-2 py-0.5 rounded-full text-[10px] font-extrabold font-mono ${
                  isActive 
                    ? 'bg-black/20 text-black' 
                    : 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40'
                }`}>
                  {tab.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Right scroll fade gradient */}
      <div className="right-gradient" style={{ opacity: rightGradientOpacity }} />
    </div>
  );
};

export default AnimatedTabs;
