import React, { useState } from 'react';
import { FAQS } from '../data/initialData';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#0D0E12] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-[#D4AF37]/30 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">
            Everything You Need <span className="gold-gradient-text italic font-normal">To Know</span>
          </h2>
          <p className="text-neutral-400 font-light text-base">
            Clear answers about timelines, turnkey scope, guarantees, and our payment milestones.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? 'glass-panel-gold border-[#D4AF37]/40 shadow-xl' 
                    : 'glass-card border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between space-x-4 focus:outline-none"
                >
                  <span className="font-serif font-bold text-lg sm:text-xl text-white">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white/5 text-[#D4AF37] transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#D4AF37] text-black' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/10 font-light animate-in fade-in">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
