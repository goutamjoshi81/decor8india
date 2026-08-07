import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  MapPin, 
  Maximize2, 
  DollarSign, 
  Clock, 
  Calendar,
  Sparkles,
  ChevronRight,
  PhoneCall,
  ImageIcon
} from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, setIsBookingOpen, setIsSiteVisitOpen, setSelectedProjectForSiteVisit } = useApp();

  const project = projects.find(p => p.id === id || p.title.toLowerCase().replace(/ /g, '-') === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

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
              Designed by <span className="text-[#D4AF37] font-semibold">{project.designerName}</span>
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
              <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Budget Outlay</span>
            </div>
            <div className="text-sm font-bold text-emerald-400">{project.budget}</div>
          </div>

          <div className="p-4 rounded-xl glass-card border border-white/10 space-y-1">
            <div className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Execution Time</span>
            </div>
            <div className="text-sm font-bold text-white">{project.completionTime}</div>
          </div>
        </div>

        {/* Main Media Gallery / Before-After Toggle */}
        <div className="space-y-4">
          {project.beforeImage && project.afterImage && (
            <div className="flex justify-end">
              <button 
                onClick={() => setShowBeforeAfter(!showBeforeAfter)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{showBeforeAfter ? 'View Photo Gallery' : 'View Before / After Transformation'}</span>
              </button>
            </div>
          )}

          {showBeforeAfter && project.beforeImage && project.afterImage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">Before Renovation</div>
                <div className="h-96 rounded-2xl overflow-hidden border border-red-500/30">
                  <img src={project.beforeImage} alt="Before renovation" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">After Transformation</div>
                <div className="h-96 rounded-2xl overflow-hidden border border-emerald-500/30">
                  <img src={project.afterImage} alt="After transformation" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-96 sm:h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                <img 
                  src={galleryList[activeImageIndex]} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {galleryList.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {galleryList.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-24 h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
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
              {project.workUpdates.map((update) => (
                <div key={update.id} className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                    <span className="text-[#D4AF37] font-bold">{update.stage}</span>
                    <span>{update.date}</span>
                  </div>
                  {update.mediaUrls && update.mediaUrls[0] && (
                    <div className="h-56 rounded-xl overflow-hidden border border-white/10">
                      <img src={update.mediaUrls[0]} alt={update.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <h4 className="font-serif text-lg font-bold text-white">{update.title}</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">{update.description}</p>
                </div>
              ))}
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
