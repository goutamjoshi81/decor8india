import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  Mail, 
  Phone, 
  ChevronRight, 
  ArrowLeft,
  Printer,
  CheckCircle2,
  Clock,
  Building,
  CreditCard,
  FileCheck
} from 'lucide-react';

export const TermsAndConditionsPage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'sec-1', title: '1. Introduction' },
    { id: 'sec-2', title: '2. Our Services' },
    { id: 'sec-3', title: '3. Estimates & Quotations' },
    { id: 'sec-4', title: '4. Project Commencement' },
    { id: 'sec-5', title: '5. Payments & Invoices' },
    { id: 'sec-6', title: '6. Project Timelines' },
    { id: 'sec-7', title: '7. Client Responsibilities' },
    { id: 'sec-8', title: '8. Design Changes' },
    { id: 'sec-9', title: '9. Materials & Availability' },
    { id: 'sec-10', title: '10. Intellectual Property' },
    { id: 'sec-11', title: '11. Client Portal' },
    { id: 'sec-12', title: '12. Site Visits' },
    { id: 'sec-13', title: '13. Cancellation' },
    { id: 'sec-14', title: '14. Suspension' },
    { id: 'sec-15', title: '15. Force Majeure' },
    { id: 'sec-[#sec-16]', title: '16. Limitation of Liability' },
    { id: 'sec-20', title: '20. Governing Law' },
    { id: 'sec-22', title: '22. Contact' },
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
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37] text-xs font-semibold text-neutral-300 hover:text-white transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Print Terms</span>
          </button>
        </div>

        {/* Page Header Banner */}
        <div className="p-6 sm:p-10 rounded-2xl glass-panel border border-[#D4AF37]/30 space-y-4 relative overflow-hidden print:border-none print:p-0">
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            <Scale className="w-4 h-4" />
            <span>Legal Service Terms</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Terms & Conditions
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-2 border-t border-white/10">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Effective Date: 16 August 2026</span>
            </div>
            <span>•</span>
            <div>Last Updated: 16 August 2026</div>
            <span>•</span>
            <div className="text-neutral-300">Decor8India Architecture & Interiors Pvt. Ltd.</div>
          </div>
        </div>

        {/* Quick Nav Pills (Screen Only) */}
        <div className="flex flex-wrap gap-2 p-2 rounded-xl bg-black/40 border border-white/10 print:hidden overflow-x-auto">
          {sections.map((sec) => (
            <a 
              key={sec.id}
              href={`#${sec.id}`}
              className="px-3 py-1 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 border border-white/5 hover:border-[#D4AF37]/40 text-[11px] font-semibold text-neutral-300 hover:text-white transition-all whitespace-nowrap"
            >
              {sec.title}
            </a>
          ))}
        </div>

        {/* 22 Structured Clauses */}
        <div className="space-y-8 text-sm leading-relaxed text-neutral-300">
          
          {/* Section 1 & 2 */}
          <section id="sec-1" className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-4">
            <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
              <Building className="w-5 h-5 text-[#D4AF37]" />
              <span>1. Introduction & 2. Scope of Services</span>
            </h2>
            <p>
              These Terms & Conditions (“Terms”) govern your use of the Decor8India website, Client Portal, site visit services, estimation tools, architectural services, interior design services, construction services, and related services.
            </p>
            <p className="text-xs text-neutral-400 font-mono italic">
              By using our website, requesting an estimate, booking a site visit, approving a design, making a payment, or engaging our services, you agree to these Terms.
            </p>

            <div className="pt-2">
              <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono mb-2">Service Offerings Include:</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {['Interior Design', 'Architectural Planning', 'Space Planning', '3D Renders & Fitouts', 'Civil Construction', 'Carpentry & Woodwork', 'Electrical & Plumbing', 'Turnkey Management'].map((srv, idx) => (
                  <div key={idx} className="p-2 rounded bg-white/5 border border-white/5 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3 h-3 text-[#D4AF37] shrink-0" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3 & 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section id="sec-3" className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <h2 className="text-lg font-serif font-bold text-white flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#D4AF37]" />
                <span>3. Estimates & Quotations</span>
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Estimates generated via our Cost Estimator tool or initial consultation are preliminary indications. Final pricing and scope are determined by formal quotations and signed project agreements based on site measurements and material choices.
              </p>
            </section>

            <section id="sec-4" className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <h2 className="text-lg font-serif font-bold text-white flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>4. Project Commencement</span>
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Execution begins post realization of the initial deposit, site measurements, scope confirmation, and design approvals. Discrepancies in actual site conditions may lead to revised estimates.
              </p>
            </section>
          </div>

          {/* Section 5: Payments & Invoices */}
          <section id="sec-5" className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-4">
            <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-[#D4AF37]" />
              <span>5. Payments & Invoices</span>
            </h2>
            <p>
              Clients must remit payments according to agreed milestone schedules. Invoices issued through the Client Portal contain locked tracking numbers (e.g. <span className="font-mono text-[#D4AF37] font-bold">INV-D8I-XXXXXX</span>).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs pt-1">
              {['1. Token Deposit', '2. Design Sign-Off', '3. Civil Execution', '4. Fit-out & Carpentry', '5. Final Inspection'].map((st, i) => (
                <div key={i} className="p-3 rounded-xl bg-black/60 border border-white/10 text-center font-mono space-y-1">
                  <div className="text-[10px] text-[#D4AF37] font-bold uppercase">{st.split('. ')[0]} Stage</div>
                  <div className="font-semibold text-white">{st.split('. ')[1]}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6 & 7 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section id="sec-6" className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <h2 className="text-lg font-serif font-bold text-white flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>6. Project Timelines</span>
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Indicative periods (e.g., 45–75 days) start after site measurement and deposit realization. Client-requested changes, delayed approvals, material lead times, or force majeure events extend timelines proportionately.
              </p>
            </section>

            <section id="sec-7" className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <h2 className="text-lg font-serif font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>7. Client Responsibilities</span>
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Clients are expected to provide reasonable site access, timely design/material approvals, prompt milestone payments, and accurate property details. Delays caused by client inaction affect timelines.
              </p>
            </section>
          </div>

          {/* Section 8 & 9 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section id="sec-8" className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <h2 className="text-lg font-serif font-bold text-white flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>8. Design Changes & Variations</span>
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Changes requested post-approval (layouts, materials, electrical fixtures) are subject to scope variation orders, written approval, revised quotations, and timeline adjustments.
              </p>
            </section>

            <section id="sec-9" className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <h2 className="text-lg font-serif font-bold text-white flex items-center space-x-2">
                <Building className="w-4 h-4 text-[#D4AF37]" />
                <span>9. Material Availability & Substitutions</span>
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                If a selected product becomes unavailable, Decor8India will propose suitable alternatives. Significant cost variances resulting from substitutions will be adjusted in milestone billing.
              </p>
            </section>
          </div>

          {/* Section 10: Intellectual Property */}
          <section id="sec-10" className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-3">
            <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <span>10. Intellectual Property Rights</span>
            </h2>
            <p>
              All architectural drawings, 3D renders, floor plans, material schedules, and design concepts created by Decor8India remain our exclusive intellectual property.
            </p>
            <p className="text-xs text-neutral-400">
              Clients receive permission to use approved designs for their specific project. Designs may not be resold, commercially reproduced, or transferred for secondary projects without written consent.
            </p>
          </section>

          {/* Section 11 - 15 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="font-bold text-white uppercase tracking-wider font-mono">11. Client Portal</div>
              <p className="text-neutral-400">Clients are responsible for maintaining login credential security. Access may be temporarily restricted for maintenance or security audits.</p>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="font-bold text-white uppercase tracking-wider font-mono">12. Site Visits</div>
              <p className="text-neutral-400">Visits depend on site accessibility and personnel safety. Appointments may be rescheduled due to weather or entry restrictions.</p>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="font-bold text-white uppercase tracking-wider font-mono">13. Cancellations</div>
              <p className="text-neutral-400">Project cancellation is governed by signed agreements. Payable fees apply for completed work, ordered materials, and design costs.</p>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="font-bold text-white uppercase tracking-wider font-mono">14. Suspension</div>
              <p className="text-neutral-400">Activities may be suspended for overdue payments, unsafe conditions, or breach of agreement until resolved.</p>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="font-bold text-white uppercase tracking-wider font-mono">15. Force Majeure</div>
              <p className="text-neutral-400">Decor8India is not liable for delays caused by natural disasters, strikes, transport disruptions, or severe weather.</p>
            </div>

            <div className="p-5 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="font-bold text-white uppercase tracking-wider font-mono">16–18. Usage Rules</div>
              <p className="text-neutral-400">Unauthorized access, malicious uploads, and bypassing security features on our website or portal are strictly prohibited.</p>
            </div>
          </div>

          {/* Section 19 & 20: Governing Law */}
          <section id="sec-20" className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-3">
            <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
              <Scale className="w-5 h-5 text-[#D4AF37]" />
              <span>19. Privacy & 20. Governing Law & Jurisdiction</span>
            </h2>
            <p>
              Your use of our platform is governed by the <Link to="/privacy-policy" className="text-[#D4AF37] underline font-semibold">Decor8India Privacy Policy</Link>.
            </p>
            <p className="text-xs text-neutral-300">
              These Terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of competent courts in <span className="text-white font-semibold">Bengaluru, Karnataka, India</span>.
            </p>
          </section>

          {/* Section 21 & 22: Nodal Contact */}
          <section id="sec-22" className="p-6 sm:p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                  <span>21. Terms Updates & 22. Official Contact Information</span>
                </h2>
                <p className="text-xs text-neutral-300 mt-1">
                  For project questions, terms clarification, or official notices, please reach out to:
                </p>
              </div>

              <div className="px-3 py-1 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider shrink-0 self-start sm:self-auto">
                Legal Cell
              </div>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-white uppercase tracking-wider font-mono">Entity Name</div>
                <div className="text-neutral-300">Decor8India Architecture & Interiors Pvt. Ltd.</div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-white uppercase tracking-wider font-mono">Registered Office</div>
                <div className="text-neutral-300">
                  #14, Sy No 36/1, Vasanth Vallabnagar, Vasanthpura, Uttrahalli Hobli, Bengaluru – 560061, Karnataka, India
                </div>
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

        </div>

        {/* Back Navigation */}
        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs print:hidden">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] text-neutral-300 hover:text-white transition-all font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Return to Home</span>
          </Link>

          <span className="text-neutral-500 font-mono">Decor8India Service Terms • Version 2.0</span>
        </div>

      </div>
    </main>
  );
};
