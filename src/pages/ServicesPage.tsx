import React from 'react';
import { ServicesSection } from '../components/ServicesSection';
import { PartnersSection } from '../components/PartnersSection';
import { CostEstimator } from '../components/CostEstimator';
import { ContactSection } from '../components/ContactSection';

export const ServicesPage: React.FC = () => {
  return (
    <main className="pt-20">
      <ServicesSection />
      <PartnersSection />
      <CostEstimator />
      <ContactSection />
    </main>
  );
};
