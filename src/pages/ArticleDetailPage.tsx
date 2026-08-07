import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  BookOpen, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

export const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles } = useApp();

  const article = articles.find(a => a.id === id || a.slug === id);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0B0C0E] text-white pt-32 pb-20 px-4 text-center space-y-6">
        <BookOpen className="w-16 h-16 text-[#D4AF37] mx-auto opacity-60" />
        <h1 className="text-3xl font-serif font-bold">Article Not Found</h1>
        <p className="text-neutral-400 text-sm max-w-md mx-auto">
          The requested interior design article could not be found or has been moved.
        </p>
        <Link 
          to="/blogs" 
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>
    );
  }

  const relatedArticles = articles
    .filter(a => a.id !== article.id && a.status === 'Published')
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article URL copied to clipboard!');
    }
  };

  return (
    <main className="pt-28 pb-20 bg-[#0B0C0E] text-[#E5E3DF] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-neutral-400">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <Link to="/blogs" className="hover:text-[#D4AF37] transition-colors">Magazine & Blogs</Link>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <span className="text-[#D4AF37] truncate max-w-xs">{article.title}</span>
        </div>

        {/* Back Button & Share */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 text-xs font-semibold text-neutral-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Back to Articles</span>
          </button>

          <button 
            onClick={handleShare}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 text-xs font-semibold text-[#D4AF37] transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Header Metadata */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="px-3 py-1 rounded-full gold-gradient-bg text-black uppercase font-bold text-[10px] tracking-wider">
              {article.category}
            </span>
            <span className="text-neutral-500">•</span>
            <span className="flex items-center space-x-1 text-neutral-400">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{article.readTime}</span>
            </span>
            <span className="text-neutral-500">•</span>
            <span className="flex items-center space-x-1 text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{article.publishedAt}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center space-x-3 pt-2 text-xs text-neutral-400 border-b border-white/10 pb-6">
            <div className="w-8 h-8 rounded-full gold-gradient-bg flex items-center justify-center text-black font-bold text-xs uppercase">
              {article.authorName.charAt(0)}
            </div>
            <div>
              <span className="text-white font-semibold block">{article.authorName}</span>
              <span className="text-[11px] text-neutral-500">Principal Architectural Contributor</span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="h-80 sm:h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Excerpt Lead Paragraph */}
        <div className="p-6 rounded-2xl glass-panel-gold border border-[#D4AF37]/30 text-base text-neutral-200 font-serif italic leading-relaxed">
          "{article.excerpt}"
        </div>

        {/* Main Article Content */}
        <div 
          className="text-neutral-300 text-sm sm:text-base leading-relaxed space-y-6 font-light prose prose-invert max-w-none pt-4"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="pt-16 border-t border-white/10 space-y-8">
            <div className="space-y-1">
              <h3 className="text-2xl font-serif font-bold text-white">Recommended Design Reads</h3>
              <p className="text-xs text-neutral-400">More architectural perspectives & trends</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                <Link 
                  key={rel.id} 
                  to={`/blogs/${rel.id}`}
                  className="group glass-card rounded-xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between"
                >
                  <div className="h-40 overflow-hidden">
                    <img src={rel.coverImage} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] text-[#D4AF37] font-semibold uppercase">{rel.category}</span>
                    <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      <div className="pt-16">
        <ContactSection />
      </div>
    </main>
  );
};
