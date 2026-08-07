import React from 'react';
import { AboutUs } from '../components/AboutUs';
import { Testimonials } from '../components/Testimonials';
import { ContactSection } from '../components/ContactSection';

export const AboutPage: React.FC = () => {
  return (
    <main className="pt-20">
      <AboutUs />
      <Testimonials />
      <ContactSection />
    </main>
  );
};
