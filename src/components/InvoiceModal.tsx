import React from 'react';
import { X, Printer, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { PaymentItem, Project } from '../types';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment?: PaymentItem | null;
  project: Project | null;
  isConsolidated?: boolean;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ 
  isOpen, 
  onClose, 
  payment, 
  project, 
  isConsolidated = false 
}) => {
  if (!isOpen || !project) return null;
  if (!isConsolidated && !payment) return null;

  const paidPayments = project.payments.filter(p => p.status === 'Paid');

  // Single payment vs Consolidated Master Calculation
  const invoiceNumber = isConsolidated
    ? `BILL-MASTER-${project.id.slice(-6).toUpperCase()}`
    : (payment?.invoiceUrl ? payment.invoiceUrl.split('/').pop()?.replace('.pdf', '') : `INV-D8I-${Math.floor(100000 + Math.random() * 900000)}`);
  
  const invoiceDate = isConsolidated 
    ? new Date().toISOString().split('T')[0] 
    : (payment?.paidDate || new Date().toISOString().split('T')[0]);

  const totalPaid = isConsolidated
    ? paidPayments.reduce((acc, p) => acc + (p.paidAmount || p.amount), 0)
    : (payment ? (payment.paidAmount || payment.amount) : 0);

  // Estimate total contract value if available
  const totalContractVal = project.payments.reduce((acc, p) => acc + p.amount, 0) || totalPaid;
  const remainingBalance = Math.max(0, totalContractVal - totalPaid);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <div className="relative w-full max-w-3xl bg-[#0D0E12] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black print:p-0 print:max-w-none">
        
        {/* Action Header Buttons (Hidden when printing) */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 print:hidden">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isConsolidated ? 'MASTER CONSOLIDATED PAID BILL' : 'OFFICIAL PAID INVOICE'}</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 flex items-center space-x-1.5 shadow-lg shadow-[#D4AF37]/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* INVOICE CONTENT (Printable Area) */}
        <div className="space-y-8 bg-white text-neutral-900 p-6 sm:p-8 rounded-xl print:p-0 font-sans shadow-lg">
          
          {/* Header & Logo */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-neutral-200 pb-6 gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <img src="/logo_icon.png" alt="Decor8 India" className="h-9 w-auto object-contain" />
                <span className="text-2xl font-serif font-extrabold text-neutral-900 tracking-wider">
                  DECOR8<span className="text-[#B8860B]">INDIA</span>
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">
                Architectural Interiors & Luxury Turnkey Construction
              </p>
              <p className="text-[10px] text-neutral-500">
                {isConsolidated ? 'Master Consolidated Statement of Account & Payment Receipt' : 'Official Project Payment Receipt & Invoice'}
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1 bg-neutral-50 p-3 rounded-lg border border-neutral-200">
              <div className="text-xs font-bold text-[#B8860B] uppercase tracking-wider font-serif">
                {isConsolidated ? 'CONSOLIDATED BILL' : 'OFFICIAL INVOICE'}
              </div>
              <div className="text-sm font-mono font-bold text-neutral-900">{invoiceNumber}</div>
              <div className="text-[11px] text-neutral-600 font-mono">Date: {invoiceDate}</div>
              <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded inline-block">
                Status: PAID
              </div>
            </div>
          </div>

          {/* Client & Project Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs border-b border-neutral-200 pb-6">
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-[#B8860B] uppercase tracking-wider">Billed To (Client):</div>
              <div className="font-bold text-sm text-neutral-900">{project.clientName}</div>
              <div className="text-neutral-600 font-mono">Project: {project.title}</div>
              <div className="text-neutral-600 font-mono">Location: {project.location} ({project.category})</div>
            </div>

            <div className="space-y-1.5 sm:text-right">
              <div className="text-[11px] font-bold text-[#B8860B] uppercase tracking-wider">Issued By:</div>
              <div className="font-bold text-sm text-neutral-900">Decor8 India Private Limited</div>
              <div className="text-neutral-600 font-mono">Indiranagar 100ft Road, Bengaluru, KA</div>
              <div className="text-neutral-600 font-mono">Email: info@decor8india.com | +91 98765 43210</div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="space-y-3">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-100 text-neutral-700 font-bold border-y border-neutral-300">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Milestone Installment / Item</th>
                  <th className="py-2.5 px-3 text-center">Paid Date</th>
                  <th className="py-2.5 px-3 text-right">Status</th>
                  <th className="py-2.5 px-3 text-right">Amount Paid (₹)</th>
                </tr>
              </thead>
              <tbody>
                {isConsolidated ? (
                  paidPayments.map((p, idx) => (
                    <tr key={p.id} className="border-b border-neutral-200">
                      <td className="py-3 px-3 font-mono text-neutral-500">{idx + 1}</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-neutral-900">{p.title}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">Installment for {project.title}</div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-neutral-600">{p.paidDate || p.dueDate}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700">PAID</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-neutral-900">
                        ₹ {(p.paidAmount || p.amount).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-neutral-200">
                    <td className="py-3.5 px-3 font-mono text-neutral-500">1</td>
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-neutral-900">{payment?.title}</div>
                      <div className="text-[10px] text-neutral-500 font-mono">Project Milestone Installment for {project.title}</div>
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono text-neutral-600">{payment?.paidDate || payment?.dueDate}</td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-700">PAID</td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-neutral-900 text-sm">₹ {totalPaid.toLocaleString('en-IN')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Breakdown */}
          <div className="flex justify-end pt-2">
            <div className="w-full max-w-sm space-y-2 text-xs font-mono bg-neutral-50 p-4 rounded-xl border border-neutral-200">
              {isConsolidated && (
                <>
                  <div className="flex justify-between text-neutral-600">
                    <span>Total Project Contract:</span>
                    <span>₹ {totalContractVal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Remaining Balance:</span>
                    <span>₹ {remainingBalance.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full h-px bg-neutral-300 my-1" />
                </>
              )}
              <div className="flex justify-between font-bold text-sm text-neutral-900">
                <span>{isConsolidated ? 'Total Cumulative Paid:' : 'Total Amount Paid:'}</span>
                <span className="text-[#B8860B] font-extrabold text-base">₹ {totalPaid.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer & CEO Signature Stamp */}
          <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-end gap-4 text-[10px] text-neutral-500">
            <div className="space-y-1">
              <div className="font-bold text-neutral-800 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Official Master Consolidated Payment Receipt</span>
              </div>
              <div>All payments received & verified via Bank Transfer / Online Gateway.</div>
              <div>Thank you for choosing Decor8 India for your dream project!</div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-xs font-serif font-bold text-neutral-900">Satish Bhat</div>
              <div className="text-[10px] font-bold text-[#B8860B] font-mono">CEO, Decor8 India</div>
              <div className="w-32 h-px bg-neutral-400 ml-auto mt-1" />
              <div className="text-[9px] text-neutral-400 italic">Signed by CEO</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
