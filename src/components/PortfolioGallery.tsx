import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import { 
  Sparkles, 
  MapPin, 
  Ruler, 
  Calendar, 
  Star, 
  Quote 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { LuxuryPhotoGallery } from './LuxuryPhotoGallery';

export const PortfolioGallery: React.FC = () => {
  const { projects } = useApp();
  const navigate = useNavigate();
  
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Before / After Slider Position (0 - 100%)
  const [beforeAfterPos, setBeforeAfterPos] = useState<number>(50);

  const completedProjects = projects.filter(p => 
    (p.isPortfolio || p.status === 'Completed' || p.progressPercentage === 100 || p.currentStage === 'Handover Completed') &&
    p.showOnLandingPage !== false
  );

  const filteredProjects = completedProjects.filter(p => {
    if (filterCategory === 'All') return true;
    if (filterCategory === 'Residential') return p.category === 'Residential';
    if (filterCategory === 'Commercial') return p.category === 'Commercial';
    if (filterCategory === 'Construction') return p.category === 'Construction';
    if (filterCategory === 'Luxury') return p.style === 'Luxury';
    if (filterCategory === 'Modern') return p.style === 'Modern';
    if (filterCategory === 'Minimal') return p.style === 'Minimal';
    if (filterCategory === 'Traditional') return p.style === 'Traditional';
    return true;
  });

  return (
    <section id="portfolio" className="py-24 bg-[#0D0E12] glass-section relative overflow-hidden section-gpu-optimize">
      
      {/* GPU-Native Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full pointer-events-none glow-orb-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Masterpiece Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">
            Explore Our Completed <span className="gold-gradient-text italic font-normal">Architectural Gems</span>
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg">
            A curated showcase of our finest luxury penthouses, minimalist villas, turnkey construction builds, and executive corporate headquarters across India.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {['All', 'Residential', 'Commercial', 'Construction', 'Luxury', 'Modern', 'Minimal', 'Traditional'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                filterCategory === cat
                  ? 'gold-gradient-bg text-black shadow-lg shadow-[#D4AF37]/20 font-bold'
                  : 'glass-panel text-neutral-400 hover:text-white hover:border-[#D4AF37]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl glass-panel border border-white/10 space-y-4">
            <Sparkles className="w-12 h-12 text-[#D4AF37]/50 mx-auto" />
            <h3 className="text-xl font-serif text-white font-medium">No Portfolio Projects Found</h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto">
              There are currently no completed projects in the database. Projects added to the database will automatically appear here.
            </p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, idx) => (
            <motion.div 
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ 
                duration: 0.35, 
                delay: Math.min(idx * 0.04, 0.3),
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ y: -6 }}
              onClick={() => navigate(`/portfolio/${project.id}`)}
              className="group glass-card-interactive rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-shadow duration-300 ease-out shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/15"
              style={{ willChange: 'transform' }}
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  {/* Category & Style Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-[#D4AF37] uppercase">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-neutral-300 uppercase">
                      {project.style}
                    </span>
                  </div>

                  {(project.beforeImage || project.afterImage) && (
                    <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-[10px] font-bold text-[#D4AF37] flex items-center space-x-1 shadow-lg">
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>Before / After Available</span>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-mono">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Ruler className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{project.area}</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed pt-1">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 space-y-3">
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Turnkey Craftsmanship</span>
                    <span className="text-xs font-semibold text-[#D4AF37]">{project.category} • {project.style}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Execution Time</span>
                    <span className="text-xs font-mono text-neutral-200">{project.completionTime}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/portfolio/${project.id}`);
                    }}
                    className="w-1/2 py-2.5 rounded-lg bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider text-center transition-all hover:opacity-90"
                  >
                    View Project Details
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                      setBeforeAfterPos(50);
                    }}
                    className="w-1/2 py-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 font-bold text-xs uppercase tracking-wider text-center transition-all"
                  >
                    Quick Preview
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        )}

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-[#121316] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors z-10"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10 text-xs font-semibold text-[#D4AF37] uppercase">
                  {selectedProject.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-black/70 border border-white/10 text-xs font-semibold text-neutral-300 uppercase">
                  {selectedProject.style}
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-white">{selectedProject.title}</h2>
              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400 font-mono">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>{selectedProject.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Ruler className="w-4 h-4 text-[#D4AF37]" />
                  <span>{selectedProject.area}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-[#D4AF37]" />
                  <span>{selectedProject.completionTime}</span>
                </div>
              </div>
            </div>

            {/* Interactive Before / After Slider (If Available) */}
            {(selectedProject.beforeImage || selectedProject.afterImage) && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-300 font-semibold uppercase tracking-wider">
                  <span>Interactive Before / After Transformation</span>
                  <span className="text-[#D4AF37]">Drag slider to compare</span>
                </div>
                <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden select-none border border-white/10 shadow-xl">
                  {/* After Image (Full Background) */}
                  <img 
                    src={selectedProject.afterImage || selectedProject.coverImage} 
                    alt="After Transformation" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-black uppercase">
                    AFTER
                  </div>

                  {/* Before Image (Clipped) */}
                  <div 
                    className="absolute inset-0 overflow-hidden" 
                    style={{ width: `${beforeAfterPos}%` }}
                  >
                    <img 
                      src={selectedProject.beforeImage || selectedProject.coverImage} 
                      alt="Before Transformation" 
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', minWidth: '100%' }}
                    />
                    <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-md px-3 py-1 rounded text-xs font-bold text-white uppercase">
                      BEFORE
                    </div>
                  </div>

                  {/* Slider Control Line */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] cursor-ew-resize z-10"
                    style={{ left: `${beforeAfterPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full gold-gradient-bg flex items-center justify-center text-black shadow-xl font-bold">
                      ↔
                    </div>
                  </div>

                  {/* Invisible Range Input Overlay */}
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={beforeAfterPos} 
                    onChange={(e) => setBeforeAfterPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
                  />
                </div>
              </div>
            )}

            {/* Gallery Image Viewer */}
            {(() => {
              const galleryImages = (selectedProject.galleryImages && selectedProject.galleryImages.length > 0)
                ? selectedProject.galleryImages
                : [selectedProject.coverImage].filter(Boolean);

              return (
                <LuxuryPhotoGallery
                  images={galleryImages}
                  title={`${selectedProject.title} - Photography`}
                  subtitle="Architectural and interior space capture"
                  mode="carousel"
                  showLightbox={true}
                />
              );
            })()}

            {/* Description & Testimonial */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-white/10">
              <div className="lg:col-span-7 space-y-3">
                <h4 className="font-serif text-xl font-bold text-white">Project Architectural Overview</h4>
                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                  {selectedProject.description}
                </p>
                <div className="text-xs text-neutral-400 font-mono">
                  Principal Architect: <span className="text-white font-medium">{selectedProject.designerName}</span>
                </div>
              </div>

              {selectedProject.clientTestimonial && (
                <div className="lg:col-span-5 p-5 rounded-xl glass-panel-gold border border-[#D4AF37]/30 space-y-3">
                  <div className="flex items-center justify-between text-[#D4AF37]">
                    <Quote className="w-6 h-6" />
                    <div className="flex text-amber-400">
                      {[...Array(selectedProject.clientTestimonial?.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-neutral-200 italic">
                    "{selectedProject.clientTestimonial.quote}"
                  </p>
                  <div className="pt-2 border-t border-[#D4AF37]/20 text-xs">
                    <div className="font-bold text-white">{selectedProject.clientTestimonial.clientName}</div>
                    <div className="text-[10px] text-[#D4AF37]">{selectedProject.clientTestimonial.designation}</div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
