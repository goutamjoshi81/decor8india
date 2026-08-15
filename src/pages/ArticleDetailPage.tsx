import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  BookOpen, 
  Calendar,
  ChevronRight,
  ChevronLeft,
  Camera,
  ZoomIn,
  X
} from 'lucide-react';
import { ContactSection } from '../components/ContactSection';

export const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles } = useApp();

  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);

  const decodedId = id ? decodeURIComponent(id).toLowerCase().trim() : '';

  const article = articles.find(a => {
    if (!id) return false;
    const aId = a.id.toLowerCase();
    const aTitle = a.title.toLowerCase();
    const aSlug = (a.slug || aTitle).toLowerCase();
    const cleanSlug = aSlug.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    const cleanId = decodedId.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    return (
      a.id === id || 
      a.id === decodedId || 
      aId === decodedId || 
      aTitle === decodedId ||
      a.slug === id ||
      a.slug === decodedId ||
      cleanSlug === cleanId ||
      aId === cleanId
    );
  });

  // Handle keyboard arrow & Escape key navigation for photo lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIdx === null || !article?.galleryImages) return;
      if (e.key === 'Escape') setSelectedPhotoIdx(null);
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIdx((prev) => (prev !== null && prev < article.galleryImages!.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : article.galleryImages!.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIdx, article]);

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
              {(article.authorName || 'D').charAt(0)}
            </div>
            <div>
              <span className="text-white font-semibold block">{article.authorName || 'Decor8 Editorial Team'}</span>
              <span className="text-[11px] text-neutral-500">Design & Architectural Contributor</span>
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

        {/* Article Photo Gallery Showcase with Hover Zoom & Popout Lightbox */}
        {article.galleryImages && article.galleryImages.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                <Camera className="w-4 h-4" />
                <span>Article Photo Gallery ({article.galleryImages.length} Photos)</span>
              </div>
              <span className="text-[11px] text-neutral-400 font-light">Click any photo to enlarge</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {article.galleryImages.map((photoUrl, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedPhotoIdx(idx)}
                  className="group relative h-60 rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-black/60 cursor-pointer transition-all duration-500 hover:border-[#D4AF37] hover:shadow-2xl hover:shadow-[#D4AF37]/25 transform hover:-translate-y-1.5"
                >
                  {/* Photo with smooth zoom effect */}
                  <img 
                    src={photoUrl} 
                    alt={`${article.title} - Photo ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Hover Badge with Zoom Icon */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center text-black shadow-lg mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      <ZoomIn className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Enlarge Photo</span>
                    <span className="text-[10px] text-neutral-300 mt-0.5">Visual Showcase #{idx + 1}</span>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-[#D4AF37] opacity-90 group-hover:opacity-0 transition-opacity">
                    #{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enlarge Image Lightbox Popout Modal */}
        {selectedPhotoIdx !== null && article.galleryImages && article.galleryImages[selectedPhotoIdx] && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
            onClick={() => setSelectedPhotoIdx(null)}
          >
            {/* Close Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedPhotoIdx(null); }}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-red-500 text-white transition-all duration-300 z-50 cursor-pointer shadow-lg hover:scale-110"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Photo Button */}
            {article.galleryImages.length > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIdx(prev => (prev !== null && prev > 0 ? prev - 1 : article.galleryImages!.length - 1));
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black transition-all duration-300 z-50 cursor-pointer shadow-xl hover:scale-110"
                title="Previous Photo (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Photo Button */}
            {article.galleryImages.length > 1 && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIdx(prev => (prev !== null && prev < article.galleryImages!.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black transition-all duration-300 z-50 cursor-pointer shadow-xl hover:scale-110"
                title="Next Photo (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Modal Image Display Box */}
            <div 
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-black flex items-center justify-center max-h-[75vh] max-w-full">
                <img 
                  src={article.galleryImages[selectedPhotoIdx]} 
                  alt={`${article.title} - Enlarged Photo ${selectedPhotoIdx + 1}`} 
                  className="max-h-[75vh] max-w-full object-contain rounded-2xl animate-in zoom-in-95 duration-300"
                />
              </div>

              {/* Photo Title & Index Bar */}
              <div className="flex items-center justify-between w-full max-w-2xl px-4 py-2 rounded-full glass-panel border border-white/15 text-xs text-neutral-300">
                <span className="font-serif text-white truncate max-w-xs sm:max-w-md">{article.title}</span>
                <span className="text-[#D4AF37] font-bold font-mono">
                  Photo {selectedPhotoIdx + 1} of {article.galleryImages.length}
                </span>
              </div>
            </div>
          </div>
        )}

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
