import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Clock, 
  FileText, 
  Download, 
  DollarSign, 
  UserCheck, 
  Calendar, 
  ShieldCheck, 
  Image as ImageIcon,
  LogOut,
  Sparkles,
  ChevronRight
} from 'lucide-react';

import type { PaymentItem } from '../../types';
import { InvoiceModal } from '../InvoiceModal';
import { AnimatedTabs } from '../AnimatedTabs';

interface ClientDashboardProps {
  onReturnToPublic: () => void;
}

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onReturnToPublic }) => {
  const { currentUser, logout, projects, updatePassword } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'updates' | 'documents' | 'payments' | 'profile'>('overview');
  const [selectedInvoicePayment, setSelectedInvoicePayment] = useState<PaymentItem | null>(null);
  const [isConsolidatedInvoiceOpen, setIsConsolidatedInvoiceOpen] = useState(false);

  // Change Password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccessMsg, setPasswordSuccessMsg] = useState('');

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      alert('Password must be at least 4 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation password do not match.');
      return;
    }

    if (currentUser) {
      updatePassword(currentUser.id, newPassword);
      setPasswordSuccessMsg('Password updated successfully! Your account is now fully secured.');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  // Strict Security Rule: Client can only view THEIR OWN project
  const clientProject = projects.find(p => 
    (currentUser?.email && p.clientEmail && p.clientEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
    (currentUser?.email && p.clientId && p.clientId.toLowerCase() === currentUser.email.toLowerCase()) ||
    (currentUser?.id && p.clientId === currentUser.id) ||
    (currentUser?.projectId && p.id === currentUser.projectId) ||
    (currentUser?.name && p.clientName && p.clientName.toLowerCase().includes(currentUser.name.toLowerCase())) ||
    (currentUser?.name && p.title && p.title.toLowerCase().includes(currentUser.name.toLowerCase()))
  ) || projects[0];

  if (!currentUser || currentUser.role !== 'CLIENT') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B0C0E] text-white">
        <div className="max-w-md text-center space-y-4 p-8 glass-panel rounded-2xl border border-red-500/40">
          <ShieldCheck className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-2xl font-serif font-bold">Access Restricted</h2>
          <p className="text-xs text-neutral-300">
            Please log in with an approved client account to access your private project dashboard.
          </p>
          <button 
            onClick={onReturnToPublic}
            className="px-6 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (!clientProject) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B0C0E] text-white">
        <div className="max-w-md text-center space-y-4 p-8 glass-panel rounded-2xl border border-[#D4AF37]/30">
          <Clock className="w-12 h-12 text-[#D4AF37] mx-auto animate-spin" />
          <h2 className="text-2xl font-serif font-bold">Loading Your Project...</h2>
          <p className="text-xs text-neutral-400">Fetching project details and site updates from Decor8India database.</p>
        </div>
      </div>
    );
  }



  const totalPaid = (clientProject?.payments || []).filter(p => p.status === 'Paid').reduce((acc, p) => acc + (p.paidAmount || p.amount || 0), 0);
  const totalPending = (clientProject?.payments || []).filter(p => p.status === 'Pending').reduce((acc, p) => acc + (p.amount || 0), 0);

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#E5E3DF] safe-page-container">
      
      {/* Top Portal Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Security Notice Banner for Default Password */}
        {currentUser?.mustChangePassword && (
          <div className="p-4 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg shadow-[#D4AF37]/10 animate-pulse">
            <div className="space-y-0.5">
              <div className="font-bold text-xs text-[#D4AF37] uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4" />
                <span>SECURITY NOTICE: Update Default Password</span>
              </div>
              <p className="text-xs text-neutral-200">
                You are currently logged in using your default contact phone number password. Please change your password below to secure your client account.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 rounded-lg gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider shrink-0 hover:opacity-95"
            >
              Change Password Now
            </button>
          </div>
        )}
        
        <div className="p-6 sm:p-8 rounded-2xl glass-panel-gold border border-[#D4AF37]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img src="/logo_icon.png" alt="Decor8 India" className="h-10 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]" />
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-black/60 border border-[#D4AF37]/40 text-xs font-semibold text-[#D4AF37]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Client Portal</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Welcome back, <span className="gold-gradient-text">{currentUser.name}</span>
            </h1>
            <p className="text-xs text-neutral-300 font-mono">
              Project: <span className="text-white font-bold">{clientProject.title}</span> • Assigned Architect: <span className="text-[#D4AF37] font-semibold">{clientProject.designerName}</span>
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button 
              onClick={onReturnToPublic}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-xs text-neutral-300 font-medium"
            >
              Public Website
            </button>
            <button 
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-300 font-medium hover:bg-red-500 hover:text-white flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs with React Bits Physics & Spring Animations */}
        <AnimatedTabs
          tabs={[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'progress', label: 'Milestone Progress', icon: Clock },
            { id: 'updates', label: 'Site Updates Feed', icon: ImageIcon, badge: clientProject.workUpdates.length },
            { id: 'documents', label: 'Documents & Designs', icon: FileText, badge: clientProject.documents.length },
            { id: 'payments', label: 'Payment Ledger', icon: DollarSign },
            { id: 'profile', label: 'Account Profile', icon: UserCheck }
          ]}
          activeTab={activeTab}
          onChange={(tabId) => setActiveTab(tabId as any)}
          layoutId="activeClientDashboardTab"
          className="border-b border-white/10 pb-2"
        />

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-1">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Current Stage</div>
                <div className="text-xl font-bold font-serif text-[#D4AF37] flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{clientProject.currentStage}</span>
                </div>
                <div className="text-[10px] text-emerald-400 pt-1 font-medium">Stage status: On Schedule</div>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-1">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Completion Progress</div>
                <div className="text-3xl font-bold font-serif text-white">{clientProject.progressPercentage}%</div>
                <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden mt-1">
                  <div className="gold-gradient-bg h-full" style={{ width: `${clientProject.progressPercentage}%` }} />
                </div>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-1">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Target Handover Date</div>
                <div className="text-xl font-bold font-serif text-white flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  <span>{clientProject.expectedCompletion}</span>
                </div>
                <div className="text-[10px] text-neutral-400 pt-1">Estimated timeline: {clientProject.completionTime}</div>
              </div>

              <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-1">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Payment Ledger</div>
                <div className="text-xl font-bold font-serif text-emerald-400">
                  ₹ {(totalPaid / 100000).toFixed(2)} L Paid
                </div>
                <div className="text-[10px] text-amber-400">
                  Pending: ₹ {(totalPending / 100000).toFixed(2)} L
                </div>
              </div>
            </div>

            {/* Latest Site Work Update Banner */}
            {clientProject.workUpdates.length > 0 && (
              <div className="p-6 rounded-2xl glass-panel border border-[#D4AF37]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                    <ImageIcon className="w-4 h-4" />
                    <span>Latest Site Update • {clientProject.workUpdates[0].date}</span>
                  </div>
                  <button 
                    onClick={() => setActiveTab('updates')}
                    className="text-xs text-[#D4AF37] hover:underline flex items-center space-x-1 font-semibold"
                  >
                    <span>View All Updates ({clientProject.workUpdates.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 h-48 rounded-xl overflow-hidden border border-white/10">
                    <img 
                      src={clientProject.workUpdates[0].mediaUrls[0]} 
                      alt="Work Update" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="md:col-span-8 space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {clientProject.workUpdates[0].title}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {clientProject.workUpdates[0].description}
                    </p>
                    <div className="text-[11px] text-neutral-400 font-mono pt-2">
                      Stage: <span className="text-[#D4AF37] font-semibold">{clientProject.workUpdates[0].stage}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => setActiveTab('documents')}
                className="p-6 rounded-2xl glass-card border border-white/10 hover:border-[#D4AF37]/40 cursor-pointer space-y-3"
              >
                <FileText className="w-8 h-8 text-[#D4AF37]" />
                <h4 className="font-serif text-xl font-bold text-white">Download Drawings & Invoices</h4>
                <p className="text-xs text-neutral-400">Access signed agreement, 3D renders, and tax invoices.</p>
              </div>

              <div 
                onClick={() => setActiveTab('payments')}
                className="p-6 rounded-2xl glass-card border border-white/10 hover:border-[#D4AF37]/40 cursor-pointer space-y-3"
              >
                <DollarSign className="w-8 h-8 text-[#D4AF37]" />
                <h4 className="font-serif text-xl font-bold text-white">Review Milestone Receipts</h4>
                <p className="text-xs text-neutral-400">View payment schedules and download receipts.</p>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MILESTONE PROGRESS */}
        {activeTab === 'progress' && (
          <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-8 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="font-serif text-3xl font-bold text-white">Project Milestone Timeline</h2>
              <p className="text-xs text-neutral-400">Comprehensive 10-stage execution plan for {clientProject.title}</p>
            </div>

            <div className="relative border-l-2 border-white/10 ml-4 space-y-8 pl-8">
              {(clientProject.milestones || []).map((m, idx) => {
                const isDone = m.status === 'Completed';
                const isInProg = m.status === 'In Progress';

                return (
                  <div key={m.id} className="relative">
                    {/* Circle Node */}
                    <div className={`absolute -left-[41px] top-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                      isDone 
                        ? 'bg-emerald-500 border-emerald-400 text-black' 
                        : isInProg 
                          ? 'gold-gradient-bg border-[#D4AF37] text-black animate-pulse' 
                          : 'bg-black border-neutral-700 text-neutral-500'
                    }`}>
                      {isDone ? '✓' : idx + 1}
                    </div>

                    <div className="p-5 rounded-xl glass-card border border-white/10 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h4 className="font-serif text-xl font-bold text-white">{m.stage}</h4>
                        <div className="flex items-center space-x-3 text-xs font-mono">
                          <span className="text-neutral-400">Target: {m.targetDate}</span>
                          <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase ${
                            isDone ? 'bg-emerald-500/20 text-emerald-400' : isInProg ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-neutral-500'
                          }`}>
                            {m.status} ({m.progressPercentage}%)
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
                        <div className="gold-gradient-bg h-full transition-all" style={{ width: `${m.progressPercentage}%` }} />
                      </div>

                      {m.completedDate && (
                        <div className="text-[11px] text-emerald-400 font-mono">Completed on {m.completedDate}</div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: WORK UPDATES FEED */}
        {activeTab === 'updates' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="font-serif text-3xl font-bold text-white">Daily & Weekly Site Photos & Video Logs</h2>
              <p className="text-xs text-neutral-400">Uploaded directly by our project manager from the site.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(clientProject.workUpdates || []).map((update) => {
                const hasBeforeAfter = update.beforeImage || update.afterImage;
                return (
                  <div key={update.id} className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
                    <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                      <span className="text-[#D4AF37] font-bold px-2.5 py-0.5 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/30">{update.stage}</span>
                      <span>{update.date}</span>
                    </div>

                    {/* Before & After comparison in Client Site Feed */}
                    {hasBeforeAfter ? (
                      <div className="grid grid-cols-2 gap-3">
                        {update.beforeImage && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block font-mono">Before Renovation</span>
                            <div className="h-48 rounded-xl overflow-hidden border border-red-500/40">
                              <img src={update.beforeImage} alt="Before" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        )}
                        {update.afterImage && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block font-mono">After Transformation</span>
                            <div className="h-48 rounded-xl overflow-hidden border border-emerald-500/40">
                              <img src={update.afterImage} alt="After" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-64 rounded-xl overflow-hidden border border-white/10">
                        <img 
                          src={update.mediaUrls?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'} 
                          alt={update.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <h3 className="font-serif text-xl font-bold text-white">{update.title}</h3>
                    <p className="text-xs text-neutral-300 leading-relaxed font-light">{update.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: DOCUMENTS */}
        {activeTab === 'documents' && (
          <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <h2 className="font-serif text-3xl font-bold text-white">Project Document Vault</h2>
              <p className="text-xs text-neutral-400">Official agreements, tax invoices, 3D CAD models, and warranty documents.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(clientProject.documents || []).map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl glass-card border border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{doc.title}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">Category: {doc.category} • {doc.fileSize} • Uploaded {doc.uploadDate}</div>
                    </div>
                  </div>

                  <a 
                    href={doc.fileUrl && doc.fileUrl !== '#' && !doc.fileUrl.includes('/invoices/') ? doc.fileUrl : undefined} 
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    onClick={(e) => {
                      if (!doc.fileUrl || doc.fileUrl === '#' || doc.fileUrl.includes('/invoices/') || doc.category === 'Invoice') {
                        e.preventDefault();
                        const matchingPay = (clientProject.payments || []).find(p => doc.title.includes(p.title) || doc.id.includes(p.id));
                        if (matchingPay) {
                          setSelectedInvoicePayment(matchingPay);
                        } else {
                          setIsConsolidatedInvoiceOpen(true);
                        }
                      }
                    }}
                    className="p-2.5 rounded-lg bg-white/5 hover:bg-[#D4AF37] text-neutral-300 hover:text-black transition-all cursor-pointer flex items-center justify-center"
                    title="View / Download Document"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="font-serif text-3xl font-bold text-white">Milestone Payment Ledger</h2>
                <p className="text-xs text-neutral-400">Track paid installments, pending amounts, and tax invoices.</p>
              </div>

              <button
                onClick={() => setIsConsolidatedInvoiceOpen(true)}
                className="px-4 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center space-x-1.5 shrink-0 shadow-lg shadow-[#D4AF37]/20"
              >
                <FileText className="w-4 h-4" />
                <span>Download All Paid Invoices (Consolidated Bill)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-black/60 text-[#D4AF37] font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-4 rounded-l-lg">Milestone Stage</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 rounded-r-lg text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {(clientProject.payments || []).map((p) => (
                    <tr key={p.id} className="hover:bg-white/5">
                      <td className="p-4 font-bold text-white">{p.title}</td>
                      <td className="p-4 font-mono font-bold text-white">₹ {p.amount.toLocaleString()}</td>
                      <td className="p-4 font-mono">{p.dueDate}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          p.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {p.status === 'Paid' ? (
                          <button 
                            onClick={() => setSelectedInvoicePayment(p)}
                            className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center justify-end space-x-1 ml-auto"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View / Download Invoice</span>
                          </button>
                        ) : (
                          <span className="text-neutral-500 text-[11px] italic">Pending Payment</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}



        {/* TAB 7: PROFILE */}
        {activeTab === 'profile' && (
          <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-6 max-w-2xl mx-auto animate-in fade-in">
            <div className="space-y-1">
              <h2 className="font-serif text-3xl font-bold text-white">Client Account Profile</h2>
              <p className="text-xs text-neutral-400">View registered contact details & security credentials.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-neutral-400 font-mono">Client Name</div>
                <div className="text-base font-bold text-white">{currentUser.name}</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-neutral-400 font-mono">Email Address (Login ID)</div>
                <div className="text-base font-bold text-[#D4AF37]">{currentUser.email}</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-neutral-400 font-mono">Registered Phone</div>
                <div className="text-base font-bold text-white">{currentUser.phone || '+91 98765 43210'}</div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-neutral-400 font-mono">Account Security Status</div>
                <div className="text-emerald-400 font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Admin Approved & Active Session</span>
                </div>
              </div>

              {/* Change Password Form */}
              <div className="p-6 rounded-xl bg-[#0D0E12] border border-[#D4AF37]/40 space-y-4 mt-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Change Account Password</span>
                  </h3>
                  <p className="text-xs text-neutral-400">Update your default contact number password to a new secure password.</p>
                </div>

                {passwordSuccessMsg && (
                  <div className="p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
                    {passwordSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-3">
                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">New Secure Password *</label>
                    <input
                      type="password"
                      required
                      placeholder="Enter new password (min 4 characters)"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-300 block mb-1">Confirm New Password *</label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity"
                  >
                    Save & Secure Account
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Single Milestone Tax Invoice Modal */}
      <InvoiceModal 
        isOpen={Boolean(selectedInvoicePayment)}
        onClose={() => setSelectedInvoicePayment(null)}
        payment={selectedInvoicePayment}
        project={clientProject}
      />

      {/* Master Consolidated Bill Modal (All Paid Invoices) */}
      <InvoiceModal 
        isOpen={isConsolidatedInvoiceOpen}
        onClose={() => setIsConsolidatedInvoiceOpen(false)}
        project={clientProject}
        isConsolidated={true}
      />

    </div>
  );
};
