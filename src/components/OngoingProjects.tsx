import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Activity, 
  MapPin, 
  Calendar, 
  UserCheck, 
  Eye,
  ArrowRight
} from 'lucide-react';
import { TiltContainer } from './TiltContainer';

export const OngoingProjects: React.FC = () => {
  const { projects, setIsSiteVisitOpen, setSelectedProjectForSiteVisit } = useApp();
  const navigate = useNavigate();
  
  // Exclude completed projects (status === 'Completed', progress >= 100, or stage === 'Handover Completed')
  const activeOngoingProjects = projects.filter(p => 
    p.status !== 'Completed' && 
    (p.progressPercentage === undefined || p.progressPercentage < 100) && 
    p.currentStage !== 'Handover Completed'
  );

  const landingSelected = activeOngoingProjects.filter(p => p.showOnLandingPage === true);
  const ongoingList = landingSelected.length > 0 
    ? landingSelected 
    : activeOngoingProjects.filter(p => p.showOnLandingPage !== false);

  const handleBookVisitForProject = (projectTitle: string) => {
    setSelectedProjectForSiteVisit(projectTitle);
    setIsSiteVisitOpen(true);
  };

  return (
    <section id="ongoing" className="py-24 bg-[#0B0C0E] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>Live Site Transparency & Tours</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">
            Currently Under <span className="gold-gradient-text italic font-normal">Active Execution</span>
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg">
            Track real-time progress across our active residential and commercial sites or schedule an in-person guided tour.
          </p>
        </div>

        {/* Ongoing Cards Grid */}
        {ongoingList.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl glass-panel border border-white/10 space-y-4">
            <Activity className="w-12 h-12 text-[#D4AF37]/50 mx-auto" />
            <h3 className="text-xl font-serif text-white font-medium">No Ongoing Projects Found</h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto">
              There are currently no active ongoing projects in the database. Active projects will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ongoingList.map((project) => (
              <TiltContainer key={project.id}>
                <div 
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="glass-card rounded-2xl overflow-hidden border border-white/10 p-6 space-y-6 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between cursor-pointer h-full"
                >
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    
                    {/* Cover Image */}
                    <div className="sm:col-span-5 relative h-48 rounded-xl overflow-hidden">
                      <img 
                        src={project.coverImage} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      {/* Category Tag */}
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 border border-white/10 text-[10px] font-semibold text-[#D4AF37]">
                        {project.category}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="sm:col-span-7 space-y-3">
                      <div className="flex items-center space-x-2 text-xs text-[#D4AF37] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        <span>Active Stage: {project.currentStage}</span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-white leading-tight">
                        {project.title}
                      </h3>

                      <div className="space-y-1 text-xs text-neutral-400 font-mono">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>{project.location} • {project.area}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Client: {project.clientName}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Target Completion: {project.expectedCompletion}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Progress Bar & Percentage */}
                  <div className="space-y-2 pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-neutral-300 uppercase tracking-wider">Overall Completion</span>
                      <span className="text-[#D4AF37] font-mono text-sm">{project.progressPercentage}%</span>
                    </div>
                    
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                      <div 
                        className="h-full gold-gradient-bg rounded-full transition-all duration-1000"
                        style={{ width: `${project.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                </div>

                {/* Bottom Action buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-3">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookVisitForProject(project.title);
                    }}
                    className="w-1/2 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] shadow-md shadow-[#D4AF37]/20"
                  >
                    Schedule Site Visit
                  </button>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/projects/${project.id}`);
                    }}
                    className="w-1/2 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-300 font-bold text-xs uppercase tracking-wider text-center transition-all border border-white/10 flex items-center justify-center space-x-1"
                  >
                    <span>Inspect Live Site</span>
                  </button>
                </div>
              </div>
            </TiltContainer>
            ))}
          </div>
        )}

        {/* CTA banner */}
        <div className="p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">Want to See Our Live Work in Person?</h4>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Book a guided site visit to an ongoing residential or commercial project near your location to inspect our carpentry standards, material finish, and civil execution firsthand.
          </p>
          
          <button 
            onClick={() => {
              setSelectedProjectForSiteVisit(null);
              setIsSiteVisitOpen(true);
            }}
            className="px-8 py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform inline-flex items-center space-x-2 shadow-xl shadow-[#D4AF37]/20"
          >
            <Eye className="w-4 h-4" />
            <span>Schedule In-Person Site Visit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
