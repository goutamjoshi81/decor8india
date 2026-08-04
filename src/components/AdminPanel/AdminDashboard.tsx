import React, { useState, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
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
  Bell, 
  Image as ImageIcon, 
  LogOut, 
  Send, 
  ShieldAlert,
  CheckCircle2,
  X,
  FileText,
  Camera,
  CreditCard,
  Layers,
  FilePlus,
  Upload,
  Award
} from 'lucide-react';

import { InvoiceModal } from '../InvoiceModal';

interface AdminDashboardProps {
  onReturnToPublic: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onReturnToPublic }) => {
  const { 
    currentUser, 
    logout, 
    bookings, 
    approveBooking, 
    rejectBooking, 
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
    toggleServiceStatus,
    articles,
    addArticle,
    deleteArticle,
    teamMembers,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'clients' | 'projects' | 'portfolio' | 'services' | 'team' | 'magazine' | 'notifications'>('analytics');

  // Reusable file-to-data-URL handler with automatic image compression to prevent QuotaExceededError
  const handleFileUpload = useCallback((file: File, setter: (url: string) => void) => {
    if (!file) return;
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
  }, []);
  
  // Project Management Sub-Tab State
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [projectSubTab, setProjectSubTab] = useState<'stage' | 'updates' | 'documents' | 'payments'>('stage');

  // Stage progress state
  const [stageProgressInput, setStageProgressInput] = useState<number>(65);
  const [selectedStage, setSelectedStage] = useState<ProjectStage>('Carpentry');

  // Site Update Feed State
  const [feedTitle, setFeedTitle] = useState('');
  const [feedDescription, setFeedDescription] = useState('');
  const [feedImageUrl, setFeedImageUrl] = useState('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80');
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

  // ---------------- PORTFOLIO CMS MODAL STATE ----------------
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Portfolio Form State
  const [portTitle, setPortTitle] = useState('');
  const [portClientName, setPortClientName] = useState('');
  const [portDesignerName, setPortDesignerName] = useState('Aarav Mehta (Principal Architect)');
  const [portCategory, setPortCategory] = useState<'Residential' | 'Commercial' | 'Construction'>('Residential');
  const [portStyle, setPortStyle] = useState<'Luxury' | 'Modern' | 'Minimal' | 'Traditional'>('Luxury');
  const [portCoverImage, setPortCoverImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
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
    setPortDesignerName('Aarav Mehta (Principal Architect)');
    setPortCategory('Residential');
    setPortStyle('Luxury');
    setPortCoverImage('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
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
    setPortDesignerName(project.designerName || 'Aarav Mehta (Principal Architect)');
    setPortCategory(project.category);
    setPortStyle(project.style);
    setPortCoverImage(project.coverImage);
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

    if (editingProject) {
      updateProject(editingProject.id, {
        title: portTitle,
        clientName: portClientName,
        designerName: portDesignerName,
        category: portCategory,
        style: portStyle,
        coverImage: portCoverImage,
        beforeImage: portBeforeImage || undefined,
        afterImage: portAfterImage || undefined,
        location: portLocation,
        area: portArea,
        budget: portBudget,
        completionTime: portCompletionTime,
        status: portStatus,
        description: portDescription
      });
      alert('Portfolio project updated successfully!');
    } else {
      addProject({
        title: portTitle,
        clientId: 'client-guest',
        clientName: portClientName,
        designerName: portDesignerName,
        category: portCategory,
        style: portStyle,
        coverImage: portCoverImage,
        galleryImages: [portCoverImage],
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
  const [srvImage, setSrvImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80');
  const [srvIcon, setSrvIcon] = useState('Home');
  const [srvIsActive, setSrvIsActive] = useState(true);

  // Inline Quick Price Edit State
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [quickPriceInput, setQuickPriceInput] = useState<number>(0);

  const openAddServiceModal = () => {
    setEditingService(null);
    setSrvTitle('');
    setSrvType('Residential');
    setSrvDescription('Bespoke luxury interior transformation package.');
    setSrvFeaturesText('Modular Kitchen, Master Suite Wardrobe, Ceiling Concealed Lights, Designer TV Unit');
    setSrvDuration('35 - 50 Days');
    setSrvPrice(550000);
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
    setSrvImage(srv.image);
    setSrvIcon(srv.iconName);
    setSrvIsActive(srv.isActive);
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvTitle) return;

    const featuresList = srvFeaturesText.split(',').map(f => f.trim()).filter(Boolean);

    if (editingService) {
      updateService(editingService.id, {
        title: srvTitle,
        type: srvType,
        description: srvDescription,
        features: featuresList,
        estimatedDuration: srvDuration,
        startingPrice: Number(srvPrice),
        image: srvImage,
        iconName: srvIcon,
        isActive: srvIsActive
      });
      alert('Service package updated successfully!');
    } else {
      addService({
        title: srvTitle,
        type: srvType,
        description: srvDescription,
        features: featuresList,
        estimatedDuration: srvDuration,
        startingPrice: Number(srvPrice),
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
  const [teamImage, setTeamImage] = useState('/satish_bhat.png');
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
      setTeamImage('/satish_bhat.png');
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
        image: teamImage || '/satish_bhat.png',
        bio: teamBio
      });
      alert(`Architect profile for ${teamName} updated successfully!`);
    } else {
      addTeamMember({
        name: teamName,
        role: teamRole,
        experience: teamExperience,
        image: teamImage || '/satish_bhat.png',
        bio: teamBio
      });
      alert(`New Master Architect ${teamName} added to leadership team!`);
    }

    setIsTeamModalOpen(false);
  };

  // ---------------- ARTICLE FORM STATE ----------------
  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtCategory, setNewArtCategory] = useState<'Tips' | 'Decoration' | 'Office Trends' | 'Architecture' | 'Color Guides' | 'Furniture' | 'Lighting' | 'Smart Home'>('Tips');
  const [newArtExcerpt, setNewArtExcerpt] = useState('');

  // Broadcast notification state
  const [notifMessage, setNotifMessage] = useState('');
  const [notifSent, setNotifSent] = useState(false);

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

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleUpdateProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) return;
    updateProjectProgress(selectedProjectId, selectedStage, stageProgressInput);
    alert('Project active stage & overall completion updated successfully!');
  };

  const handlePostSiteFeed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !feedTitle || !feedDescription) return;

    addWorkUpdate(selectedProjectId, {
      date: new Date().toISOString().split('T')[0],
      title: feedTitle,
      description: feedDescription,
      mediaUrls: [feedImageUrl || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
      mediaType: 'image',
      stage: feedStage
    });

    setFeedTitle('');
    setFeedDescription('');
    alert('Site update feed post added! Visible instantly to client.');
  };

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !docTitle) return;

    addDocument(selectedProjectId, {
      title: docTitle,
      category: docCategory,
      fileUrl: docFileUrl || '#',
      fileSize: docFileSize,
      uploadDate: new Date().toISOString().split('T')[0]
    });

    setDocTitle('');
    alert(`Document "${docTitle}" uploaded to Client Portal!`);
  };

  const handleAddPaymentMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId || !payTitle || !payAmount) return;

    addPayment(selectedProjectId, {
      title: payTitle,
      amount: Number(payAmount),
      paidAmount: payStatus === 'Paid' ? Number(payAmount) : 0,
      dueDate: payDueDate,
      status: payStatus,
      paidDate: payStatus === 'Paid' ? new Date().toISOString().split('T')[0] : undefined
    });

    setPayTitle('');
    alert(`Payment milestone "${payTitle}" added to payout ledger!`);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitle || !newArtExcerpt) return;

    addArticle({
      title: newArtTitle,
      slug: newArtTitle.toLowerCase().replace(/ /g, '-'),
      excerpt: newArtExcerpt,
      content: `<p>${newArtExcerpt}</p>`,
      category: newArtCategory,
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      authorName: currentUser.name,
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: '4 min read',
      featured: false,
      status: 'Published'
    });

    setNewArtTitle('');
    setNewArtExcerpt('');
    alert('New article published live to homepage!');
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifMessage) return;
    setNotifSent(true);
    setTimeout(() => {
      setNotifMessage('');
      setNotifSent(false);
    }, 3000);
  };

  const totalClients = bookings.length;
  const activeProjectsCount = projects.filter(p => p.status === 'Ongoing').length;
  const completedProjectsCount = projects.filter(p => p.status === 'Completed').length;
  const pendingApprovalsCount = bookings.filter(b => b.status === 'Pending Approval').length;

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#E5E3DF] pt-24 pb-16">
      
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

        {/* Navigation Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-white/10">
          {[
            { id: 'analytics', label: 'Overview & KPIs', icon: LayoutDashboard },
            { id: 'clients', label: `Client Approvals (${pendingApprovalsCount})`, icon: Users },
            { id: 'projects', label: 'Project Process & Live Feeds', icon: Building2 },
            { id: 'portfolio', label: 'Portfolio CMS', icon: ImageIcon },
            { id: 'services', label: 'Service & Pricing CMS', icon: DollarSign },
            { id: 'team', label: 'Master Architects CMS', icon: Award },
            { id: 'magazine', label: 'Magazine CMS', icon: BookOpen },
            { id: 'notifications', label: 'Send Notifications', icon: Bell }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'gold-gradient-bg text-black shadow-lg' 
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

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
            <div className="space-y-1">
              <h2 className="font-serif text-3xl font-bold text-white">Client Booking Approval Pipeline</h2>
              <p className="text-xs text-neutral-400">Rule: Only approved clients receive access credentials for the Client Portal.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-black/60 text-[#D4AF37] font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-4 rounded-l-lg">Client Name</th>
                    <th className="p-4">Contact Info</th>
                    <th className="p-4">Package & Specs</th>
                    <th className="p-4">Financing / EMI</th>
                    <th className="p-4">Est. Cost</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 rounded-r-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {bookings.map((b) => {
                    const isEmi = b.isEmiRequested || b.requirements?.toLowerCase().includes('emi');
                    return (
                      <tr key={b.id} className="hover:bg-white/5">
                        <td className="p-4 font-bold text-white">
                          {b.clientName}
                          <div className="text-[10px] text-neutral-400 font-mono">ID: {b.id}</div>
                        </td>
                        <td className="p-4 font-mono">
                          <div>{b.clientEmail}</div>
                          <div className="text-neutral-500">{b.clientPhone}</div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-white">{b.packageName}</span>
                          <div className="text-[10px] text-neutral-400">{b.serviceType}</div>
                          {b.requirements && (
                            <div className="text-[10px] text-neutral-400 italic line-clamp-1 mt-0.5" title={b.requirements}>
                              Note: {b.requirements}
                            </div>
                          )}
                        </td>
                        <td className="p-4 font-mono">
                          {isEmi ? (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] font-bold text-[10px] uppercase tracking-wider shadow-sm shadow-[#D4AF37]/20">
                              <CreditCard className="w-3 h-3" />
                              <span>0% EMI Plan</span>
                            </span>
                          ) : (
                            <span className="text-neutral-500 text-[10px]">Standard Pay</span>
                          )}
                        </td>
                        <td className="p-4 font-mono text-emerald-400 font-bold">
                          ₹ {b.estimatedCost ? (b.estimatedCost / 100000).toFixed(2) : 15} L
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
                                  approveBooking(b.id);
                                  alert(`Approved booking for ${b.clientName}. Project initialized and Client Portal account activated!`);
                                }}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs"
                              >
                                Approve & Grant Login
                              </button>
                              <button
                                onClick={() => rejectBooking(b.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white text-xs"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-neutral-500 text-[11px]">Approved</span>
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
              <h3 className="font-serif text-xl font-bold text-white">Select Client Project</h3>
              <div className="space-y-2">
                {projects.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedProjectId === p.id 
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-lg' 
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-sm text-white">{p.title}</div>
                    <div className="text-xs text-[#D4AF37] pt-1 font-semibold">Stage: {p.currentStage} ({p.progressPercentage}%)</div>
                    <div className="text-[10px] text-neutral-400 font-mono">Client: {p.clientName}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Project Control Workstation */}
            {selectedProject && (
              <div className="lg:col-span-8 space-y-6">
                
                {/* Project Header Info */}
                <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <span className="text-xs text-[#D4AF37] uppercase tracking-wider font-semibold">Active Project Workspace</span>
                      <h3 className="font-serif text-2xl font-bold text-white">{selectedProject.title}</h3>
                      <p className="text-xs text-neutral-400 font-mono">Client: {selectedProject.clientName} • Architect: {selectedProject.designerName}</p>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-[#D4AF37]/40 text-right">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Budget</span>
                      <span className="text-sm font-bold text-[#D4AF37] font-mono">{selectedProject.budget}</span>
                    </div>
                  </div>

                  {/* Sub-Navigation Tabs inside Selected Project */}
                  <div className="flex space-x-2 pt-4 border-t border-white/10 overflow-x-auto">
                    {[
                      { id: 'stage', label: '1. Stage & Progress', icon: Layers },
                      { id: 'updates', label: `2. Site Feed (${selectedProject.workUpdates.length})`, icon: Camera },
                      { id: 'documents', label: `3. Documents & Invoices (${selectedProject.documents.length})`, icon: FileText },
                      { id: 'payments', label: `4. Payout Ledger (${selectedProject.payments.length})`, icon: CreditCard }
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
                    <div className="space-y-1">
                      <h4 className="font-serif text-xl font-bold text-white">Update Stage & Completion %</h4>
                      <p className="text-xs text-neutral-400">Controls the main milestone progress bar in the client portal.</p>
                    </div>

                    <form onSubmit={handleUpdateProgressSubmit} className="space-y-6 pt-4 border-t border-white/10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-neutral-300 font-medium">Active Site Stage</label>
                          <select 
                            value={selectedStage}
                            onChange={(e) => setSelectedStage(e.target.value as ProjectStage)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          >
                            <option value="Design Discussion">Design Discussion</option>
                            <option value="Site Measurement">Site Measurement</option>
                            <option value="3D Design">3D Design</option>
                            <option value="Material Selection">Material Selection</option>
                            <option value="Civil Work">Civil Work</option>
                            <option value="Carpentry">Carpentry</option>
                            <option value="Painting">Painting</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Furniture Installation">Furniture Installation</option>
                            <option value="Final Inspection">Final Inspection</option>
                            <option value="Handover Completed">Handover Completed (Moves to Previous Projects)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-neutral-300 font-medium">
                            <span>Completion Percentage</span>
                            <span className="text-[#D4AF37] font-bold">{stageProgressInput}%</span>
                          </div>
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            value={stageProgressInput}
                            onChange={(e) => setStageProgressInput(Number(e.target.value))}
                            className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37] mt-3"
                          />
                        </div>
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider"
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

                      <div className="space-y-2">
                        <label className="text-xs text-neutral-300 font-medium">Site Photo *</label>
                        <label className="flex items-center justify-center w-full px-3.5 py-4 rounded-xl bg-black/60 border-2 border-dashed border-white/20 hover:border-[#D4AF37]/60 transition-colors cursor-pointer group">
                          <input 
                            type="file" 
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleFileUpload(file, setFeedImageUrl);
                            }}
                          />
                          <div className="flex flex-col items-center space-y-1">
                            <Upload className="w-5 h-5 text-neutral-400 group-hover:text-[#D4AF37] transition-colors" />
                            <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">Click to upload image</span>
                          </div>
                        </label>
                        {feedImageUrl && (
                          <div className="relative inline-block">
                            <img src={feedImageUrl} alt="Preview" className="w-24 h-20 rounded-lg object-cover border border-white/10" />
                            <button type="button" onClick={() => setFeedImageUrl('')} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500/90 text-white flex items-center justify-center text-xs hover:bg-red-400 transition-colors"><X className="w-3 h-3" /></button>
                          </div>
                        )}
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
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">Previous Site Updates ({selectedProject.workUpdates.length})</h5>
                      <div className="space-y-3">
                        {selectedProject.workUpdates.map(update => (
                          <div key={update.id} className="p-4 rounded-xl glass-card border border-white/10 flex items-start space-x-4">
                            <img src={update.mediaUrls[0]} alt={update.title} className="w-16 h-16 rounded-lg object-cover" />
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center justify-between text-[10px] text-neutral-400">
                                <span className="text-[#D4AF37] font-semibold">{update.stage}</span>
                                <span>{update.date}</span>
                              </div>
                              <div className="text-xs font-bold text-white">{update.title}</div>
                              <p className="text-xs text-neutral-300 line-clamp-2">{update.description}</p>
                            </div>
                          </div>
                        ))}
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
                          <label className="text-xs text-neutral-300 font-medium">File Download URL *</label>
                          <input 
                            type="text" 
                            required
                            value={docFileUrl}
                            onChange={(e) => setDocFileUrl(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                          />
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
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">Client Document Vault ({selectedProject.documents.length})</h5>
                      <div className="space-y-2">
                        {selectedProject.documents.map(doc => (
                          <div key={doc.id} className="p-3.5 rounded-xl glass-card border border-white/10 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-3">
                              <FileText className="w-4 h-4 text-[#D4AF37]" />
                              <div>
                                <div className="font-bold text-white">{doc.title}</div>
                                <div className="text-[10px] text-neutral-400 font-mono">{doc.category} • {doc.fileSize} • Uploaded {doc.uploadDate}</div>
                              </div>
                            </div>
                            <span className="text-[#D4AF37] font-semibold text-[11px]">Published</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* SUB-TAB 4: PAYOUT LEDGER & MILESTONES */}
                {projectSubTab === 'payments' && (
                  <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-6 animate-in fade-in">
                    <div className="space-y-1">
                      <h4 className="font-serif text-xl font-bold text-white">Add Payment Milestone & Ledger</h4>
                      <p className="text-xs text-neutral-400">Configure payment milestone installments and record client payments.</p>
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
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">Project Payment Ledger ({selectedProject.payments.length})</h5>
                      <div className="space-y-2">
                        {selectedProject.payments.map(pay => (
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
            )}

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

                  <div className="pt-3 border-t border-white/10 flex justify-end space-x-2">
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
                    <th className="p-4">Starting Price</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 rounded-r-lg text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {services.map((s) => (
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
                      <td className="p-4 font-mono text-emerald-400 font-bold">
                        {editingPriceId === s.id ? (
                          <div className="flex items-center space-x-1">
                            <input 
                              type="number"
                              value={quickPriceInput}
                              onChange={(e) => setQuickPriceInput(Number(e.target.value))}
                              className="w-24 px-2 py-1 rounded bg-black border border-[#D4AF37] text-white text-xs"
                            />
                            <button 
                              onClick={() => {
                                updateServicePrice(s.id, quickPriceInput);
                                setEditingPriceId(null);
                              }}
                              className="px-2 py-1 rounded bg-emerald-500 text-black font-bold text-[10px]"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          `₹ ${(s.startingPrice / 100000).toFixed(2)} Lakhs`
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
                            if (confirm(`Are you sure you want to delete service "${s.title}"?`)) {
                              deleteService(s.id);
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
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

                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Excerpt Summary</label>
                  <textarea 
                    rows={3}
                    required
                    placeholder="Short description for homepage feed..."
                    value={newArtExcerpt}
                    onChange={(e) => setNewArtExcerpt(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider"
                >
                  Publish Article to Homepage & RSS
                </button>
              </form>
            </div>

            {/* Articles List */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-4">
              <h3 className="font-serif text-2xl font-bold text-white">Published Articles</h3>
              <div className="space-y-3">
                {articles.map(art => (
                  <div key={art.id} className="p-4 rounded-xl glass-card border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{art.title}</div>
                      <div className="text-[10px] text-[#D4AF37] font-mono">{art.category} • Published {art.publishedAt}</div>
                    </div>
                    <button 
                      onClick={() => deleteArticle(art.id)}
                      className="p-2 rounded bg-red-500/20 text-red-300 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 7: BROADCAST NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="p-8 rounded-2xl glass-panel border border-white/10 space-y-6 max-w-xl mx-auto animate-in fade-in">
            <div className="space-y-1">
              <h2 className="font-serif text-3xl font-bold text-white">Broadcast Client Notification</h2>
              <p className="text-xs text-neutral-400">Send instant email & in-portal push notices to active clients.</p>
            </div>

            {!notifSent ? (
              <form onSubmit={handleSendNotification} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 font-medium">Notification Message</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="e.g. Mandatory site inspection notice or holiday schedule update..."
                    value={notifMessage}
                    onChange={(e) => setNotifMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Notification Alert</span>
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="text-base font-bold text-white font-serif">Broadcast Notification Sent!</div>
                <p className="text-xs text-neutral-300">Sent to all active client accounts.</p>
              </div>
            )}
          </div>
        )}

      </div>

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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Location</label>
                  <input 
                    type="text" 
                    value={portLocation}
                    onChange={(e) => setPortLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Carpet Area</label>
                  <input 
                    type="text" 
                    value={portArea}
                    onChange={(e) => setPortArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Completed Budget</label>
                  <input 
                    type="text" 
                    value={portBudget}
                    onChange={(e) => setPortBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  />
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
                  <label className="text-xs font-semibold text-neutral-300">Starting Price (INR ₹) *</label>
                  <input 
                    type="number" 
                    required
                    value={srvPrice}
                    onChange={(e) => setSrvPrice(Number(e.target.value))}
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
                <label className="flex items-center justify-center w-full px-3.5 py-4 rounded-xl bg-black/60 border-2 border-dashed border-white/20 hover:border-[#D4AF37]/60 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, setTeamImage);
                    }}
                  />
                  <div className="flex flex-col items-center space-y-1">
                    <Upload className="w-5 h-5 text-neutral-400 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">Click to upload photo portrait</span>
                  </div>
                </label>

                {teamImage && (
                  <div className="relative inline-block mt-2">
                    <img src={teamImage} alt="Portrait Preview" className="w-24 h-28 rounded-lg object-cover border border-[#D4AF37]/40 shadow-md" />
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

      {/* GST Tax Invoice Viewer Modal */}
      <InvoiceModal 
        isOpen={Boolean(selectedInvoicePayment)}
        onClose={() => setSelectedInvoicePayment(null)}
        payment={selectedInvoicePayment}
        project={selectedProject}
      />

    </div>
  );
};
