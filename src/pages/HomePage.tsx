import React from 'react';
import { Hero } from '../components/Hero';
import { AboutUs } from '../components/AboutUs';
import { ServicesSection } from '../components/ServicesSection';
import { VideoShowcase } from '../components/VideoShowcase';
import { PartnersSection } from '../components/PartnersSection';
import { CostEstimator } from '../components/CostEstimator';
import { PortfolioGallery } from '../components/PortfolioGallery';
import { OngoingProjects } from '../components/OngoingProjects';
import { MagazineSection } from '../components/MagazineSection';
import { InstagramSection } from '../components/InstagramSection';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { ContactSection } from '../components/ContactSection';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

export const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <AboutUs />
      <ServicesSection />
      <VideoShowcase />
      <PartnersSection />
      <CostEstimator />
      <PortfolioGallery />
      
      {/* Interactive Touch Before/After Transformation Slider */}
      <section className="py-16 bg-[#0B0C0E] border-t border-b border-white/10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <BeforeAfterSlider 
          title="Turnkey Site Transformations"
          subtitle="Swipe or drag the slider left & right to experience Decor8 structural & interior craftsmanship."
        />
      </section>

      <OngoingProjects />
      <MagazineSection />
      <InstagramSection />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </main>
  );
};
