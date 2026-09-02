import React, { useState, useCallback, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/apiService';
import type { Project, ServiceItem, ProjectStage, TeamMember, PaymentItem } from '../../types';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign, 
  BookOpen, 
  Image as ImageIcon, 
  LogOut, 
  ShieldAlert,
  X,
  FileText,
  Camera,
  CreditCard,
  Layers,
  FilePlus,
  Upload,
  Award,
  Download,
  Sparkles,
  ArrowLeft,
  MapPin,
  ShieldCheck,
  Bold,
  Link as LinkIcon,
  Quote,
  Briefcase,
  List,
  Heading2,
  Mail,
  Send,
  CheckCircle2,
  Bell,
  BellOff,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import type { BranchOffice } from '../../types';

import { InvoiceModal } from '../InvoiceModal';
import { AnimatedTabs } from '../AnimatedTabs';

interface AdminDashboardProps {
  onReturnToPublic: () => void;
}

const EmailActivityLogsSection: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/get_email_logs.php');
      const data = await res.json();
      if (data.success && Array.isArray(data.logs)) {
        setLogs(data.logs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#D4AF37]/30 space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#D4AF37]">
            <Mail className="w-4 h-4 text-[#D4AF37]" />
            <span>AUTOMATED EMAIL DISPATCH AUDIT LOGS</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-white mt-1">Sent Email Activity & Delivery Status Logs</h3>
          <p className="text-xs text-neutral-400">Real-time delivery status of automated site updates, milestone progress emails, and invoice alerts.</p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={loading}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#D4AF37] text-neutral-300 hover:text-black font-bold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Refreshing...' : 'Refresh Logs'}</span>
        </button>
      </div>

      <div className="space-y-3">
        {logs.length === 0 ? (
          <div className="p-6 rounded-xl bg-black/40 border border-white/10 text-center text-xs text-neutral-400 italic">
            No email activity logs recorded yet. Send a test email or update a project to record logs.
          </div>
        ) : (
          logs.map((log, index) => {
            const isSuccess = log.status === 'SUCCESS';
            return (
              <div key={log.id || index} className="p-4 rounded-xl glass-card border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] uppercase ${
                      isSuccess ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {isSuccess ? '🟢 DELIVERED' : '🔴 FAILED'}
                    </span>
                    <span className="font-bold text-white text-xs">{log.subject}</span>
                  </div>
                  <div className="text-[11px] text-neutral-400 flex items-center space-x-3 font-mono">
                    <span>To: <strong className="text-neutral-200">{log.recipient}</strong> {log.recipient_name ? `(${log.recipient_name})` : ''}</span>
                    <span>•</span>
                    <span>Method: <strong className="text-[#D4AF37]">{log.method || 'SMTP'}</strong></span>
                  </div>
                </div>

                <div className="text-right shrink-0 font-mono text-[11px] text-neutral-400">
                  <div>{log.created_at}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToPublic }) => {
  const { 
    currentUser, 
    logout, 
    bookings,
    siteVisits,
    approveBooking, 
    rejectBooking, 
    confirmSiteVisit,
    rejectSiteVisit,
    projects, 
    updateProjectProgress,
    addWorkUpdate,
    addDocument,
    addPayment,
    updatePaymentStatus,
    addProject,
    updateProject,
    deleteProject,
    services,
    addService,
    updateService,
    deleteService,
    updateServicePrice,
    removeServiceDiscount,
    toggleServiceStatus,
    articles,
    addArticle,
    deleteArticle,
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    branchOffices,
    addBranchOffice,
    updateBranchOffice,
    deleteBranchOffice,
    partners,
    addPartner,
    deletePartner
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'clients' | 'projects' | 'emails' | 'portfolio' | 'services' | 'team' | 'magazine' | 'branches' | 'partners' | 'careers'>('analytics');
  const [clientFilter, setClientFilter] = useState<'ALL' | 'PACKAGES' | 'SITE_VISITS'>('ALL');

  // Admin New Enquiry Email Notification Setting State
  const [adminEmailEnquiryEnabled, setAdminEmailEnquiryEnabled] = useState<boolean>(true);
  const [adminNotificationEmail, setAdminNotificationEmail] = useState<string>('support@decor8india.com');
  const [isEditingAdminEmail, setIsEditingAdminEmail] = useState<boolean>(false);
  const [tempAdminEmail, setTempAdminEmail] = useState<string>('support@decor8india.com');
  const [isSavingAdminSettings, setIsSavingAdminSettings] = useState<boolean>(false);
  const [testAlertSending, setTestAlertSending] = useState<boolean>(false);

  // Load Admin System Settings on Component Mount
  const fetchAdminSettings = useCallback(async () => {
    try {
      const res = await apiService.getSettings();
      if (res.success && res.settings) {
        setAdminEmailEnquiryEnabled(Boolean(res.settings.admin_email_enquiry_notifications));
        if (res.settings.admin_notification_email) {
          setAdminNotificationEmail(res.settings.admin_notification_email);
          setTempAdminEmail(res.settings.admin_notification_email);
        }
      }
    } catch (err) {
      console.warn('Could not fetch admin settings:', err);
    }
  }, []);

  useEffect(() => {
    fetchAdminSettings();
  }, [fetchAdminSettings]);

  // Handler: Toggle Admin Email Notifications ON / OFF
  const handleToggleAdminEmailNotifications = async (newVal: boolean) => {
    setAdminEmailEnquiryEnabled(newVal);
    try {
      await apiService.saveSettings({
        admin_email_enquiry_notifications: newVal,
        admin_notification_email: adminNotificationEmail
      });
    } catch (err) {
      console.error('Failed to persist admin notification toggle:', err);
    }
  };

  // Handler: Save Updated Admin Target Email
  const handleSaveAdminNotificationEmail = async () => {
    const trimmed = tempAdminEmail.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      alert('Please enter a valid email address.');
      return;
    }
    setIsSavingAdminSettings(true);
    try {
      const res = await apiService.saveSettings({
        admin_email_enquiry_notifications: adminEmailEnquiryEnabled,
        admin_notification_email: trimmed
      });
      if (res.success) {
        setAdminNotificationEmail(trimmed);
        setIsEditingAdminEmail(false);
        alert(`✅ Admin notification email updated to: ${trimmed}`);
      } else {
        alert(res.message || 'Failed to update email setting.');
      }
    } catch (err) {
      alert('Error updating notification email in database.');
    } finally {
      setIsSavingAdminSettings(false);
    }
  };

  // Handler: Send Instant Test Admin Notification Email
  const handleSendTestAdminAlert = async (type: 'admin_booking' | 'admin_site_visit') => {
    setTestAlertSending(true);
    try {
      const res = await fetch(`/api/test_email.php?send=1&type=${type}&to=${encodeURIComponent(adminNotificationEmail)}`);
      const data = await res.json();
      if (data.status === 'SUCCESS' || data.details?.success) {
        alert(`✅ Instant test email for ${type === 'admin_booking' ? 'Consultation Booking' : 'Live Site Visit'} was dispatched via ${data.details?.method || 'SMTP'} to ${adminNotificationEmail}!`);
      } else {
        alert(`⚠️ Notification status: ${data.details?.message || 'Check email logs'}`);
      }
    } catch (err: any) {
      alert(`❌ Error sending test email: ${err.message}`);
    } finally {
      setTestAlertSending(false);
    }
  };

  // Client Email Notification Toggle State
  const [notifyClientByEmail, setNotifyClientByEmail] = useState<boolean>(true);
  const [customEmailRecipient, setCustomEmailRecipient] = useState('');
  const [customEmailSubject, setCustomEmailSubject] = useState('Project Milestone Update — Decor8 India Studio');
  const [customEmailType, setCustomEmailType] = useState<'invoice' | 'progress' | 'welcome' | 'generic'>('generic');
  const [customEmailBody, setCustomEmailBody] = useState('');
  const [customEmailSending, setCustomEmailSending] = useState(false);
  const [customEmailFeedback, setCustomEmailFeedback] = useState<{ status: 'success' | 'error'; msg: string } | null>(null);

  // Approval Confirmation Modal State
  const [approvalModalBookingId, setApprovalModalBookingId] = useState<string | null>(null);
  const [finalContractPrice, setFinalContractPrice] = useState<number>(0);
  const approvalBooking = bookings.find(b => b.id === approvalModalBookingId);

  // Budget Editing State (Project Workspace)
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [editBudgetValue, setEditBudgetValue] = useState('');


  // Reusable file-to-server uploader (saves to GoDaddy /uploads/ directory so all devices see photos/docs)
  const handleFileUpload = useCallback((file: File, setter: (url: string) => void) => {
    if (!file) return;

    import('../../services/apiService').then(({ apiService }) => {
      apiService.uploadFile(file).then(res => {
        if (res.success && res.fileUrl) {
          setter(res.fileUrl);
          return;
        }
        fallbackLocalUpload(file, setter);
      }).catch(() => {
        fallbackLocalUpload(file, setter);
      });
    });
  }, []);

  const fallbackLocalUpload = (file: File, setter: (url: string) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!file.type.startsWith('image/')) {
        setter(dataUrl);
        return;
      }
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1000;
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setter(canvas.toDataURL('image/jpeg', 0.82));
        } else {
          setter(dataUrl);
        }
      };
      img.onerror = () => setter(dataUrl);
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };
  
  // Project Management Sub-Tab State
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [clientProjectPage, setClientProjectPage] = useState<number>(1);
  const CLIENT_PROJECTS_PER_PAGE = 5;
  const [projectSubTab, setProjectSubTab] = useState<'stage' | 'updates' | 'documents' | 'payments'>('stage');

  // Stage progress state (starts at 0 by default)
  const [stageProgressInput, setStageProgressInput] = useState<number>(0);


  // Site Update Feed State
  const [feedTitle, setFeedTitle] = useState('');
  const [feedDescription, setFeedDescription] = useState('');
  const [feedImageUrl, setFeedImageUrl] = useState('');
  const [feedBeforeImage, setFeedBeforeImage] = useState('');
  const [feedAfterImage, setFeedAfterImage] = useState('');
  const [feedStage, setFeedStage] = useState<ProjectStage>('Carpentry');

  // Document / Invoice State
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState<'Invoice' | 'Agreement' | '3D Design' | 'Quotation' | 'Warranty'>('Invoice');
  const [docFileUrl, setDocFileUrl] = useState('#');
  const [docFileSize, setDocFileSize] = useState('1.5 MB');

  // Payment Milestone State
  const [payTitle, setPayTitle] = useState('');
  const [payAmount, setPayAmount] = useState<number>(500000);
  const [payDueDate, setPayDueDate] = useState(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [payStatus, setPayStatus] = useState<'Pending' | 'Paid'>('Pending');
  const [selectedInvoicePayment, setSelectedInvoicePayment] = useState<PaymentItem | null>(null);
  const [isConsolidatedInvoiceOpen, setIsConsolidatedInvoiceOpen] = useState(false);

  // ---------------- PORTFOLIO CMS MODAL STATE ----------------
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Portfolio Form State
  const [portTitle, setPortTitle] = useState('');
  const [portClientName, setPortClientName] = useState('');
  const [portDesignerName, setPortDesignerName] = useState('Mr. Satish Bhat (CEO & Principal Architect)');
  const [portDesignerSelect, setPortDesignerSelect] = useState('Mr. Satish Bhat (CEO & Principal Architect)');
  const [portCategory, setPortCategory] = useState<'Residential' | 'Commercial' | 'Construction'>('Residential');
  const [portStyle, setPortStyle] = useState<'Luxury' | 'Modern' | 'Minimal' | 'Traditional'>('Luxury');
  const [portCoverImage, setPortCoverImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  const [portGalleryImages, setPortGalleryImages] = useState<string[]>([]);
  const [newGalleryUrl, setNewGalleryUrl] = useState<string>('');
  const [portBeforeImage, setPortBeforeImage] = useState('');
  const [portAfterImage, setPortAfterImage] = useState('');
  const [portLocation, setPortLocation] = useState('Worli, South Mumbai');
  const [portArea, setPortArea] = useState('3,500 Sq. Ft.');
  const [portBudget, setPortBudget] = useState('₹ 1.20 Cr');
  const [portCompletionTime, setPortCompletionTime] = useState('75 Days');
  const [portStatus, setPortStatus] = useState<'Ongoing' | 'Completed'>('Completed');
  const [portDescription, setPortDescription] = useState('');

  const openAddPortfolioModal = () => {
    setEditingProject(null);
    setPortTitle('');
    setPortClientName('Private Residence');
    setPortDesignerName('Mr. Satish Bhat (CEO & Principal Architect)');
    setPortDesignerSelect('Mr. Satish Bhat (CEO & Principal Architect)');
    setPortCategory('Residential');
    setPortStyle('Luxury');
    setPortCoverImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
    setPortGalleryImages([]);
    setNewGalleryUrl('');
    setPortBeforeImage('');
    setPortAfterImage('');
    setPortLocation('Worli, South Mumbai');
    setPortArea('3,500 Sq. Ft.');
    setPortBudget('₹ 1.20 Cr');
    setPortCompletionTime('75 Days');
    setPortStatus('Completed');
    setPortDescription('Bespoke architectural makeover with custom woodwork and Italian marble.');
    setIsPortfolioModalOpen(true);
  };

  const openEditPortfolioModal = (project: Project) => {
    setEditingProject(project);
    setPortTitle(project.title);
    setPortClientName(project.clientName || 'Private Residence');
    const dName = project.designerName && project.designerName !== 'Aarav Mehta' ? project.designerName : 'Mr. Satish Bhat (CEO & Principal Architect)';
    setPortDesignerName(dName);
    setPortDesignerSelect(dName);
    setPortCategory(project.category);
    setPortStyle(project.style);
    setPortCoverImage(project.coverImage);
    setPortGalleryImages(project.galleryImages && project.galleryImages.length > 0 ? project.galleryImages : [project.coverImage]);
    setNewGalleryUrl('');
    setPortBeforeImage(project.beforeImage || '');
    setPortAfterImage(project.afterImage || '');
    setPortLocation(project.location);
    setPortArea(project.area);
    setPortBudget(project.budget);
    setPortCompletionTime(project.completionTime);
    setPortStatus(project.status);
    setPortDescription(project.description);
    setIsPortfolioModalOpen(true);
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!portTitle) return;

    const finalGallery = portGalleryImages.length > 0 ? portGalleryImages : (portCoverImage ? [portCoverImage] : []);

    if (editingProject) {
      updateProject(editingProject.id, {
        title: portTitle,
        clientName: portClientName || 'Private Residence',
        designerName: portDesignerName,
        category: portCategory,
        style: portStyle,
        coverImage: portCoverImage,
        galleryImages: finalGallery,
        beforeImage: portBeforeImage || undefined,
        afterImage: portAfterImage || undefined,
        location: portLocation,
        area: portArea,
        budget: portBudget,
        completionTime: portCompletionTime,
        status: portStatus,
        description: portDescription,
        isPortfolio: true
      });
      alert('Portfolio project updated successfully!');
    } else {
      addProject({
        title: portTitle,
        clientId: 'portfolio-showcase',
        clientName: portClientName || 'Private Residence',
        designerName: portDesignerName,
        category: portCategory,
        style: portStyle,
        coverImage: portCoverImage,
        galleryImages: finalGallery,
        beforeImage: portBeforeImage || undefined,
        afterImage: portAfterImage || undefined,
        location: portLocation,
        area: portArea,
        budget: portBudget,
        completionTime: portCompletionTime,
        status: portStatus,
        progressPercentage: portStatus === 'Completed' ? 100 : 50,
        currentStage: portStatus === 'Completed' ? 'Handover Completed' : 'Civil Work',
        expectedCompletion: new Date(Date.now() + 60*24*60*60*1000).toISOString().split('T')[0],
        description: portDescription,
        isPortfolio: true,
        milestones: [],
        workUpdates: [],
        documents: [],
        payments: [],
        messages: []
      });
      alert('New portfolio project added and live on site!');
    }

    setIsPortfolioModalOpen(false);
  };

  // ---------------- SERVICE CMS MODAL STATE ----------------
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Service Form State
  const [srvTitle, setSrvTitle] = useState('');
  const [srvType, setSrvType] = useState<'Residential' | 'Commercial' | 'Construction'>('Residential');
  const [srvDescription, setSrvDescription] = useState('');
  const [srvFeaturesText, setSrvFeaturesText] = useState('');
  const [srvDuration, setSrvDuration] = useState('30 - 45 Days');
  const [srvPrice, setSrvPrice] = useState<number>(450000);
  const [srvDiscountPrice, setSrvDiscountPrice] = useState<number | ''>('');
  const [srvDiscountPct, setSrvDiscountPct] = useState<number | ''>('');
  const [srvImage, setSrvImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  const [srvIcon, setSrvIcon] = useState('Home');
  const [srvIsActive, setSrvIsActive] = useState(true);

  // Inline Quick Price & Discount Edit State
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [quickPriceInput, setQuickPriceInput] = useState<number>(0);
  const [quickDiscountInput, setQuickDiscountInput] = useState<number | ''>('');

  const openAddServiceModal = () => {
    setEditingService(null);
    setSrvTitle('');
    setSrvType('Residential');
    setSrvDescription('Bespoke luxury interior transformation package.');
    setSrvFeaturesText('Modular Kitchen, Master Suite Wardrobe, Ceiling Concealed Lights, Designer TV Unit');
    setSrvDuration('35 - 50 Days');
    setSrvPrice(550000);
    setSrvDiscountPrice('');
    setSrvDiscountPct('');
    setSrvImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
    setSrvIcon('Home');
    setSrvIsActive(true);
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (srv: ServiceItem) => {
    setEditingService(srv);
    setSrvTitle(srv.title);
    setSrvType(srv.type);
    setSrvDescription(srv.description);
    setSrvFeaturesText(srv.features.join(', '));
    setSrvDuration(srv.estimatedDuration);
    setSrvPrice(srv.startingPrice);
    setSrvDiscountPrice(srv.discountPrice !== undefined && srv.discountPrice !== null ? srv.discountPrice : '');
    setSrvDiscountPct(srv.discountPercentage || (srv.discountPrice && srv.discountPrice < srv.startingPrice ? Math.round(((srv.startingPrice - srv.discountPrice) / srv.startingPrice) * 100) : ''));
    setSrvImage(srv.image);
    setSrvIcon(srv.iconName);
    setSrvIsActive(srv.isActive);
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvTitle) return;

    const featuresList = srvFeaturesText.split(',').map(f => f.trim()).filter(Boolean);
    const parsedDiscountPrice = typeof srvDiscountPrice === 'number' && srvDiscountPrice > 0 && srvDiscountPrice < Number(srvPrice) 
      ? srvDiscountPrice 
      : null;
    const parsedDiscountPct = parsedDiscountPrice 
      ? (typeof srvDiscountPct === 'number' && srvDiscountPct > 0 ? srvDiscountPct : Math.round(((Number(srvPrice) - parsedDiscountPrice) / Number(srvPrice)) * 100))
      : 0;

    if (editingService) {
      updateService(editingService.id, {
        title: srvTitle,
        type: srvType,
        description: srvDescription,
        features: featuresList,
        estimatedDuration: srvDuration,
        startingPrice: Number(srvPrice),
        discountPrice: parsedDiscountPrice as any,
        discountPercentage: parsedDiscountPct,
        image: srvImage,
        iconName: srvIcon,
        isActive: srvIsActive
      });
      alert(parsedDiscountPrice ? 'Service package updated successfully with active discount!' : 'Service package updated (Standard pricing active, discount removed).');
    } else {
      addService({
        title: srvTitle,
        type: srvType,
        description: srvDescription,
        features: featuresList,
        estimatedDuration: srvDuration,
        startingPrice: Number(srvPrice),
        discountPrice: parsedDiscountPrice as any,
        discountPercentage: parsedDiscountPct,
        image: srvImage,
        iconName: srvIcon,
        isActive: srvIsActive
      });
      alert('New service package added to public offerings!');
    }

    setIsServiceModalOpen(false);
  };


  // ---------------- MASTER ARCHITECTS CMS STATE ----------------
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingTeamMember, setEditingTeamMember] = useState<TeamMember | null>(null);
  const [teamName, setTeamName] = useState('');
  const [teamRole, setTeamRole] = useState('');
  const [teamExperience, setTeamExperience] = useState('');
  const [teamImage, setTeamImage] = useState('');
  const [teamBio, setTeamBio] = useState('');

  const openTeamMemberModal = (member?: TeamMember) => {
    if (member) {
      setEditingTeamMember(member);
      setTeamName(member.name);
      setTeamRole(member.role);
      setTeamExperience(member.experience);
      setTeamImage(member.image);
      setTeamBio(member.bio);
    } else {
      setEditingTeamMember(null);
      setTeamName('');
      setTeamRole('');
      setTeamExperience('');
      setTeamImage('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80');
      setTeamBio('');
    }
    setIsTeamModalOpen(true);
  };

  const handleSaveTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName || !teamRole || !teamExperience) {
      alert('Please fill out Name, Designation/Role, and Experience.');
      return;
    }

    if (editingTeamMember) {
      updateTeamMember(editingTeamMember.id, {
        name: teamName,
        role: teamRole,
        experience: teamExperience,
        image: teamImage || '/logo_transparent.png',
        bio: teamBio
      });
      alert(`Architect profile for ${teamName} updated successfully!`);
    } else {
      addTeamMember({
        name: teamName,
        role: teamRole,
        experience: teamExperience,
        image: teamImage || '/logo_transparent.png',
        bio: teamBio
      });
      alert(`New Master Architect ${teamName} added to leadership team!`);
    }

    setIsTeamModalOpen(false);
  };

  // ---------------- ARTICLE FORM STATE ----------------
  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtAuthor, setNewArtAuthor] = useState('Decor8 Editorial Team');
  const [newArtAuthorSelect, setNewArtAuthorSelect] = useState('Decor8 Editorial Team');
  const [newArtCategory, setNewArtCategory] = useState<'Tips' | 'Decoration' | 'Office Trends' | 'Architecture' | 'Color Guides' | 'Furniture' | 'Lighting' | 'Smart Home'>('Tips');
  const [newArtExcerpt, setNewArtExcerpt] = useState('');
  const [newArtContent, setNewArtContent] = useState('');
  const [newArtCoverImage, setNewArtCoverImage] = useState('');
  const [newArtGallery, setNewArtGallery] = useState<string[]>([]);
  const [newArtGalleryInput, setNewArtGalleryInput] = useState('');
  const [artContentMode, setArtContentMode] = useState<'write' | 'preview'>('write');

  const insertFormatting = (tag: string, placeholder: string = 'sample text') => {
    let inserted = '';
    if (tag === 'b') inserted = `<b>${placeholder}</b>`;
    else if (tag === 'i') inserted = `<i>${placeholder}</i>`;
    else if (tag === 'u') inserted = `<u>${placeholder}</u>`;
    else if (tag === 'h2') inserted = `<h2 class="text-2xl font-serif font-bold text-white mt-6 mb-3">${placeholder}</h2>`;
    else if (tag === 'h3') inserted = `<h3 class="text-xl font-serif font-bold text-[#D4AF37] mt-5 mb-2">${placeholder}</h3>`;
    else if (tag === 'quote') inserted = `<blockquote class="border-l-4 border-[#D4AF37] pl-4 italic text-neutral-300 my-4 py-2 bg-white/5 rounded-r-xl">${placeholder}</blockquote>`;
    else if (tag === 'ul') inserted = `<ul class="list-disc list-inside space-y-2 my-4 text-neutral-300">\n  <li>Key point 1</li>\n  <li>Key point 2</li>\n  <li>Key point 3</li>\n</ul>`;
    else if (tag === 'p') inserted = `<p class="leading-relaxed text-neutral-300 my-3">${placeholder}</p>`;
    else if (tag === 'link') {
      const url = prompt('Enter website URL:', 'https://');
      if (url) {
        const text = prompt('Enter link text:', 'Learn More');
        inserted = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#D4AF37] underline font-semibold hover:text-white transition-colors">${text || url}</a>`;
      }
    } else if (tag === 'image') {
      const url = prompt('Enter Image URL to embed inside article body:', 'https://');
      if (url) {
        inserted = `<div class="my-6 rounded-2xl overflow-hidden border border-white/10 shadow-xl">\n  <img src="${url}" alt="Article Photo" class="w-full h-auto object-cover max-h-[500px]" />\n</div>`;
      }
    }

    if (inserted) {
      setNewArtContent(prev => prev ? `${prev}\n\n${inserted}` : inserted);
    }
  };

  // ---------------- BRAND PARTNER FORM STATE ----------------
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerCategory, setNewPartnerCategory] = useState('');
  const [newPartnerLogoUrl, setNewPartnerLogoUrl] = useState('');

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartnerLogoUrl) {
      alert('Please upload or select a brand logo photo.');
      return;
    }

    addPartner({
      name: newPartnerName.trim() || 'Brand Partner',
      category: newPartnerCategory.trim() || 'Material Partner',
      logoUrl: newPartnerLogoUrl
    });

    setNewPartnerName('');
    setNewPartnerCategory('');
    setNewPartnerLogoUrl('');
    alert(`New Brand Partner Logo added live to website!`);
  };

  // ---------------- BRANCH OFFICE FORM STATE ----------------
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchOffice | null>(null);
  const [branchCity, setBranchCity] = useState('');
  const [branchTitle, setBranchTitle] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [branchPhone, setBranchPhone] = useState('');
  const [branchEmail, setBranchEmail] = useState('');
  const [branchHours, setBranchHours] = useState('Mon - Sat: 9:30 AM - 7:30 PM');
  const [branchMapUrl, setBranchMapUrl] = useState('');
  const [branchImageUrl, setBranchImageUrl] = useState('');
  const [branchIsHQ, setBranchIsHQ] = useState(false);

  const handleOpenBranchModal = (branch?: BranchOffice) => {
    if (branch) {
      setEditingBranch(branch);
      setBranchCity(branch.city);
      setBranchTitle(branch.title);
      setBranchAddress(branch.address);
      setBranchPhone(branch.phone);
      setBranchEmail(branch.email);
      setBranchHours(branch.workingHours);
      setBranchMapUrl(branch.mapUrl || '');
      setBranchImageUrl(branch.imageUrl || '');
      setBranchIsHQ(!!branch.isHeadquarter);
    } else {
      setEditingBranch(null);
      setBranchCity('');
      setBranchTitle('');
      setBranchAddress('');
      setBranchPhone('+91 ');
      setBranchEmail('support@decor8india.com');
      setBranchHours('Mon - Sat: 9:30 AM - 7:30 PM');
      setBranchMapUrl('');
      setBranchImageUrl('');
      setBranchIsHQ(false);
    }
    setIsBranchModalOpen(true);
  };

  const handleSaveBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchCity || !branchTitle || !branchAddress) {
      alert('City, Title, and Address are required.');
      return;
    }

    const payload = {
      city: branchCity,
      title: branchTitle,
      address: branchAddress,
      phone: branchPhone,
      email: branchEmail,
      workingHours: branchHours,
      mapUrl: branchMapUrl,
      imageUrl: branchImageUrl,
      isHeadquarter: branchIsHQ
    };

    if (editingBranch) {
      updateBranchOffice(editingBranch.id, payload);
      alert('Branch Office details updated successfully!');
    } else {
      addBranchOffice(payload);
      alert('New Branch Office added successfully!');
    }

    setIsBranchModalOpen(false);
  };

  // ---------------- CAREERS & JOB POSTINGS CMS STATE ----------------
  const [adminJobs, setAdminJobs] = useState<any[]>([]);
  const [adminApplications, setAdminApplications] = useState<any[]>([]);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<any | null>(null);

  const [jobTitleInput, setJobTitleInput] = useState('');
  const [jobDeptInput, setJobDeptInput] = useState('Interior Design');
  const [jobLocInput, setJobLocInput] = useState('Bengaluru (Head Office)');
  const [jobTypeInput, setJobTypeInput] = useState('Full-Time');
  const [jobExpInput, setJobExpInput] = useState('2 - 5 Years');
  const [jobSalInput, setJobSalInput] = useState('₹ 6.0L - ₹ 10.0L p.a.');
  const [jobDescInput, setJobDescInput] = useState('');
  const [jobReqInput, setJobReqInput] = useState('');
  const [jobActiveInput, setJobActiveInput] = useState(true);

  const fetchCareersData = useCallback(() => {
    fetch('/api/get_careers.php')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (Array.isArray(data.jobs)) setAdminJobs(data.jobs);
          if (Array.isArray(data.applications)) setAdminApplications(data.applications);
        }
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    fetchCareersData();
  }, [fetchCareersData]);

  const openAddJobModal = () => {
    setEditingJob(null);
    setJobTitleInput('');
    setJobDeptInput('Interior Design');
    setJobLocInput('Bengaluru (Head Office)');
    setJobTypeInput('Full-Time');
    setJobExpInput('2 - 5 Years');
    setJobSalInput('₹ 6.0L - ₹ 10.0L p.a.');
    setJobDescInput('');
    setJobReqInput('');
    setJobActiveInput(true);
    setIsJobModalOpen(true);
  };

  const openEditJobModal = (j: any) => {
    setEditingJob(j);
    setJobTitleInput(j.title);
    setJobDeptInput(j.department);
    setJobLocInput(j.location);
    setJobTypeInput(j.type);
    setJobExpInput(j.experience);
    setJobSalInput(j.salary);
    setJobDescInput(j.description);
    setJobReqInput(j.requirements);
    setJobActiveInput(j.isActive);
    setIsJobModalOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitleInput) return;

    try {
      const res = await fetch('/api/save_career.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          id: editingJob ? editingJob.id : undefined,
          title: jobTitleInput,
          department: jobDeptInput,
          location: jobLocInput,
          type: jobTypeInput,
          experience: jobExpInput,
          salary: jobSalInput,
          description: jobDescInput,
          requirements: jobReqInput,
          isActive: jobActiveInput
        })
      });

      const data = await res.json();
      if (data.success) {
        alert(editingJob ? 'Job opening updated!' : 'New job opening published live on website!');
        setIsJobModalOpen(false);
        fetchCareersData();
      } else {
        alert(data.message || 'Error saving job opening.');
      }
    } catch {
      alert('Error connecting to database.');
    }
  };

  const handleToggleJobActive = async (id: string) => {
    try {
      const res = await fetch('/api/save_career.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle', id })
      });
      const data = await res.json();
      if (data.success) fetchCareersData();
    } catch {}
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job opening?')) return;
    try {
      const res = await fetch('/api/save_career.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id })
      });
      const data = await res.json();
      if (data.success) fetchCareersData();
    } catch {}
  };

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#0B0C0E] text-white">
        <div className="max-w-md text-center space-y-4 p-8 glass-panel rounded-2xl border border-red-500/40">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-2xl font-serif font-bold">Admin Privileges Required</h2>
          <p className="text-xs text-neutral-300">
            You must log in with administrator credentials to access content & client management.
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

  const isPortfolioProject = (p: Project) => 
    p.isPortfolio === true || 
    p.clientId === 'portfolio-showcase' || 
    p.clientId === 'client-guest' || 
    (!p.clientEmail && (p.clientName === 'Private Residence' || !p.clientName));

  const clientProjects = projects.filter(p => !isPortfolioProject(p) && !p.title.toLowerCase().includes('site visit') && !p.title.toLowerCase().includes('in-person'));
  const selectedProject = clientProjects.find(p => p.id === selectedProjectId) || clientProjects[0];

  const totalProjectPages = Math.max(1, Math.ceil(clientProjects.length / CLIENT_PROJECTS_PER_PAGE));
  const paginatedClientProjects = clientProjects.slice(
    (clientProjectPage - 1) * CLIENT_PROJECTS_PER_PAGE,
    clientProjectPage * CLIENT_PROJECTS_PER_PAGE
  );

  // Auto-select first client project when projects load or change
  React.useEffect(() => {
    if (clientProjects.length > 0 && (!selectedProjectId || !clientProjects.some(p => p.id === selectedProjectId))) {
      setSelectedProjectId(clientProjects[0].id);
    }
  }, [clientProjects, selectedProjectId]);

  // Adjust page if out of bounds
  React.useEffect(() => {
    if (clientProjectPage > totalProjectPages) {
      setClientProjectPage(totalProjectPages);
    }
  }, [clientProjectPage, totalProjectPages]);

  const handleUpdateProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProjId = selectedProjectId || selectedProject?.id;
    if (!targetProjId) {
      alert('Please select a project first.');
      return;
    }

    const isOver = stageProgressInput >= 100;
    const newStatus = isOver ? 'Completed' : (selectedProject?.status || 'Ongoing');
    const targetStage = isOver ? 'Handover Completed' : (selectedProject?.currentStage || 'Design Discussion');

    updateProjectProgress(targetProjId, targetStage, stageProgressInput, notifyClientByEmail);
    updateProject(targetProjId, {
      progressPercentage: stageProgressInput,
      status: newStatus,
      currentStage: targetStage
    });

    const clientMail = selectedProject?.clientEmail || '';
    const emailNotice = notifyClientByEmail && clientMail ? `\n\n📧 Automated Progress Email sent to: ${clientMail}` : '';
    alert(`Overall completion updated to ${stageProgressInput}% and saved to database!${emailNotice}`);
  };

  const handlePostSiteFeed = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProjId = selectedProjectId || selectedProject?.id;
    if (!targetProjId || !feedTitle || !feedDescription) {
      alert('Please fill out the update title and description.');
      return;
    }

    const media: string[] = [];
    if (feedImageUrl) media.push(feedImageUrl);
    if (feedBeforeImage) media.push(feedBeforeImage);
    if (feedAfterImage) media.push(feedAfterImage);
    if (media.length === 0) {
      media.push('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
    }

    addWorkUpdate(targetProjId, {
      date: new Date().toISOString().split('T')[0],
      title: feedTitle,
      description: feedDescription,
      mediaUrls: media,
      beforeImage: feedBeforeImage || undefined,
      afterImage: feedAfterImage || undefined,
      mediaType: 'image',
      stage: feedStage
    }, notifyClientByEmail);

    setFeedTitle('');
    setFeedDescription('');
    setFeedImageUrl('');
    setFeedBeforeImage('');
    setFeedAfterImage('');
    const clientMail = selectedProject?.clientEmail || '';
    const emailNotice = notifyClientByEmail && clientMail ? `\n\n📧 Automated Site Update Email sent to: ${clientMail}` : '';
    alert(`Site update feed post added with Before & After capture! Visible instantly to client.${emailNotice}`);
  };

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProjId = selectedProjectId || selectedProject?.id;
    if (!targetProjId || !docTitle) {
      alert('Please enter a document title.');
      return;
    }

    addDocument(targetProjId, {
      title: docTitle,
      category: docCategory,
      fileUrl: docFileUrl || '#',
      fileSize: docFileSize,
      uploadDate: new Date().toISOString().split('T')[0]
    }, notifyClientByEmail);

    setDocTitle('');
    const clientMail = selectedProject?.clientEmail || '';
    const emailNotice = notifyClientByEmail && clientMail ? `\n\n📧 Automated Document Alert Email sent to: ${clientMail}` : '';
    alert(`Document "${docTitle}" uploaded to Client Portal!${emailNotice}`);
  };

  const handleAddPaymentMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProjId = selectedProjectId || selectedProject?.id;
    if (!targetProjId || !payTitle || !payAmount) {
      alert('Please enter payment title and amount.');
      return;
    }

    addPayment(targetProjId, {
      title: payTitle,
      amount: Number(payAmount),
      paidAmount: payStatus === 'Paid' ? Number(payAmount) : 0,
      dueDate: payDueDate,
      status: payStatus,
      paidDate: payStatus === 'Paid' ? new Date().toISOString().split('T')[0] : undefined
    }, notifyClientByEmail);

    setPayTitle('');
    const clientMail = selectedProject?.clientEmail || '';
    const emailNotice = notifyClientByEmail && clientMail ? `\n\n📧 Automated Milestone Invoice Email sent to: ${clientMail}` : '';
    alert(`Payment milestone "${payTitle}" added to payout ledger!${emailNotice}`);
  };

  const triggerQuickClientMail = async (clientEmail: string, clientName: string, projectTitle: string, projectId: string, type: 'welcome' | 'progress' | 'invoice') => {
    if (!confirm(`Send automated ${type.toUpperCase()} email notification for project "${projectTitle}" to ${clientName} (${clientEmail})?`)) return;
    
    setCustomEmailSending(true);
    try {
      const response = await fetch(`/api/test_email.php?send=1&to=${encodeURIComponent(clientEmail)}&type=${encodeURIComponent(type)}&projectId=${encodeURIComponent(projectId)}`);
      const data = await response.json();
      if (data.status === 'SUCCESS' || data.details?.success) {
        alert(`✅ ${type.toUpperCase()} email sent successfully to ${clientName} (${clientEmail})!`);
      } else {
        alert(`❌ Delivery message: ${data.details?.message || 'Failed to send'}`);
      }
    } catch (err: any) {
      alert(`❌ Error sending email: ${err.message}`);
    } finally {
      setCustomEmailSending(false);
    }
  };

  const handleSendCustomMail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmailRecipient) {
      alert('Please enter a recipient email address.');
      return;
    }

    setCustomEmailSending(true);
    setCustomEmailFeedback(null);

    try {
      const response = await fetch('/api/test_email.php?send=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          to: customEmailRecipient,
          type: customEmailType,
          subject: customEmailSubject,
          body: customEmailBody
        })
      });
      const data = await response.json();

      if (data.status === 'SUCCESS' || data.details?.success) {
        setCustomEmailFeedback({ status: 'success', msg: `✅ Theme-styled announcement dispatched via ${data.details?.method || 'SMTP'} to ${customEmailRecipient}!` });
        setCustomEmailBody('');
      } else {
        setCustomEmailFeedback({ status: 'error', msg: `❌ Delivery Failed: ${data.details?.message || 'Check SMTP configuration'}` });
      }
    } catch (err: any) {
      setCustomEmailFeedback({ status: 'error', msg: `❌ Dispatch Error: ${err.message}` });
    } finally {
      setCustomEmailSending(false);
    }
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitle || !newArtExcerpt) return;

    const author = newArtAuthor.trim() || (currentUser && currentUser.name !== 'Decor8 Admin' ? currentUser.name : 'Decor8 Editorial Team');
    
    let content = newArtContent.trim();
    if (!content) {
      content = `<p class="leading-relaxed text-neutral-300 text-base mb-4">${newArtExcerpt}</p>`;
    } else if (!content.includes('<p>') && !content.includes('<div>') && !content.includes('<h2>')) {
      // Auto-wrap plain text paragraphs for non-technical users
      content = content
        .split(/\n\s*\n/)
        .map(paragraph => `<p class="leading-relaxed text-neutral-300 text-base mb-4">${paragraph.replace(/\n/g, '<br/>')}</p>`)
        .join('\n');
    }

    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const calcReadTime = `${Math.max(2, Math.ceil(wordCount / 150))} min read`;

    addArticle({
      title: newArtTitle,
      slug: newArtTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: newArtExcerpt,
      content: content,
      category: newArtCategory,
      coverImage: newArtCoverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      galleryImages: newArtGallery,
      authorName: author,
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: calcReadTime,
      featured: false,
      status: 'Published'
    });

    setNewArtTitle('');
    setNewArtAuthor('Decor8 Editorial Team');
    setNewArtAuthorSelect('Decor8 Editorial Team');
    setNewArtExcerpt('');
    setNewArtContent('');
    setNewArtCoverImage('');
    setNewArtGallery([]);
    setNewArtGalleryInput('');
    alert('New article with rich formatting & photos published live!');
  };

  const totalClients = bookings.length;
  const activeProjectsCount = clientProjects.filter(p => p.status === 'Ongoing').length;
  const completedProjectsCount = projects.filter(p => p.status === 'Completed' || p.isPortfolio).length;
  const pendingApprovalsCount = bookings.filter(b => b.status === 'Pending Approval').length;

  const existingSiteVisitEmails = new Set(siteVisits.map(sv => sv.clientEmail.toLowerCase()));
  const uniqueBookingSiteVisits = bookings.filter(b => {
    const isSiteVisit = b.serviceType === 'Site Visit' || b.packageName.toLowerCase().includes('site visit') || b.requirements?.toLowerCase().includes('site visit');
    return isSiteVisit && !existingSiteVisitEmails.has(b.clientEmail.toLowerCase());
  });
  const totalSiteVisitsCount = siteVisits.length + uniqueBookingSiteVisits.length;

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#E5E3DF] safe-page-container">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#16171D] via-[#1A1915] to-[#0B0C0E] border border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <img src="/logo_icon.png" alt="Decor8 India" className="h-10 w-auto object-contain filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]" />
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-xs font-semibold text-red-300">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Admin Management Dashboard</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              Decor8India <span className="gold-gradient-text">CMS & Operations</span>
            </h1>
            <p className="text-xs text-neutral-400">
              Logged in as <span className="text-white font-bold">{currentUser.name}</span> ({currentUser.email})
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('emails')}
              className={`px-4 py-2.5 rounded-xl border transition-all flex items-center space-x-2 text-xs font-bold cursor-pointer ${
                activeTab === 'emails' 
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/30 font-extrabold' 
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/40 hover:bg-amber-500/20 hover:border-[#D4AF37]'
              }`}
              title="Open Mail Console & Client Email Manager"
            >
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>Mail Console</span>
            </button>
            <button 
              onClick={onReturnToPublic}
              className="px-4 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center space-x-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Landing Page</span>
            </button>
            <button 
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/40 text-xs text-red-300 font-medium hover:bg-red-500 hover:text-white flex items-center space-x-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs with React Bits Physics & Spring Animations */}
        <AnimatedTabs
          tabs={[
            { id: 'analytics', label: 'Overview & KPIs', icon: LayoutDashboard },
            { id: 'clients', label: 'Client Approvals', icon: Users, badge: pendingApprovalsCount },
            { id: 'projects', label: 'Project Process & Live Feeds', icon: Building2 },
            { id: 'portfolio', label: 'Portfolio CMS', icon: ImageIcon },
            { id: 'services', label: 'Service & Pricing CMS', icon: DollarSign },
            { id: 'team', label: 'Master Architects CMS', icon: Award },
            { id: 'magazine', label: 'Magazine CMS', icon: BookOpen },
            { id: 'branches', label: 'Branch Offices CMS', icon: MapPin },
            { id: 'partners', label: 'Trusted Partners CMS', icon: ShieldCheck },
            { id: 'careers', label: 'Careers & Job Openings', icon: Briefcase, badge: adminApplications.length }
          ]}
          activeTab={activeTab}
          onChange={(tabId) => setActiveTab(tabId as any)}
          layoutId="activeAdminDashboardTab"
          className="border-b border-white/10 pb-2"
        />

        {/* TAB 1: ANALYTICS & KPIS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-1">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Total Inquiries / Bookings</div>
                <div className="text-3xl font-bold font-serif text-white">{totalClients}</div>
                <div className="text-xs text-neutral-400 pt-1">All time lead conversions</div>
              </div>

              <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-1">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Pending Approvals</div>
                <div className="text-3xl font-bold font-serif text-amber-400">{pendingApprovalsCount}</div>
                <div className="text-xs text-amber-300 pt-1 font-semibold">Requires admin action</div>
              </div>

              <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-1">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Active Ongoing Sites</div>
                <div className="text-3xl font-bold font-serif text-[#D4AF37]">{activeProjectsCount}</div>
                <div className="text-xs text-emerald-400 pt-1">Live tracking active</div>
              </div>

              <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-1">
                <div className="text-[11px] text-neutral-400 uppercase tracking-wider font-mono">Completed Projects</div>
                <div className="text-3xl font-bold font-serif text-emerald-400">{completedProjectsCount}</div>
                <div className="text-xs text-neutral-400 pt-1">Published to portfolio</div>
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <h3 className="font-serif text-xl font-bold text-white">Recent System Activity</h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                  <span>Booking Request #bk-1002 submitted by Kabir Verma (Pending)</span>
                  <span className="text-neutral-500">Today, 02:15 PM</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                  <span>Project "Villa Serenity" updated stage progress to 68% (Carpentry)</span>
                  <span className="text-neutral-500">Yesterday, 04:30 PM</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex justify-between">
                  <span>Article "10 Luxury Interior Trends Dominating High-End Homes" published</span>
                  <span className="text-neutral-500">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLIENT MANAGEMENT & APPROVALS */}
        {activeTab === 'clients' && (
          <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-6 animate-in fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="font-serif text-3xl font-bold text-white">Client Booking & Site Visit Pipeline</h2>
                <p className="text-xs text-neutral-400">Rule: Approved clients receive login access to the Client Portal.</p>
              </div>

              {/* Sub-Filter Tabs */}
              <div className="flex space-x-2 bg-black/60 p-1.5 rounded-xl border border-white/10 shrink-0">
                <button
                  onClick={() => setClientFilter('ALL')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    clientFilter === 'ALL'
                      ? 'gold-gradient-bg text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  All Requests ({bookings.length})
                </button>

                <button
                  onClick={() => setClientFilter('PACKAGES')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    clientFilter === 'PACKAGES'
                      ? 'gold-gradient-bg text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Package Consultations ({bookings.filter(b => b.serviceType !== 'Site Visit' && !b.packageName.toLowerCase().includes('site visit')).length})
                </button>

                <button
                  onClick={() => setClientFilter('SITE_VISITS')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                    clientFilter === 'SITE_VISITS'
                      ? 'bg-emerald-500 text-black shadow-md font-bold'
                      : 'text-emerald-400 hover:text-white bg-emerald-500/10'
                  }`}
                >
                  <span>📍 Site Visit Requests ({totalSiteVisitsCount})</span>
                </button>
              </div>
            </div>

            {/* ADMIN EMAIL ENQUIRY NOTIFICATION CONTROL CARD */}
            <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              adminEmailEnquiryEnabled 
                ? 'bg-gradient-to-r from-[#181A22] via-[#1C1A14] to-[#121318] border-[#D4AF37]/50 shadow-xl shadow-[#D4AF37]/5' 
                : 'bg-black/50 border-white/10 opacity-80'
            }`}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                
                {/* Left side: Icon, Status, and Title */}
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-2xl border shrink-0 transition-colors ${
                    adminEmailEnquiryEnabled 
                      ? 'bg-gradient-to-br from-[#D4AF37]/20 to-amber-500/10 border-[#D4AF37] text-[#D4AF37]' 
                      : 'bg-white/5 border-white/10 text-neutral-500'
                  }`}>
                    {adminEmailEnquiryEnabled ? (
                      <Bell className="w-6 h-6 animate-bounce" />
                    ) : (
                      <BellOff className="w-6 h-6" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-widest font-bold text-[#D4AF37]">
                        Admin Instant Enquiry Alert Engine
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 ${
                        adminEmailEnquiryEnabled 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm' 
                          : 'bg-neutral-800 text-neutral-400 border border-white/10'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${adminEmailEnquiryEnabled ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'}`}></span>
                        <span>{adminEmailEnquiryEnabled ? 'RECEIVING ALERTS ON' : 'ALERTS PAUSED (OFF)'}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                      Automated Email on New Client Booking & Live Site Visit
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl">
                      {adminEmailEnquiryEnabled ? (
                        <>Whenever a client submits a new booking or live site visit request, an instant luxury notification with client contact details is delivered to <strong className="text-white font-mono">{adminNotificationEmail}</strong>.</>
                      ) : (
                        <>Email alerts for new enquiries are currently <span className="text-amber-400 font-semibold">muted</span>. Inquiries are still recorded in the table below, but outgoing alert emails are skipped.</>
                      )}
                    </p>
                  </div>
                </div>

                {/* Right side: Big Toggle Switch & Action Tools */}
                <div className="flex flex-wrap items-center gap-4 shrink-0 w-full lg:w-auto justify-between lg:justify-end border-t lg:border-t-0 pt-4 lg:pt-0 border-white/10">
                  
                  {/* Email Target / Edit Box */}
                  <div className="flex items-center space-x-2">
                    {isEditingAdminEmail ? (
                      <div className="flex items-center space-x-2 bg-black/80 p-1.5 rounded-xl border border-[#D4AF37]/50">
                        <input
                          type="email"
                          value={tempAdminEmail}
                          onChange={(e) => setTempAdminEmail(e.target.value)}
                          placeholder="admin@decor8india.com"
                          className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37] w-48 sm:w-56"
                          autoFocus
                        />
                        <button
                          onClick={handleSaveAdminNotificationEmail}
                          disabled={isSavingAdminSettings}
                          className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-amber-400 text-black font-bold text-xs transition-colors flex items-center space-x-1 cursor-pointer disabled:opacity-50"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => {
                            setTempAdminEmail(adminNotificationEmail);
                            setIsEditingAdminEmail(false);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 text-xs"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 bg-black/60 px-3.5 py-2 rounded-xl border border-white/10">
                        <div className="text-left">
                          <span className="text-[10px] text-neutral-400 uppercase font-mono block">Send Alerts To:</span>
                          <span className="text-xs font-bold text-neutral-200 font-mono">{adminNotificationEmail}</span>
                        </div>
                        <button
                          onClick={() => {
                            setTempAdminEmail(adminNotificationEmail);
                            setIsEditingAdminEmail(true);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          title="Change admin recipient email"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Main Toggle Switch */}
                  <div className="flex items-center space-x-3 bg-black/70 px-4 py-2 rounded-xl border border-white/15">
                    <span className="text-xs font-bold text-neutral-300 uppercase font-mono">Alerts:</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={adminEmailEnquiryEnabled}
                      onClick={() => handleToggleAdminEmailNotifications(!adminEmailEnquiryEnabled)}
                      className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                        adminEmailEnquiryEnabled ? 'bg-emerald-500' : 'bg-neutral-800'
                      }`}
                      title={adminEmailEnquiryEnabled ? "Click to Turn OFF Email Alerts" : "Click to Turn ON Email Alerts"}
                    >
                      <span
                        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${
                          adminEmailEnquiryEnabled ? 'translate-x-7 bg-black' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className={`text-xs font-extrabold font-mono uppercase ${
                      adminEmailEnquiryEnabled ? 'text-emerald-400' : 'text-neutral-400'
                    }`}>
                      {adminEmailEnquiryEnabled ? 'ON' : 'OFF'}
                    </span>
                  </div>

                </div>
              </div>

              {/* Quick Diagnostic Test Row */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-neutral-400 text-[11px]">
                  💡 Test reception anytime to verify delivery into <span className="text-[#D4AF37] font-mono">{adminNotificationEmail}</span>
                </span>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleSendTestAdminAlert('admin_booking')}
                    disabled={testAlertSending}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black font-semibold text-[11px] transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 border border-white/10"
                  >
                    <Send className={`w-3 h-3 ${testAlertSending ? 'animate-spin' : ''}`} />
                    <span>Test Booking Alert Email</span>
                  </button>
                  <button
                    onClick={() => handleSendTestAdminAlert('admin_site_visit')}
                    disabled={testAlertSending}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-emerald-500 text-white hover:text-black font-semibold text-[11px] transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 border border-white/10"
                  >
                    <Send className={`w-3 h-3 ${testAlertSending ? 'animate-spin' : ''}`} />
                    <span>Test Site Visit Alert Email</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-black/60 text-[#D4AF37] font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-4 rounded-l-lg">Client Name</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Request Type & Site Details</th>
                    <th className="p-4">
                      {clientFilter === 'SITE_VISITS' ? 'Scheduled Visit Date & Time' : clientFilter === 'PACKAGES' ? 'Service Plan / Type' : 'Plan / Scheduled Date'}
                    </th>
                    <th className="p-4">
                      {clientFilter === 'SITE_VISITS' ? 'Inspection Notes & Details' : clientFilter === 'PACKAGES' ? 'Est. Package Cost' : 'Cost / Inspection Details'}
                    </th>
                    <th className="p-4">Status</th>
                    <th className="p-4 rounded-r-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {/* Dedicated site_visits DB Table Records */}
                  {(clientFilter === 'ALL' || clientFilter === 'SITE_VISITS') && siteVisits.map((sv) => (
                    <tr key={sv.id} className="bg-emerald-500/10 hover:bg-emerald-500/15 border-l-4 border-l-emerald-400">
                      <td className="p-4 font-bold text-white">
                        {sv.clientName}
                        <div className="text-[10px] text-emerald-400 font-mono font-bold">ID: {sv.id}</div>
                      </td>
                      <td className="p-4 font-mono">
                        <div>{sv.clientEmail}</div>
                        <div className="text-neutral-300">{sv.clientPhone}</div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                            <span>📍 In-Person Site Inspection</span>
                          </span>
                          <div className="font-bold text-white">{sv.projectTitle}</div>
                        </div>
                      </td>
                      <td className="p-4 font-mono">
                        <div className="space-y-1">
                          <div className="text-[#D4AF37] font-bold text-xs">📅 {sv.preferredDate}</div>
                          <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-neutral-300 text-[10px] font-semibold">
                            {sv.timeSlot || 'Morning (10:00 AM - 1:00 PM)'}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-xs text-neutral-300">
                        {sv.notes ? (
                          <div className="bg-black/50 p-2 rounded-lg border border-white/10 text-[11px] italic max-w-xs leading-relaxed">
                            "{sv.notes}"
                          </div>
                        ) : (
                          <span className="text-neutral-500 text-[10px] italic">No specific inspection requests</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          sv.status === 'Confirmed' || sv.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                          sv.status === 'Rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                          'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                        }`}>
                          {sv.status === 'Confirmed' || sv.status === 'Approved' ? '✓ CONFIRMED' : sv.status === 'Rejected' ? '✕ REJECTED' : (sv.status || 'SCHEDULED')}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {sv.status !== 'Confirmed' && sv.status !== 'Approved' && sv.status !== 'Rejected' ? (
                          <>
                            <button
                              onClick={() => {
                                confirmSiteVisit(sv.id);
                                alert(`Site Visit for ${sv.clientName} confirmed!`);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs"
                            >
                              Confirm Site Visit
                            </button>
                            <button
                              onClick={() => {
                                rejectSiteVisit(sv.id);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white text-xs"
                            >
                              Reject
                            </button>
                          </>
                        ) : sv.status === 'Confirmed' || sv.status === 'Approved' ? (
                          <span className="text-emerald-400 text-[11px] font-bold">✓ Confirmed</span>
                        ) : (
                          <span className="text-red-400 text-[11px] font-bold">✕ Rejected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bookings
                    .filter((b) => {
                      const isSiteVisit = b.serviceType === 'Site Visit' || b.packageName.toLowerCase().includes('site visit') || b.requirements?.toLowerCase().includes('site visit');
                      if (isSiteVisit && existingSiteVisitEmails.has(b.clientEmail.toLowerCase())) {
                        return false; // Prevent duplicate display if already rendered in siteVisits list
                      }
                      if (clientFilter === 'SITE_VISITS') return isSiteVisit;
                      if (clientFilter === 'PACKAGES') return !isSiteVisit;
                      return true;
                    })
                    .map((b) => {
                      const isEmi = b.isEmiRequested || b.requirements?.toLowerCase().includes('emi');
                      const isSiteVisit = b.serviceType === 'Site Visit' || b.packageName.toLowerCase().includes('site visit') || b.requirements?.toLowerCase().includes('site visit');

                      // Extract time slot & notes from requirements string if present
                      const timeSlotMatch = b.requirements?.match(/Preferred Slot:\s*([^|]+)/i);
                      const timeSlot = timeSlotMatch ? timeSlotMatch[1].trim() : 'Morning (10:00 AM - 1:00 PM)';
                      const notesMatch = b.requirements?.match(/Notes:\s*(.+)$/i);
                      const cleanNotes = notesMatch ? notesMatch[1].trim() : (b.requirements?.startsWith('[Site Visit Request]') ? 'General site inspection' : b.requirements);

                      return (
                        <tr key={b.id} className={`hover:bg-white/5 ${isSiteVisit ? 'bg-emerald-500/5' : ''}`}>
                          <td className="p-4 font-bold text-white">
                            {b.clientName}
                            <div className="text-[10px] text-neutral-400 font-mono">ID: {b.id}</div>
                          </td>
                          <td className="p-4 font-mono">
                            <div>{b.clientEmail}</div>
                            <div className="text-neutral-400">{b.clientPhone}</div>
                          </td>
                          <td className="p-4">
                            {isSiteVisit ? (
                              <div className="space-y-1">
                                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                                  <span>📍 In-Person Site Visit Request</span>
                                </span>
                                <div className="font-bold text-white">{b.packageName}</div>
                              </div>
                            ) : (
                              <div>
                                <span className="font-semibold text-white">{b.packageName}</span>
                                <div className="text-[10px] text-neutral-400">{b.serviceType}</div>
                                {b.requirements && (
                                  <div className="text-[10px] text-neutral-400 italic line-clamp-1 mt-0.5" title={b.requirements}>
                                    Note: {b.requirements}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                          <td className="p-4 font-mono">
                            {isSiteVisit ? (
                              <div className="space-y-1">
                                <div className="text-[#D4AF37] font-bold text-xs">📅 {b.preferredDate}</div>
                                <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-neutral-300 text-[10px] font-semibold">
                                  {timeSlot}
                                </span>
                              </div>
                            ) : isEmi ? (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-[10px] uppercase tracking-wider shadow-sm shadow-[#D4AF37]/20">
                                <CreditCard className="w-3 h-3" />
                                <span>0% EMI Plan</span>
                              </span>
                            ) : (
                              <span className="text-neutral-500 text-[10px]">Standard Pay</span>
                            )}
                          </td>
                          <td className="p-4 font-mono">
                            {isSiteVisit ? (
                              <div className="text-xs text-neutral-300">
                                {cleanNotes ? (
                                  <div className="bg-black/50 p-2 rounded-lg border border-white/10 text-[11px] italic max-w-xs leading-relaxed font-sans">
                                    "{cleanNotes}"
                                  </div>
                                ) : (
                                  <span className="text-neutral-500 text-[10px] italic font-sans">No specific inspection notes</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-emerald-400 font-bold">
                                ₹ {b.estimatedCost ? (b.estimatedCost / 100000).toFixed(2) : 15} L
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              b.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                              b.status === 'Pending Approval' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            {b.status === 'Pending Approval' ? (
                              <>
                                <button
                                  onClick={() => {
                                    // Open approval confirmation modal with editable price
                                    setFinalContractPrice(b.estimatedCost || 0);
                                    setApprovalModalBookingId(b.id);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs"
                                >
                                  {isSiteVisit ? 'Confirm Site Visit' : 'Approve & Grant Login'}
                                </button>
                                <button
                                  onClick={() => {
                                    rejectBooking(b.id);
                                    const svMatch = siteVisits.find(sv => sv.clientEmail.toLowerCase() === b.clientEmail.toLowerCase());
                                    if (svMatch) rejectSiteVisit(svMatch.id);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white text-xs"
                                >
                                  Reject
                                </button>
                              </>
                            ) : b.status === 'Approved' ? (
                              <span className="text-emerald-400 text-[11px] font-bold">✓ Approved</span>
                            ) : (
                              <span className="text-red-400 text-[11px] font-bold">✕ Rejected</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECT PROCESS & LIVE FEEDS */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in">
            
            {/* Project Selection list */}
            <div className="lg:col-span-4 p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Select Client Project</h3>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    Page {clientProjectPage} of {totalProjectPages} ({clientProjects.length} total)
                  </p>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-mono font-bold border border-[#D4AF37]/30">
                  {clientProjects.length} Active
                </span>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {clientProjects.length === 0 ? (
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center space-y-2">
                    <Building2 className="w-8 h-8 text-neutral-500 mx-auto" />
                    <p className="text-xs text-neutral-300 font-semibold">No active client execution projects</p>
                    <p className="text-[10px] text-neutral-500">
                      Approved client bookings will automatically appear here. Manually added portfolio projects are stored under the Portfolio CMS tab.
                    </p>
                  </div>
                ) : (
                  paginatedClientProjects.map(p => (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProjectId(p.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedProject?.id === p.id 
                          ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg ring-1 ring-[#D4AF37]/50' 
                          : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-sm text-white">{p.title}</div>
                      <div className="text-xs text-[#D4AF37] pt-1 font-semibold">Stage: {p.currentStage} ({p.progressPercentage}%)</div>
                      <div className="text-[10px] text-neutral-400 font-mono">Client: {p.clientName}</div>
                    </div>
                  ))
                )}
              </div>

              {/* Pagination Controls (5 per page) */}
              {totalProjectPages > 1 && (
                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setClientProjectPage(prev => Math.max(1, prev - 1))}
                    disabled={clientProjectPage === 1}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-neutral-300 disabled:opacity-30 disabled:hover:bg-white/5 flex items-center space-x-1 transition-all border border-white/10 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Prev</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalProjectPages }, (_, i) => i + 1).map(pageNum => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setClientProjectPage(pageNum)}
                        className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center cursor-pointer ${
                          clientProjectPage === pageNum
                            ? 'gold-gradient-bg text-black shadow-md'
                            : 'bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setClientProjectPage(prev => Math.min(totalProjectPages, prev + 1))}
                    disabled={clientProjectPage === totalProjectPages}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-neutral-300 disabled:opacity-30 disabled:hover:bg-white/5 flex items-center space-x-1 transition-all border border-white/10 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Selected Project Control Workstation */}
            {selectedProject ? (
              <div className="lg:col-span-8 space-y-6">
                
                {/* Project Header Info */}
                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <span className="text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">Active Project Workspace</span>
                      <h3 className="font-serif text-2xl font-bold text-white">{selectedProject.title}</h3>
                      <p className="text-xs text-neutral-400 font-mono">Client: {selectedProject.clientName} • Architect: {selectedProject.designerName}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateProject(selectedProject.id, { showOnLandingPage: selectedProject.showOnLandingPage !== false ? false : true })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center space-x-1.5 ${
                          selectedProject.showOnLandingPage !== false
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                            : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{selectedProject.showOnLandingPage !== false ? '⭐ Displayed on Landing Page' : 'Hidden from Landing Page'}</span>
                      </button>
                      {isEditingBudget ? (
                        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-black/60 border border-[#D4AF37]/40">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-wider">Budget</span>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-[#D4AF37] font-bold">₹</span>
                            <input
                              type="text"
                              value={editBudgetValue}
                              onChange={(e) => setEditBudgetValue(e.target.value)}
                              className="w-28 px-2 py-0.5 rounded bg-white/10 border border-[#D4AF37]/40 text-sm font-bold text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37]"
                              placeholder="e.g. 15.00 Lakhs"
                              autoFocus
                            />
                          </div>
                          <button
                            onClick={() => {
                              const cleaned = editBudgetValue.trim();
                              const budgetStr = cleaned.includes('₹') ? cleaned : `₹ ${cleaned}`;
                              const finalBudget = budgetStr.toLowerCase().includes('lakh') ? budgetStr : `${budgetStr}${cleaned.match(/\d/) ? ' Lakhs' : ''}`;
                              updateProject(selectedProject.id, { budget: finalBudget });
                              setIsEditingBudget(false);
                            }}
                            className="px-2 py-0.5 rounded bg-emerald-500 text-black text-[10px] font-bold hover:bg-emerald-400"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditingBudget(false)}
                            className="px-2 py-0.5 rounded bg-white/10 text-neutral-400 text-[10px] font-bold hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setEditBudgetValue(selectedProject.budget.replace(/^₹\s*/, ''));
                            setIsEditingBudget(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-black/60 border border-[#D4AF37]/40 text-right cursor-pointer hover:border-[#D4AF37] transition-all group"
                          title="Click to edit budget"
                        >
                          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Budget <Edit className="w-2.5 h-2.5 inline opacity-0 group-hover:opacity-100 transition-opacity ml-1" /></span>
                          <span className="text-sm font-bold text-[#D4AF37] font-mono">{selectedProject.budget}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sub-Navigation Tabs inside Selected Project */}
                  <div className="flex space-x-2 pt-4 border-t border-white/10 overflow-x-auto">
                    {[
                      { id: 'stage', label: '1. Stage & Progress', icon: Layers },
                      { id: 'updates', label: `2. Site Feed (${(selectedProject.workUpdates || []).length})`, icon: Camera },
                      { id: 'documents', label: `3. Documents & Invoices (${(selectedProject.documents || []).length})`, icon: FileText },
                      { id: 'payments', label: `4. Payout Ledger (${(selectedProject.payments || []).length})`, icon: CreditCard }
                    ].map(sub => {
                      const SubIcon = sub.icon;
                      const isSubActive = projectSubTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => setProjectSubTab(sub.id as any)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                            isSubActive 
                              ? 'bg-[#D4AF37] text-black shadow' 
                              : 'bg-white/5 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <SubIcon className="w-3.5 h-3.5" />
                          <span>{sub.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SUB-TAB 1: STAGE & PROGRESS CONTROL */}
                {projectSubTab === 'stage' && (
                  <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-6 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                      <div className="space-y-1">
                        <h4 className="font-serif text-xl font-bold text-white">Overall Completion Progress Bar</h4>
                        <p className="text-xs text-neutral-400">Controls the single overall project milestone progress bar in the client portal.</p>
                      </div>

                      {/* Real Sliding Toggle Switch to Confirm Project Over */}
                      <div className="flex items-center space-x-3 bg-black/60 p-2 sm:p-2.5 rounded-2xl border border-white/15">
                        <span className="text-xs font-bold text-neutral-300">Confirm Project Over:</span>
                        <button
                          type="button"
                          onClick={() => {
                            const isCurrentlyOver = selectedProject.status === 'Completed' || selectedProject.progressPercentage === 100;
                            const newStatus = isCurrentlyOver ? 'Ongoing' : 'Completed';
                            const newPct = isCurrentlyOver ? 10 : 100;
                            const newStage = isCurrentlyOver ? 'Design Discussion' : 'Handover Completed';
                            
                            updateProject(selectedProject.id, {
                              status: newStatus,
                              progressPercentage: newPct,
                              currentStage: newStage
                            });
                            updateProjectProgress(selectedProject.id, newStage, newPct);
                            setStageProgressInput(newPct);
                          }}
                          className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                            selectedProject.status === 'Completed' || selectedProject.progressPercentage === 100
                              ? 'bg-emerald-500'
                              : 'bg-neutral-800'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${
                              selectedProject.status === 'Completed' || selectedProject.progressPercentage === 100
                                ? 'translate-x-8 bg-black'
                                : 'translate-x-0'
                            }`}
                          />
                        </button>
                        <span className={`text-xs font-extrabold font-mono ${
                          selectedProject.status === 'Completed' || selectedProject.progressPercentage === 100 ? 'text-emerald-400' : 'text-neutral-400'
                        }`}>
                          {selectedProject.status === 'Completed' || selectedProject.progressPercentage === 100 ? '✓ COMPLETED' : 'ONGOING'}
                        </span>
                      </div>
                    </div>

                    {/* Single Progress Bar Form (Without Active Site Stage dropdown) */}
                    <form onSubmit={handleUpdateProgressSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs text-neutral-300 font-medium">
                          <label className="text-xs font-bold text-white uppercase tracking-wider">Overall Completion Percentage</label>
                          <span className="text-[#D4AF37] font-mono text-base font-bold">{stageProgressInput}%</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="100"
                          value={stageProgressInput}
                          onChange={(e) => setStageProgressInput(Number(e.target.value))}
                          className="w-full h-3 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                        />
                      </div>

                      <label className="flex items-center gap-3 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl cursor-pointer hover:bg-amber-500/20 transition-all text-xs font-semibold text-amber-300">
                        <input 
                          type="checkbox" 
                          checked={notifyClientByEmail} 
                          onChange={(e) => setNotifyClientByEmail(e.target.checked)} 
                          className="w-4 h-4 accent-amber-500 rounded cursor-pointer" 
                        />
                        <span>📧 Send Automated Progress Email to Client ({selectedProject?.clientEmail || 'client'})</span>
                      </label>

                      <button 
                        type="submit"
                        className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-lg"
                      >
                        Save Stage Progress
                      </button>
                    </form>
                  </div>
                )}

                {/* SUB-TAB 2: SITE UPDATE FEED */}
                {projectSubTab === 'updates' && (
                  <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-6 animate-in fade-in">
                    <div className="space-y-1">
                      <h4 className="font-serif text-xl font-bold text-white">Post Daily Site Update Feed</h4>
                      <p className="text-xs text-neutral-400">Post photos and notes of work completed today directly to client's dashboard timeline.</p>
                    </div>

                    <form onSubmit={handlePostSiteFeed} className="space-y-4 pt-4 border-t border-white/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-neutral-300 font-medium">Update Title *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Living Room Veneer Cladding Complete" 
                            value={feedTitle}
                            onChange={(e) => setFeedTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-neutral-300 font-medium">Associated Stage</label>
                          <select 
                            value={feedStage}
                            onChange={(e) => setFeedStage(e.target.value as ProjectStage)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="Civil Work">Civil Work</option>
                            <option value="Carpentry">Carpentry</option>
                            <option value="Painting">Painting</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Furniture Installation">Furniture Installation</option>
                          </select>
                        </div>
                      </div>

                      {/* Photo Uploaders: Progress Photo + Before Image + After Image */}
                      <div className="space-y-3">
                        <label className="text-xs text-neutral-300 font-medium block">Site Media & Before / After Photos</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {/* Main / Progress Photo */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] text-neutral-400 font-medium block">1. Progress Photo (Main)</span>
                            <label className="flex flex-col items-center justify-center w-full h-28 px-3 py-2 rounded-xl bg-black/60 border-2 border-dashed border-white/20 hover:border-[#D4AF37]/60 transition-colors cursor-pointer group relative overflow-hidden">
                              <input 
                                type="file" 
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(file, setFeedImageUrl);
                                }}
                              />
                              {feedImageUrl ? (
                                <div className="relative w-full h-full">
                                  <img src={feedImageUrl} alt="Progress Preview" className="w-full h-full object-cover rounded-lg" />
                                  <button 
                                    type="button" 
                                    onClick={(e) => { e.stopPropagation(); setFeedImageUrl(''); }} 
                                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/90 text-white flex items-center justify-center text-xs hover:bg-red-400 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center space-y-1 text-center">
                                  <Upload className="w-4 h-4 text-neutral-400 group-hover:text-[#D4AF37] transition-colors" />
                                  <span className="text-[10px] text-neutral-400 group-hover:text-neutral-200">Upload Main Photo</span>
                                </div>
                              )}
                            </label>
                          </div>

                          {/* Before Transformation Photo */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] text-red-400 font-medium block">2. Before Photo (Optional)</span>
                            <label className="flex flex-col items-center justify-center w-full h-28 px-3 py-2 rounded-xl bg-black/60 border-2 border-dashed border-red-500/30 hover:border-red-400 transition-colors cursor-pointer group relative overflow-hidden">
                              <input 
                                type="file" 
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(file, setFeedBeforeImage);
                                }}
                              />
                              {feedBeforeImage ? (
                                <div className="relative w-full h-full">
                                  <img src={feedBeforeImage} alt="Before Preview" className="w-full h-full object-cover rounded-lg" />
                                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-bold text-red-400">BEFORE</span>
                                  <button 
                                    type="button" 
                                    onClick={(e) => { e.stopPropagation(); setFeedBeforeImage(''); }} 
                                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/90 text-white flex items-center justify-center text-xs hover:bg-red-400 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center space-y-1 text-center">
                                  <Upload className="w-4 h-4 text-red-400/70 group-hover:text-red-400 transition-colors" />
                                  <span className="text-[10px] text-red-400/80 group-hover:text-red-300">Upload Before Photo</span>
                                </div>
                              )}
                            </label>
                          </div>

                          {/* After Transformation Photo */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] text-emerald-400 font-medium block">3. After Photo (Optional)</span>
                            <label className="flex flex-col items-center justify-center w-full h-28 px-3 py-2 rounded-xl bg-black/60 border-2 border-dashed border-emerald-500/30 hover:border-emerald-400 transition-colors cursor-pointer group relative overflow-hidden">
                              <input 
                                type="file" 
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleFileUpload(file, setFeedAfterImage);
                                }}
                              />
                              {feedAfterImage ? (
                                <div className="relative w-full h-full">
                                  <img src={feedAfterImage} alt="After Preview" className="w-full h-full object-cover rounded-lg" />
                                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-bold text-emerald-400">AFTER</span>
                                  <button 
                                    type="button" 
                                    onClick={(e) => { e.stopPropagation(); setFeedAfterImage(''); }} 
                                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500/90 text-white flex items-center justify-center text-xs hover:bg-red-400 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center space-y-1 text-center">
                                  <Upload className="w-4 h-4 text-emerald-400/70 group-hover:text-emerald-400 transition-colors" />
                                  <span className="text-[10px] text-emerald-400/80 group-hover:text-emerald-300">Upload After Photo</span>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-neutral-300 font-medium">Description & Site Manager Notes *</label>
                        <textarea 
                          rows={2}
                          required
                          placeholder="Describe what was fitted today..."
                          value={feedDescription}
                          onChange={(e) => setFeedDescription(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                        />
                      </div>

                      <label className="flex items-center gap-3 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl cursor-pointer hover:bg-amber-500/20 transition-all text-xs font-semibold text-amber-300">
                        <input 
                          type="checkbox" 
                          checked={notifyClientByEmail} 
                          onChange={(e) => setNotifyClientByEmail(e.target.checked)} 
                          className="w-4 h-4 accent-amber-500 rounded cursor-pointer" 
                        />
                        <span>📧 Send Automated Site Progress Email to Client ({selectedProject?.clientEmail || 'client'})</span>
                      </label>

                      <button 
                        type="submit"
                        className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Post Site Update Feed</span>
                      </button>
                    </form>

                    {/* Existing Feed List */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">Previous Site Updates ({(selectedProject.workUpdates || []).length})</h5>
                      <div className="space-y-3">
                        {(selectedProject.workUpdates || []).map(update => {
                          const hasBeforeAfter = update.beforeImage || update.afterImage;
                          return (
                            <div key={update.id} className="p-4 rounded-xl glass-card border border-white/10 space-y-3">
                              <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1 flex-1">
                                  <div className="flex items-center space-x-2 text-[10px] text-neutral-400">
                                    <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-semibold">{update.stage}</span>
                                    <span>•</span>
                                    <span>{update.date}</span>
                                    {hasBeforeAfter && (
                                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                                        ✨ Before/After Logged
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs font-bold text-white">{update.title}</div>
                                  <p className="text-xs text-neutral-300">{update.description}</p>
                                </div>
                              </div>

                              {/* Media / Before-After Display */}
                              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5">
                                {update.beforeImage && (
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider block">Before</span>
                                    <img src={update.beforeImage} alt="Before" className="w-24 h-20 rounded-lg object-cover border border-red-500/40" />
                                  </div>
                                )}
                                {update.afterImage && (
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">After</span>
                                    <img src={update.afterImage} alt="After" className="w-24 h-20 rounded-lg object-cover border border-emerald-500/40" />
                                  </div>
                                )}
                                {(!hasBeforeAfter && update.mediaUrls && update.mediaUrls[0]) && (
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">Site Photo</span>
                                    <img src={update.mediaUrls[0]} alt={update.title} className="w-24 h-20 rounded-lg object-cover border border-white/10" />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 3: DOCUMENTS & INVOICES */}
                {projectSubTab === 'documents' && (
                  <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-6 animate-in fade-in">
                    <div className="space-y-1">
                      <h4 className="font-serif text-xl font-bold text-white">Upload Document & Tax Invoices</h4>
                      <p className="text-xs text-neutral-400">Add agreements, tax invoices, 3D layouts, or warranty papers for the client.</p>
                    </div>

                    <form onSubmit={handleUploadDocument} className="space-y-4 pt-4 border-t border-white/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-neutral-300 font-medium">Document Title *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Tax Invoice #D8I-2026-108.pdf" 
                            value={docTitle}
                            onChange={(e) => setDocTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-neutral-300 font-medium">Category *</label>
                          <select 
                            value={docCategory}
                            onChange={(e) => setDocCategory(e.target.value as any)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="Invoice">Tax Invoice</option>
                            <option value="Agreement">Contract Agreement</option>
                            <option value="3D Design">3D Floor Plan Layout</option>
                            <option value="Quotation">Quotation Estimate</option>
                            <option value="Warranty">Warranty Certificate</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-neutral-300 font-medium">File Upload or Download URL *</label>
                          <div className="flex items-center space-x-2">
                            <input 
                              type="text" 
                              required
                              placeholder="https://... or click Browse to upload file"
                              value={docFileUrl}
                              onChange={(e) => setDocFileUrl(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            />
                            <label className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white text-xs font-bold cursor-pointer shrink-0 transition-colors">
                              <input 
                                type="file" 
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (!docTitle) setDocTitle(file.name);
                                    setDocFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
                                    handleFileUpload(file, setDocFileUrl);
                                  }
                                }}
                              />
                              Browse
                            </label>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-neutral-300 font-medium">File Size (e.g. 2.4 MB)</label>
                          <input 
                            type="text" 
                            value={docFileSize}
                            onChange={(e) => setDocFileSize(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      <label className="flex items-center gap-3 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl cursor-pointer hover:bg-amber-500/20 transition-all text-xs font-semibold text-amber-300">
                        <input 
                          type="checkbox" 
                          checked={notifyClientByEmail} 
                          onChange={(e) => setNotifyClientByEmail(e.target.checked)} 
                          className="w-4 h-4 accent-amber-500 rounded cursor-pointer" 
                        />
                        <span>📧 Send Automated Document Alert Email to Client ({selectedProject?.clientEmail || 'client'})</span>
                      </label>

                      <button 
                        type="submit"
                        className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                      >
                        <FilePlus className="w-4 h-4" />
                        <span>Upload Document / Invoice to Client Vault</span>
                      </button>
                    </form>

                    {/* Existing Documents List */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">Client Document Vault ({(selectedProject.documents || []).length})</h5>
                      <div className="space-y-2">
                        {(selectedProject.documents || []).map(doc => (
                          <div key={doc.id} className="p-3.5 rounded-xl glass-card border border-white/10 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-4 h-4 text-[#D4AF37]" />
                              <div>
                                <div className="font-bold text-white">{doc.title}</div>
                                <div className="text-[10px] text-neutral-400 font-mono">{doc.category} • {doc.fileSize} • Uploaded {doc.uploadDate}</div>
                              </div>
                            </div>
                             <div className="flex items-center space-x-2">
                              <span className="text-[#D4AF37] font-semibold text-[11px]">Published</span>
                              {doc.fileUrl && doc.fileUrl !== '#' && (
                                <a 
                                  href={doc.fileUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  download
                                  className="p-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] text-neutral-300 hover:text-black transition-colors"
                                  title="Download File"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 4: PAYOUT LEDGER & MILESTONES */}
                {projectSubTab === 'payments' && (
                  <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-6 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h4 className="font-serif text-xl font-bold text-white">Add Payment Milestone & Ledger</h4>
                        <p className="text-xs text-neutral-400">Configure payment milestone installments and record client payments.</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsConsolidatedInvoiceOpen(true)}
                        className="px-4 py-2 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center space-x-1.5 shrink-0 shadow-lg shadow-[#D4AF37]/20"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Generate Master Consolidated Bill</span>
                      </button>
                    </div>

                    <form onSubmit={handleAddPaymentMilestone} className="space-y-4 pt-4 border-t border-white/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-neutral-300 font-medium">Milestone Installment Title *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. Carpentry Stage Installment (35%)" 
                            value={payTitle}
                            onChange={(e) => setPayTitle(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-neutral-300 font-medium">Amount (INR ₹) *</label>
                          <input 
                            type="number" 
                            required
                            value={payAmount}
                            onChange={(e) => setPayAmount(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-neutral-300 font-medium">Due Date</label>
                          <input 
                            type="date" 
                            value={payDueDate}
                            onChange={(e) => setPayDueDate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-neutral-300 font-medium">Payment Status</label>
                          <select 
                            value={payStatus}
                            onChange={(e) => setPayStatus(e.target.value as any)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="Pending">Pending Payment</option>
                            <option value="Paid">Paid / Received</option>
                          </select>
                        </div>
                      </div>

                      <label className="flex items-center gap-3 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl cursor-pointer hover:bg-amber-500/20 transition-all text-xs font-semibold text-amber-300">
                        <input 
                          type="checkbox" 
                          checked={notifyClientByEmail} 
                          onChange={(e) => setNotifyClientByEmail(e.target.checked)} 
                          className="w-4 h-4 accent-amber-500 rounded cursor-pointer" 
                        />
                        <span>📧 Send Automated Milestone Invoice Email to Client ({selectedProject?.clientEmail || 'client'})</span>
                      </label>

                      <button 
                        type="submit"
                        className="w-full py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Add Payment Milestone to Ledger</span>
                      </button>
                    </form>

                    {/* Existing Payment Ledger */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">Project Payment Ledger ({(selectedProject.payments || []).length})</h5>
                      <div className="space-y-2">
                        {(selectedProject.payments || []).map(pay => (
                          <div key={pay.id} className="p-3.5 rounded-xl glass-card border border-white/10 flex items-center justify-between text-xs">
                            <div className="space-y-0.5">
                              <div className="font-bold text-white">{pay.title}</div>
                              <div className="text-[10px] text-neutral-400 font-mono">Due: {pay.dueDate} {pay.paidDate ? `• Paid on ${pay.paidDate}` : ''}</div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <div className="text-right">
                                <div className="font-bold font-mono text-[#D4AF37]">₹ {(pay.amount / 100000).toFixed(2)} Lakhs</div>
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                                  pay.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                                }`}>
                                  {pay.status}
                                </span>
                              </div>

                              {pay.status === 'Pending' ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    updatePaymentStatus(selectedProject.id, pay.id, 'Paid');
                                    alert(`Payment marked as Paid! Official GST Tax Invoice generated for "${pay.title}" and saved to Client Document Vault.`);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] uppercase"
                                >
                                  Mark as Paid
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setSelectedInvoicePayment(pay)}
                                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black font-bold text-[11px] transition-colors border border-white/15 flex items-center space-x-1"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>View Invoice</span>
                                </button>
                              )}
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="lg:col-span-8 p-12 rounded-2xl glass-panel border border-white/10 text-center space-y-3">
                <Building2 className="w-12 h-12 text-[#D4AF37] mx-auto opacity-60" />
                <h3 className="font-serif text-xl font-bold text-white">No Client Execution Project Selected</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Approved client consultation bookings will automatically appear here for milestone updates and live feeds. Manually added portfolio gallery items are managed under the Portfolio CMS tab.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3.5: AUTOMATED EMAIL MANAGER & MAIL CONSOLE */}
        {activeTab === 'emails' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Header & Status Card */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#D4AF37]/30 space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>AUTHENTICATED DIRECT SMTP SERVICE ONLINE</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Client Email Notifications & Mail Console</h2>
                  <p className="text-xs text-neutral-400">Manage automated milestone emails, resend client welcome access, and dispatch custom project updates.</p>
                </div>

                <a 
                  href="/api/test_email.php" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center space-x-2 shrink-0 border border-white/15 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open Diagnostic Console</span>
                </a>
              </div>

              {/* SMTP Status Summary Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <span className="text-neutral-400 font-mono text-[11px] uppercase">SMTP Host Server</span>
                  <div className="text-white font-bold font-mono">decor8india.com:465 (SSL)</div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <span className="text-neutral-400 font-mono text-[11px] uppercase">Domain Authentication</span>
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SPF: PASS | DMARC: PASS</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <span className="text-neutral-400 font-mono text-[11px] uppercase">Sender Identity</span>
                  <div className="text-[#D4AF37] font-bold">Decor8 India Studio &lt;support@decor8india.com&gt;</div>
                </div>
              </div>
            </div>

            {/* Admin Enquiry Alert Subscription Card */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#D4AF37]/30 space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#D4AF37]">
                    <Bell className="w-4 h-4 text-[#D4AF37]" />
                    <span>ADMIN INCOMING ENQUIRY NOTIFICATION DISPATCH</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white">Instant Alerts for New Bookings & Site Visits</h3>
                  <p className="text-xs text-neutral-400">Receive immediate notifications with complete client details whenever a new consultation or site tour request is submitted.</p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center space-x-3 bg-black/60 p-2 sm:p-2.5 rounded-2xl border border-white/15 shrink-0">
                  <span className="text-xs font-bold text-neutral-300">Receive Alerts:</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={adminEmailEnquiryEnabled}
                    onClick={() => handleToggleAdminEmailNotifications(!adminEmailEnquiryEnabled)}
                    className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                      adminEmailEnquiryEnabled ? 'bg-emerald-500' : 'bg-neutral-800'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-300 ease-in-out ${
                        adminEmailEnquiryEnabled ? 'translate-x-8 bg-black' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className={`text-xs font-extrabold font-mono uppercase ${
                    adminEmailEnquiryEnabled ? 'text-emerald-400' : 'text-neutral-400'
                  }`}>
                    {adminEmailEnquiryEnabled ? '🟢 ON' : '⚪ OFF'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                  <span className="text-neutral-400 font-mono text-[11px] uppercase block">Admin Notification Target Address</span>
                  {isEditingAdminEmail ? (
                    <div className="flex items-center space-x-2 pt-1">
                      <input
                        type="email"
                        value={tempAdminEmail}
                        onChange={(e) => setTempAdminEmail(e.target.value)}
                        placeholder="admin@decor8india.com"
                        className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37] flex-1"
                        autoFocus
                      />
                      <button
                        onClick={handleSaveAdminNotificationEmail}
                        disabled={isSavingAdminSettings}
                        className="px-3 py-2 rounded-lg bg-[#D4AF37] hover:bg-amber-400 text-black font-bold text-xs flex items-center space-x-1 cursor-pointer disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={() => {
                          setTempAdminEmail(adminNotificationEmail);
                          setIsEditingAdminEmail(false);
                        }}
                        className="px-2.5 py-2 rounded-lg bg-white/10 text-neutral-300 hover:text-white text-xs"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white font-mono">{adminNotificationEmail}</span>
                      <button
                        onClick={() => {
                          setTempAdminEmail(adminNotificationEmail);
                          setIsEditingAdminEmail(true);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black font-semibold text-xs transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit Email</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 flex flex-col justify-between">
                  <span className="text-neutral-400 font-mono text-[11px] uppercase block">Direct Live Diagnostic Test</span>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleSendTestAdminAlert('admin_booking')}
                      disabled={testAlertSending}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] text-white hover:text-black font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 border border-white/10"
                    >
                      <Send className={`w-3 h-3 ${testAlertSending ? 'animate-spin' : ''}`} />
                      <span>Test Booking Email</span>
                    </button>
                    <button
                      onClick={() => handleSendTestAdminAlert('admin_site_visit')}
                      disabled={testAlertSending}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-emerald-500 text-white hover:text-black font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 border border-white/10"
                    >
                      <Send className={`w-3 h-3 ${testAlertSending ? 'animate-spin' : ''}`} />
                      <span>Test Site Visit Email</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Client Email Directory with 1-Click Triggers */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Active Client Project Email Directory</h3>
                  <p className="text-xs text-neutral-400">Trigger manual email resends for active clients below.</p>
                </div>
                <span className="text-xs font-mono text-[#D4AF37] font-bold">{clientProjects.length} Active Client Projects</span>
              </div>

              <div className="space-y-4">
                {clientProjects.length === 0 ? (
                  <p className="text-xs text-neutral-400 italic">No client projects found.</p>
                ) : (
                  clientProjects.map(proj => {
                    const clientEmail = proj.clientEmail || `${proj.clientName.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;
                    return (
                      <div key={proj.id} className="p-4 sm:p-5 rounded-xl glass-card border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-white text-sm">{proj.clientName}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-mono font-semibold">{proj.currentStage} ({proj.progressPercentage}%)</span>
                          </div>
                          <div className="text-xs text-neutral-400 flex items-center space-x-3 font-mono">
                            <span>📧 {clientEmail}</span>
                            <span>•</span>
                            <span>🏗️ {proj.title}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            disabled={customEmailSending}
                            onClick={() => triggerQuickClientMail(clientEmail, proj.clientName, proj.title, proj.id, 'welcome')}
                            className="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white font-bold text-[11px] transition-colors border border-blue-500/40 flex items-center space-x-1 cursor-pointer disabled:opacity-50"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Resend Welcome</span>
                          </button>
                          <button
                            type="button"
                            disabled={customEmailSending}
                            onClick={() => triggerQuickClientMail(clientEmail, proj.clientName, proj.title, proj.id, 'progress')}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black font-bold text-[11px] transition-colors border border-amber-500/40 flex items-center space-x-1 cursor-pointer disabled:opacity-50"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Send Progress Report</span>
                          </button>
                          <button
                            type="button"
                            disabled={customEmailSending}
                            onClick={() => triggerQuickClientMail(clientEmail, proj.clientName, proj.title, proj.id, 'invoice')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-black font-bold text-[11px] transition-colors border border-emerald-500/40 flex items-center space-x-1 cursor-pointer disabled:opacity-50"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Send Invoice Alert</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Custom Email Dispatcher Form */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-white">Dispatch Custom Email Announcement</h3>
                <p className="text-xs text-neutral-400">Send an instant theme-formatted email announcement or custom notice to any client.</p>
              </div>

              <form onSubmit={handleSendCustomMail} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Recipient Email Address *</label>
                    <input 
                      type="email"
                      required
                      placeholder="client@gmail.com"
                      value={customEmailRecipient}
                      onChange={(e) => setCustomEmailRecipient(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-neutral-300 font-medium">Template / Event Type</label>
                    <select
                      value={customEmailType}
                      onChange={(e) => setCustomEmailType(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="generic">1. Custom Broadcast / Official Notice (Luxury Theme)</option>
                      <option value="progress">2. Project Progress & Milestone Update</option>
                      <option value="invoice">3. Milestone Billing Invoice</option>
                      <option value="welcome">4. Welcome Client Credentials</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Email Subject Line *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Important Update Regarding Site Inspection Schedule..."
                    value={customEmailSubject}
                    onChange={(e) => setCustomEmailSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Announcement Body / Message Text *</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Type your custom announcement, project update notes, or message for the client here. It will be sent formatted in Decor8 India's luxury dark/gold HTML email template..."
                    value={customEmailBody}
                    onChange={(e) => setCustomEmailBody(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {customEmailFeedback && (
                  <div className={`p-3.5 rounded-xl text-xs font-mono ${
                    customEmailFeedback.status === 'success' 
                      ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' 
                      : 'bg-red-500/20 border border-red-500/40 text-red-300'
                  }`}>
                    {customEmailFeedback.msg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={customEmailSending}
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{customEmailSending ? 'Dispatching via SMTP...' : 'Send Custom Email Notification Now'}</span>
                </button>
              </form>
            </div>

            {/* Sent Email Audit Trail Logs */}
            <EmailActivityLogsSection />
          </div>
        )}

        {/* TAB 4: PORTFOLIO CMS */}
        {activeTab === 'portfolio' && (
          <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white">Portfolio Gallery CMS</h2>
                <p className="text-xs text-neutral-400">Add, edit, or remove showcase projects visible on the public website.</p>
              </div>
              <button 
                onClick={openAddPortfolioModal}
                className="px-5 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center space-x-2 hover:opacity-95 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Portfolio Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl glass-card border border-white/10 space-y-4 hover:border-[#D4AF37]/40 transition-all">
                  <div className="flex items-start space-x-4">
                    <img src={p.coverImage} alt={p.title} className="w-24 h-20 rounded-xl object-cover border border-white/10" />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-semibold uppercase">{p.category}</span>
                        <span className="text-[10px] text-neutral-400 font-mono">{p.status}</span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-white">{p.title}</h3>
                      <div className="text-xs text-[#D4AF37] font-bold">{p.budget} • {p.area}</div>
                      <div className="text-[11px] text-neutral-400">{p.location}</div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 line-clamp-2 italic">{p.description}</p>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => updateProject(p.id, { showOnLandingPage: p.showOnLandingPage !== false ? false : true })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center space-x-1.5 ${
                        p.showOnLandingPage !== false
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{p.showOnLandingPage !== false ? '⭐ Landing Page Visible' : 'Hidden from Landing Page'}</span>
                    </button>

                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditPortfolioModal(p)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-black text-xs text-neutral-200 font-medium flex items-center space-x-1 transition-all"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit Details</span>
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                            deleteProject(p.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white text-xs font-medium flex items-center space-x-1 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SERVICE & PRICING CMS */}
        {activeTab === 'services' && (
          <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white">Service Packages & Pricing CMS</h2>
                <p className="text-xs text-neutral-400">Add new offerings, edit all text & details, modify prices, and toggle visibility.</p>
              </div>
              <button 
                onClick={openAddServiceModal}
                className="px-5 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs flex items-center space-x-2 hover:opacity-95 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service Package</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-black/60 text-[#D4AF37] font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-4 rounded-l-lg">Package Title</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Duration</th>
                    <th className="p-4">Price & Active Discount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 rounded-r-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {services.map((s) => {
                    const hasDiscount = s.discountPrice !== undefined && s.discountPrice !== null && s.discountPrice > 0 && s.discountPrice < s.startingPrice;
                    const discountPct = s.discountPercentage || (hasDiscount ? Math.round(((s.startingPrice - (s.discountPrice || 0)) / s.startingPrice) * 100) : 0);

                    return (
                    <tr key={s.id} className="hover:bg-white/5">
                      <td className="p-4 font-bold text-white">
                        <div className="flex items-center space-x-3">
                          <img src={s.image} alt={s.title} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <div>{s.title}</div>
                            <div className="text-[10px] text-neutral-400 font-normal line-clamp-1">{s.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-bold">{s.type}</span>
                      </td>
                      <td className="p-4 font-mono">{s.estimatedDuration}</td>
                      <td className="p-4 font-mono">
                        {editingPriceId === s.id ? (
                          <div className="space-y-1.5 bg-black/80 p-2.5 rounded-xl border border-[#D4AF37]/50 max-w-xs shadow-xl">
                            <div>
                              <label className="text-[9px] text-neutral-400 uppercase font-mono block">Original Base Price (₹):</label>
                              <input 
                                type="number" 
                                value={quickPriceInput}
                                onChange={(e) => setQuickPriceInput(Number(e.target.value))}
                                className="w-full px-2 py-1 rounded bg-black border border-white/20 text-white text-xs font-bold"
                                placeholder="Base Price"
                              />
                            </div>
                            <div>
                              <div className="flex items-center justify-between">
                                <label className="text-[9px] text-[#D4AF37] uppercase font-mono block">Discount Offer Price (₹):</label>
                                {quickDiscountInput !== '' && (
                                  <button 
                                    type="button"
                                    onClick={() => setQuickDiscountInput('')}
                                    className="text-[9px] text-red-400 hover:text-red-300 underline"
                                  >
                                    Clear Discount
                                  </button>
                                )}
                              </div>
                              <input 
                                type="number" 
                                value={quickDiscountInput}
                                onChange={(e) => setQuickDiscountInput(e.target.value === '' ? '' : Number(e.target.value))}
                                className="w-full px-2 py-1 rounded bg-black border border-[#D4AF37]/50 text-emerald-400 text-xs font-bold"
                                placeholder="Leave blank for No Discount"
                              />
                            </div>
                            <div className="flex items-center space-x-1.5 pt-1">
                              <button 
                                onClick={() => {
                                  const parsedDisc = typeof quickDiscountInput === 'number' && quickDiscountInput > 0 && quickDiscountInput < quickPriceInput 
                                    ? quickDiscountInput 
                                    : null;
                                  updateServicePrice(s.id, quickPriceInput, parsedDisc);
                                  setEditingPriceId(null);
                                }}
                                className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[10px] uppercase"
                              >
                                Save Pricing
                              </button>
                              <button 
                                onClick={() => setEditingPriceId(null)}
                                className="px-2 py-1 rounded bg-white/10 text-neutral-400 hover:text-white text-[10px]"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {hasDiscount ? (
                              <>
                                <div className="text-[11px] text-neutral-400 line-through">
                                  ₹ {(s.startingPrice / 100000).toFixed(2)} Lakhs
                                </div>
                                <div className="text-emerald-400 font-bold text-sm flex items-center space-x-1.5">
                                  <span>₹ {((s.discountPrice || 0) / 100000).toFixed(2)} Lakhs</span>
                                  <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold border border-emerald-500/40">
                                    {discountPct}% OFF
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="text-[#D4AF37] font-bold text-sm">
                                ₹ {(s.startingPrice / 100000).toFixed(2)} Lakhs
                              </div>
                            )}
                            <div className="flex items-center space-x-2 pt-0.5">
                              <button
                                onClick={() => {
                                  setEditingPriceId(s.id);
                                  setQuickPriceInput(s.startingPrice);
                                  setQuickDiscountInput(s.discountPrice || '');
                                }}
                                className="text-[10px] text-neutral-400 hover:text-[#D4AF37] flex items-center space-x-1 cursor-pointer"
                              >
                                <Edit className="w-2.5 h-2.5" />
                                <span>Edit Price</span>
                              </button>
                              {hasDiscount && (
                                <button
                                  onClick={() => {
                                    if (confirm(`Remove promotional discount for "${s.title}" and restore standard rate ₹ ${(s.startingPrice / 100000).toFixed(2)} Lakhs? (The service will remain active without discount)`)) {
                                      removeServiceDiscount(s.id);
                                    }
                                  }}
                                  className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center space-x-0.5 cursor-pointer underline font-medium"
                                  title="Remove discount without deleting the service"
                                >
                                  <span>Remove Discount</span>
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleServiceStatus(s.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                            s.isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                          }`}
                        >
                          {s.isActive ? 'Active' : 'Hidden'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => openEditServiceModal(s)}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-black text-xs text-neutral-200 font-medium"
                        >
                          Edit Full Package
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`WARNING: Are you sure you want to PERMANENTLY DELETE the entire "${s.title}" service package from the catalog?\n\n(Note: To only remove the discount, click "Remove Discount" in the price column instead).`)) {
                              deleteService(s.id);
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500 hover:text-white text-xs border border-red-500/30"
                          title="Permanently delete entire service"
                        >
                          Delete Service
                        </button>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {/* TAB: MASTER ARCHITECTS & LEADERSHIP CMS */}
        {activeTab === 'team' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-[#D4AF37]/30">
              <div className="space-y-1">
                <div className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider font-mono">Leadership & Team CMS</div>
                <h3 className="text-2xl font-serif font-bold text-white">Meet Our Master Architects</h3>
                <p className="text-xs text-neutral-400">
                  Manage team member profiles, designations, experience, bios, and official portraits displayed on the homepage.
                </p>
              </div>
              <button
                onClick={() => openTeamMemberModal()}
                className="px-5 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shrink-0 hover:opacity-90 transition-all shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add Master Architect</span>
              </button>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group">
                  <div>
                    <div className="relative h-64 overflow-hidden bg-black">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.failed) {
                            target.dataset.failed = 'true';
                            target.src = '/logo_transparent.png';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] font-mono text-[10px] font-bold">
                        {member.experience}
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="font-serif font-bold text-xl text-white">{member.name}</h4>
                      <div className="text-xs text-[#D4AF37] font-semibold">{member.role}</div>
                      <p className="text-xs text-neutral-300 pt-2 border-t border-white/10 line-clamp-3 font-light">
                        {member.bio}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 border-t border-white/10 flex items-center justify-between bg-black/40">
                    <button
                      onClick={() => openTeamMemberModal(member)}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-black text-xs font-semibold text-neutral-200 transition-colors flex items-center space-x-1.5"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${member.name}?`)) {
                          deleteTeamMember(member.id);
                        }
                      }}
                      className="px-3 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white text-xs font-medium transition-colors flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: MAGAZINE CMS */}
        {activeTab === 'magazine' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in">
            
            {/* Publish Form */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white">Publish New Article</h3>

              <form onSubmit={handleCreateArticle} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Article Headline</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Modern Color Psychology for Villa Bedrooms" 
                    value={newArtTitle}
                    onChange={(e) => setNewArtTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium flex items-center justify-between">
                    <span>Article Author / Master Architect</span>
                    <span className="text-[10px] text-[#D4AF37] font-mono">Master Architects</span>
                  </label>
                  <select 
                    value={newArtAuthorSelect}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewArtAuthorSelect(val);
                      if (val !== 'custom') {
                        setNewArtAuthor(val);
                      } else {
                        setNewArtAuthor('');
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Decor8 Editorial Team">Decor8 Editorial Team (Default)</option>
                    {teamMembers.map(m => (
                      <option key={m.id} value={`${m.name} (${m.role})`}>
                        {m.name} — {m.role}
                      </option>
                    ))}
                    <option value="custom">✍️ Enter Custom Author / Guest Name...</option>
                  </select>

                  {newArtAuthorSelect === 'custom' && (
                    <input 
                      type="text" 
                      required
                      placeholder="Type custom author or contributor name..." 
                      value={newArtAuthor}
                      onChange={(e) => setNewArtAuthor(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-[#D4AF37]/50 text-xs text-white focus:outline-none focus:border-[#D4AF37] mt-1.5 animate-in fade-in"
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Category</label>
                  <select 
                    value={newArtCategory}
                    onChange={(e) => setNewArtCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Tips">Tips</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Office Trends">Office Trends</option>
                    <option value="Architecture">Architecture</option>
                    <option value="Color Guides">Color Guides</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Smart Home">Smart Home</option>
                  </select>
                </div>

                {/* Article Cover Image Selection & Upload */}
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Article Cover Image</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <label className="flex-1 cursor-pointer px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-xs text-neutral-300 flex items-center justify-center space-x-2 transition-colors">
                        <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Upload Image File</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], setNewArtCoverImage);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Or paste image URL (https://...)" 
                      value={newArtCoverImage}
                      onChange={(e) => setNewArtCoverImage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                    {newArtCoverImage && (
                      <div className="relative h-32 rounded-xl overflow-hidden border border-[#D4AF37]/40 mt-1">
                        <img src={newArtCoverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Article Gallery Images (Multiple Photos) */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-neutral-300 font-medium flex items-center space-x-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Article Photo Gallery (Add More Photos)</span>
                    </label>
                    <span className="text-[10px] text-neutral-400 font-mono">{newArtGallery.length} photos added</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="cursor-pointer px-3 py-2 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-xs text-neutral-300 flex items-center justify-center space-x-1.5 transition-colors shrink-0">
                      <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Upload Photo</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0], (url) => setNewArtGallery(prev => [...prev, url]));
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                    <input 
                      type="text" 
                      placeholder="Or paste photo URL..." 
                      value={newArtGalleryInput}
                      onChange={(e) => setNewArtGalleryInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (newArtGalleryInput.trim()) {
                            setNewArtGallery(prev => [...prev, newArtGalleryInput.trim()]);
                            setNewArtGalleryInput('');
                          }
                        }
                      }}
                      className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newArtGalleryInput.trim()) {
                          setNewArtGallery(prev => [...prev, newArtGalleryInput.trim()]);
                          setNewArtGalleryInput('');
                        }
                      }}
                      className="px-3 py-2 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold text-xs transition-colors shrink-0"
                    >
                      Add
                    </button>
                  </div>

                  {/* Gallery Thumbnails List */}
                  {newArtGallery.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 pt-2">
                      {newArtGallery.map((imgUrl, idx) => (
                        <div key={idx} className="relative group h-16 rounded-lg overflow-hidden border border-white/20 bg-black">
                          <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-1">
                            <button
                              type="button"
                              onClick={() => {
                                const imgTag = `<div class="my-6 rounded-2xl overflow-hidden border border-white/10 shadow-xl">\n  <img src="${imgUrl}" alt="Article Photo" class="w-full h-auto object-cover max-h-[500px]" />\n</div>`;
                                setNewArtContent(prev => prev ? `${prev}\n\n${imgTag}` : imgTag);
                              }}
                              className="p-1 rounded bg-[#D4AF37] text-black text-[9px] font-bold"
                              title="Insert image into body content"
                            >
                              + Body
                            </button>
                            <button
                              type="button"
                              onClick={() => setNewArtGallery(prev => prev.filter((_, i) => i !== idx))}
                              className="p-1 rounded bg-red-500 text-white"
                              title="Remove Photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Excerpt Summary</label>
                  <textarea 
                    rows={2}
                    required
                    placeholder="Short description for homepage feed..."
                    value={newArtExcerpt}
                    onChange={(e) => setNewArtExcerpt(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Rich Text Editor Toolbar & Article Body Content */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-neutral-300 font-medium flex items-center space-x-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Article Full Body & Formatting</span>
                    </label>
                    <div className="flex items-center space-x-1 bg-black/60 p-1 rounded-lg border border-white/15">
                      <button
                        type="button"
                        onClick={() => setArtContentMode('write')}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                          artContentMode === 'write' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        Write
                      </button>
                      <button
                        type="button"
                        onClick={() => setArtContentMode('preview')}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                          artContentMode === 'preview' ? 'bg-[#D4AF37] text-black' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        Live Preview
                      </button>
                    </div>
                  </div>

                  {artContentMode === 'write' ? (
                    <div className="space-y-2">
                      {/* Simple Non-Tech Formatting Toolbar */}
                      <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-white/5 border border-white/15">
                        {/* Direct Local File Image Uploader */}
                        <label className="px-2.5 py-1.5 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Image from Computer</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(e.target.files[0], (fileUrl) => {
                                  const imgTag = `<div class="my-6 rounded-2xl overflow-hidden border border-white/10 shadow-xl">\n  <img src="${fileUrl}" alt="Article Photo" class="w-full h-auto object-cover max-h-[500px]" />\n</div>`;
                                  setNewArtContent(prev => prev ? `${prev}\n\n${imgTag}` : imgTag);
                                });
                              }
                            }}
                            className="hidden"
                          />
                        </label>

                        <span className="w-[1px] h-6 bg-white/15 self-center mx-0.5" />

                        <button
                          type="button"
                          onClick={() => insertFormatting('b', 'Bold Text')}
                          className="px-2 py-1.5 rounded-lg bg-black/60 hover:bg-[#D4AF37] hover:text-black text-neutral-200 text-xs font-medium border border-white/10 transition-colors flex items-center space-x-1"
                          title="Bold Text"
                        >
                          <Bold className="w-3.5 h-3.5" />
                          <span>Bold</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting('h2', 'Section Title')}
                          className="px-2 py-1.5 rounded-lg bg-black/60 hover:bg-[#D4AF37] hover:text-black text-neutral-200 text-xs font-medium border border-white/10 transition-colors flex items-center space-x-1"
                          title="Large Section Heading"
                        >
                          <Heading2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Heading</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting('ul')}
                          className="px-2 py-1.5 rounded-lg bg-black/60 hover:bg-[#D4AF37] hover:text-black text-neutral-200 text-xs font-medium border border-white/10 transition-colors flex items-center space-x-1"
                          title="Bullet List"
                        >
                          <List className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Bullet Points</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting('quote', 'Highlighted quote or takeaway...')}
                          className="px-2 py-1.5 rounded-lg bg-black/60 hover:bg-[#D4AF37] hover:text-black text-neutral-200 text-xs font-medium border border-white/10 transition-colors flex items-center space-x-1"
                          title="Featured Quote Box"
                        >
                          <Quote className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Quote Box</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => insertFormatting('link')}
                          className="px-2 py-1.5 rounded-lg bg-black/60 hover:bg-[#D4AF37] hover:text-black text-neutral-200 text-xs font-medium border border-white/10 transition-colors flex items-center space-x-1"
                          title="Insert Website Link"
                        >
                          <LinkIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Add Link</span>
                        </button>
                      </div>

                      <textarea 
                        rows={6}
                        placeholder="Type your article story here... You can type normal paragraphs, and use buttons above to add headings, quote boxes, or upload photos directly from your computer!"
                        value={newArtContent}
                        onChange={(e) => setNewArtContent(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] font-sans leading-relaxed"
                      />
                    </div>
                  ) : (
                    /* Live Preview Box */
                    <div className="p-4 rounded-xl bg-black/80 border border-[#D4AF37]/30 max-h-80 overflow-y-auto space-y-4">
                      <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider border-b border-white/10 pb-1">
                        Article Content Preview
                      </div>
                      <div 
                        className="text-xs text-neutral-300 leading-relaxed space-y-3 font-sans prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: newArtContent || `<p class="italic text-neutral-500">${newArtExcerpt || 'No article content written yet...'}</p>` 
                        }} 
                      />
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Formatted Article & Photos</span>
                </button>
              </form>
            </div>

            {/* Articles List */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white">Published Articles</h3>
              <div className="space-y-3">
                {articles.map(art => (
                  <div key={art.id} className="p-4 rounded-xl glass-card border border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3 min-w-0">
                      {art.coverImage && (
                        <img 
                          src={art.coverImage} 
                          alt={art.title} 
                          className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0" 
                        />
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{art.title}</div>
                        <div className="text-[10px] text-[#D4AF37] font-mono">{art.category} • Published {art.publishedAt}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteArticle(art.id)}
                      className="p-2 rounded bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white shrink-0 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 8: BRANCH OFFICES CMS */}
        {activeTab === 'branches' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-white/10">
              <div className="space-y-1">
                <div className="text-xs text-[#D4AF37] font-mono font-bold uppercase tracking-wider">Multi-City Network Management</div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">Branch Offices & Official Contact Info</h2>
                <p className="text-xs text-neutral-400">Manage official branch locations, experience centers, working hours, and maps displayed live on the landing page.</p>
              </div>
              <button 
                onClick={() => handleOpenBranchModal()}
                className="px-5 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shrink-0 shadow-lg hover:opacity-95 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                <span>Add Branch Office</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branchOffices.map((b) => (
                <div key={b.id} className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#D4AF37]/40 transition-all space-y-4 relative flex flex-col justify-between">
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        b.isHeadquarter ? 'bg-amber-500/20 text-[#D4AF37] border border-[#D4AF37]/50 font-mono' : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                      }`}>
                        {b.isHeadquarter ? '⭐ Corporate HQ' : `📍 ${b.city} Branch`}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleOpenBranchModal(b)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                          title="Edit Branch Office"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Delete branch office ${b.title}?`)) {
                              deleteBranchOffice(b.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white transition-colors"
                          title="Delete Branch Office"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {b.imageUrl && (
                      <div className="h-36 rounded-xl overflow-hidden border border-white/10">
                        <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-white leading-snug">{b.title}</h3>
                      <div className="text-xs text-neutral-300 leading-relaxed font-sans">{b.address}</div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs text-neutral-300 font-mono">
                      <div><strong className="text-white">Phone:</strong> {b.phone}</div>
                      <div><strong className="text-white">Email:</strong> {b.email}</div>
                      <div><strong className="text-white">Hours:</strong> {b.workingHours}</div>
                    </div>
                  </div>

                  {b.mapUrl && (
                    <div className="pt-3">
                      <a 
                        href={b.mapUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-[#D4AF37] font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>View Location Map</span>
                      </a>
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: TRUSTED BRAND PARTNERS CMS */}
        {activeTab === 'partners' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in">
            
            {/* Add Brand Partner Form */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white">Add Trusted Brand Partner</h3>
              <p className="text-xs text-neutral-400 font-light">Add brand logos and material partner specifications displayed on the homepage trusted partners marquee.</p>

              <form onSubmit={handleCreatePartner} className="space-y-4">
                {/* Brand Logo Upload & URL */}
                <div className="space-y-2">
                  <label className="text-xs text-neutral-300 font-semibold block">Upload Brand Partner Logo Photo *</label>
                  <div className="space-y-2">
                    <label className="cursor-pointer p-4 rounded-xl bg-white/5 border border-dashed border-[#D4AF37]/50 hover:bg-white/10 text-xs text-neutral-300 flex flex-col items-center justify-center space-y-2 transition-all group">
                      <Upload className="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-white">Click to Upload Logo Image File</span>
                      <span className="text-[10px] text-neutral-400">Supports PNG, JPG, WEBP, SVG</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0], setNewPartnerLogoUrl);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                    
                    <input 
                      type="text" 
                      placeholder="Or paste logo image URL (https://...)" 
                      value={newPartnerLogoUrl}
                      onChange={(e) => setNewPartnerLogoUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />

                    {newPartnerLogoUrl && (
                      <div className="relative h-24 rounded-xl overflow-hidden border border-[#D4AF37]/50 bg-white/95 p-3 flex items-center justify-center mt-2 shadow-lg">
                        <img src={newPartnerLogoUrl} alt="Logo Preview" className="max-h-full max-w-full object-contain" />
                        <button 
                          type="button" 
                          onClick={() => setNewPartnerLogoUrl('')} 
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-500/90 text-white hover:bg-red-400 transition-colors"
                          title="Remove photo"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-lg transition-all cursor-pointer"
                >
                  Add Partner Logo to Live Website
                </button>
              </form>
            </div>

            {/* Current Partners List */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white">Current Trusted Brand Partners ({partners.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
                {partners.map(p => (
                  <div key={p.id} className="p-3.5 rounded-xl glass-card border border-white/10 flex items-center justify-between gap-3 bg-white/5">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-14 h-12 bg-white/90 rounded-lg p-1 flex items-center justify-center shrink-0 border border-white/20">
                        <img 
                          src={p.logoUrl} 
                          alt={p.name} 
                          className="max-h-full max-w-full object-contain" 
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{p.name}</div>
                        <div className="text-[10px] text-[#D4AF37] font-mono truncate">{p.category}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        if (confirm(`Remove brand partner "${p.name}"?`)) {
                          deletePartner(p.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white shrink-0 transition-colors"
                      title="Delete Partner"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 10: CAREERS & JOB POSTINGS CMS */}
        {activeTab === 'careers' && (
          <div className="space-y-8 animate-in fade-in">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-[#D4AF37]/30">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] uppercase">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Talent Acquisition & Careers CMS</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-white">Manage Job Openings & Received Applications</h2>
                <p className="text-xs text-neutral-400">Post new job openings, toggle active hiring status, and inspect submitted candidate resumes.</p>
              </div>

              <button 
                onClick={openAddJobModal}
                className="px-5 py-3 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider flex items-center space-x-2 shadow-lg shadow-[#D4AF37]/20 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Job Opening</span>
              </button>
            </div>

            {/* Active Job Openings List */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-4">
              <h3 className="font-serif text-xl font-bold text-white">Current Job Postings ({adminJobs.length})</h3>
              
              {adminJobs.length === 0 ? (
                <div className="text-center py-8 text-xs text-neutral-400 italic">No job openings posted yet. Click "Post New Job Opening" to add one.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {adminJobs.map(j => (
                    <div key={j.id} className="p-5 rounded-xl glass-card border border-white/10 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold uppercase">{j.department}</span>
                          <button 
                            onClick={() => handleToggleJobActive(j.id)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all ${
                              j.isActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
                            }`}
                          >
                            {j.isActive ? '● Hiring Active' : '○ Paused'}
                          </button>
                        </div>

                        <h4 className="font-serif text-lg font-bold text-white">{j.title}</h4>
                        <div className="text-xs text-neutral-400 font-mono">{j.location} • {j.type} • {j.experience}</div>
                        <div className="text-xs text-emerald-400 font-bold font-mono">{j.salary}</div>
                        <p className="text-xs text-neutral-300 line-clamp-2">{j.description}</p>
                      </div>

                      <div className="flex space-x-2 pt-3 border-t border-white/10">
                        <button 
                          onClick={() => openEditJobModal(j)}
                          className="flex-1 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 flex items-center justify-center space-x-1"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit Job</span>
                        </button>
                        <button 
                          onClick={() => handleDeleteJob(j.id)}
                          className="px-3 py-2 rounded-lg bg-red-500/20 text-red-300 text-xs font-semibold hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Received Candidate Applications Table */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Received Candidate Applications ({adminApplications.length})</h3>
                  <p className="text-xs text-neutral-400">Applications submitted by job seekers on website</p>
                </div>
              </div>

              {adminApplications.length === 0 ? (
                <div className="text-center py-8 text-xs text-neutral-400 italic">No job applications submitted yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-white/5 border-b border-white/10 text-[#D4AF37] uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Applicant Name</th>
                        <th className="p-3">Position Applied</th>
                        <th className="p-3">Contact Email & Phone</th>
                        <th className="p-3">Portfolio / Resume</th>
                        <th className="p-3">Cover Note</th>
                        <th className="p-3 text-right">Applied Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {adminApplications.map(app => (
                        <tr key={app.id} className="hover:bg-white/5">
                          <td className="p-3 font-bold text-white">{app.applicantName}</td>
                          <td className="p-3 text-[#D4AF37] font-semibold">{app.jobTitle}</td>
                          <td className="p-3 text-neutral-300">
                            <div>{app.applicantEmail}</div>
                            <div className="text-neutral-400">{app.applicantPhone}</div>
                          </td>
                          <td className="p-3">
                            <div className="space-y-1">
                              {app.portfolioUrl && (
                                <a href={app.portfolioUrl} target="_blank" rel="noreferrer" className="text-[#D4AF37] hover:underline flex items-center space-x-1">
                                  <LinkIcon className="w-3 h-3" />
                                  <span>Portfolio Link</span>
                                </a>
                              )}
                              {app.resumeUrl && (
                                <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center space-x-1">
                                  <FileText className="w-3 h-3" />
                                  <span>Resume Link</span>
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="p-3 text-neutral-300 max-w-xs truncate">{app.coverLetter || 'N/A'}</td>
                          <td className="p-3 text-right text-neutral-400">{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Today'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* ---------------- JOB ADD / EDIT MODAL ---------------- */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#0D0E12] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <button 
              onClick={() => setIsJobModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-white">
                {editingJob ? 'Edit Job Opening' : 'Post New Job Opening'}
              </h3>
              <p className="text-xs text-neutral-400">Fill out details to publish job on decor8india.com/careers</p>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Job Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Senior Interior Architect" 
                  value={jobTitleInput}
                  onChange={(e) => setJobTitleInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Department *</label>
                  <select 
                    value={jobDeptInput}
                    onChange={(e) => setJobDeptInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Interior Design">Interior Design</option>
                    <option value="3D Rendering">3D Rendering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Sales / Relations">Sales / Relations</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Location *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Bengaluru (Head Office)" 
                    value={jobLocInput}
                    onChange={(e) => setJobLocInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Employment Type</label>
                  <select 
                    value={jobTypeInput}
                    onChange={(e) => setJobTypeInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Experience Required</label>
                  <input 
                    type="text" 
                    value={jobExpInput}
                    onChange={(e) => setJobExpInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Salary Package</label>
                  <input 
                    type="text" 
                    value={jobSalInput}
                    onChange={(e) => setJobSalInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Job Description *</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Describe day-to-day responsibilities..." 
                  value={jobDescInput}
                  onChange={(e) => setJobDescInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Key Requirements & Software Skills</label>
                <textarea 
                  rows={2}
                  placeholder="e.g. AutoCAD, 3ds Max, B.Arch degree, site execution experience" 
                  value={jobReqInput}
                  onChange={(e) => setJobReqInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input 
                  type="checkbox" 
                  id="jobActiveChk"
                  checked={jobActiveInput}
                  onChange={(e) => setJobActiveInput(e.target.checked)}
                  className="rounded bg-black border-white/20 text-[#D4AF37] focus:ring-0 w-4 h-4"
                />
                <label htmlFor="jobActiveChk" className="text-xs text-neutral-200 cursor-pointer font-semibold">
                  Publish as Active Job Opening on website immediately
                </label>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                {editingJob ? 'Save Job Changes' : 'Publish Job Opening'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- PORTFOLIO ADD / EDIT MODAL ---------------- */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0D0E12] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <button 
              onClick={() => setIsPortfolioModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-white">
                {editingProject ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
              </h3>
              <p className="text-xs text-neutral-400">Fill in architectural project specs, images, and details.</p>
            </div>

            <form onSubmit={handleSavePortfolio} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Project Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. The Grand Penthouse at Jubilee Hills" 
                  value={portTitle}
                  onChange={(e) => setPortTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Assigned Principal Architect / Designer Dropdown */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Assigned Principal Architect / Lead Designer *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select 
                    value={teamMembers.some(m => `${m.name} (${m.role})` === portDesignerSelect || m.name === portDesignerSelect) ? portDesignerSelect : 'Custom'}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'Custom') {
                        setPortDesignerSelect('Custom');
                        setPortDesignerName('');
                      } else {
                        setPortDesignerSelect(val);
                        setPortDesignerName(val);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Mr. Satish Bhat (CEO & Principal Architect)">Mr. Satish Bhat (CEO & Principal Architect)</option>
                    {teamMembers.map(tm => (
                      <option key={tm.id} value={`${tm.name} (${tm.role})`}>{tm.name} ({tm.role})</option>
                    ))}
                    <option value="Custom">+ Custom / Other Architect Name</option>
                  </select>

                  {(!teamMembers.some(m => `${m.name} (${m.role})` === portDesignerSelect || m.name === portDesignerSelect) || portDesignerSelect === 'Custom') && (
                    <input 
                      type="text" 
                      required
                      placeholder="Enter architect/designer name..." 
                      value={portDesignerName}
                      onChange={(e) => setPortDesignerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Category *</label>
                  <select 
                    value={portCategory}
                    onChange={(e) => setPortCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Construction">Construction</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Architectural Style *</label>
                  <select 
                    value={portStyle}
                    onChange={(e) => setPortStyle(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Luxury">Luxury</option>
                    <option value="Modern">Modern</option>
                    <option value="Minimal">Minimal</option>
                    <option value="Traditional">Traditional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Location</label>
                  <input 
                    type="text" 
                    value={portLocation}
                    onChange={(e) => setPortLocation(e.target.value)}
                    placeholder="e.g. Worli, South Mumbai"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Carpet Area</label>
                  <input 
                    type="text" 
                    value={portArea}
                    onChange={(e) => setPortArea(e.target.value)}
                    placeholder="e.g. 2,500 Sq. Ft."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Completed Budget</label>
                  <input 
                    type="text" 
                    value={portBudget}
                    onChange={(e) => setPortBudget(e.target.value)}
                    placeholder="e.g. ₹ 1.20 Cr"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                    <span>Days Required *</span>
                    <span className="text-[10px] text-[#D4AF37] font-mono">Execution</span>
                  </label>
                  <div className="space-y-1.5">
                    <input 
                      type="text" 
                      required
                      value={portCompletionTime}
                      onChange={(e) => setPortCompletionTime(e.target.value)}
                      placeholder="e.g. 75 Days / 90 Days"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                    <div className="flex flex-wrap gap-1">
                      {['30 Days', '45 Days', '60 Days', '75 Days', '90 Days', '120 Days'].map(d => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setPortCompletionTime(d)}
                          className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all ${
                            portCompletionTime === d 
                              ? 'bg-[#D4AF37] text-black shadow' 
                              : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300">Cover Image *</label>
                <label className="flex items-center justify-center w-full px-3.5 py-4 rounded-xl bg-black/60 border-2 border-dashed border-white/20 hover:border-[#D4AF37]/60 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, setPortCoverImage);
                    }}
                  />
                  <div className="flex flex-col items-center space-y-1">
                    <Upload className="w-5 h-5 text-neutral-400 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">Click to upload cover image</span>
                  </div>
                </label>
                {portCoverImage && (
                  <div className="relative inline-block">
                    <img src={portCoverImage} alt="Cover Preview" className="w-24 h-20 rounded-lg object-cover border border-white/10" />
                    <button type="button" onClick={() => setPortCoverImage('')} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500/90 text-white flex items-center justify-center text-xs hover:bg-red-400 transition-colors"><X className="w-3 h-3" /></button>
                  </div>
                )}
              </div>

              {/* Project Additional Gallery Photos CMS */}
              <div className="space-y-3 p-4 rounded-xl bg-black/40 border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider flex items-center space-x-1.5">
                    <ImageIcon className="w-4 h-4" />
                    <span>Project Portfolio Gallery Photos ({portGalleryImages.length})</span>
                  </label>
                  <span className="text-[10px] text-neutral-400">Add photos for project detail gallery</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8 flex space-x-2">
                    <input 
                      type="url" 
                      placeholder="Paste image URL..." 
                      value={newGalleryUrl}
                      onChange={(e) => setNewGalleryUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button 
                      type="button"
                      onClick={() => {
                        if (newGalleryUrl.trim()) {
                          setPortGalleryImages(prev => [...prev, newGalleryUrl.trim()]);
                          setNewGalleryUrl('');
                        }
                      }}
                      className="px-3 py-2 rounded-lg bg-[#D4AF37] text-black text-xs font-bold shrink-0 hover:opacity-90"
                    >
                      Add URL
                    </button>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="flex items-center justify-center w-full px-3 py-2 rounded-lg bg-white/5 border border-dashed border-white/20 hover:border-[#D4AF37] transition-colors cursor-pointer text-xs text-neutral-300 hover:text-white">
                      <input 
                        type="file" 
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          files.forEach(file => {
                            handleFileUpload(file, (uploadedUrl) => {
                              setPortGalleryImages(prev => [...prev, uploadedUrl]);
                            });
                          });
                        }}
                      />
                      <Upload className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
                      <span>Upload Photos</span>
                    </label>
                  </div>
                </div>

                {portGalleryImages.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-2">
                    {portGalleryImages.map((imgUrl, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border border-white/15 h-20 bg-black">
                        <img src={imgUrl} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => setPortGalleryImages(prev => prev.filter((_, i) => i !== index))}
                          className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs opacity-90 hover:opacity-100 transition-opacity"
                          title="Remove Photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {imgUrl === portCoverImage ? (
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-[#D4AF37] text-black text-[9px] font-bold">Cover</span>
                        ) : (
                          <button 
                            type="button"
                            onClick={() => setPortCoverImage(imgUrl)}
                            className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[#D4AF37] text-[9px] opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Set Cover
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-[11px] text-neutral-400 italic text-center py-2">
                    No gallery photos added yet. Upload files or paste image URLs to populate the project photo gallery.
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300">Before Image (Optional)</label>
                  <label className="flex items-center justify-center w-full px-3.5 py-3 rounded-xl bg-black/60 border-2 border-dashed border-white/20 hover:border-[#D4AF37]/60 transition-colors cursor-pointer group">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, setPortBeforeImage);
                      }}
                    />
                    <div className="flex flex-col items-center space-y-1">
                      <Upload className="w-4 h-4 text-neutral-400 group-hover:text-[#D4AF37] transition-colors" />
                      <span className="text-[10px] text-neutral-400 group-hover:text-neutral-200 transition-colors">Upload Before</span>
                    </div>
                  </label>
                  {portBeforeImage && (
                    <div className="relative inline-block">
                      <img src={portBeforeImage} alt="Before Preview" className="w-20 h-16 rounded-lg object-cover border border-white/10" />
                      <button type="button" onClick={() => setPortBeforeImage('')} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500/90 text-white flex items-center justify-center text-xs hover:bg-red-400 transition-colors"><X className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-300">After Image (Optional)</label>
                  <label className="flex items-center justify-center w-full px-3.5 py-3 rounded-xl bg-black/60 border-2 border-dashed border-white/20 hover:border-[#D4AF37]/60 transition-colors cursor-pointer group">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, setPortAfterImage);
                      }}
                    />
                    <div className="flex flex-col items-center space-y-1">
                      <Upload className="w-4 h-4 text-neutral-400 group-hover:text-[#D4AF37] transition-colors" />
                      <span className="text-[10px] text-neutral-400 group-hover:text-neutral-200 transition-colors">Upload After</span>
                    </div>
                  </label>
                  {portAfterImage && (
                    <div className="relative inline-block">
                      <img src={portAfterImage} alt="After Preview" className="w-20 h-16 rounded-lg object-cover border border-white/10" />
                      <button type="button" onClick={() => setPortAfterImage('')} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500/90 text-white flex items-center justify-center text-xs hover:bg-red-400 transition-colors"><X className="w-3 h-3" /></button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Project Description *</label>
                <textarea 
                  rows={3}
                  required
                  value={portDescription}
                  onChange={(e) => setPortDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider"
              >
                {editingProject ? 'Save Project Changes' : 'Publish Portfolio Project'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- SERVICE ADD / EDIT MODAL ---------------- */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#0D0E12] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            <button 
              onClick={() => setIsServiceModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-white">
                {editingService ? 'Edit Service Package' : 'Add New Service Package'}
              </h3>
              <p className="text-xs text-neutral-400">Configure title, pricing, features list, duration, and image.</p>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Package Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 3 BHK Luxury Penthouse Fitout" 
                    value={srvTitle}
                    onChange={(e) => setSrvTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Category Type *</label>
                  <select 
                    value={srvType}
                    onChange={(e) => setSrvType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Construction">Construction</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Original Base Price (INR ₹) *</label>
                  <input 
                    type="number" 
                    required
                    value={srvPrice}
                    onChange={(e) => {
                      const newBase = Number(e.target.value);
                      setSrvPrice(newBase);
                      if (typeof srvDiscountPct === 'number' && srvDiscountPct > 0) {
                        setSrvDiscountPrice(Math.round(newBase * (1 - srvDiscountPct / 100)));
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Duration *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 45 - 60 Days"
                    value={srvDuration}
                    onChange={(e) => setSrvDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Icon Name</label>
                  <select 
                    value={srvIcon}
                    onChange={(e) => setSrvIcon(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Home">Home</option>
                    <option value="Building">Building</option>
                    <option value="Crown">Crown</option>
                    <option value="Castle">Castle</option>
                    <option value="Compass">Compass</option>
                    <option value="Briefcase">Briefcase</option>
                    <option value="ShoppingBag">ShoppingBag</option>
                    <option value="Utensils">Utensils</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Stethoscope">Stethoscope</option>
                    <option value="Sparkles">Sparkles</option>
                  </select>
                </div>
              </div>

              {/* Special Discount Offer Section */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-black/60 to-emerald-500/10 border border-[#D4AF37]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider font-mono">
                    🏷️ Promotional Discount Offer (Optional)
                  </span>
                  {(srvDiscountPrice !== '' || srvDiscountPct !== '') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSrvDiscountPrice('');
                        setSrvDiscountPct('');
                      }}
                      className="text-[11px] text-red-400 hover:text-red-300 underline"
                    >
                      Clear Discount
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Discounted Offer Price (₹)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 475000 (Leaves blank for no discount)"
                      value={srvDiscountPrice}
                      onChange={(e) => {
                        const val = e.target.value === '' ? '' : Number(e.target.value);
                        setSrvDiscountPrice(val);
                        if (typeof val === 'number' && val > 0 && val < srvPrice) {
                          setSrvDiscountPct(Math.round(((srvPrice - val) / srvPrice) * 100));
                        } else {
                          setSrvDiscountPct('');
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-emerald-500/40 text-xs text-emerald-400 font-bold focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-300">Discount Percentage (%)</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="90"
                      placeholder="e.g. 15"
                      value={srvDiscountPct}
                      onChange={(e) => {
                        const val = e.target.value === '' ? '' : Number(e.target.value);
                        setSrvDiscountPct(val);
                        if (typeof val === 'number' && val > 0 && val < 100) {
                          setSrvDiscountPrice(Math.round(srvPrice * (1 - val / 100)));
                        } else {
                          setSrvDiscountPrice('');
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-[#D4AF37]/40 text-xs text-[#D4AF37] font-bold focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Live Preview Bar */}
                {typeof srvDiscountPrice === 'number' && srvDiscountPrice > 0 && srvDiscountPrice < srvPrice && (
                  <div className="p-3 rounded-lg bg-black/80 border border-emerald-500/30 flex items-center justify-between text-xs animate-in fade-in">
                    <span className="text-neutral-400">Public Display Preview:</span>
                    <div className="flex items-center space-x-2 font-mono">
                      <span className="line-through text-neutral-500">₹ {(srvPrice / 100000).toFixed(2)} L</span>
                      <span className="text-emerald-400 font-bold text-sm">₹ {(srvDiscountPrice / 100000).toFixed(2)} Lakhs</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/40">
                        {srvDiscountPct || Math.round(((srvPrice - srvDiscountPrice) / srvPrice) * 100)}% OFF
                      </span>
                    </div>
                  </div>
                )}
              </div>


              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300">Image Cover *</label>
                <label className="flex items-center justify-center w-full px-3.5 py-4 rounded-xl bg-black/60 border-2 border-dashed border-white/20 hover:border-[#D4AF37]/60 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, setSrvImage);
                    }}
                  />
                  <div className="flex flex-col items-center space-y-1">
                    <Upload className="w-5 h-5 text-neutral-400 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">Click to upload cover image</span>
                  </div>
                </label>
                {srvImage && (
                  <div className="relative inline-block">
                    <img src={srvImage} alt="Service Cover Preview" className="w-24 h-20 rounded-lg object-cover border border-white/10" />
                    <button type="button" onClick={() => setSrvImage('')} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500/90 text-white flex items-center justify-center text-xs hover:bg-red-400 transition-colors"><X className="w-3 h-3" /></button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Short Package Description *</label>
                <textarea 
                  rows={2}
                  required
                  value={srvDescription}
                  onChange={(e) => setSrvDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Key Features List (Comma separated) *</label>
                <textarea 
                  rows={2}
                  required
                  placeholder="Modular Kitchen, Master Wardrobe, TV Unit, Ambient Concealed Lighting"
                  value={srvFeaturesText}
                  onChange={(e) => setSrvFeaturesText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id="srvActive"
                  checked={srvIsActive}
                  onChange={(e) => setSrvIsActive(e.target.checked)}
                  className="w-4 h-4 accent-[#D4AF37] rounded"
                />
                <label htmlFor="srvActive" className="text-xs text-white font-medium cursor-pointer">
                  Show this service package live on public website
                </label>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider"
              >
                {editingService ? 'Save Service Changes' : 'Create Service Package'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- EDIT / ADD MASTER ARCHITECT MODAL ---------------- */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#121318] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsTeamModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="text-xs text-[#D4AF37] font-mono uppercase font-bold">Master Architects Editor</div>
              <h3 className="text-2xl font-serif font-bold text-white">
                {editingTeamMember ? `Edit Profile: ${editingTeamMember.name}` : 'Add New Master Architect'}
              </h3>
            </div>

            <form onSubmit={handleSaveTeamMember} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Mr. Satish Bhat"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Designation / Role *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Founder & CEO / Principal Architect"
                    value={teamRole}
                    onChange={(e) => setTeamRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Experience Tag *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 10+ Years Experience"
                    value={teamExperience}
                    onChange={(e) => setTeamExperience(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Photo Upload / Image URL */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300">Profile Photo / Portrait *</label>
                <div className="space-y-2">
                  <input 
                    type="text"
                    placeholder="Enter Image URL or upload a file below..."
                    value={teamImage}
                    onChange={(e) => setTeamImage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <label className="flex items-center justify-center w-full px-3.5 py-3 rounded-xl bg-black/60 border border-dashed border-white/20 hover:border-[#D4AF37]/60 transition-colors cursor-pointer group">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, setTeamImage);
                      }}
                    />
                    <div className="flex items-center space-x-2">
                      <Upload className="w-4 h-4 text-neutral-400 group-hover:text-[#D4AF37] transition-colors" />
                      <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">Click to upload photo portrait file</span>
                    </div>
                  </label>
                </div>

                {teamImage && (
                  <div className="relative inline-block mt-2">
                    <img 
                      src={teamImage} 
                      alt="Portrait Preview" 
                      className="w-24 h-28 rounded-lg object-cover border border-[#D4AF37]/40 shadow-md"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.failed) {
                          target.dataset.failed = 'true';
                          target.src = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80';
                        }
                      }}
                    />
                    <button type="button" onClick={() => setTeamImage('')} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500/90 text-white flex items-center justify-center text-xs hover:bg-red-400 transition-colors"><X className="w-3 h-3" /></button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Professional Bio & Focus</label>
                <textarea 
                  rows={3}
                  placeholder="Short professional summary of architectural achievements, expertise, and leadership..."
                  value={teamBio}
                  onChange={(e) => setTeamBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-all"
              >
                {editingTeamMember ? 'Save Architect Profile' : 'Add Master Architect'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Single Milestone Tax Invoice Viewer Modal */}
      <InvoiceModal 
        isOpen={Boolean(selectedInvoicePayment)}
        onClose={() => setSelectedInvoicePayment(null)}
        payment={selectedInvoicePayment}
        project={selectedProject}
      />

      {/* ---------------- BRANCH OFFICE ADD / EDIT MODAL ---------------- */}
      {isBranchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-[#121318] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setIsBranchModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="text-xs text-[#D4AF37] font-mono uppercase font-bold">Branch Office Info Editor</div>
              <h3 className="text-2xl font-serif font-bold text-white">
                {editingBranch ? `Edit Branch: ${editingBranch.city}` : 'Add Official Branch Office'}
              </h3>
            </div>

            <form onSubmit={handleSaveBranch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">City Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Bengaluru / Hyderabad / Mumbai"
                    value={branchCity}
                    onChange={(e) => setBranchCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Office Designation / Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Corporate HQ & Experience Studio"
                    value={branchTitle}
                    onChange={(e) => setBranchTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Full Official Address *</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="#14, Sy No 36/1, Vasanth Vallabnagar, Vasanthpura, Uttrahalli Hobli, Bengaluru 560061"
                  value={branchAddress}
                  onChange={(e) => setBranchAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Contact Phone Number *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="+91 93805 23743"
                    value={branchPhone}
                    onChange={(e) => setBranchPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Official Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="support@decor8india.com"
                    value={branchEmail}
                    onChange={(e) => setBranchEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Working Hours *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Mon - Sat: 9:30 AM - 7:30 PM"
                    value={branchHours}
                    onChange={(e) => setBranchHours(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Google Maps Link / URL</label>
                  <input 
                    type="text" 
                    placeholder="https://maps.google.com/?q=..."
                    value={branchMapUrl}
                    onChange={(e) => setBranchMapUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-neutral-300">Studio Photo Image URL / Upload</label>
                <input 
                  type="text" 
                  placeholder="https://images.unsplash.com/..."
                  value={branchImageUrl}
                  onChange={(e) => setBranchImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <label className="flex items-center justify-center w-full px-3.5 py-3 rounded-xl bg-black/60 border border-dashed border-white/20 hover:border-[#D4AF37]/60 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, setBranchImageUrl);
                    }}
                  />
                  <div className="flex items-center space-x-2">
                    <Upload className="w-4 h-4 text-neutral-400 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">Click to upload studio photo</span>
                  </div>
                </label>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id="branchIsHQ"
                  checked={branchIsHQ}
                  onChange={(e) => setBranchIsHQ(e.target.checked)}
                  className="w-4 h-4 accent-[#D4AF37] rounded"
                />
                <label htmlFor="branchIsHQ" className="text-xs text-white font-medium cursor-pointer">
                  Set as Main Corporate Headquarters ⭐
                </label>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider font-semibold"
              >
                {editingBranch ? 'Save Branch Office Changes' : 'Create Branch Office'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Single Milestone Tax Invoice Viewer Modal */}
      <InvoiceModal 
        isOpen={Boolean(selectedInvoicePayment)}
        onClose={() => setSelectedInvoicePayment(null)}
        payment={selectedInvoicePayment}
        project={selectedProject}
      />

      {/* Master Consolidated Bill Modal (All Paid Invoices) */}
      <InvoiceModal 
        isOpen={isConsolidatedInvoiceOpen}
        onClose={() => setIsConsolidatedInvoiceOpen(false)}
        project={selectedProject}
        isConsolidated={true}
      />


      {/* ============ APPROVAL CONFIRMATION MODAL ============ */}
      {approvalModalBookingId && approvalBooking && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setApprovalModalBookingId(null)}>
          <div className="bg-[#1a1a2e] border border-[#D4AF37]/30 rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-5" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">Confirm Approval</h3>
                <p className="text-xs text-neutral-400 mt-1">Review & set the final contract price before approving</p>
              </div>
              <button onClick={() => setApprovalModalBookingId(null)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Client Info */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Client</span>
                <span className="text-white font-semibold">{approvalBooking.clientName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Package</span>
                <span className="text-white font-semibold">{approvalBooking.packageName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">Service Type</span>
                <span className="text-white">{approvalBooking.serviceType}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-white/10 pt-2">
                <span className="text-neutral-400">Est. Package Cost</span>
                <span className="text-amber-300 font-bold font-mono">₹ {approvalBooking.estimatedCost ? (approvalBooking.estimatedCost / 100000).toFixed(2) : '15.00'} Lakhs</span>
              </div>
            </div>

            {/* Editable Final Contract Price */}
            <div className="space-y-2">
              <label className="text-xs text-[#D4AF37] uppercase tracking-wider font-bold">Final Contract Price (₹)</label>
              <div className="flex items-center space-x-2">
                <span className="text-lg text-[#D4AF37] font-bold">₹</span>
                <input
                  type="number"
                  value={finalContractPrice || ''}
                  onChange={e => setFinalContractPrice(Number(e.target.value))}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-[#D4AF37]/40 text-lg font-bold text-[#D4AF37] font-mono focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30"
                  placeholder="Enter negotiated price"
                  autoFocus
                />
              </div>
              <p className="text-[10px] text-neutral-500">This amount will be used as the project budget and for calculating payment milestones (10% token deposit).</p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setApprovalModalBookingId(null)}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-neutral-400 font-bold text-xs uppercase tracking-wider hover:text-white hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  approveBooking(approvalBooking.id, finalContractPrice || undefined);
                  const svMatch = siteVisits.find(sv => sv.clientEmail.toLowerCase() === approvalBooking.clientEmail.toLowerCase());
                  if (svMatch) confirmSiteVisit(svMatch.id);
                  setApprovalModalBookingId(null);
                  alert(`✅ ${approvalBooking.clientName} approved with contract price ₹ ${finalContractPrice ? (finalContractPrice / 100000).toFixed(2) : (approvalBooking.estimatedCost ? (approvalBooking.estimatedCost / 100000).toFixed(2) : '15.00')} Lakhs`);
                }}
                className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
              >
                ✓ Approve & Create Project
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
