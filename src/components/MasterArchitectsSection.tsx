import React from 'react';
import { useApp } from '../context/AppContext';
import { TiltContainer } from './TiltContainer';
import { Sparkles } from 'lucide-react';

export const MasterArchitectsSection: React.FC = () => {
  const { teamMembers } = useApp();

  return (
    <section id="master-architects" className="py-24 bg-[#0B0C0E] relative overflow-hidden section-gpu-optimize border-t border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none glow-orb-gold opacity-30 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 text-xs text-[#D4AF37] uppercase tracking-widest font-semibold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>LEADERSHIP & TALENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight">
              Meet Our Master Architects
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
            A collective of seasoned architects, interior designers, and visualization engineers dedicated to crafting world-class spaces.
          </p>
        </div>

        {/* 3-Column Architects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TiltContainer key={member.id || index}>
              <div className="group glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 h-full flex flex-col bg-[#111216]/80 shadow-xl">
                
                {/* Photo with gradient overlay */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-neutral-900">
                  <img 
                    src={member.image || '/logo_transparent.png'} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.failed) {
                        target.dataset.failed = 'true';
                        target.src = '/logo_transparent.png';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-[#111216]/20 to-transparent" />
                </div>

                {/* Bio & Credentials */}
                <div className="p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-white group-hover:text-[#D4AF37] transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-xs text-[#D4AF37] font-semibold mt-1">
                      {member.role}
                    </div>
                    {member.experience && (
                      <div className="text-[11px] text-neutral-400 font-mono mt-0.5">
                        {member.experience}
                      </div>
                    )}
                    <p className="text-xs text-neutral-300 pt-3 mt-3 border-t border-white/10 leading-relaxed font-light line-clamp-4">
                      {member.bio}
                    </p>
                  </div>
                </div>

              </div>
            </TiltContainer>
          ))}
        </div>

      </div>
    </section>
  );
};
