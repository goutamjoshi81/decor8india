import React from 'react';
import { MagazineSection } from '../components/MagazineSection';
import { InstagramSection } from '../components/InstagramSection';

export const BlogsPage: React.FC = () => {
  return (
    <main className="pt-20">
      <MagazineSection />
      <InstagramSection />
    </main>
  );
};
