import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { ServicesSection } from './components/ServicesSection';
import { CostEstimator } from './components/CostEstimator';
import { PortfolioGallery } from './components/PortfolioGallery';
import { OngoingProjects } from './components/OngoingProjects';
import { PartnersSection } from './components/PartnersSection';
import { MagazineSection } from './components/MagazineSection';
import { InstagramSection } from './components/InstagramSection';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { SiteVisitModal } from './components/SiteVisitModal';
import { ClientDashboard } from './components/ClientPortal/ClientDashboard';
import { AdminDashboard } from './components/AdminPanel/AdminDashboard';

const MainAppContent: React.FC = () => {
  const { 
    currentUser, 
    isEstimatorOpen, 
    setIsEstimatorOpen, 
    isSiteVisitOpen, 
    setIsSiteVisitOpen, 
    selectedProjectForSiteVisit 
  } = useApp();
  const [activeTab, setActiveTab] = useState<'public' | 'client' | 'admin'>('public');

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#E5E3DF] font-sans antialiased selection:bg-[#D4AF37] selection:text-black">
      
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Views */}
      {activeTab === 'client' && currentUser?.role === 'CLIENT' ? (
        <ClientDashboard onReturnToPublic={() => setActiveTab('public')} />
      ) : activeTab === 'admin' && currentUser?.role === 'ADMIN' ? (
        <AdminDashboard onReturnToPublic={() => setActiveTab('public')} />
      ) : (
        /* Public Landing Website */
        <main>
          <Hero />
          <AboutUs />
          <ServicesSection />
          <CostEstimator />
          <PortfolioGallery />
          <OngoingProjects />
          <PartnersSection />
          <MagazineSection />
          <InstagramSection />
          <Testimonials />
          <FAQ />
          <ContactSection />
        </main>
      )}

      {/* Footer */}
      {activeTab === 'public' && <Footer />}

      {/* Interactive Global Modals */}
      <BookingModal />
      <AuthModal onSuccessRedirect={(tab) => setActiveTab(tab)} />

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
