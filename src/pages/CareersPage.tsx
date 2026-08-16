import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  GraduationCap, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Search, 
  X, 
  Building2, 
  Award, 
  Users, 
  HeartHandshake
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string;
  isActive: boolean;
  createdAt: string;
}

export const CareersPage: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Application Modal State
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);

  // Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/get_careers.php')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.jobs)) {
          setJobs(data.jobs.filter((j: JobPosting) => j.isActive));
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const openApplyModal = (job: JobPosting) => {
    setSelectedJob(job);
    setSubmitSuccess(false);
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !applicantPhone) {
      alert('Please fill out your Name, Email, and Phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit_job_application.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob?.id || 'general',
          jobTitle: selectedJob?.title || 'General Application',
          applicantName,
          applicantEmail,
          applicantPhone,
          portfolioUrl,
          resumeUrl,
          coverLetter
        })
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (data.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setIsApplyModalOpen(false);
          setApplicantName('');
          setApplicantEmail('');
          setApplicantPhone('');
          setPortfolioUrl('');
          setResumeUrl('');
          setCoverLetter('');
          setSubmitSuccess(false);
        }, 3000);
      } else {
        alert(data.message || 'Error submitting application.');
      }
    } catch {
      setIsSubmitting(false);
      alert('Error submitting application. Please check network connection.');
    }
  };

  const filteredJobs = jobs.filter(j => {
    const matchesDept = selectedDept === 'All' || j.department === selectedDept;
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          j.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.requirements.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <main className="pt-28 pb-20 bg-[#0B0C0E] text-[#E5E3DF] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-neutral-400">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <span className="text-[#D4AF37]">Careers at Decor8India</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#D4AF37]/40 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join Our Architectural Mastermind</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white font-bold leading-tight">
            Build Modern <span className="gold-gradient-text italic font-normal">Architectates</span> With Us
          </h1>
          <p className="text-neutral-400 font-light text-base sm:text-lg">
            Decor8India is expanding across South India. We are seeking passionate interior architects, 3D visualizers, civil engineers, and turnkey project managers to craft timeless luxury environments.
          </p>
        </div>

        {/* Company Culture & Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <Award className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-white">Award-Winning Craft</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Work on high-profile luxury penthouses, minimalist villas, and corporate headquarters.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <Building2 className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-white">Turnkey Freedom</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Complete creative autonomy from concept 3D renders to on-site civil execution.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <Users className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-white">Master Leadership</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Direct mentorship under CEO & Senior Architects with decades of structural mastery.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <HeartHandshake className="w-8 h-8 text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-white">Top Industry Compensation</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Above-market salary packages, performance bonuses, and rapid career progression.
            </p>
          </div>
        </div>

        {/* Department Filters & Search */}
        <div className="space-y-6 pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-serif font-bold text-white">
              Open <span className="text-[#D4AF37]">Positions</span> ({filteredJobs.length})
            </h2>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search job title, skills..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Department Tabs */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Interior Design', '3D Rendering', 'Civil Engineering', 'Sales / Relations'].map(dept => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedDept === dept 
                    ? 'gold-gradient-bg text-black shadow-md' 
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings Grid */}
        {loading ? (
          <div className="text-center py-16 space-y-3">
            <Sparkles className="w-10 h-10 text-[#D4AF37] animate-spin mx-auto opacity-70" />
            <p className="text-xs text-neutral-400 font-mono">Loading active career opportunities...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl glass-panel border border-white/10 space-y-4">
            <Briefcase className="w-12 h-12 text-[#D4AF37]/50 mx-auto" />
            <h3 className="text-xl font-serif text-white font-medium">No Open Positions Matching Criteria</h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto">
              We are always looking for exceptional talent! Feel free to send your resume directly to{' '}
              <a href="mailto:support@decor8india.com" className="text-[#D4AF37] underline font-bold">support@decor8india.com</a>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] uppercase">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-neutral-300">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-white">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">{job.salary}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono">Job Role:</div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-light">
                      {job.description}
                    </p>
                  </div>

                  {job.requirements && (
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono">Key Requirements:</div>
                      <p className="text-xs text-neutral-300 leading-relaxed font-mono bg-black/40 p-3 rounded-xl border border-white/10">
                        {job.requirements}
                      </p>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => openApplyModal(job)}
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply For Position</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* APPLICATION MODAL */}
        {isApplyModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-xl bg-[#0D0E12] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <button 
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] text-[#D4AF37] uppercase font-mono tracking-widest block font-bold">Decor8India Talent Application</span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Apply for {selectedJob.title}
                </h3>
                <p className="text-xs text-neutral-400">Location: {selectedJob.location} • Department: {selectedJob.department}</p>
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-white">Application Received!</h4>
                  <p className="text-xs text-neutral-300">
                    Thank you for applying. Our talent recruitment team will review your portfolio and contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ar. Vikram Sharma" 
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        placeholder="vikram@example.com" 
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-neutral-300">Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+91 98765 43210" 
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Portfolio / Behance / Drive Link</label>
                    <input 
                      type="url" 
                      placeholder="https://behance.net/yourportfolio or Google Drive link" 
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Resume / CV Link</label>
                    <input 
                      type="url" 
                      placeholder="https://drive.google.com/your-resume.pdf" 
                      value={resumeUrl}
                      onChange={(e) => setResumeUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Cover Note / Key Highlights</label>
                    <textarea 
                      rows={3}
                      placeholder="Briefly describe your architectural experience and key software proficiencies..." 
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Application...' : 'Submit Official Application'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
};
