import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { SiteVisitModal } from './components/SiteVisitModal';
import { CostEstimator } from './components/CostEstimator';
import { CustomCursor } from './components/CustomCursor';
import { LuxuryLoader } from './components/LuxuryLoader';
import { TouchRipple } from './components/TouchRipple';

// Main Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { EstimatorPage } from './pages/EstimatorPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { OngoingProjectsPage } from './pages/OngoingProjectsPage';
import { BlogsPage } from './pages/BlogsPage';
import { ContactPage } from './pages/ContactPage';
import { ClientPage } from './pages/ClientPage';
import { AdminPage } from './pages/AdminPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

// Individual Thread Detail Pages
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';

const MainAppContent: React.FC = () => {
  const { 
    isEstimatorOpen, 
    setIsEstimatorOpen, 
    isSiteVisitOpen, 
    setIsSiteVisitOpen, 
    selectedProjectForSiteVisit 
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isDashboardRoute = location.pathname.startsWith('/client') || location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#E5E3DF] font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
      <LuxuryLoader />
      <CustomCursor />
      <TouchRipple />
      
      {/* Navigation Header */}
      {!isDashboardRoute && <Navbar />}

      {/* Main Multi-Page Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Services */}
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        
        {/* Estimator */}
        <Route path="/estimator" element={<EstimatorPage />} />
        
        {/* Portfolio & Ongoing Works */}
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:id" element={<ProjectDetailPage />} />
        <Route path="/projects" element={<OngoingProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        
        {/* Magazine & Blogs */}
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:id" element={<ArticleDetailPage />} />
        <Route path="/magazine" element={<BlogsPage />} />
        <Route path="/magazine/:id" element={<ArticleDetailPage />} />
        
        {/* Contact & Legal */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        
        {/* Dashboards */}
        <Route path="/client" element={<ClientPage />} />
        <Route path="/admin" element={<AdminPage />} />
        
        {/* Fallback to Home */}
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* Footer */}
      {!isDashboardRoute && <Footer />}

      {/* Interactive Global Modals */}
      <BookingModal />
      <AuthModal onSuccessRedirect={(role) => navigate(role === 'admin' ? '/admin' : '/client')} />

      {/* Site Visit Modal */}
      <SiteVisitModal 
        isOpen={isSiteVisitOpen}
        onClose={() => setIsSiteVisitOpen(false)}
        initialProjectTitle={selectedProjectForSiteVisit || undefined}
      />

      {/* Cost Estimator Standalone Modal */}
      {isEstimatorOpen && (
        <CostEstimator isModal={true} onCloseModal={() => setIsEstimatorOpen(false)} />
      )}

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
