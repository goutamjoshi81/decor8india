import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  Check, 
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setIsBookingOpen } = useApp();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#07080A] text-neutral-400 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
              <img 
                src="/logo_icon.png" 
                alt="Decor8 India Logo" 
                className="h-11 sm:h-13 w-auto object-contain transition-transform duration-500 group-hover:scale-110 filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]" 
              />
              <div>
                <span className="text-2xl font-serif tracking-wider text-white font-bold block leading-none">
                  DECOR8<span className="text-[#D4AF37]">INDIA</span>
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#A8A29E] uppercase block font-semibold mt-1">
                  Affordable Luxury
                </span>
              </div>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Decor8India is an award-winning luxury interior architecture, turnkey civil construction, and fitout firm, creating timeless residential penthouses, minimalist villas, and high-performance commercial headquarters.
            </p>

            <div className="space-y-1.5 pt-1 text-xs text-neutral-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>#14, sy no 36/1, vasanth vallabnagar, vasanthpura, uttrahalli hobilli, bengaluru 560061</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href="tel:+919380523743" className="hover:text-[#D4AF37] transition-colors font-mono">+91 93805 23743</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href="mailto:support@decor8india.com" className="hover:text-[#D4AF37] transition-colors font-mono">support@decor8india.com</a>
              </div>
            </div>

            <div className="flex space-x-3 pt-2">
              <a 
                href="https://www.instagram.com/decor8_india_official/" 
                target="_blank" 
                rel="noreferrer" 
                title="Decor8India Official Instagram"
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-amber-600/30 border border-pink-500/30 flex items-center space-x-1.5 hover:border-pink-500 text-xs font-semibold text-white transition-all"
              >
                <span className="text-[#D4AF37]">📸</span>
                <span>@decor8_india_official</span>
              </a>
              <a 
                href="https://share.google/3GNXUSyRz9GzGN8D9" 
                target="_blank" 
                rel="noreferrer" 
                title="Decor8India Google Business Profile"
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center space-x-1.5 hover:border-[#D4AF37] text-xs font-semibold text-white transition-all"
              >
                <span className="text-amber-400">⭐</span>
                <span>Google Profile</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Company</div>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">About Story</Link></li>
              <li><Link to="/services" className="hover:text-[#D4AF37] transition-colors">Our Services</Link></li>
              <li><Link to="/estimator" className="hover:text-[#D4AF37] transition-colors text-[#D4AF37] font-semibold">Cost Estimator</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#D4AF37] transition-colors">Completed Projects</Link></li>
              <li><Link to="/projects" className="hover:text-[#D4AF37] transition-colors">Live Ongoing Sites</Link></li>
              <li><Link to="/blogs" className="hover:text-[#D4AF37] transition-colors">Design Magazine</Link></li>
            </ul>
          </div>

          {/* Col 3: Packages */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Popular Packages</div>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setIsBookingOpen(true)} className="hover:text-[#D4AF37] transition-colors text-left">1 BHK Luxury Package</button></li>
              <li><button onClick={() => setIsBookingOpen(true)} className="hover:text-[#D4AF37] transition-colors text-left">2 BHK Premium Interior</button></li>
              <li><button onClick={() => setIsBookingOpen(true)} className="hover:text-[#D4AF37] transition-colors text-left">3 BHK Royal Residency</button></li>
              <li><button onClick={() => setIsBookingOpen(true)} className="hover:text-[#D4AF37] transition-colors text-left">Grand Villa Turnkey</button></li>
              <li><button onClick={() => setIsBookingOpen(true)} className="hover:text-[#D4AF37] transition-colors text-left">Corporate Office Fitouts</button></li>
              <li><button onClick={() => setIsBookingOpen(true)} className="hover:text-[#D4AF37] transition-colors text-left">Fine Dining Restaurant</button></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">Exclusive Newsletter</div>
            <p className="text-xs text-neutral-400">
              Subscribe to receive curated monthly luxury trends, color forecasts, and architectural case studies.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input 
                  type="email" 
                  required
                  placeholder="Enter email address..." 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                />
                <button 
                  type="submit" 
                  className="w-full py-2 rounded-lg gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center space-x-1"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Subscribed! Thank you.</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 space-y-4 sm:space-y-0">
          <div>
            © 2026 Decor8India Architecture & Interiors Pvt. Ltd. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <Link to="/contact" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
            <Link to="/about" className="hover:text-neutral-300 transition-colors">Careers at Decor8India</Link>
            <Link to="/contact" className="hover:text-neutral-300 transition-colors">Contact Us</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
