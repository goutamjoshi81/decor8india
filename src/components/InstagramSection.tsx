import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  CheckCircle2
} from 'lucide-react';
import { apiService } from '../services/apiService';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const InstagramSection: React.FC = () => {
  const [followersCount, setFollowersCount] = useState<string>('5,694');
  const [postsCount, setPostsCount] = useState<string>('224');

  useEffect(() => {
    // Fetch live stats from backend API
    apiService.getInstagramFeed().then(res => {
      if (res && res.success) {
        if (res.followers) setFollowersCount(res.followers);
        if (res.posts_count) setPostsCount(res.posts_count);
      }
    }).catch(err => console.warn('Could not fetch Instagram stats:', err));
  }, []);

  return (
    <section id="instagram-feed" className="py-12 bg-[#0B0C0E] relative overflow-hidden border-t border-b border-white/10">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-purple-900/15 via-pink-900/20 to-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clean Instagram Profile Banner */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900/90 via-[#0D0E12]/95 to-neutral-900/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          
          <div className="flex items-center space-x-5">
            {/* Profile Avatar */}
            <div className="relative group cursor-pointer" onClick={() => window.open('https://www.instagram.com/decor8_india_official/', '_blank')}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[3px] bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 animate-spin-slow">
                <div className="w-full h-full bg-[#0B0C0E] rounded-full p-1">
                  <img 
                    src="/logo_icon.png" 
                    alt="Decor8India Official Instagram" 
                    className="w-full h-full object-contain p-2 bg-black rounded-full"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-purple-600 to-pink-600 text-white p-1 rounded-full border-2 border-[#0B0C0E]">
                <InstagramIcon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-1 text-left">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                  decor8_india_official
                </h3>
                <span title="Verified Studio Account"><CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20 shrink-0" /></span>
              </div>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-medium">
                Decor8India Architecture & Turnkey Interior Studio
              </p>
              <div className="flex items-center space-x-4 text-xs text-neutral-400 font-mono pt-0.5">
                <span><strong className="text-white">{postsCount}</strong> Posts</span>
                <span>•</span>
                <span><strong className="text-white">{followersCount}</strong> Followers</span>
                <span>•</span>
                <span><strong className="text-white">Bengaluru & Mumbai</strong></span>
              </div>
            </div>
          </div>

          {/* Follow CTA Button */}
          <div className="w-full lg:w-auto">
            <a 
              href="https://www.instagram.com/decor8_india_official/"
              target="_blank"
              rel="noreferrer"
              className="w-full lg:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:via-pink-500 hover:to-amber-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-pink-900/30 transition-all transform hover:scale-[1.02]"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>FOLLOW @DECOR8_INDIA_OFFICIAL</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
