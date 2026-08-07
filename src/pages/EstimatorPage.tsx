import React from 'react';
import { CostEstimator } from '../components/CostEstimator';

export const EstimatorPage: React.FC = () => {
  return (
    <main className="pt-24 min-h-screen bg-[#0B0C0E]">
      <CostEstimator />
    </main>
  );
};
