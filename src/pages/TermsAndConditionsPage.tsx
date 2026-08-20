import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Mail, 
  Phone, 
  ChevronRight, 
  ArrowLeft, 
  Printer, 
  Clock, 
  CreditCard, 
  Sparkles, 
  Calculator, 
  UserCheck, 
  Globe, 
  FileCheck, 
  Lock,
  CheckCircle2
} from 'lucide-react';

export const TermsAndConditionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'commercial' | 'website' | 'estimator' | 'portal'>('all');

  const handlePrint = () => {
    window.print();
  };

  const coreTermsList = [
    {
      id: 1,
      title: "30-Day Estimate Validity",
      clause: "Price is valid for 30 days only after the 1st estimation is offered. Possibility of price revision may happen due to vendor/supplier reasons.",
      category: "Pricing & Quotations",
      badge: "30 Days Validity"
    },
    {
      id: 2,
      title: "15-Year Woodwork Warranty & OEM Policies",
      clause: "DECOR8 will cover warranty period up to 15 years for any woodwork-related products on manufacturing defects (Plywood bendness not included). DECOR8 will not cover warranty for any intentional wear and tear or damages from the customer side. All other products from different vendors like Hettich, KAFF, EBCO, Havells etc. will be covered by respective vendors/company as per their company norms, and DECOR8 will support for the same.",
      category: "Warranty & Guarantee",
      badge: "Up to 15 Years"
    },
    {
      id: 3,
      title: "Milestone Payment Slabs & Scope Variations",
      clause: "Payment terms as per payment slab should be followed from the time of booking by the client for the smooth functioning of work and output. After any revised quote due to any addition of products/changes, if price adds up, client needs to pay the difference amount as on the slab instalment during that phase. This is due to the production-related requirement for procuring materials, etc. For any reductions on amount due to changes, the amount will be adjusted in the final billing stage.",
      category: "Payments & Invoicing",
      badge: "Slab Staged"
    },
    {
      id: 4,
      title: "Design Commencement & Booking Credit",
      clause: "Designs will not start until the complete booking amount is credited to the company, followed by the milestone payment slabs for production & installation as work progresses.",
      category: "Project Kick-off",
      badge: "Mandatory Credit"
    },
    {
      id: 5,
      title: "Execution Schedule & Payment Timelines",
      clause: "Any delay in terms of payment as per the agreed payment schedule may cause delays in execution for which DECOR8 will not be responsible.",
      category: "Timelines & Delivery",
      badge: "Client Obligation"
    },
    {
      id: 6,
      title: "Raw Material Price Hike Policy",
      clause: "Price may be revised if there is any hike in raw materials announced officially by the supplier while the project is still in the designing stage and yet to enter production. There will be NO revision of price for projects that have already entered the production stage.",
      category: "Material Pricing",
      badge: "Locked in Production"
    },
    {
      id: 7,
      title: "Confirmed Orders & Non-Refundable Cancellation",
      clause: "Once an order is confirmed and the customer wishes to cancel the order, NO amount will be refunded.",
      category: "Cancellation Policy",
      badge: "Strict Non-Refundable"
    },
    {
      id: 8,
      title: "3D Designs & Complimentary Revision Limit",
      clause: "No hidden charges for 3D designs. A maximum of three (03) design corrections/revisions are included compliments of DECOR8.",
      category: "Design Scope",
      badge: "03 Free Revisions"
    },
    {
      id: 9,
      title: "Additional 3D Renderings & Iterations",
      clause: "Any corrections beyond the 03 included revisions will be charged at INR 3,000 per each rendering to the client.",
      category: "Design Revisions",
      badge: "₹ 3,000 / Render"
    },
    {
      id: 10,
      title: "Structural & Design Freeze Post Execution",
      clause: "Once the designs are approved and factory/on-site execution has started, NO changes will be accepted in terms of structural layout or core design specifications.",
      category: "Execution Freeze",
      badge: "Design Locked"
    }
  ];

  return (
    <main className="pt-28 pb-20 bg-[#0B0C0E] text-[#E5E3DF] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-neutral-400 print:hidden">
          <div className="flex items-center space-x-2">
            <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            <span className="text-[#D4AF37]">Terms & Conditions</span>
          </div>

          <button 
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37] text-xs font-semibold text-neutral-300 hover:text-white transition-all shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Print Official Terms</span>
          </button>
        </div>

        {/* Page Header Banner */}
        <div className="p-6 sm:p-10 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 space-y-4 relative overflow-hidden print:border-none print:p-0">
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Official Policy & Legal Framework</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Terms & Conditions
          </h1>

          <p className="text-sm text-neutral-300 max-w-3xl leading-relaxed font-light">
            These comprehensive Terms & Conditions govern your engagement with <strong className="text-white">Decor8India Architecture & Interiors Pvt. Ltd.</strong>, encompassing our digital platform, interactive Cost Estimator, Client Portal, design consultations, turnkey execution contracts, and 15-year warranty policies.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-3 border-t border-[#D4AF37]/20">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Official Version: 2026</span>
            </div>
            <span>•</span>
            <div className="text-white font-medium">www.decor8india.com</div>
            <span>•</span>
            <div className="text-neutral-300">Decor8India Architecture & Interiors Pvt. Ltd.</div>
          </div>
        </div>

        {/* Category Filter Pills (Screen Only) */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-black/50 border border-white/10 print:hidden overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'all' ? 'gold-gradient-bg text-black shadow-md font-bold' : 'text-neutral-400 hover:text-white bg-white/5'
            }`}
          >
            All Policy Chapters
          </button>
          <button
            onClick={() => setActiveTab('commercial')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'commercial' ? 'gold-gradient-bg text-black shadow-md font-bold' : 'text-neutral-400 hover:text-white bg-white/5'
            }`}
          >
            1. Core Commercial & Warranty Clauses
          </button>
          <button
            onClick={() => setActiveTab('estimator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'estimator' ? 'gold-gradient-bg text-black shadow-md font-bold' : 'text-neutral-400 hover:text-white bg-white/5'
            }`}
          >
            2. Cost Estimator Terms
          </button>
          <button
            onClick={() => setActiveTab('portal')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'portal' ? 'gold-gradient-bg text-black shadow-md font-bold' : 'text-neutral-400 hover:text-white bg-white/5'
            }`}
          >
            3. Client Portal Terms
          </button>
          <button
            onClick={() => setActiveTab('website')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'website' ? 'gold-gradient-bg text-black shadow-md font-bold' : 'text-neutral-400 hover:text-white bg-white/5'
            }`}
          >
            4. Website & Digital IP Terms
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 1: OFFICIAL 10 CORE COMMERCIAL & WARRANTY CLAUSES */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'commercial') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                  1. Official Commercial, Execution & Warranty Schedule
                </h2>
              </div>
              <span className="text-xs text-[#D4AF37] font-mono font-bold">10 Core Contract Articles</span>
            </div>

            {/* Master Table */}
            <div className="rounded-2xl border border-[#D4AF37]/30 bg-black/40 overflow-hidden shadow-2xl">
              <div className="bg-[#172554]/60 border-b border-[#3B82F6]/30 px-6 py-3.5 text-center">
                <span className="font-serif font-bold text-[#93C5FD] text-sm uppercase tracking-widest">
                  * Terms & Conditions — Decor8 India
                </span>
              </div>

              <div className="divide-y divide-white/10">
                {coreTermsList.map((term, index) => (
                  <div 
                    key={term.id} 
                    className={`p-4 sm:p-6 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4 ${
                      index % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'
                    } hover:bg-white/[0.04]`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-[#D4AF37] font-bold font-mono text-xs">
                          * Article {term.id}.
                        </span>
                        <h3 className="text-sm font-bold text-white">
                          {term.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light pl-4 border-l-2 border-[#D4AF37]/30">
                        {term.clause}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center md:flex-col md:items-end gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-mono font-bold border border-[#D4AF37]/30 whitespace-nowrap">
                        {term.badge}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {term.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#1E293B]/60 p-3 text-center border-t border-white/10 text-xs font-mono text-neutral-400">
                Official Website: <a href="https://www.decor8india.com" className="text-[#D4AF37] underline font-semibold">www.decor8india.com</a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* CHAPTER 2: INTERACTIVE COST ESTIMATOR & QUOTATION TERMS */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'estimator') && (
          <section className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-6">
            <div className="flex items-center space-x-3 text-[#D4AF37]">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                <Calculator className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-white">
                  2. Interactive Cost Estimator & Pricing Terms
                </h2>
                <p className="text-xs text-neutral-400">Algorithmic estimation guidelines, specifications, and BOQ rules</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-neutral-300">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>2.1 Indicative Preliminary Estimates</span>
                </div>
                <p>
                  All estimates generated via the online Cost Estimator, area sliders, and package selectors represent preliminary budget projections. They are calculated dynamically using active database service standards (Eco: 0.85x, Urban: 1.00x, Luxe: 1.25x) and nominal area ratios.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>2.2 On-Site Technical Verification & Formal BOQ</span>
                </div>
                <p>
                  Final turnkey project pricing is established only following on-site laser measurements, structural evaluation, and the issuance of a formal, itemized Bill of Quantities (BOQ) signed by both parties.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>2.3 Promotional Discounts & Coupons</span>
                </div>
                <p>
                  Promotional percentage discounts displayed in the calculator apply exclusively to standard package baseline costs and cannot be clubbed with unlisted bespoke customizations or non-standard civil alterations unless explicitly endorsed in writing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>2.4 Easy EMI Financing Facilitation</span>
                </div>
                <p>
                  EMI financing options (up to 60 months) are facilitated through our third-party partner banking and non-banking financial institutions (NBFCs). Approval, interest rates, tenure, and credit terms are subject to the respective financial partner’s underwriting policies.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* CHAPTER 3: CLIENT PORTAL & DIGITAL SIGN-OFF TERMS */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'portal') && (
          <section className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-6">
            <div className="flex items-center space-x-3 text-[#D4AF37]">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                <UserCheck className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-white">
                  3. Client Portal, Milestone Tracking & Invoicing Terms
                </h2>
                <p className="text-xs text-neutral-400">Digital approvals, secure access, and electronic transaction compliances</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-neutral-300">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>3.1 Account Credentials Security</span>
                </div>
                <p className="text-neutral-300 font-light">
                  Clients are solely responsible for maintaining the confidentiality of their Client Portal authentication credentials. Any action, approval, or communication logged under the client’s verified portal account shall be deemed legally authorized.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>3.2 Digital Milestone Sign-Off</span>
                </div>
                <p className="text-neutral-300 font-light">
                  Milestone completions signed off electronically via the Client Portal (e.g., Design Sign-Off, Carpentry Completion, Handover) constitute formal legal acceptance of that project stage.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>3.3 Invoicing & GST Records</span>
                </div>
                <p className="text-neutral-300 font-light">
                  All digital tax invoices generated with serial reference <span className="font-mono text-[#D4AF37] font-bold">INV-D8I-XXXXXX</span> comply with applicable GST frameworks. Receipts are digitally stored and downloadable from your client dashboard.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* CHAPTER 4: WEBSITE USAGE & INTELLECTUAL PROPERTY */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'website') && (
          <section className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-6">
            <div className="flex items-center space-x-3 text-[#D4AF37]">
              <div className="p-2 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                <Globe className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-white">
                  4. Website Usage, Digital IP & Legal Disclaimers
                </h2>
                <p className="text-xs text-neutral-400">Intellectual property ownership, site visit protocol, and governing jurisdiction</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-neutral-300">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono">
                  4.1 Intellectual Property & 3D Render Rights
                </div>
                <p className="text-neutral-300 font-light">
                  All website designs, 3D architectural renders, mood boards, CAD layouts, portfolio images, video footage, and brand marks are the exclusive intellectual property of Decor8India. No material may be reproduced, reverse-engineered, or re-published without written consent.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono">
                  4.2 Site Visit Protocol & Accessibility
                </div>
                <p className="text-neutral-300 font-light">
                  Complimentary site visit consultations are subject to safe site accessibility, lift/stair availability, and municipal permissions. Appointments may be rescheduled in case of unforeseen access restrictions or extreme weather events.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono">
                  4.3 Limitation of Liability & Force Majeure
                </div>
                <p className="text-neutral-300 font-light">
                  Decor8India shall not be held liable for indirect or consequential damages arising from unforeseen supply chain embargoes, natural calamities, strikes, government lockdown regulations, or client-side site delays.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono">
                  4.4 Governing Law & Exclusive Jurisdiction
                </div>
                <p className="text-neutral-300 font-light">
                  These Terms & Conditions and all commercial agreements entered with Decor8India shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes shall be subject to the exclusive jurisdiction of the competent courts in <span className="text-white font-semibold">Bengaluru, Karnataka, India</span>.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Legal & Nodal Contact Cell */}
        <section className="p-6 sm:p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                <span>Legal Cell & Official Contact Information</span>
              </h2>
              <p className="text-xs text-neutral-300 mt-1">
                For contract clarifications, warranty registration, terms queries, or formal legal notices:
              </p>
            </div>

            <div className="px-3 py-1 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider shrink-0 self-start sm:self-auto">
              Decor8 Legal Cell
            </div>
          </div>

          <div className="pt-4 border-t border-[#D4AF37]/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-white uppercase tracking-wider font-mono">Corporate Entity</div>
              <div className="text-neutral-300">Decor8India Architecture & Interiors Pvt. Ltd.</div>
            </div>

            <div className="space-y-1">
              <div className="font-bold text-white uppercase tracking-wider font-mono">Official Website</div>
              <div className="text-[#D4AF37] font-mono font-semibold">www.decor8india.com</div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-white uppercase tracking-wider font-mono">Direct Communication</div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href="mailto:support@decor8india.com" className="text-[#D4AF37] hover:underline font-mono font-semibold">support@decor8india.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <a href="tel:+919380523743" className="text-white hover:text-[#D4AF37] font-mono">+91 93805 23743</a>
              </div>
            </div>
          </div>
        </section>

        {/* Back Navigation */}
        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs print:hidden">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] text-neutral-300 hover:text-white transition-all font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Return to Home</span>
          </Link>

          <span className="text-neutral-500 font-mono">Decor8India Official Terms • Version 2026</span>
        </div>

      </div>
    </main>
  );
};
