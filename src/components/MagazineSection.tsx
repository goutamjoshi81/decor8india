import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Article } from '../types';
import { 
  BookOpen, 
  Search, 
  Rss, 
  Clock, 
  User, 
  X, 
  ArrowRight, 
  Share2, 
  Check
} from 'lucide-react';

export const MagazineSection: React.FC = () => {
  const { articles } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [showRssModal, setShowRssModal] = useState(false);
  const [copiedRss, setCopiedRss] = useState(false);

  const publishedArticles = articles.filter(a => a.status === 'Published');

  const filteredArticles = publishedArticles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = publishedArticles.find(a => a.featured) || publishedArticles[0];

  const handleCopyRss = () => {
    navigator.clipboard.writeText('https://decor8india.com/rss.xml');
    setCopiedRss(true);
    setTimeout(() => setCopiedRss(false), 2000);
  };

  return (
    <section id="magazine" className="py-24 bg-[#0D0E12] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Architectural Journal</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white">
              Interior Design <span className="gold-gradient-text italic font-normal">Inspiration & Trends</span>
            </h2>
            <p className="text-neutral-400 font-light text-base">
              Curated articles, lighting guides, color psychology, and smart home trends written by our senior principal architects.
            </p>
          </div>

          {/* RSS Feed Trigger Button */}
          <button 
            onClick={() => setShowRssModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl glass-panel border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all shrink-0"
          >
            <Rss className="w-4 h-4" />
            <span>RSS Feed Integration</span>
          </button>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 max-w-full overflow-x-auto">
            {['All', 'Tips', 'Decoration', 'Office Trends', 'Architecture', 'Color Guides', 'Furniture', 'Lighting', 'Smart Home'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#D4AF37] text-black font-bold' 
                    : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search design articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

        </div>

        {/* Featured Article Hero Card */}
        {featuredArticle && selectedCategory === 'All' && !searchQuery && (
          <div 
            onClick={() => setActiveArticle(featuredArticle)}
            className="group glass-card rounded-2xl overflow-hidden border border-[#D4AF37]/40 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:shadow-2xl transition-all duration-500"
          >
            <div className="lg:col-span-7 h-80 sm:h-96 relative overflow-hidden">
              <img 
                src={featuredArticle.coverImage} 
                alt={featuredArticle.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full gold-gradient-bg text-black text-xs font-bold uppercase tracking-wider">
                FEATURED ARTICLE
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
              <div className="flex items-center space-x-3 text-xs text-[#D4AF37] font-semibold">
                <span className="px-2.5 py-0.5 rounded bg-[#D4AF37]/20">{featuredArticle.category}</span>
                <span>•</span>
                <span className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>{featuredArticle.readTime}</span></span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                {featuredArticle.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-neutral-400">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>By {featuredArticle.authorName}</span>
                </div>

                <div className="text-[#D4AF37] font-bold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div 
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group glass-card rounded-2xl overflow-hidden border border-white/10 cursor-pointer flex flex-col justify-between hover:border-[#D4AF37]/40 transition-all duration-500"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={article.coverImage} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/80 border border-white/10 text-[10px] font-semibold text-[#D4AF37]">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-[11px] text-neutral-400 font-mono">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                  <span>By {article.authorName}</span>
                  <span className="text-[#D4AF37] font-semibold flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#0D0E12] border border-white/10 rounded-2xl p-6 sm:p-10 max-h-[92vh] overflow-y-auto space-y-6">
            
            <button 
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-xs text-[#D4AF37] font-semibold">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20">{activeArticle.category}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
                <span>•</span>
                <span>Published {activeArticle.publishedAt}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                {activeArticle.title}
              </h1>

              <div className="flex items-center justify-between text-xs text-neutral-400 pb-4 border-b border-white/10">
                <span className="text-white font-medium">Written by {activeArticle.authorName}</span>
                <button className="flex items-center space-x-1 text-[#D4AF37] hover:underline" onClick={handleCopyRss}>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Article</span>
                </button>
              </div>
            </div>

            <div className="h-96 rounded-2xl overflow-hidden border border-white/10">
              <img 
                src={activeArticle.coverImage} 
                alt={activeArticle.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div 
              className="text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4 font-light prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: activeArticle.content }}
            />

          </div>
        </div>
      )}

      {/* RSS Feed Integration Modal */}
      {showRssModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0D0E12] border border-[#D4AF37]/40 rounded-2xl p-6 space-y-6">
            
            <button 
              onClick={() => setShowRssModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 text-[#D4AF37]">
              <Rss className="w-6 h-6" />
              <h3 className="font-serif text-2xl font-bold text-white">RSS 2.0 Feed Integration</h3>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Newly published articles on Decor8India automatically syndicate across RSS aggregators, Apple News, and interior design portals via our live XML endpoint.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Live RSS Feed Endpoint</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  readOnly 
                  value="https://decor8india.com/rss.xml"
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-amber-300 font-mono focus:outline-none"
                />
                <button 
                  onClick={handleCopyRss}
                  className="px-4 py-2 rounded-lg gold-gradient-bg text-black font-bold text-xs shrink-0 flex items-center space-x-1"
                >
                  {copiedRss ? <Check className="w-4 h-4" /> : <span>Copy</span>}
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] text-neutral-400 space-y-1">
              <div className="font-bold text-white">Auto-Publish Status: ACTIVE</div>
              <div>Articles published by Admin instantly sync to the public homepage and RSS subscribers.</div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
