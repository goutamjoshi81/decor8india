import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Project } from '../types';
import { 
  Sparkles, 
  MapPin, 
  Ruler, 
  Calendar, 
  Star, 
  X, 
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';

export const PortfolioGallery: React.FC = () => {
  const { projects } = useApp();
  
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Before / After Slider Position (0 - 100%)
  const [beforeAfterPos, setBeforeAfterPos] = useState<number>(50);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState<number>(0);

  const completedProjects = projects.filter(p => p.status === 'Completed');

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
    <section id="portfolio" className="py-24 bg-[#0D0E12] relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

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

        {/* Filter Tabs */}
        <div className="flex justify-center">
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl glass-panel border border-white/10 max-w-full overflow-x-auto">
            {['All', 'Residential', 'Commercial', 'Construction', 'Luxury', 'Modern', 'Minimal', 'Traditional'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  filterCategory === cat 
                    ? 'gold-gradient-bg text-black shadow-md' 
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setActiveGalleryIdx(0);
                setBeforeAfterPos(50);
              }}
              className="group glass-card rounded-2xl overflow-hidden border border-white/10 cursor-pointer flex flex-col justify-between hover:border-[#D4AF37]/50 transition-all duration-500 transform hover:-translate-y-1"
            >
              <div>
                {/* Cover Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.coverImage} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/20 to-transparent" />
                  
                  {/* Category & Style Badges */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-[#D4AF37] uppercase">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-neutral-300 uppercase">
                      {project.style}
                    </span>
                  </div>

                  {project.beforeImage && (
                    <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-[10px] font-bold text-[#D4AF37]">
                      Before / After Available
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
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Completed Budget</span>
                    <span className="text-base font-serif font-bold text-[#D4AF37]">{project.budget}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Duration</span>
                    <span className="text-xs font-mono text-neutral-200">{project.completionTime}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/portfolio/${project.id}`;
                    }}
                    className="w-1/2 py-2.5 rounded-lg bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider text-center transition-all hover:opacity-90"
                  >
                    View Project Details
                  </div>
                  <div 
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveGalleryIdx(0);
                      setBeforeAfterPos(50);
                    }}
                    className="w-1/2 py-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 font-bold text-xs uppercase tracking-wider text-center transition-all"
                  >
                    Quick Preview
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-5xl bg-[#0D0E12] border border-white/10 rounded-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-8 animate-in zoom-in-95">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)} 
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">
                <span>{selectedProject.category}</span>
                <span>•</span>
                <span>{selectedProject.style} Style</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                {selectedProject.title}
              </h2>
              <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400 font-mono">
                <span className="flex items-center space-x-1"><MapPin className="w-4 h-4 text-[#D4AF37]" /><span>{selectedProject.location}</span></span>
                <span className="flex items-center space-x-1"><Ruler className="w-4 h-4 text-[#D4AF37]" /><span>{selectedProject.area}</span></span>
                <span className="flex items-center space-x-1"><Calendar className="w-4 h-4 text-[#D4AF37]" /><span>{selectedProject.completionTime}</span></span>
                <span className="text-[#D4AF37] font-bold text-sm">Budget: {selectedProject.budget}</span>
              </div>
            </div>

            {/* Interactive Before / After Slider (If Available) */}
            {selectedProject.beforeImage && selectedProject.afterImage && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-neutral-300 font-semibold uppercase tracking-wider">
                  <span>Interactive Before / After Transformation</span>
                  <span className="text-[#D4AF37]">Drag slider to compare</span>
                </div>
                <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden select-none border border-white/10">
                  {/* After Image (Full Background) */}
                  <img 
                    src={selectedProject.afterImage} 
                    alt="After Transformation" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded text-xs font-bold text-[#D4AF37]">
                    AFTER
                  </div>

                  {/* Before Image (Clipped) */}
                  <div 
                    className="absolute inset-0 overflow-hidden" 
                    style={{ width: `${beforeAfterPos}%` }}
                  >
                    <img 
                      src={selectedProject.beforeImage} 
                      alt="Before Transformation" 
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', minWidth: '100%' }}
                    />
                    <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded text-xs font-bold text-white">
                      BEFORE
                    </div>
                  </div>

                  {/* Slider Control Line */}
                  <div 
                    className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] cursor-ew-resize z-10"
                    style={{ left: `${beforeAfterPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full gold-gradient-bg flex items-center justify-center text-black shadow-xl">
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
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Project Photography Gallery</div>
                  <div className="relative h-96 rounded-2xl overflow-hidden border border-white/10">
                    <img 
                      src={galleryImages[activeGalleryIdx] || selectedProject.coverImage} 
                      alt="Gallery View" 
                      className="w-full h-full object-cover"
                    />

                    {/* Nav Buttons */}
                    {galleryImages.length > 1 && (
                      <>
                        <button 
                          onClick={() => setActiveGalleryIdx(prev => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 text-white hover:text-[#D4AF37]"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>

                        <button 
                          onClick={() => setActiveGalleryIdx(prev => (prev < galleryImages.length - 1 ? prev + 1 : 0))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 text-white hover:text-[#D4AF37]"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Gallery Thumbnails */}
                  {galleryImages.length > 1 && (
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                      {galleryImages.map((img, idx) => (
                        <img 
                          key={idx}
                          src={img}
                          alt="Thumb"
                          onClick={() => setActiveGalleryIdx(idx)}
                          className={`w-20 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                            activeGalleryIdx === idx ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
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
