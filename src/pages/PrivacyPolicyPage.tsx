import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  ArrowLeft,
  Printer,
  CheckCircle2,
  Clock,
  Eye,
  Server,
  UserCheck,
  Building,
  CreditCard
} from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const sections = [
    { id: 'sec-1', title: '1. Introduction' },
    { id: 'sec-2', title: '2. Information We Collect' },
    { id: 'sec-3', title: '3. How We Use Information' },
    { id: 'sec-4', title: '4. Client Portal' },
    { id: 'sec-5', title: '5. Site Visits & Communication' },
    { id: 'sec-6', title: '6. Cookies & Local Storage' },
    { id: 'sec-7', title: '7. Sharing of Information' },
    { id: 'sec-8', title: '8. Data Security' },
    { id: 'sec-9', title: '9. Data Retention' },
    { id: 'sec-10', title: '10. Your Privacy Rights' },
    { id: 'sec-11', title: '11. Third-Party Services' },
    { id: 'sec-12', title: '12. Policy Changes' },
    { id: 'sec-13', title: '13. Grievance & Contact' },
  ];

  return (
    <main className="pt-28 pb-20 bg-[#0B0C0E] text-[#E5E3DF] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-neutral-400 print:hidden">
          <div className="flex items-center space-x-2">
            <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-neutral-600" />
            <span className="text-[#D4AF37]">Privacy Policy</span>
          </div>

          <button 
            onClick={handlePrint}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#D4AF37] text-xs font-semibold text-neutral-300 hover:text-white transition-all"
          >
            <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Print Policy</span>
          </button>
        </div>

        {/* Page Header Banner */}
        <div className="p-6 sm:p-10 rounded-2xl glass-panel border border-[#D4AF37]/30 space-y-4 relative overflow-hidden print:border-none print:p-0">
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Privacy Statement</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Privacy Policy
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

        {/* Quick Nav Jump Pills (Screen Only) */}
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

        {/* Structured Policy Content */}
        <div className="space-y-8 text-sm leading-relaxed text-neutral-300">
          
          {/* Section 1 */}
          <section id="sec-1" className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-3">
            <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
              <Building className="w-5 h-5 text-[#D4AF37]" />
              <span>1. Introduction</span>
            </h2>
            <p>
              Decor8India Architecture & Interiors Pvt. Ltd. (“Decor8India”, “we”, “us”, or “our”) respects your privacy and is committed to protecting the personal information you provide to us.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, and protect information when you use our website, Client Portal, site visit services, project services, or communicate with us.
            </p>
            <p className="text-xs text-neutral-400 font-mono italic">
              By using our services or submitting your information, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>

          {/* Section 2 */}
          <section id="sec-2" className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-4">
            <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
              <span>2. Information We Collect</span>
            </h2>
            <p>Depending on the services you use, we may collect the following information:</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono">Personal Data</div>
                <ul className="text-xs space-y-1 text-neutral-300 list-disc list-inside">
                  <li>Full Name & Contact Details</li>
                  <li>Phone Number & Email Address</li>
                  <li>Project/Site Delivery Address</li>
                  <li>Billing & Invoice Details</li>
                  <li>Communication Records</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono">Project Specs</div>
                <ul className="text-xs space-y-1 text-neutral-300 list-disc list-inside">
                  <li>Property Type & Carpet Area</li>
                  <li>Floor Plans & Drawings</li>
                  <li>Site Photos & Videos</li>
                  <li>Design & Material Preferences</li>
                  <li>Estimated Budget & Timelines</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono">Payment Records</div>
                <ul className="text-xs space-y-1 text-neutral-300 list-disc list-inside">
                  <li>Transaction/Reference IDs</li>
                  <li>Bank UTR Numbers</li>
                  <li>Payment Dates & Amounts</li>
                  <li>Locked Invoice IDs</li>
                  <li>Milestone Confirmations</li>
                </ul>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start space-x-2">
              <CreditCard className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>
                Payment processing is handled via authorized banks & UPI providers. We do not intentionally store complete credit/debit card numbers, CVVs, or PINs on our systems.
              </span>
            </div>
          </section>

          {/* Section 3 */}
          <section id="sec-3" className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-3">
            <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
              <Eye className="w-5 h-5 text-[#D4AF37]" />
              <span>3. How We Use Your Information</span>
            </h2>
            <p>We use the information collected to provide and manage our architectural and turnkey services, including:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
              {[
                'Preparing architectural estimates & quotations',
                'Creating 3D renders & interior concepts',
                'Managing project execution & milestone updates',
                'Coordinating site visits & gate pass generation',
                'Generating official invoices & payment receipts',
                'Sharing site progress photos & warranty documents',
                'Responding to enquiries & client support tickets',
                'Complying with applicable laws & regulations'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section id="sec-4" className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-3">
            <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
              <UserCheck className="w-5 h-5 text-[#D4AF37]" />
              <span>4. Client Portal</span>
            </h2>
            <p>
              The Client Portal allows authorized clients to track their ongoing project, inspect site photos, access floor plans, view payment receipts, and review consolidated milestone invoices.
            </p>
            <p className="text-xs text-neutral-400">
              Clients are responsible for maintaining account credential confidentiality and must immediately notify us if unauthorized access is suspected.
            </p>
          </section>

          {/* Section 5 */}
          <section id="sec-5" className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-3">
            <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-[#D4AF37]" />
              <span>5. Site Visits & Communication</span>
            </h2>
            <p>
              Information submitted for site visits is used to confirm appointments, generate entry gate codes, coordinate site engineers, and record measurements.
            </p>
            <p>
              We may communicate with you via Email, Phone, WhatsApp, SMS, or the Client Portal regarding project progress, appointments, payments, and approvals.
            </p>
          </section>

          {/* Section 6 */}
          <section id="sec-6" className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-3">
            <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
              <Server className="w-5 h-5 text-[#D4AF37]" />
              <span>6. Cookies & Local Storage</span>
            </h2>
            <p>
              Our website and Client Portal use essential session tokens (`localStorage`) and basic cookies strictly required for authentication, security, and smooth navigation.
            </p>
          </section>

          {/* Section 7 */}
          <section id="sec-7" className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-3">
            <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
              <Lock className="w-5 h-5 text-[#D4AF37]" />
              <span>7. Sharing of Information</span>
            </h2>
            <p className="font-semibold text-white">Decor8India does not sell your personal information to third parties.</p>
            <p>
              Where strictly necessary, data may be shared with authorized site engineers, project contractors, technology hosting providers, payment partners, or legal authorities as required by law.
            </p>
          </section>

          {/* Section 8 & 9 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section id="sec-8" className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <h2 className="text-lg font-serif font-bold text-white flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>8. Data Security</span>
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                We implement industry-standard SSL/TLS encryption and password hashing to safeguard data. Do not share your passwords or OTPs with anyone claiming to represent Decor8India unless verified through official channels.
              </p>
            </section>

            <section id="sec-9" className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
              <h2 className="text-lg font-serif font-bold text-white flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span>9. Data Retention</span>
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed">
                We retain project and financial records for as long as necessary to fulfill services, maintain warranty records, process payments, and comply with Indian statutory requirements.
              </p>
            </section>
          </div>

          {/* Section 10, 11, 12 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <section id="sec-10" className="p-6 rounded-2xl glass-card border border-white/10 space-y-2">
              <h3 className="text-base font-serif font-bold text-white">10. Your Privacy Rights</h3>
              <p className="text-xs text-neutral-400">
                You may request access to, correction, or deletion of your personal records subject to legal and contractual requirements.
              </p>
            </section>

            <section id="sec-11" className="p-6 rounded-2xl glass-card border border-white/10 space-y-2">
              <h3 className="text-base font-serif font-bold text-white">11. Third-Party Links</h3>
              <p className="text-xs text-neutral-400">
                Our site may link to third-party services (e.g. payment portals). Decor8India is not responsible for external privacy practices.
              </p>
            </section>

            <section id="sec-12" className="p-6 rounded-2xl glass-card border border-white/10 space-y-2">
              <h3 className="text-base font-serif font-bold text-white">12. Policy Changes</h3>
              <p className="text-xs text-neutral-400">
                We may update this policy periodically. The latest version will always be published on this page with an updated effective date.
              </p>
            </section>
          </div>

          {/* Section 13: Grievance Officer */}
          <section id="sec-13" className="p-6 sm:p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-serif font-bold text-white flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-[#D4AF37]" />
                  <span>13. Grievance & Contact Information</span>
                </h2>
                <p className="text-xs text-neutral-300 mt-1">
                  For privacy enquiries, data requests, or grievances, please contact our nodal privacy officer:
                </p>
              </div>

              <div className="px-3 py-1 rounded-full bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider shrink-0 self-start sm:self-auto">
                Grievance Cell
              </div>
            </div>

            <div className="pt-4 border-t border-[#D4AF37]/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-white uppercase tracking-wider font-mono">Company Entity</div>
                <div className="text-neutral-300">Decor8India Architecture & Interiors Pvt. Ltd.</div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-white uppercase tracking-wider font-mono">Headquarters Address</div>
                <div className="text-neutral-300">
                  #14, Sy No 36/1, Vasanth Vallabnagar, Vasanthpura, Uttrahalli Hobli, Bengaluru – 560061, Karnataka, India
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-white uppercase tracking-wider font-mono">Direct Channels</div>
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

        {/* Back Link */}
        <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs print:hidden">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37] text-neutral-300 hover:text-white transition-all font-semibold"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Return to Home</span>
          </Link>

          <span className="text-neutral-500 font-mono">Decor8India Privacy Statement • Version 2.0</span>
        </div>

      </div>
    </main>
  );
};
