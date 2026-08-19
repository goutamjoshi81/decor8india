import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  UserCheck, 
  Menu, 
  X, 
  PhoneCall, 
  ChevronRight,
  LogOut,
  LayoutDashboard,
  Calculator,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    logout, 
    setIsBookingOpen, 
    setIsAuthOpen, 
    setAuthMode
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showEmiUnderDevModal, setShowEmiUnderDevModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let lastScrolled = false;
    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navItems = [
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Cost Estimator', path: '/estimator' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Ongoing Works', path: '/projects' },
    { label: 'Magazine', path: '/blogs' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top EMI Announcement Banner */}
      <div 
        onClick={() => setShowEmiUnderDevModal(true)}
        className="bg-gradient-to-r from-[#1A1915] via-[#2A2312] to-[#1A1915] border-b border-[#D4AF37]/30 text-white text-[10px] sm:text-xs py-1.5 px-3 text-center flex items-center justify-center space-x-1.5 sm:space-x-2 cursor-pointer group select-none"
      >
        <span className="px-1.5 py-0.5 rounded bg-[#D4AF37] text-black font-extrabold uppercase text-[8px] sm:text-[9px] tracking-wider font-mono shrink-0">EASY EMI</span>
        <span className="font-medium text-neutral-200 truncate sm:whitespace-normal group-hover:text-white transition-colors">Easy Monthly EMI Financing Available Up to 60 Months</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowEmiUnderDevModal(true);
          }}
          className="hidden sm:inline-flex items-center space-x-1 text-[#D4AF37] font-bold hover:underline ml-2 shrink-0 cursor-pointer"
        >
          <span>Calculate EMI</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <header 
        className={`transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0B0C0E]/95 backdrop-blur-xl border-b border-white/10 py-2.5 shadow-2xl shadow-black/80' 
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4'
        }`}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2.5 cursor-pointer group py-1 shrink-0 mr-4 sm:mr-6"
          >
            <img 
              src="/logo_icon.png" 
              alt="Decor8 India Logo" 
              className="h-8 sm:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110 filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)] shrink-0" 
            />
            <div className="shrink-0">
              <span className="text-xl sm:text-2xl font-serif tracking-wider text-white font-bold block leading-none whitespace-nowrap">
                DECOR8<span className="text-[#D4AF37]">INDIA</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#A8A29E] uppercase block font-semibold mt-1 whitespace-nowrap">
                Affordable Luxury
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-4 2xl:space-x-6 text-xs 2xl:text-sm font-medium tracking-wide text-neutral-300">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors py-1 relative group whitespace-nowrap ${
                    isActive ? 'text-[#D4AF37] font-bold' : 'hover:text-[#D4AF37]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    <span className={`absolute bottom-0 left-0 h-[2px] bg-[#D4AF37] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action CTAs & Auth Switches */}
          <div className="hidden lg:flex items-center space-x-2.5 xl:space-x-3 shrink-0">
            

            {/* User Auth state / Portal Navigation */}
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <button 
                  onClick={() => {
                    if (currentUser.role === 'ADMIN') navigate('/admin');
                    else navigate('/client');
                  }}
                  className="flex items-center space-x-1.5 text-xs text-[#D4AF37] hover:underline font-medium whitespace-nowrap"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>{currentUser.role === 'ADMIN' ? 'Admin Panel' : 'Client Portal'}</span>
                </button>
                <div className="w-px h-3 bg-white/20"></div>
                <button 
                  onClick={() => {
                    logout();
                    navigate('/');
                  }} 
                  title="Sign Out" 
                  className="text-neutral-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthOpen(true);
                }}
                className="flex items-center space-x-1 text-xs font-medium px-2.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors whitespace-nowrap"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Login</span>
              </button>
            )}

            {/* Main Book Consultation CTA */}
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="relative group overflow-hidden rounded-lg p-[1px] font-semibold text-xs transition-all duration-300 transform hover:scale-[1.02] shrink-0"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#F5E6AD] to-[#B8860B] group-hover:opacity-100 opacity-80 transition-opacity"></span>
              <span className="relative flex items-center space-x-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-[7px] bg-[#0B0C0E] text-[#D4AF37] group-hover:bg-transparent group-hover:text-black font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </span>
            </button>

          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="xl:hidden flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="text-xs px-3 py-1.5 rounded-md gold-gradient-bg text-black font-semibold uppercase tracking-wider font-mono"
            >
              Book
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0E12]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-3 font-medium text-base text-neutral-300">
            <Link to="/" className="text-left py-2 border-b border-white/5 flex items-center justify-between">
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-neutral-500" />
            </Link>
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="text-left py-2 border-b border-white/5 flex items-center justify-between">
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-neutral-500" />
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            {currentUser ? (
              <button 
                onClick={() => {
                  if (currentUser.role === 'ADMIN') navigate('/admin');
                  else navigate('/client');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-lg bg-white/10 text-[#D4AF37] font-semibold text-center flex items-center justify-center space-x-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to {currentUser.role === 'ADMIN' ? 'Admin Panel' : 'Client Portal'}</span>
              </button>
            ) : (
              <button 
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-lg bg-white/10 text-white font-semibold text-center flex items-center justify-center space-x-2"
              >
                <UserCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Client & Admin Login</span>
              </button>
            )}

            <button 
              onClick={() => {
                setIsBookingOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-lg gold-gradient-bg text-black font-bold uppercase tracking-wider text-center"
            >
              Book Consultation Now
            </button>
          </div>
        </div>
      )}
      </header>

      {/* EMI Calculator Under Development Modal */}
      {showEmiUnderDevModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowEmiUnderDevModal(false)}
        >
          <div 
            className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl glass-panel border border-[#D4AF37]/40 shadow-2xl shadow-black space-y-5 text-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-[#B8860B]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setShowEmiUnderDevModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon & Badge */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/25 to-[#B8860B]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-inner">
              <Calculator className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider font-mono">
              <Sparkles className="w-3 h-3" />
              <span>Feature Under Development</span>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                EMI Calculator <span className="gold-gradient-text">Under Development</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Our automated real-time EMI & Bank Interest Calculator is currently being configured with partner banking networks (HDFC, ICICI, SBI).
              </p>
              <p className="text-xs text-neutral-400 font-mono">
                Easy EMI plans up to <strong className="text-white">60 Months</strong> are available with personalized consultation.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  setShowEmiUnderDevModal(false);
                  setIsBookingOpen(true);
                }}
                className="w-full py-3 px-4 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Request Consultation for EMI</span>
              </button>

              <button
                onClick={() => setShowEmiUnderDevModal(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
