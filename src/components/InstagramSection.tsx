import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Sparkles, 
  Grid, 
  CheckCircle2
} from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

interface InstagramPost {
  id: string;
  image: string;
  likes: string;
  comments: string;
  caption: string;
  category: 'Living Room' | 'Penthouse' | 'Modular Kitchen' | 'Master Suite' | 'Commercial' | 'Lighting';
  date: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
    likes: '3,420',
    comments: '142',
    caption: 'Double-height living lounge at The Imperial Duplex Penthouse, Worli. Italian Statuario marble meeting brass inlay woodwork. 🏛️✨',
    category: 'Penthouse',
    date: '2 DAYS AGO'
  },
  {
    id: 'post-2',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=85',
    likes: '2,890',
    comments: '98',
    caption: 'Minimalist luxury master bedroom suite in South Mumbai. Warm ambient recessed LEDs paired with fluted acoustic panelling. 🛋️',
    category: 'Master Suite',
    date: '4 DAYS AGO'
  },
  {
    id: 'post-3',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85',
    likes: '4,150',
    comments: '210',
    caption: 'Bespoke Island Modular Kitchen with Quartz waterfall countertop and tandem soft-close drawers. 🍳💎',
    category: 'Modular Kitchen',
    date: '1 WEEK AGO'
  },
  {
    id: 'post-4',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85',
    likes: '3,780',
    comments: '165',
    caption: 'Turnkey Villa Fitout handover at Alibaug Coast. Seamless indoor-to-outdoor living with customized lounge seating. 🌿🏡',
    category: 'Penthouse',
    date: '1 WEEK AGO'
  },
  {
    id: 'post-5',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85',
    likes: '2,120',
    comments: '87',
    caption: 'High-productivity corporate executive office setup with biophilic green walls and acoustic isolated cabins. 🏢💼',
    category: 'Commercial',
    date: '2 WEEKS AGO'
  },
  {
    id: 'post-6',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85',
    likes: '5,040',
    comments: '312',
    caption: 'Fine Dining Restaurant interior with custom warm ambient lighting and plush velvet dining booth suites. 🍷✨',
    category: 'Lighting',
    date: '2 WEEKS AGO'
  }
];

export const InstagramSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Penthouse', 'Master Suite', 'Modular Kitchen', 'Commercial', 'Lighting'];

  const filteredPosts = activeFilter === 'All' 
    ? INSTAGRAM_POSTS 
    : INSTAGRAM_POSTS.filter(post => post.category === activeFilter);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="instagram-feed" className="py-24 bg-[#0B0C0E] relative overflow-hidden border-t border-b border-white/10">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-900/10 via-pink-900/15 to-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header with Profile Card */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-8 rounded-3xl bg-gradient-to-r from-neutral-900/90 via-[#0D0E12]/95 to-neutral-900/90 border border-white/10 shadow-2xl backdrop-blur-xl">
          
          <div className="flex items-center space-x-5">
            {/* Instagram Profile Avatar */}
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 animate-spin-slow">
                <div className="w-full h-full bg-[#0B0C0E] rounded-full p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80" 
                    alt="Decor8India Official" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-tr from-purple-600 to-pink-600 text-white p-1.5 rounded-full border-2 border-[#0B0C0E]">
                <InstagramIcon className="w-4 h-4" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide">
                  decor8_india_official
                </h3>
                <span title="Verified Studio Account"><CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20 shrink-0" /></span>
              </div>
              <p className="text-xs sm:text-sm text-[#D4AF37] font-medium">
                Decor8India Architecture & Luxury Interiors
              </p>
              <div className="flex items-center space-x-4 text-xs text-neutral-400 font-mono pt-1">
                <span><strong className="text-white">1,480+</strong> Posts</span>
                <span>•</span>
                <span><strong className="text-white">68.5k</strong> Followers</span>
                <span>•</span>
                <span><strong className="text-white">Worli, Mumbai</strong></span>
              </div>
            </div>
          </div>

          {/* Follow CTA Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <a 
              href="https://www.instagram.com/decor8_india_official/"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:via-pink-500 hover:to-amber-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl shadow-pink-900/30 transition-all transform hover:scale-[1.02]"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow @decor8_india_official</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a 
              href="https://share.google/3GNXUSyRz9GzGN8D9"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-amber-400 font-semibold flex items-center justify-center space-x-2 transition-all"
            >
              <span>⭐ View Google Profile</span>
            </a>
          </div>

        </div>

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
          <div className="flex items-center space-x-2">
            <Grid className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono font-semibold">Latest Gallery Feed</span>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                  activeFilter === cat 
                    ? 'gold-gradient-bg text-black font-bold shadow-md' 
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const isLiked = likedPosts[post.id];
            return (
              <div 
                key={post.id} 
                className="group relative rounded-2xl overflow-hidden glass-card border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 shadow-xl flex flex-col"
              >
                {/* Photo Header Tag */}
                <div className="relative h-72 sm:h-80 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.caption} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] font-semibold">
                    {post.category}
                  </div>

                  {/* Hover Instagram Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between text-white text-xs font-mono">
                      <span className="flex items-center space-x-1 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                        <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                        <span>Instagram Post</span>
                      </span>
                      <button 
                        onClick={(e) => toggleLike(post.id, e)}
                        className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                          isLiked ? 'bg-rose-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="space-y-3 text-left">
                      <p className="text-xs text-neutral-200 line-clamp-3 leading-relaxed font-light">
                        {post.caption}
                      </p>
                      
                      <a 
                        href="https://www.instagram.com/decor8_india_official/"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-2 text-xs font-bold text-[#D4AF37] hover:underline"
                      >
                        <span>View Original Post on Instagram</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer Stats Bar */}
                <div className="p-4 bg-[#0D0E12] border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={(e) => toggleLike(post.id, e)} 
                      className={`flex items-center space-x-1.5 transition-colors ${isLiked ? 'text-rose-400' : 'hover:text-white'}`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-rose-400' : ''}`} />
                      <span>{isLiked ? (parseInt(post.likes.replace(/,/g, '')) + 1).toLocaleString() : post.likes}</span>
                    </button>

                    <div className="flex items-center space-x-1.5 hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4 text-sky-400" />
                      <span>{post.comments}</span>
                    </div>
                  </div>

                  <span className="text-[10px] text-neutral-500">{post.date}</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner CTA */}
        <div className="p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/30 text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Join 68,000+ Luxury Design Enthusiasts</span>
          </div>
          <h4 className="text-xl sm:text-3xl font-serif text-white">
            Daily Interior Inspiration & <span className="gold-gradient-text italic font-normal">Behind-The-Scenes Site Handovers</span>
          </h4>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto">
            Follow <strong className="text-white font-mono">@decor8_india_official</strong> on Instagram to watch live site walkthroughs, material selection guides, and architectural renders.
          </p>
          <a 
            href="https://www.instagram.com/decor8_india_official/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-xl shadow-[#D4AF37]/20 transition-all"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Open @decor8_india_official on Instagram</span>
          </a>
        </div>

      </div>
    </section>
  );
};
