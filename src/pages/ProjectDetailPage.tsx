import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Calendar,
  Sparkles,
  ChevronRight,
  PhoneCall,
  ImageIcon,
  Maximize2
} from 'lucide-react';
import { ContactSection } from '../components/ContactSection';
import { LuxuryPhotoGallery } from '../components/LuxuryPhotoGallery';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, setIsBookingOpen, setIsSiteVisitOpen, setSelectedProjectForSiteVisit } = useApp();

  const decodedId = id ? decodeURIComponent(id).toLowerCase().trim() : '';

  const project = projects.find(p => {
    if (!id) return false;
    const pId = p.id.toLowerCase();
    const pTitle = p.title.toLowerCase();
    const pSlug = pTitle.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const cleanId = decodedId.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return (
      p.id === id || 
      p.id === decodedId || 
      pId === decodedId || 
      pTitle === decodedId ||
      pSlug === cleanId ||
      pId === cleanId
    );
  });

  const [beforeAfterPos, setBeforeAfterPos] = useState<number>(50);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0B0C0E] text-white pt-32 pb-20 px-4 text-center space-y-6">
        <Sparkles className="w-16 h-16 text-[#D4AF37] mx-auto opacity-60" />
        <h1 className="text-3xl font-serif font-bold">Project Not Found</h1>
        <p className="text-neutral-400 text-sm max-w-md mx-auto">
          The requested portfolio project could not be found or has been moved.
        </p>
        <Link 
          to="/portfolio" 
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  const galleryList = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.coverImage];

  const handleBookSiteVisit = () => {
    setSelectedProjectForSiteVisit(project.title);
    setIsSiteVisitOpen(true);
  };

  return (
    <main className="pt-28 pb-20 bg-[#0B0C0E] text-[#E5E3DF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-neutral-400">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <Link to={project.status === 'Ongoing' ? '/projects' : '/portfolio'} className="hover:text-[#D4AF37] transition-colors">
            {project.status === 'Ongoing' ? 'Ongoing Works' : 'Portfolio'}
          </Link>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <span className="text-[#D4AF37] truncate max-w-xs">{project.title}</span>
        </div>

        {/* Header Title & Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                project.status === 'Completed'
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                  : 'gold-gradient-bg text-black'
              }`}>
                {project.status === 'Completed' ? '✓ Completed Project' : '🚧 Live Ongoing Site'}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300">
                {project.category} • {project.style} Style
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-xs sm:text-sm text-neutral-400 font-mono">
              Designed by <span className="text-[#D4AF37] font-semibold">{project.designerName && project.designerName !== 'Aarav Mehta' ? project.designerName : 'Mr. Satish Bhat (CEO & Principal Architect)'}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={handleBookSiteVisit}
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 text-xs font-bold text-neutral-200 hover:text-white transition-all flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Book Site Visit</span>
            </button>

            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 flex items-center space-x-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Consult Similar Project</span>
            </button>
          </div>
        </div>

        {/* Project Key Specifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-1">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Location</span>
            </div>
            <div className="text-sm font-bold text-white">{project.location}</div>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-1">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono flex items-center space-x-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Carpet Area</span>
            </div>
            <div className="text-sm font-bold text-white">{project.area}</div>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-1">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Execution Time</span>
            </div>
            <div className="text-sm font-bold text-white">{project.completionTime}</div>
          </div>
        </div>

        {/* Interactive Before / After Architectural Transformation Section */}
        {(project.beforeImage || project.afterImage) && (
          <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#D4AF37]/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#D4AF37]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>ARCHITECTURAL MAKEOVER TRANSFORMATION</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Before & After Renovation Comparison</h3>
              </div>
              <span className="text-xs text-[#D4AF37] font-medium bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
                ↔ Drag slider to inspect transformation
              </span>
            </div>

            {/* Interactive Split Slider */}
            <div className="relative h-80 sm:h-[480px] rounded-2xl overflow-hidden select-none border border-white/10 shadow-2xl">
              {/* After Image (Full Background) */}
              <img 
                src={project.afterImage || project.coverImage} 
                alt="After Transformation" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-black uppercase tracking-wider shadow-lg">
                ✓ AFTER MAKEOVER
              </div>

              {/* Before Image (Clipped) */}
              <div 
                className="absolute inset-0 overflow-hidden" 
                style={{ width: `${beforeAfterPos}%` }}
              >
                <img 
                  src={project.beforeImage || project.coverImage} 
                  alt="Before Renovation" 
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-white uppercase tracking-wider shadow-lg">
                  ⚠ BEFORE RENOVATION
                </div>
              </div>

              {/* Slider Control Line */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-[#D4AF37] cursor-ew-resize z-10 shadow-[0_0_15px_#D4AF37]"
                style={{ left: `${beforeAfterPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full gold-gradient-bg flex items-center justify-center text-black font-bold shadow-2xl ring-2 ring-black">
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

            {/* Side-by-Side Dual Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl glass-card border border-red-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-red-400">
                  <span>BEFORE RENOVATION</span>
                  <span className="text-neutral-500 text-[10px]">Original Site Condition</span>
                </div>
                <div className="h-60 rounded-xl overflow-hidden border border-red-500/30">
                  <img 
                    src={project.beforeImage || project.coverImage} 
                    alt="Before condition" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl glass-card border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-400">
                  <span>AFTER TRANSFORMATION</span>
                  <span className="text-[#D4AF37] text-[10px]">Completed Masterpiece</span>
                </div>
                <div className="h-60 rounded-xl overflow-hidden border border-emerald-500/30">
                  <img 
                    src={project.afterImage || project.coverImage} 
                    alt="After completion" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Media Gallery */}
        <div className="space-y-4">
          <LuxuryPhotoGallery
            images={galleryList}
            title={project.title}
            subtitle="High-definition architectural photography and project capture"
            mode="carousel"
            showLightbox={true}
          />
        </div>

        {/* Project Architectural Overview */}
        <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-4">
          <h3 className="font-serif text-2xl font-bold text-white">Architectural Brief & Execution Scope</h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
            {project.description}
          </p>
        </div>

        {/* Ongoing Work Updates Feed (If Site is Live/Ongoing) */}
        {project.workUpdates && project.workUpdates.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                <ImageIcon className="w-4 h-4" />
                <span>Live Site Work Updates Feed</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Recent Photo & Progress Logs</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.workUpdates.map((update) => {
                const hasBeforeAfter = update.beforeImage || update.afterImage;
                return (
                  <div key={update.id} className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
                    <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                      <span className="text-[#D4AF37] font-bold px-2 py-0.5 rounded bg-[#D4AF37]/20">{update.stage}</span>
                      <span>{update.date}</span>
                    </div>

                    {/* Before & After in Site Feed Update */}
                    {hasBeforeAfter ? (
                      <div className="grid grid-cols-2 gap-3">
                        {update.beforeImage && (
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider block font-mono">Before</span>
                            <div className="h-44 rounded-xl overflow-hidden border border-red-500/40">
                              <img src={update.beforeImage} alt="Before" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        )}
                        {update.afterImage && (
                          <div className="space-y-1">
                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block font-mono">After</span>
                            <div className="h-44 rounded-xl overflow-hidden border border-emerald-500/40">
                              <img src={update.afterImage} alt="After" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      update.mediaUrls && update.mediaUrls[0] && (
                        <div className="h-56 rounded-xl overflow-hidden border border-white/10">
                          <img src={update.mediaUrls[0]} alt={update.title} className="w-full h-full object-cover" />
                        </div>
                      )
                    )}

                    <h4 className="font-serif text-lg font-bold text-white">{update.title}</h4>
                    <p className="text-xs text-neutral-300 leading-relaxed font-light">{update.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      <div className="pt-20">
        <ContactSection />
      </div>
    </main>
  );
};
