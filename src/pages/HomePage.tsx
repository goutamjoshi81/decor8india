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
      <OngoingProjects />
      <MagazineSection />
      <InstagramSection />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </main>
  );
};
