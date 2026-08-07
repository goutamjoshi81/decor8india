import React from 'react';
import { OngoingProjects } from '../components/OngoingProjects';
import { ContactSection } from '../components/ContactSection';

export const OngoingProjectsPage: React.FC = () => {
  return (
    <main className="pt-20">
      <OngoingProjects />
      <ContactSection />
    </main>
  );
};
