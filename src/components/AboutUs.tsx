import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  Eye, 
  Layers,
  Clock,
  Gem
} from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { teamMembers } = useApp();

  const whyChooseUs = [
    {
      icon: Clock,
      title: '100% On-Time Execution',
      desc: 'We enforce strict penalty-backed completion timelines with live daily project tracking.'
    },
    {
      icon: Gem,
      title: 'Italian & Global Sourcing',
      desc: 'Direct import of Statuario marbles, European veneers, and German Blum/Hettich hardware.'
    },
    {
      icon: Layers,
      title: 'Turnkey Construction & Fitouts',
      desc: 'From ground-up civil construction to luxury modular woodwork — zero hassle with multiple contractors.'
    },
    {
      icon: ShieldCheck,
      title: '10-Year Warranty',
      desc: 'Uncompromising durability backed by our 10-year comprehensive modular warranty.'
    }
  ];

  const awards = [
    { title: 'Best Luxury Interior Design Firm 2025', issuer: 'Architectural Digest India' },
    { title: 'Excellence in Commercial Fitouts 2024', issuer: 'National Real Estate Awards' },
    { title: 'Top 10 Innovative Sustainable Designers', issuer: 'Design Matrix Global' },
    { title: 'ISO 9001:2015 Certified Operations', issuer: 'International Quality Standards' }
  ];

  return (
    <section id="about" className="py-24 bg-[#0B0C0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Compass className="w-3.5 h-3.5" />
            <span>About Decor8India</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
            Where Visionary Architecture Meets <span className="gold-gradient-text italic font-normal">Uncompromised Luxury</span>
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg">
            Founded in 2012, Decor8India has redefined bespoke interior design, turnkey civil construction, and architecture by blending heritage craftsmanship with contemporary ergonomics and smart automation.
          </p>
        </div>

        {/* Story & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Image Showcase */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" 
                alt="Decor8India Studio & Workshop" 
                className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel rounded-xl border border-white/10">
                <div className="text-[#D4AF37] font-serif text-lg font-semibold">Craftsmanship & Precision</div>
                <div className="text-xs text-neutral-300">Over 450+ bespoke luxury residences and corporate offices brought to life.</div>
              </div>
            </div>
            {/* Background Glow Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#D4AF37]/30 rounded-2xl -z-0 pointer-events-none hidden sm:block" />
          </div>

          {/* Story Copy */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif text-white">Our Design Philosophy</h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              We believe true luxury lies in the harmony between structural proportion, material honesty, and ambient light. Every space we sculpt is tailored to reflect the unique aura and lifestyle of its inhabitants.
            </p>
            
            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl glass-card space-y-2">
                <div className="flex items-center space-x-2 text-[#D4AF37]">
                  <Eye className="w-5 h-5" />
                  <span className="font-serif font-bold text-lg text-white">Our Vision</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  To set global benchmarks in luxury architectural interiors by harmonizing traditional craftsmanship with smart sustainable tech.
                </p>
              </div>

              <div className="p-4 rounded-xl glass-card space-y-2">
                <div className="flex items-center space-x-2 text-[#D4AF37]">
                  <Target className="w-5 h-5" />
                  <span className="font-serif font-bold text-lg text-white">Our Mission</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  To deliver seamless turnkey interior experiences with complete transparency, 100% schedule fidelity, and lasting material quality.
                </p>
              </div>
            </div>

            {/* Values bullet */}
            <div className="pt-2 flex flex-wrap gap-3">
              {['Material Honesty', 'Precision Detailing', 'Transparent Pricing', 'Client Privacy'].map((val, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-neutral-200 flex items-center space-x-1.5">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>{val}</span>
                </span>
              ))}
            </div>

          </div>

        </div>

        {/* Why Choose Us Grid */}
        <div className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-4xl font-serif text-white">Why Choose Decor8India</h3>
            <p className="text-xs sm:text-sm text-neutral-400">The pillars of our architectural & interior excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="p-6 rounded-2xl glass-card space-y-4 border border-white/10 hover:border-[#D4AF37]/40">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-white">{item.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Meet the Team */}
        <div className="space-y-10 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold">Leadership & Talent</span>
              <h3 className="text-3xl font-serif text-white">Meet Our Master Architects</h3>
            </div>
            <p className="text-xs text-neutral-400 max-w-md">
              A collective of seasoned architects, interior designers, and visualization engineers dedicated to crafting world-class spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group glass-card rounded-2xl overflow-hidden border border-white/10">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-serif font-bold text-xl text-white group-hover:text-[#D4AF37] transition-colors">{member.name}</h4>
                  <div className="text-xs text-[#D4AF37] font-medium">{member.role}</div>
                  <div className="text-[11px] text-neutral-400">{member.experience}</div>
                  <p className="text-xs text-neutral-300 pt-2 border-t border-white/10 line-clamp-3">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Certifications */}
        <div className="p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/30 space-y-6">
          <div className="flex items-center space-x-3 text-[#D4AF37]">
            <Award className="w-6 h-6" />
            <h4 className="font-serif text-2xl font-bold text-white">Awards & Industry Accreditations</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/40 border border-[#D4AF37]/20 space-y-1">
                <div className="text-sm font-semibold text-white">{award.title}</div>
                <div className="text-xs text-[#D4AF37] font-medium">{award.issuer}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
