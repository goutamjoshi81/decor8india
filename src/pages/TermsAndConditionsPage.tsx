import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Scale, 
  Mail, 
  Phone, 
  ChevronRight, 
  ArrowLeft,
  Printer,
  Clock, 
  CreditCard, 
  AlertTriangle,
  Sparkles,
  Layers
} from 'lucide-react';

export const TermsAndConditionsPage: React.FC = () => {
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
            <span>Official Policy & Legal Terms</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Terms & Conditions
          </h1>

          <p className="text-sm text-neutral-300 max-w-3xl leading-relaxed">
            These Terms & Conditions govern all project estimates, design agreements, turnkey execution, warranties, and milestone billing for Decor8India Architecture & Interiors Pvt. Ltd.
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

        {/* Official Terms Document Table View (Direct Mirror of Company Policy) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <h2 className="text-lg font-serif font-bold text-white uppercase tracking-wider">
                Official Terms & Conditions Schedule
              </h2>
            </div>
            <span className="text-xs text-neutral-400 font-mono">10 Core Articles</span>
          </div>

          {/* Master Table */}
          <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden shadow-2xl">
            <div className="bg-[#172554]/40 border-b border-[#3B82F6]/30 px-6 py-3 text-center">
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

        {/* Detailed Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          
          {/* Warranty Card */}
          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-base font-serif font-bold text-white">15-Year Woodwork Warranty</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Covers manufacturing defects on woodwork and factory-pressed modules for up to 15 years. Plywood bendness and customer wear & tear are excluded. OEM partner hardware (Hettich, KAFF, EBCO, Havells) carries vendor manufacturer warranties with our facilitation support.
            </p>
          </div>

          {/* 3D Design Policy Card */}
          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <Layers className="w-5 h-5" />
              <h3 className="text-base font-serif font-bold text-white">3D Design & Revision Policy</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Our 3D architectural visualization includes zero hidden costs with up to 3 comprehensive design revisions included for free. Any further iterations requested after 3 revisions are charged at ₹ 3,000 per rendering.
            </p>
          </div>

          {/* Payment & Material Price Lock */}
          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <CreditCard className="w-5 h-5" />
              <h3 className="text-base font-serif font-bold text-white">Payment Slabs & Material Costs</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Quotations are valid for 30 days. Material prices are permanently locked once projects enter the production phase. Timely milestone slab payments ensure uninterrupted manufacturing, procurement, and execution.
            </p>
          </div>

          {/* Cancellation Policy */}
          <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-serif font-bold text-white">Cancellation & Design Freeze</h3>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Once an order is confirmed and scheduled for manufacturing, all bookings are non-refundable. Structural changes or design modifications cannot be accommodated after execution commences on site.
            </p>
          </div>

        </div>

        {/* Legal & Nodal Contact Cell */}
        <section className="p-6 sm:p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                <span>Legal & Official Contact Information</span>
              </h2>
              <p className="text-xs text-neutral-300 mt-1">
                For contract clarifications, warranty registration, or project inquiries:
              </p>
            </div>

            <div className="px-3 py-1 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider shrink-0 self-start sm:self-auto">
              Decor8 Legal Cell
            </div>
          </div>

          <div className="pt-4 border-t border-[#D4AF37]/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-white uppercase tracking-wider font-mono">Entity Name</div>
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
