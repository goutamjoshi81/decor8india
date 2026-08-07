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
  MapPin
} from 'lucide-react';
import type { BranchOffice } from '../../types';

import { InvoiceModal } from '../InvoiceModal';

interface AdminDashboardProps {
  onReturnToPublic: () => void;
}

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
    deleteBranchOffice
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'clients' | 'projects' | 'portfolio' | 'services' | 'team' | 'magazine' | 'branches'>('analytics');
  const [clientFilter, setClientFilter] = useState<'ALL' | 'PACKAGES' | 'SITE_VISITS'>('ALL');

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
  const [projectSubTab, setProjectSubTab] = useState<'stage' | 'updates' | 'documents' | 'payments'>('stage');

  // Stage progress state
  const [stageProgressInput, setStageProgressInput] = useState<number>(65);

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
  const [isConsolidatedInvoiceOpen, setIsConsolidatedInvoiceOpen] = useState(false);

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
  const [newArtCategory, setNewArtCategory] = useState<'Tips' | 'Decoration' | 'Office Trends' | 'Architecture' | 'Color Guides' | 'Furniture' | 'Lighting' | 'Smart Home'>('Tips');
  const [newArtExcerpt, setNewArtExcerpt] = useState('');

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

  // Auto-select first project when projects load or change
  React.useEffect(() => {
    if (projects.length > 0 && (!selectedProjectId || !projects.some(p => p.id === selectedProjectId))) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

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

    updateProjectProgress(targetProjId, targetStage, stageProgressInput);
    updateProject(targetProjId, {
      progressPercentage: stageProgressInput,
      status: newStatus,
      currentStage: targetStage
    });

    alert(`Overall completion updated to ${stageProgressInput}% and saved to database!`);
  };

  const handlePostSiteFeed = (e: React.FormEvent) => {
    e.preventDefault();
    const targetProjId = selectedProjectId || selectedProject?.id;
    if (!targetProjId || !feedTitle || !feedDescription) {
      alert('Please fill out the update title and description.');
      return;
    }

    addWorkUpdate(targetProjId, {
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
    });

    setDocTitle('');
    alert(`Document "${docTitle}" uploaded to Client Portal!`);
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

  const totalClients = bookings.length;
  const activeProjectsCount = projects.filter(p => p.status === 'Ongoing').length;
  const completedProjectsCount = projects.filter(p => p.status === 'Completed').length;
  const pendingApprovalsCount = bookings.filter(b => b.status === 'Pending Approval').length;

  const existingSiteVisitEmails = new Set(siteVisits.map(sv => sv.clientEmail.toLowerCase()));
  const uniqueBookingSiteVisits = bookings.filter(b => {
    const isSiteVisit = b.serviceType === 'Site Visit' || b.packageName.toLowerCase().includes('site visit') || b.requirements?.toLowerCase().includes('site visit');
    return isSiteVisit && !existingSiteVisitEmails.has(b.clientEmail.toLowerCase());
  });
  const totalSiteVisitsCount = siteVisits.length + uniqueBookingSiteVisits.length;

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
              className="px-4 py-2.5 rounded-xl gold-gradient-bg text-black font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center space-x-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Landing Page</span>
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
            { id: 'branches', label: 'Branch Offices CMS', icon: MapPin }
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
                                    approveBooking(b.id);
                                    const svMatch = siteVisits.find(sv => sv.clientEmail.toLowerCase() === b.clientEmail.toLowerCase());
                                    if (svMatch) confirmSiteVisit(svMatch.id);
                                    alert(`Site Visit for ${b.clientName} confirmed!`);
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
              <h3 className="font-serif text-xl font-bold text-white">Select Client Project</h3>
              <div className="space-y-2">
                {projects.filter(p => !p.title.toLowerCase().includes('site visit') && !p.title.toLowerCase().includes('in-person')).map(p => (
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
                      <div className="px-3 py-1.5 rounded-lg bg-black/60 border border-[#D4AF37]/40 text-right">
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Budget</span>
                        <span className="text-sm font-bold text-[#D4AF37] font-mono">{selectedProject.budget}</span>
                      </div>
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
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">Previous Site Updates ({(selectedProject.workUpdates || []).length})</h5>
                      <div className="space-y-3">
                        {(selectedProject.workUpdates || []).map(update => (
                          <div key={update.id} className="p-4 rounded-xl glass-card border border-white/10 flex items-start space-x-4">
                            <img src={(update.mediaUrls || [])[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'} alt={update.title} className="w-16 h-16 rounded-lg object-cover" />
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

    </div>
  );
};
