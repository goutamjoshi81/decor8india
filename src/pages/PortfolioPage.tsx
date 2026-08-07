import React from 'react';
import { PortfolioGallery } from '../components/PortfolioGallery';
import { ContactSection } from '../components/ContactSection';

export const PortfolioPage: React.FC = () => {
  return (
    <main className="pt-20">
      <PortfolioGallery />
      <ContactSection />
    </main>
  );
};
