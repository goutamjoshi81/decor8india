import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { FAQ } from '../components/FAQ';

export const ContactPage: React.FC = () => {
  return (
    <main className="pt-20">
      <ContactSection />
      <FAQ />
    </main>
  );
};
